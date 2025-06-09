import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import "../dashboard.css";

const daysOfWeek = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
const years = ["1", "2", "3", "4"];

function ManageSchedule() {
  const [selectedYear, setSelectedYear] = useState("1");
  const [schedule, setSchedule] = useState([]);
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ day: "Saturday", course: "", doctor: "", from: "", to: "" });

  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    const savedSchedule = JSON.parse(localStorage.getItem("schedule")) || [];
    setCourses(savedCourses);
    setSchedule(savedSchedule);
  }, []);

  useEffect(() => {
    localStorage.setItem("schedule", JSON.stringify(schedule));
  }, [schedule]);

  const handleAdd = () => {
    if (!form.course || !form.doctor || !form.from || !form.to) return alert("All fields required");
    const newEntry = { ...form, year: selectedYear };
    setSchedule([...schedule, newEntry]);
    setForm({ day: "Saturday", course: "", doctor: "", from: "", to: "" });
  };

  const filteredSchedule = schedule.filter((s) => s.year === selectedYear);

  return (
    <div className="section-layout">
      <div className="section-header">
        <h1>Manage Schedule</h1>
        <p className="subtitle">Set course times for each year and day</p>
      </div>

      <div className="form-grid">
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          {years.map((y) => (
            <option key={y} value={y}>Year {y}</option>
          ))}
        </select>

        <select name="day" value={form.day} onChange={(e) => setForm({ ...form, day: e.target.value })}>
          {daysOfWeek.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <select value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })}>
          <option value="" disabled>Select Course</option>
          {courses.map((c, i) => (
            <option key={i} value={c.name}>{c.name}</option>
          ))}
        </select>

        <select value={form.doctor} onChange={(e) => setForm({ ...form, doctor: e.target.value })}>
          <option value="" disabled>Select Doctor</option>
          {courses
            .filter((c) => c.name === form.course)
            .map((c, i) => (
              <option key={i} value={c.doctorEmail}>{c.doctorEmail}</option>
            ))}
        </select>

        <input
          type="time"
          value={form.from}
          onChange={(e) => setForm({ ...form, from: e.target.value })}
          placeholder="From"
        />
        <input
          type="time"
          value={form.to}
          onChange={(e) => setForm({ ...form, to: e.target.value })}
          placeholder="To"
        />

        <button className="action-button" onClick={handleAdd}>
          <FaPlus /> Add to Schedule
        </button>
      </div>

      <div className="data-table-container">
        {daysOfWeek.map((day) => (
          <div key={day} className="day-block">
            <h3>{day}</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Doctor</th>
                  <th>From</th>
                  <th>To</th>
                </tr>
              </thead>
              <tbody>
                {filteredSchedule.filter((s) => s.day === day).map((s, i) => (
                  <tr key={i}>
                    <td>{s.course}</td>
                    <td>{s.doctor}</td>
                    <td>{s.from}</td>
                    <td>{s.to}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageSchedule;
