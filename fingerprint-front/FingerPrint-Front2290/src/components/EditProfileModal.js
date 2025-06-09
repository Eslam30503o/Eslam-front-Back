import React from "react"

const EditProfileModal = ({ userProfile, setUserProfile, onClose }) => {
  const handleSave = () => {
    localStorage.setItem("studentProfile", JSON.stringify(userProfile))
    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Profile</h3>
 <input
  value={userProfile.name}
  onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
  placeholder="Full Name"
/>

        <input
          value={userProfile.email}
          onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
          placeholder="Email"
        />
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default EditProfileModal
