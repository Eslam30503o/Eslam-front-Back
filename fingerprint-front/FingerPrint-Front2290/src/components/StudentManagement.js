import React, { useState, useEffect } from 'react';

function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [studentNameAr, setStudentNameAr] = useState("");
  const [studentNameEn, setStudentNameEn] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [studentImage, setStudentImage] = useState(""); // هذا سيحتوي على الـ URL الكامل للصورة
  const [studentPhone, setStudentPhone] = useState("");

  const [selectedFacultyId, setSelectedFacultyId] = useState(null);
  const [selectedFacultyYearId, setSelectedFacultyYearId] = useState(null);
  const [selectedFacultyYearSemisterId, setSelectedFacultyYearSemisterId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);

  const [faculties, setFaculties] = useState([]);
  const [facultyYears, setFacultyYears] = useState([]);
  const [facultyYearSemisters, setFacultyYearSemisters] = useState([]);

  const [filteredFacultyYears, setFilteredFacultyYears] = useState([]);
  const [filteredFacultyYearSemisters, setFilteredFacultyYearSemisters] = useState([]);

  const BASE_URL = 'https://192.168.1.12:7069'; 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const studentsResponse = await fetch(`${BASE_URL}/api/Studets/GetAllStudets`);
        if (!studentsResponse.ok) {
          throw new Error(`HTTP error! status: ${studentsResponse.status} for students. Response: ${await studentsResponse.text()}`);
        }
        const studentsData = await studentsResponse.json();
        console.log("Fetched students data:", studentsData);
        setStudents(studentsData);

        const facultiesResponse = await fetch(`${BASE_URL}/api/Faculty/GetAllFaculty`);
        if (facultiesResponse.ok) {
          const facultiesData = await facultiesResponse.json();
          console.log("Fetched faculties data:", facultiesData);
          setFaculties(facultiesData);
        } else {
          console.warn(`Failed to fetch faculties (Status: ${facultiesResponse.status}). Using dummy data.`);
          setFaculties([
            { id: 1, fac_Name: "Engineering" },
            { id: 2, fac_Name: "Medicine" },
            { id: 3, fac_Name: "Arts" }
          ]);
        }

        const facultyYearsResponse = await fetch(`${BASE_URL}/api/FacultyYear/GetAllFacultyYear`);
        if (facultyYearsResponse.ok) {
          const facultyYearsData = await facultyYearsResponse.json();
          console.log("Fetched faculty years data:", facultyYearsData);
          setFacultyYears(facultyYearsData);
        } else {
          console.warn(`Failed to fetch faculty years (Status: ${facultyYearsResponse.status}). Using dummy data.`);
          setFacultyYears([
            { id: 1, year: "2023-2024", facultyId: 1, faculty: "Engineering" },
            { id: 2, year: "2024-2025", facultyId: 1, faculty: "Engineering" },
            { id: 3, year: "2023-2024", facultyId: 2, faculty: "Medicine" },
          ]);
        }

        const facultyYearSemistersResponse = await fetch(`${BASE_URL}/api/FacultyYearSemister/GetAllSemisters`);
        if (facultyYearSemistersResponse.ok) {
          const facultyYearSemistersData = await facultyYearSemistersResponse.json();
          console.log("Fetched faculty year semisters data:", facultyYearSemistersData);
          setFacultyYearSemisters(facultyYearSemistersData);
        } else {
          console.warn(`Failed to fetch faculty year semisters (Status: ${facultyYearSemistersResponse.status}). Using dummy data.`);
          setFacultyYearSemisters([
            { id: 101, sem_Code: "F23", sem_Name: "Fall 2023", facultyYearId: 1, facultyYear: "2023-2024" },
            { id: 102, sem_Code: "S24", sem_Name: "Spring 2024", facultyYearId: 1, facultyYear: "2023-2024" },
            { id: 103, sem_Code: "Su24", sem_Name: "Summer 2024", facultyYearId: 1, facultyYear: "2023-2024" },
            { id: 104, sem_Code: "F24", sem_Name: "Fall 2024", facultyYearId: 2, facultyYear: "2024-2025" },
          ]);
        }

      } catch (err) {
        console.error("Error fetching data:", err);
        setError(`Failed to load data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedFacultyId) {
      setFilteredFacultyYears(
        facultyYears.filter(fy => fy.facultyId === parseInt(selectedFacultyId))
      );
    } else {
      setFilteredFacultyYears([]);
    }
    setSelectedFacultyYearId(null);
    setSelectedFacultyYearSemisterId(null);
  }, [selectedFacultyId, facultyYears]);

  useEffect(() => {
    if (selectedFacultyYearId) {
      setFilteredFacultyYearSemisters(
        facultyYearSemisters.filter(fys => fys.facultyYearId === parseInt(selectedFacultyYearId))
      );
    } else {
      setFilteredFacultyYearSemisters([]); 
    }
    setSelectedFacultyYearSemisterId(null);
  }, [selectedFacultyYearId, facultyYearSemisters]);


  const getFacultyNameById = (id) => {
    const faculty = faculties.find(f => f.id === parseInt(id));
    return faculty ? faculty.fac_Name : "";
  };

  const getFacultyYearStringById = (id) => {
    const fy = facultyYears.find(f => f.id === parseInt(id));
    return fy ? fy.year : "";
  };

  const getFacultyYearSemisterStringById = (id) => {
    const fys = facultyYearSemisters.find(s => s.id === parseInt(id));
    return fys ? fys.sem_Name : "";
  };


  const addOrUpdateStudent = async () => {
    if (
      !studentNameAr ||
      !studentEmail ||
      !studentCode ||
      !studentNameEn ||
      !studentImage ||
      !studentPhone ||
      selectedFacultyId === null || parseInt(selectedFacultyId) <= 0 ||
      selectedFacultyYearSemisterId === null || parseInt(selectedFacultyYearSemisterId) <= 0
    ) {
      setError("Please fill in all required fields correctly (Faculty, Academic Year, Semester, and Image URL).");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const imageToSend = studentImage.startsWith(BASE_URL)
        ? studentImage.substring(BASE_URL.length)
        : studentImage;

      const studentData = {
        ID: editingStudent ? editingStudent.id : 0,
        st_NameAr: studentNameAr,
        st_Email: studentEmail,
        st_Code: studentCode,
        st_NameEn: studentNameEn,
        st_Image: imageToSend, 
        phone: studentPhone,
        fac_ID: parseInt(selectedFacultyId),
        Faculty: getFacultyNameById(selectedFacultyId),
        facYearSem_ID: parseInt(selectedFacultyYearSemisterId),
        FacultyYearSemister: getFacultyYearSemisterStringById(selectedFacultyYearSemisterId),
      };

      console.log("Sending student data:", studentData);

      const response = await fetch(`${BASE_URL}/api/Studets/Add_OR_UpdateStudent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        let errorMessage = "Unknown error occurred.";
        if (errorBody && errorBody.errors) {
            errorMessage = Object.values(errorBody.errors).flat().join(", ");
        } else if (errorBody && errorBody.message) {
            errorMessage = errorBody.message;
        } else if (response.statusText) {
            errorMessage = response.statusText;
        }
        throw new Error(`HTTP error! Status: ${response.status} - ${errorMessage}`);
      }

      const returnedStudent = await response.json();
      console.log("Received student data after save:", returnedStudent);

      const finalImageUrlForDisplay = returnedStudent.st_Image
        ? (returnedStudent.st_Image.startsWith('http') || returnedStudent.st_Image.startsWith('https') ? returnedStudent.st_Image : `${BASE_URL}${returnedStudent.st_Image}`)
        : "";

      const studentWithFullImageUrl = {
          ...returnedStudent,
          st_Image: finalImageUrlForDisplay
      };

      if (editingStudent) {
        setStudents(students.map(s =>
          s.id === studentWithFullImageUrl.id ? studentWithFullImageUrl : s
        ));
      } else {
        setStudents([...students, studentWithFullImageUrl]);
      }

      setStudentNameAr("");
      setStudentNameEn("");
      setStudentEmail("");
      setStudentCode("");
      setStudentImage("");
      setStudentPhone("");
      setSelectedFacultyId(null);
      setSelectedFacultyYearId(null);
      setSelectedFacultyYearSemisterId(null);
      setEditingStudent(null);
      setError(null);
    } catch (err) {
      console.error("Error adding/updating student:", err);
      setError(`Failed to save student: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (student) => {
    setStudentNameAr(student.st_NameAr || "");
    setStudentNameEn(student.st_NameEn || "");
    setStudentEmail(student.st_Email || "");
    setStudentCode(student.st_Code || "");
    setStudentImage(student.st_Image || ""); 

    setStudentPhone(student.phone || "");

    setSelectedFacultyId(student.fac_ID != null ? String(student.fac_ID) : null);
    
    if (student.facYearSem_ID) {
      const selectedSemister = facultyYearSemisters.find(s => s.id === student.facYearSem_ID);
      if (selectedSemister) {
        setSelectedFacultyYearSemisterId(String(selectedSemister.id));
        const selectedYear = facultyYears.find(fy => fy.id === selectedSemister.facultyYearId);
        if (selectedYear) {
          setSelectedFacultyYearId(String(selectedYear.id));
        }
      }
    } else {
        setSelectedFacultyYearSemisterId(null);
        setSelectedFacultyYearId(null);
    }

    setEditingStudent(student);
  };

  const clearForm = () => {
    setStudentNameAr("");
    setStudentNameEn("");
    setStudentEmail("");
    setStudentCode("");
    setStudentImage("");
    setStudentPhone("");
    setSelectedFacultyId(null);
    setSelectedFacultyYearId(null);
    setSelectedFacultyYearSemisterId(null);
    setEditingStudent(null);
    setError(null);
  };

  console.log("Render Cycle - Loading:", loading, "Error:", error, "Students Count:", students.length);

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <h3>Student Management</h3>
      </div>

      <div
        className="form-row"
        style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}
      >
        {/* 1. الاسم بالإنجليزية (Student Name (English)) */}
        <input
          className="course-input"
          placeholder="Student Name (English)"
          value={studentNameEn}
          onChange={(e) => setStudentNameEn(e.target.value)}
        />
        {/* 2. الاسم بالعربي (Student Name (Arabic)) */}
        <input
          className="course-input"
          placeholder="Student Name (Arabic)"
          value={studentNameAr}
          onChange={(e) => setStudentNameAr(e.target.value)}
        />
        {/* 3. البريد الإلكتروني (Student Email) */}
        <input
          className="course-input"
          placeholder="Student Email"
          value={studentEmail}
          onChange={(e) => setStudentEmail(e.target.value)}
        />
        {/* 4. كود الطالب (Student Code) */}
        <input
          className="course-input"
          placeholder="Student Code"
          value={studentCode}
          onChange={(e) => setStudentCode(e.target.value)}
        />
        {/* 5. رقم الهاتف (Phone Number) */}
        <input
          className="course-input"
          placeholder="Phone Number"
          value={studentPhone}
          onChange={(e) => setStudentPhone(e.target.value)}
        />
        {/* 6. مسار الصورة (Student Image URL) */}
        <input
          className="course-input"
          placeholder="Student Image "
          value={studentImage}
          onChange={(e) => setStudentImage(e.target.value)}
        />

        {/* 7. اختيار الكلية (Select Faculty) */}
        <select
          className="course-input"
          value={selectedFacultyId === null ? "" : selectedFacultyId}
          onChange={(e) => {
            const id = e.target.value === "" ? null : e.target.value;
            setSelectedFacultyId(id);
          }}
        >
          <option value="">Select Faculty</option>
          {faculties.map((faculty) => (
            <option key={faculty.id} value={String(faculty.id)}>
              {faculty.fac_Name}
            </option>
          ))}
        </select>

        {/* 8. اختيار السنة الأكاديمية (Select Academic Year) */}
        <select
          className="course-input"
          value={selectedFacultyYearId === null ? "" : selectedFacultyYearId}
          onChange={(e) => {
            const id = e.target.value === "" ? null : e.target.value;
            setSelectedFacultyYearId(id);
          }}
          disabled={!selectedFacultyId}
        >
          <option value=""> Academic Year</option>
          {filteredFacultyYears.map((fy) => (
            <option key={fy.id} value={String(fy.id)}>
              {fy.year}
            </option>
          ))}
        </select>

        {/* 9. اختيار الفصل الدراسي (Select Semester) */}
        <select
          className="course-input"
          value={selectedFacultyYearSemisterId === null ? "" : selectedFacultyYearSemisterId}
          onChange={(e) => {
            const id = e.target.value === "" ? null : e.target.value;
            setSelectedFacultyYearSemisterId(id);
          }}
          disabled={!selectedFacultyYearId}
        >
          <option value=""> Semester</option>
          {filteredFacultyYearSemisters.map((fys) => (
            <option key={fys.id} value={String(fys.id)}>
              {fys.sem_Name}
            </option>
          ))}
        </select>

        <button
          className="action-button"
          onClick={addOrUpdateStudent}
          disabled={
            !studentNameAr || !studentEmail || !studentCode || !studentNameEn || !studentImage || !studentPhone ||
            selectedFacultyId === null || parseInt(selectedFacultyId) <= 0 ||
            selectedFacultyYearSemisterId === null || parseInt(selectedFacultyYearSemisterId) <= 0 ||
            loading
          }
        >
          {loading ? "Saving..." : (editingStudent ? "Update Student" : "Add Student")}
        </button>
        {editingStudent && (
          <button className="action-button" onClick={clearForm}>
            Cancel Edit
          </button>
        )}
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && !error && <p>Loading students...</p>}

      <div className="data-table-container">
        <table
          className="data-table"
          style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
        >
          <thead style={{ background: "#f5f5f5" }}>
            <tr>
              {/* رؤوس الأعمدة بنفس الترتيب الجديد */}
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #ccc" }}>Name (En)</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #ccc" }}>Name (Ar)</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #ccc" }}>Email</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #ccc" }}>Code</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #ccc" }}>Phone</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #ccc" }}>Image URL</th> 
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #ccc" }}>Faculty</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #ccc" }}>Academic Year</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #ccc" }}>Semester</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #ccc" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 && !loading && !error ? (
              <tr>
                <td colSpan="10" style={{ padding: "12px", textAlign: "center" }}>No students found.</td>
              </tr>
            ) : (
              !loading && !error && students.map((s) => (
                <tr key={s.id || s.st_Email || Math.random()}>
                  {/* خلايا البيانات بنفس الترتيب الجديد */}
                  <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>{s.st_NameEn}</td>
                  <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>{s.st_NameAr}</td>
                  <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>{s.st_Email}</td>
                  <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>{s.st_Code}</td>
                  <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>{s.phone}</td>
                  <td style={{ padding: "12px", borderBottom: "1px solid #eee", wordBreak: "break-all", maxWidth: "200px" }}>
                    {s.st_Image} 
                  </td>
                  <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>{s.faculty}</td>
                  <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>
                      {s.facYearSem_ID ? getFacultyYearStringById(
                          (facultyYearSemisters.find(fys => fys.id === s.facYearSem_ID) || {}).facultyYearId
                      ) : ""}
                  </td>
                  <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>
                      {s.facYearSem_ID ? getFacultyYearSemisterStringById(s.facYearSem_ID) : ""}
                  </td>
                  <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>
                    <button className="action-button" onClick={() => startEditing(s)}>Edit</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentManagement;