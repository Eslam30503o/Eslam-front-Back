import React, { useState } from "react"

const ChangePasswordModal = ({ onClose }) => {
  const [inputs, setInputs] = useState({ oldPassword: "", newPassword: "" })

  const handleUpdate = () => {
    const savedPassword = localStorage.getItem("studentPassword") || "student123"
    if (inputs.oldPassword !== savedPassword) {
      alert("Old password is incorrect")
      return
    }

    localStorage.setItem("studentPassword", inputs.newPassword)
    setInputs({ oldPassword: "", newPassword: "" })
    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Change Password</h3>
        <input
          type="password"
          placeholder="Old Password"
          value={inputs.oldPassword}
          onChange={(e) => setInputs({ ...inputs, oldPassword: e.target.value })}
        />
        <input
          type="password"
          placeholder="New Password"
          value={inputs.newPassword}
          onChange={(e) => setInputs({ ...inputs, newPassword: e.target.value })}
        />
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleUpdate}>Update</button>
        </div>
      </div>
    </div>
  )
}

export default ChangePasswordModal
