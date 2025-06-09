import React, { useState, useEffect, useCallback } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import '../dashboard.css'; // تأكد من مسار ملف الـ CSS الخاص بك

const API_BASE_URL = 'https://192.168.1.12:7069/api'; // غير هذا للرابط الفعلي للـ API الخاص بك

const DefineDoctorTab = () => {
    const [doctors, setDoctors] = useState([]);
    const [form, setForm] = useState({
        id: 0,
        name: '',        // لـ Dr_NameAr
        email: '',       // لـ Dr_Email
        phone: '',       // لـ Phone
        dr_Code: '',     // لـ Dr_Code
        dr_NameEn: '',   // لـ Dr_NameEn
        dr_Image: '',    // لـ Dr_Image (اختياري)
        department: '',  // لو لسه عايز تستخدمه
        facultyId: '',   // لو لسه عايز تستخدمه
    });
    const [editingDoctorId, setEditingDoctorId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDoctors = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/Doctors/GetAllDoctors`);
            if (!response.ok) {
                // حاول قراءة رسالة الخطأ من الـ API إن وجدت
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setDoctors(data); // البيانات هنا ستكون بـ camelCase
        } catch (err) {
            console.error("Error fetching doctors:", err);
            setError("Failed to load doctors: " + err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDoctors();
    }, [fetchDoctors]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAddOrUpdate = async () => {
        // Validation مبدئي في الـ Frontend (Full Name (AR), Email, Full Name (EN) لازالوا مطلوبين)
        if (!form.name || !form.email || !form.dr_NameEn) {
            setError("Required fields: Full Name (Arabic), Email, Full Name (English) must be filled.");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const method = 'POST';
            const url = `${API_BASE_URL}/Doctors/Add_OR_UpdateDoctor`;

            // هنا نرسل البيانات بـ PascalCase لتطابق الـ DTO في الـ C#
            const doctorData = {
                ID: form.id, // ID تبدأ بكابيتال لتطابق الـ DTO
                Dr_NameAr: form.name,
                Dr_Email: form.email,
                Phone: form.phone,
                Dr_Code: form.dr_Code || null,     // اختياري، يُرسل null إذا فارغ
                Dr_NameEn: form.dr_NameEn,
                Dr_Image: form.dr_Image || null,   // اختياري، يُرسل null إذا فارغ
                // Department: form.department, // أضفهم بـ PascalCase لو موجودين في الـ DTO
                // FacultyId: form.facultyId,   // أضفهم بـ PascalCase لو موجودين في الـ DTO
            };

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(doctorData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                // عرض رسالة الخطأ الدقيقة من الـ Backend
                setError(errorData.message || JSON.stringify(errorData.errors) || `HTTP error! status: ${response.status}`);
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            await fetchDoctors(); // إعادة جلب الأطباء بعد الإضافة/التعديل
            setForm({ // إعادة تعيين الـ form لحالة فارغة
                id: 0,
                name: '',
                email: '',
                phone: '',
                dr_Code: '',
                dr_NameEn: '',
                dr_Image: '',
                department: '',
                facultyId: '',
            });
            setEditingDoctorId(null);
        } catch (err) {
            console.error("Error adding/updating doctor:", err);
            // لو الخطأ جاي من الـ Backend وتم عرضه بالفعل في setError فوق
            if (!error) {
                setError(err.message || "Failed to save doctor. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this doctor?")) {
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/Doctors/DeleteDoctor?id=${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            await fetchDoctors(); // إعادة جلب الأطباء بعد الحذف
        } catch (err) {
            console.error("Error deleting doctor:", err);
            setError(err.message || "Failed to delete doctor. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (doctor) => {
        setForm({
            id: doctor.id, // ID من الـ API تكون camelCase (id)
            name: doctor.dr_NameAr, // <--- تم التعديل ليطابق camelCase
            email: doctor.dr_Email, // <--- تم التعديل ليطابق camelCase
            phone: doctor.phone,     // <--- تم التعديل ليطابق camelCase
            dr_Code: doctor.dr_Code || '',  // <--- تم التعديل ليطابق camelCase
            dr_NameEn: doctor.dr_NameEn || '', // <--- تم التعديل ليطابق camelCase
            dr_Image: doctor.dr_Image || '',   // <--- تم التعديل ليطابق camelCase
            department: doctor.department || '', // لو Backend بيرجعها بـ camelCase
            facultyId: doctor.facultyId || '',   // لو Backend بيرجعها بـ camelCase
        });
        setEditingDoctorId(doctor.id);
        setError(null);
    };

    const handleCancelEdit = () => {
        setForm({
            id: 0,
            name: '',
            email: '',
            phone: '',
            dr_Code: '',
            dr_NameEn: '',
            dr_Image: '',
            department: '',
            facultyId: '',
        });
        setEditingDoctorId(null);
        setError(null);
    };

    return (
        <div className="section-layout">
            <div className="section-header">
                <h1>Define Doctor</h1>
                <p className="subtitle">Add, edit, and manage doctors for assignment</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="form-grid">
                <input
                    name="name"
                    placeholder="Full Name (Arabic)*"
                    value={form.name}
                    onChange={handleChange}
                    disabled={loading}
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email*"
                    value={form.email}
                    onChange={handleChange}
                    disabled={loading}
                />
                <input
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    disabled={loading}
                />
                <input
                    name="dr_Code"
                    placeholder="Doctor Code "
                    value={form.dr_Code}
                    onChange={handleChange}
                    disabled={loading}
                />
                <input
                    name="dr_NameEn"
                    placeholder="Full Name (English)*"
                    value={form.dr_NameEn}
                    onChange={handleChange}
                    disabled={loading}
                />
                <input
                    name="dr_Image"
                    placeholder="Doctor Image URL "
                    value={form.dr_Image}
                    onChange={handleChange}
                    disabled={loading}
                />
                {/* حقول Department و FacultyId لو لسه موجودين في الـ DTO بتاعك */}
                <input
                    name="department"
                    placeholder="Department"
                    value={form.department}
                    onChange={handleChange}
                    disabled={loading}
                />
                <input
                    name="facultyId"
                    placeholder="Faculty ID"
                    value={form.facultyId}
                    onChange={handleChange}
                    disabled={loading}
                />

                {editingDoctorId !== null ? (
                    <>
                        <button className="action-button" onClick={handleAddOrUpdate} disabled={loading}>
                            <FaSave /> {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button className="action-button cancel-button" onClick={handleCancelEdit} disabled={loading}>
                            <FaTimes /> Cancel
                        </button>
                    </>
                ) : (
                    <button className="action-button" onClick={handleAddOrUpdate} disabled={loading}>
                        <FaPlus /> {loading ? 'Adding...' : 'Add Doctor'}
                    </button>
                )}
            </div>

            <div className="data-table-container">
                {loading && !doctors.length ? (
                    <p className="loading-message">Loading doctors...</p>
                ) : doctors.length === 0 ? (
                    <p className="no-data-message">No doctors added yet.</p>
                ) : (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Name (AR)</th>
                                <th>Name (EN)</th>
                                <th>Code</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Image URL</th>
                                <th>Department</th>
                                <th>Faculty ID</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors.map((doc) => (
                                <tr key={doc.id}>
                                    <td>{doc.dr_NameAr}</td>   {/* <--- تم التعديل ليطابق camelCase */}
                                    <td>{doc.dr_NameEn}</td>   {/* <--- تم التعديل ليطابق camelCase */}
                                    <td>{doc.dr_Code || 'N/A'}</td>      {/* <--- تم التعديل ليطابق camelCase */}
                                    <td>{doc.dr_Email}</td>    {/* <--- تم التعديل ليطابق camelCase */}
                                    <td>{doc.phone}</td>       {/* <--- تم التعديل ليطابق camelCase */}
                                    <td>
                                        {doc.dr_Image ? ( // عرض الصورة لو موجودة كرابط، وإلا N/A
                                            <a href={doc.dr_Image} target="_blank" rel="noopener noreferrer">View Image</a>
                                        ) : (
                                            'N/A'
                                        )}
                                    </td>
                                    <td>{doc.department || 'N/A'}</td> {/* <--- تم التعديل ليطابق camelCase (إذا كانت هكذا) */}
                                    <td>{doc.facultyId || 'N/A'}</td>   {/* <--- تم التعديل ليطابق camelCase (إذا كانت هكذا) */}
                                    <td>
                                        <button
                                            className="table-action-btn"
                                            onClick={() => handleEdit(doc)}
                                            disabled={loading}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="table-action-btn"
                                            onClick={() => handleDelete(doc.id)}
                                            disabled={loading}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default DefineDoctorTab;