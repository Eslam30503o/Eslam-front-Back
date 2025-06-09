"use client"

import { useState, useEffect } from "react"
import { FaPlus } from "react-icons/fa"
import "../dashboard.css"
import { useLanguage } from "../contexts/LanguageContext"
import { showSuccess, showError } from "../utils/toast"

function CourseManagement() {
  const [courses, setCourses] = useState([])
  const [form, setForm] = useState({
    name: "",
    code: "",
    creditHours: "",
    semester: "",
    year: "",
    doctorEmail: "",
  })
  const [doctors, setDoctors] = useState([])
  const { t } = useLanguage()

  useEffect(() => {
    const savedDoctors = JSON.parse(localStorage.getItem("doctors")) || []
    setDoctors(savedDoctors)

    const savedCourses = JSON.parse(localStorage.getItem("courses")) || []
    setCourses(savedCourses)
  }, [])

  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses))
  }, [courses])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAdd = () => {
    if (!form.name?.trim()) {
      showError(t("Course name is required"))
      return
    }
    if (!form.code?.trim()) {
      showError(t("Course code is required"))
      return
    }
    if (!form.year) {
      showError(t("Year is required"))
      return
    }
    if (!form.semester) {
      showError(t("Semester is required"))
      return
    }

    if (courses.some((course) => course.code.toLowerCase() === form.code.toLowerCase())) {
      showError(t("Course code already exists"))
      return
    }

    const newCourse = {
      ...form,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: "Active",
    }

    setCourses([...courses, newCourse])
    setForm({ name: "", code: "", creditHours: "", semester: "", year: "", doctorEmail: "" })
    showSuccess(t("Course added successfully"))
  }

  return (
    <div className="section-layout">
      <div className="section-header">
        <h1>{t("Manage Courses")}</h1>
        <p className="subtitle">{t("Add and assign courses to doctors")}</p>
      </div>

      <div className="form-grid">
        <input name="name" placeholder={t("Course Name")} value={form.name} onChange={handleChange} />
        <input name="code" placeholder={t("Course Code")} value={form.code} onChange={handleChange} />
        <input name="creditHours" placeholder={t("Credit Hours")} value={form.creditHours} onChange={handleChange} />

        <select name="year" value={form.year} onChange={handleChange}>
          <option value="" disabled hidden>
            {t("Select Year")}
          </option>
          <option value="1">{t("1st Year")}</option>
          <option value="2">{t("2nd Year")}</option>
          <option value="3">{t("3rd Year")}</option>
          <option value="4">{t("4th Year")}</option>
        </select>

        <select name="semester" value={form.semester} onChange={handleChange}>
          <option value="" disabled hidden>
            {t("Select Semester")}
          </option>
          <option value="Semester 1">{t("Semester 1")}</option>
          <option value="Semester 2">{t("Semester 2")}</option>
        </select>

        <select name="doctorEmail" value={form.doctorEmail} onChange={handleChange}>
          <option value="" disabled hidden>
            {t("Assign Doctor")}
          </option>
          {doctors.map((doc, index) => (
            <option key={index} value={doc.email}>
              {doc.name} - {doc.department}
            </option>
          ))}
        </select>

        <button className="action-button" onClick={handleAdd}>
          <FaPlus /> {t("Add Course")}
        </button>
      </div>

      <div className="data-table-container">
        {courses.length === 0 ? (
          <p className="no-data-message">{t("No courses added yet.")}</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>{t("Name")}</th>
                <th>{t("Code")}</th>
                <th>{t("Credit Hours")}</th>
                <th>{t("Year")}</th>
                <th>{t("Semester")}</th>
                <th>{t("Assigned Doctor")}</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index}>
                  <td>{course.name}</td>
                  <td>{course.code}</td>
                  <td>{course.creditHours}</td>
                  <td>{course.year}</td>
                  <td>{course.semester}</td>
                  <td>{doctors.find((d) => d.email === course.doctorEmail)?.name || t("Not Assigned")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default CourseManagement
