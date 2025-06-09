import React, { useState } from 'react'
import { linkFingerprint } from '../services/adminService'

function FingerprintLinker() {
  const [email, setEmail] = useState("")
  const [fingerprintId, setFingerprintId] = useState("")

  const handleLink = async () => {
    await linkFingerprint(email, fingerprintId)
    alert(`Linked fingerprint ${fingerprintId} to ${email}`)
    setEmail("")
    setFingerprintId("")
  }

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <h3>Link Fingerprint to Student</h3>
      </div>

      <div className="form-row" style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
        <input
          className="course-input"
          placeholder="Student Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="course-input"
          placeholder="Fingerprint Device ID"
          value={fingerprintId}
          onChange={(e) => setFingerprintId(e.target.value)}
        />
        <button className="action-button" onClick={handleLink} disabled={!email || !fingerprintId}>
          Link Fingerprint
        </button>
      </div>
    </div>
  )
}

export default FingerprintLinker
