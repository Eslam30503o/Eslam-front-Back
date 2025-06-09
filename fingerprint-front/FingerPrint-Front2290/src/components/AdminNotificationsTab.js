import React, { useState, useEffect } from "react";
import "../dashboard.css";

function AdminNotificationTab() {
  const [notifications, setNotifications] = useState([]);
  const [form, setForm] = useState({
    title: "",
    message: "",
    year: "",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  const handleSend = () => {
    if (!form.title.trim() || !form.message.trim() || !form.year) {
      alert("Please fill all fields.");
      return;
    }

    const newNotification = {
      ...form,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      target: "students",
    };

    setNotifications([newNotification, ...notifications]);
    setForm({ title: "", message: "", year: "" });
  };

  return (
<div className="dashboard-card">
  <div className="card-header">
    <h3>Send Notification to Students</h3>
    <p className="subtitle">Send announcements to students based on academic year</p>
  </div>

  <div className="form-grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
    <div className="form-group">
      <label>Title</label>
      <input
        type="text"
        placeholder="Enter notification title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
    </div>

    <div className="form-group">
      <label>Academic Year</label>
      <select
        value={form.year}
        onChange={(e) => setForm({ ...form, year: e.target.value })}
      >
        <option value="" disabled hidden>Select Year</option>
        <option value="1">1st Year</option>
        <option value="2">2nd Year</option>
        <option value="3">3rd Year</option>
        <option value="4">4th Year</option>
      </select>
    </div>
  </div>

  <div className="form-group" style={{ marginTop: "20px" }}>
    <label>Message</label>
    <textarea
      rows="4"
      placeholder="Write your message"
      value={form.message}
      onChange={(e) => setForm({ ...form, message: e.target.value })}
    />
  </div>

  <button className="action-button" onClick={handleSend}>
    Send Notification
  </button>

  <h3 style={{ marginTop: "30px" }}>Sent Notifications</h3>
  <ul className="notification-list">
    {notifications.map((n) => (
      <li key={n.id}>
        <strong>{n.title}</strong> ({n.year}st Year)<br />
        <span>{n.message}</span>
      </li>
    ))}
  </ul>
</div>


  );
}

export default AdminNotificationTab;
