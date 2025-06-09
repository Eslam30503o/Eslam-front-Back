"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import * as Components from "./Components"
import { FaUserGraduate, FaChalkboardTeacher, FaLock, FaUserShield, FaGlobe } from "react-icons/fa"
import { useLanguage } from "./contexts/LanguageContext"

const users = [
  { email: "doctor@example.com", password: "doctor123", role: "Doctor" },
  {
    email: "student@example.com",
    password: "student123",
    role: "Student",
    name: "David Rezaik",
    department: "Computer Science",
    year: "4th Year",
  },
  { email: "admin@example.com", password: "admin123", role: "Admin" },
]

function LoginForm() {
  const navigate = useNavigate()
  const { language, toggleLanguage, t } = useLanguage()
  const [signIn, setSignIn] = useState("student")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Force LTR for login page
    document.body.classList.remove("rtl")
    document.body.dir = "ltr"
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    setTimeout(() => {
      const user = users.find((u) => u.email === email && u.password === password)
      if (user) {
        localStorage.setItem("user", JSON.stringify(user))
        if (user.role === "Doctor") navigate("/doctor-dashboard")
        else if (user.role === "Student") navigate("/student-dashboard")
        else if (user.role === "Admin") navigate("/admin-dashboard")
      } else {
        setError(t("Invalid credentials. Please try again."))
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="login-page">
      <Components.GlobalStyle />

      <div className="language-toggle">
        <button className="language-btn" onClick={toggleLanguage}>
          <FaGlobe style={{ marginInlineEnd: 8 }} />
          {language === "english" ? "العربية" : "English"}
        </button>
      </div>

      <div className="university-logo">
        <h1>{t("Akhbar El-Youm Academy")}</h1>
      </div>

      <Components.Container>
        <Components.SignUpContainer signinIn={signIn === "doctor"}>
          <Components.Form onSubmit={handleSubmit}>
            <Components.Title>{t("Doctor Login")}</Components.Title>
            <Components.InputGroup>
              <Components.InputIcon><FaChalkboardTeacher /></Components.InputIcon>
              <Components.Input type="email" placeholder={t("Email")} value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Components.InputGroup>
            <Components.InputGroup>
              <Components.InputIcon><FaLock /></Components.InputIcon>
              <Components.Input type="password" placeholder={t("Password")} value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Components.InputGroup>
            {error && <Components.ErrorMessage>{error}</Components.ErrorMessage>}
            <Components.Button disabled={loading}>{loading ? t("Signing In...") : t("Sign In")}</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={signIn === "student"}>
          <Components.Form onSubmit={handleSubmit}>
            <Components.Title>{t("Student Login")}</Components.Title>
            <Components.InputGroup>
              <Components.InputIcon><FaUserGraduate /></Components.InputIcon>
              <Components.Input type="email" placeholder={t("Email")} value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Components.InputGroup>
            <Components.InputGroup>
              <Components.InputIcon><FaLock /></Components.InputIcon>
              <Components.Input type="password" placeholder={t("Password")} value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Components.InputGroup>
            {error && <Components.ErrorMessage>{error}</Components.ErrorMessage>}
            <Components.Button disabled={loading}>{loading ? t("Signing In...") : t("Sign In")}</Components.Button>
          </Components.Form>
        </Components.SignInContainer>

        <Components.SignUpContainer signinIn={signIn === "admin"}>
          <Components.Form onSubmit={handleSubmit}>
            <Components.Title>{t("Admin Login")}</Components.Title>
            <Components.InputGroup>
              <Components.InputIcon><FaUserShield /></Components.InputIcon>
              <Components.Input type="email" placeholder={t("Email")} value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Components.InputGroup>
            <Components.InputGroup>
              <Components.InputIcon><FaLock /></Components.InputIcon>
              <Components.Input type="password" placeholder={t("Password")} value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Components.InputGroup>
            {error && <Components.ErrorMessage>{error}</Components.ErrorMessage>}
            <Components.Button disabled={loading}>{loading ? t("Signing In...") : t("Sign In")}</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>
            <Components.LeftOverlayPanel signinIn={signIn}>
              <Components.Title inOverlay>{t("Welcome to Akhbar El-Youm")}</Components.Title>
              <Components.Paragraph>{t("Switch to another role")}</Components.Paragraph>
              <Components.GhostButton onClick={() => setSignIn("student")}>{t("Student")}</Components.GhostButton>
              <Components.GhostButton onClick={() => setSignIn("doctor")}>{t("Doctor")}</Components.GhostButton>
              <Components.GhostButton onClick={() => setSignIn("admin")}>{t("Admin")}</Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signinIn={signIn}>
              <Components.Title inOverlay>{t("Welcome to Akhbar El-Youm")}</Components.Title>
              <Components.Paragraph>{t("Sign in with your credentials")}</Components.Paragraph>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>

      <div className="login-footer">
        <p>
          © 2025 {t("Akhbar El-Youm Academy")}. {t("All rights reserved")}.
        </p>
      </div>
    </div>
  )
}

export default LoginForm