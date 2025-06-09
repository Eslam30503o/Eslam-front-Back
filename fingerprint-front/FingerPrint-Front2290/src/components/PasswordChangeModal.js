"use client"

import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"

const ChangePasswordModal = ({ inputs, setInputs, onClose, onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")
  const [strength, setStrength] = useState("")

  const toggleVisibility = () => setShowPassword(!showPassword)

  const checkStrength = (password) => {
    if (password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password)) {
      return "Strong"
    } else if (password.length >= 6) {
      return "Medium"
    } else {
      return "Weak"
    }
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setInputs(prev => ({...prev, [name]: value}))
    
    if (name === "newPassword") {
      setStrength(checkStrength(value))
    }
  }

  const handleUpdate = () => {
    if (inputs.newPassword.length < 6) {
      setMessage("Password must be at least 6 characters long.")
      setMessageType("error")
      return
    }

    if (inputs.newPassword !== inputs.confirmPassword) {
      setMessage("Passwords do not match.")
      setMessageType("error")
      return
    }

    // Here you would typically call an API to update the password
    setMessage("Password updated successfully.")
    setMessageType("success")

    setTimeout(() => {
      onSuccess()
    }, 1500)
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Change Password</h3>

        <div className="input-with-icon">
          <input
            type={showPassword ? "text" : "password"}
            name="oldPassword"
            value={inputs.oldPassword}
            onChange={handlePasswordChange}
            placeholder="Old Password"
          />
        </div>

        <div className="input-with-icon">
          <input
            type={showPassword ? "text" : "password"}
            name="newPassword"
            value={inputs.newPassword}
            onChange={handlePasswordChange}
            placeholder="New Password"
          />
          <span onClick={toggleVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {inputs.newPassword && (
          <div className={`password-strength ${strength.toLowerCase()}`}>
            Strength: {strength}
          </div>
        )}

        <div className="input-with-icon">
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={inputs.confirmPassword}
            onChange={handlePasswordChange}
            placeholder="Confirm Password"
          />
        </div>

        {message && (
          <div className={`modal-message ${messageType}`}>{message}</div>
        )}

        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleUpdate}>Update</button>
        </div>
      </div>
    </div>
  )
}

export default ChangePasswordModal