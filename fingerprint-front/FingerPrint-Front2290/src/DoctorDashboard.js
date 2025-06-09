"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import {
  FaUser,
  FaChartBar,
  FaBook,
  FaCalendarAlt,
  FaCog,
  FaBars,
  FaMoon,
  FaSun,
  FaChevronDown,
  FaGlobe,
  FaEdit,
  FaKey,
  FaSignOutAlt,
  FaSearch,
  FaHome,
  FaClipboardList,
  FaFileAlt,
  FaUsers,
} from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"
import {
  fetchDoctorProfile,
  fetchCourses,
  fetchSchedule,
  fetchAttendanceStats,
  fetchStudentsList,
} from "./services/doctorService"
import "./dashboard.css"
import { useLanguage } from "./contexts/LanguageContext" 
import EditProfileModal from "./components/EditProfileModal"
import ChangePasswordModal from "./components/ChangePasswordModal"


function DoctorDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [collapsed, setCollapsed] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  // const [language, setLanguage] = useState("english") // Removed local language state
  const { language, toggleLanguage } = useLanguage() // Use language context
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [selectedDay, setSelectedDay] = useState("All")
  const profileDropdownRef = useRef(null)

  // Doctor data states
  const [doctor, setDoctor] = useState({})
  const [courses, setCourses] = useState([])
  const [schedule, setSchedule] = useState([])
  const [attendanceStats, setAttendanceStats] = useState({})
  const [students, setStudents] = useState([])
  const [gradeDistribution, setGradeDistribution] = useState({})

  // Loading states
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [loadingCourses, setLoadingCourses] = useState(true)
  const [loadingSchedule, setLoadingSchedule] = useState(true)
  const [loadingAttendance, setLoadingAttendance] = useState(true)
  const [loadingStudents, setLoadingStudents] = useState(true)

const [showEditProfile, setShowEditProfile] = useState(false);
const [showChangePassword, setShowChangePassword] = useState(false);
const [userProfile, setUserProfile] = useState({
  name: " ", 
  email: ""
});
const [newPassword, setNewPassword] = useState("");



  useEffect(() => {
    const loadData = async () => {
      try {
        setLoadingProfile(true)
        setLoadingCourses(true)
        setLoadingSchedule(true)
        setLoadingAttendance(true)
        setLoadingStudents(true)

        const profile = await fetchDoctorProfile()
        const coursesData = await fetchCourses()
        const scheduleData = await fetchSchedule()
        const attendanceData = await fetchAttendanceStats()
        const studentsData = await fetchStudentsList()

        setDoctor(profile)
        setCourses(coursesData)
        setSchedule(scheduleData)
        setAttendanceStats(attendanceData)
        setStudents(studentsData)
        // Set default selected course
        if (coursesData.length > 0) {
          setSelectedCourse(coursesData[0].courseCode)
        }
      } catch (error) {
        console.error("Error loading doctor data:", error)
      } finally {
        setLoadingProfile(false)
        setLoadingCourses(false)
        setLoadingSchedule(false)
        setLoadingAttendance(false)
        setLoadingStudents(false)
      }
    }
    loadData()

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  
  const handleEditProfile = () => {
  setShowEditProfile(true)
};

const handleChangePassword = () => {
  setShowChangePassword(true)
};


  const handleExportList = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "ID,Name,Email,Department,Year,Attendance\n" +
      filteredStudents
        .map(
          (student) =>
            `${student.id},${student.name},${student.email},${student.department},${student.year},${student.attendance}%`,
        )
        .join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "students_list.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    alert("Student list exported successfully!")
  }

  const handleTakeAttendance = () => {
    if (!selectedCourse) {
      alert("Please select a course first.")
      return
    }
    alert(`Taking attendance for course: ${selectedCourse}\n\nThis would open the attendance interface.`)
  }

  
  const handleExportReport = () => {
    if (!selectedCourse) {
      alert("Please select a course first.")
      return
    }
    alert(`Exporting attendance report for course: ${selectedCourse}`)
  }

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      navigate("/")
    }
  }

  const toggleDarkMode = () => setDarkMode(!darkMode)

  // const toggleLanguage = () => {
  //   setLanguage(language === "english" ? "arabic" : "english")
  // }

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: <FaHome /> },
    { id: "profile", label: "Profile", icon: <FaUser /> },
    { id: "courses", label: "Courses", icon: <FaBook /> },
    { id: "students", label: "Students", icon: <FaUsers /> },
    { id: "attendance", label: "Attendance", icon: <FaClipboardList /> },
    { id: "schedule", label: "Schedule", icon: <FaCalendarAlt /> },
    { id: "settings", label: "Settings", icon: <FaCog /> },
  ]

  // Get breadcrumb title based on active tab
  const getBreadcrumbTitle = () => {
    const tab = tabs.find((t) => t.id === activeTab)
    return tab ? tab.label : ""
  }

  // Filter students based on search query
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Filter courses based on search query
  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Filter schedule based on selected day
  const filteredSchedule = selectedDay === "All" ? schedule : schedule.filter((item) => item.day === selectedDay)

  const t = {
    dashboard: language === "arabic" ? "لوحة التحكم" : "Dashboard",
    profile: language === "arabic" ? "الملف الشخصي" : "Profile",
    courses: language === "arabic" ? "المساقات" : "Courses",
    students: language === "arabic" ? "الطلاب" : "Students",
    attendance: language === "arabic" ? "الحضور" : "Attendance",
    schedule: language === "arabic" ? "الجدول" : "Schedule",
    settings: language === "arabic" ? "الإعدادات" : "Settings",
    home: language === "arabic" ? "الرئيسية" : "Home",
    activeCourses: language === "arabic" ? "المساقات النشطة" : "Active Courses",
    total: language === "arabic" ? "المجموع" : "Total",
    totalStudents: language === "arabic" ? "مجموع الطلاب" : "Total Students",
    acrossAllCourses: language === "arabic" ? "عبر جميع المساقات" : "Across all courses",
    averageAttendance: language === "arabic" ? "متوسط الحضور" : "Average Attendance",
    todaysClasses: language === "arabic" ? "دروس اليوم" : "Today's Classes",
    classesScheduledToday: language === "arabic" ? "الدروس المقررة اليوم" : "Classes scheduled today",
    todaysSchedule: language === "arabic" ? "جدول اليوم" : "Today's Schedule",
    viewAll: language === "arabic" ? "عرض الكل" : "View All",
    noClassesScheduledForToday: language === "arabic" ? "لا توجد دروس مقررة اليوم." : "No classes scheduled for today.",
    courseAttendanceOverview: language === "arabic" ? "نظرة عامة على حضور المساق" : "Course Attendance Overview",
    selectCourse: language === "arabic" ? "اختر مساق" : "Select Course",
    lastSession: language === "arabic" ? "الجلسة الأخيرة" : "Last Session",
    atRiskStudents: language === "arabic" ? "الطلاب المعرضون للخطر" : "At Risk Students",
    personalInformation: language === "arabic" ? "معلومات شخصية" : "Personal Information",
    fullName: language === "arabic" ? "الاسم الكامل" : "Full Name",
    emailAddress: language === "arabic" ? "عنوان البريد الإلكتروني" : "Email Address",
    facultyID: language === "arabic" ? "رقم الهوية" : "Faculty ID",
    phoneNumber: language === "arabic" ? "رقم الهاتف" : "Phone Number",
    notProvided: language === "arabic" ? "غير متوفر" : "Not provided",
    academicInformation: language === "arabic" ? "معلومات أكاديمية" : "Academic Information",
    department: language === "arabic" ? "القسم" : "Department",
    title: language === "arabic" ? "المنصب" : "Title",
    office: language === "arabic" ? "المكتب" : "Office",
    officeHours: language === "arabic" ? "ساعات العمل" : "Office Hours",
    teachingSummary: language === "arabic" ? "ملخص التدريس" : "Teaching Summary",
    teachingExperience: language === "arabic" ? "سنوات الخبرة في التدريس" : "Teaching Experience",
    years: language === "arabic" ? "سنوات" : "years",
    researchAreas: language === "arabic" ? "مجالات البحث" : "Research Areas",
    coursesTitle: language === "arabic" ? "المساقات" : "Courses",
    manageYourCourses:
      language === "arabic" ? "إدارة المساقات والمواد التعليمية" : "Manage your courses and teaching materials",
    allCourses: language === "arabic" ? "جميع المساقات" : "All Courses",
    active: language === "arabic" ? "نشط" : "Active",
    completed: language === "arabic" ? "مكتمل" : "Completed",
    upcoming: language === "arabic" ? "قادم" : "Upcoming",
    addNewCourse: language === "arabic" ? "إضافة مساق جديد" : "Add New Course",
    courseCode: language === "arabic" ? "رمز المساق" : "Course Code",
    creditHours: language === "arabic" ? "الساعات المعتمدة" : "Credit Hours",
    studentsCount: language === "arabic" ? "الطلاب" : "Students",
    averageAttendanceLabel: language === "arabic" ? "متوسط الحضور" : "Average Attendance",
    viewDetails: language === "arabic" ? "عرض التفاصيل" : "View Details",
    attendanceLabel: language === "arabic" ? "الحضور" : "Attendance",
    studentsTitle: language === "arabic" ? "الطلاب" : "Students",
    viewAndManageStudents: language === "arabic" ? "عرض وإدارة الطلاب" : "View and manage your students",
    allStudents: language === "arabic" ? "جميع الطلاب" : "All Students",
    allYears: language === "arabic" ? "جميع السنوات" : "All Years",
    year: language === "arabic" ? "السنة" : "Year",
    exportList: language === "arabic" ? "تصدير القائمة" : "Export List",
    noStudentsFound:
      language === "arabic"
        ? "لم يتم العثور على طلاب يطابقون معايير البحث الخاصة بك."
        : "No students found matching your search criteria.",
    id: language === "arabic" ? "المعرف" : "ID",
    name: language === "arabic" ? "الاسم" : "Name",
    email: language === "arabic" ? "البريد الإلكتروني" : "Email",
    actions: language === "arabic" ? "الإجراءات" : "Actions",
    attendanceManagement: language === "arabic" ? "إدارة الحضور" : "Attendance Management",
    trackAndManageAttendance: language === "arabic" ? "تتبع وإدارة حضور الطلاب" : "Track and manage student attendance",
    takeAttendance: language === "arabic" ? "تسجيل الحضور" : "Take Attendance",
    exportReport: language === "arabic" ? "تصدير التقرير" : "Export Report",
    date: language === "arabic" ? "التاريخ" : "Date",
    time: language === "arabic" ? "الوقت" : "Time",
    locationLabel: language === "arabic" ? "الموقع" : "Location",
    present: language === "arabic" ? "حاضر" : "Present",
    absent: language === "arabic" ? "غائب" : "Absent",
    percentage: language === "arabic" ? "النسبة" : "Percentage",
    noCourseSelectedMessage:
      language === "arabic" ? "الرجاء تحديد مساق لعرض بيانات الحضور" : "Please select a course to view attendance data",
    noCourseSelected: language === "arabic" ? "لم يتم اختيار مساق" : "No Course Selected",
    teachingSchedule: language === "arabic" ? "الجدول الدراسي" : "Teaching Schedule",
    manageYourSchedule:
      language === "arabic" ? "عرض وإدارة الجدول الدراسي الخاص بك" : "View and manage your teaching schedule",
    allDays: language === "arabic" ? "كل الأيام" : "All Days",
    sunday: language === "arabic" ? "الأحد" : "Sunday",
    monday: language === "arabic" ? "الاثنين" : "Monday",
    tuesday: language === "arabic" ? "الثلاثاء" : "Tuesday",
    wednesday: language === "arabic" ? "الأربعاء" : "Wednesday",
    thursday: language === "arabic" ? "الخميس" : "Thursday",
    friday: language === "arabic" ? "الجمعة" : "Friday",
    saturday: language === "arabic" ? "السبت" : "Saturday",
    noClassesScheduled: language === "arabic" ? "لا توجد دروس مقررة" : "No Classes Scheduled",
    youHaveNoClasses: language === "arabic" ? "ليس لديك دروس مقررة لـ" : "You have no classes scheduled for ",
    anyDay: language === "arabic" ? "أي يوم" : "any day",
    code: language === "arabic" ? "الرمز" : "Code",
    studentsLabel: language === "arabic" ? "الطلاب" : "Students",
    settingsTitle: language === "arabic" ? "الإعدادات" : "Settings",
    accountPreferences: language === "arabic" ? "إدارة تفضيلات حسابك" : "Manage your account preferences",
    accountSettings: language === "arabic" ? "إعدادات الحساب" : "Account Settings",
    profileInformation: language === "arabic" ? "معلومات الملف الشخصي" : "Profile Information",
    updateYourInformation: language === "arabic" ? "تحديث معلوماتك الشخصية" : "Update your personal information",
    edit: language === "arabic" ? "تعديل" : "Edit",
    changePassword: language === "arabic" ? "تغيير كلمة المرور" : "Change Password",
    updateYourPassword:
      language === "arabic" ? "تحديث كلمة مرورك بانتظام للأمان" : "Update your password regularly for security",
    change: language === "arabic" ? "تغيير" : "Change",
    twoFactorAuthentication: language === "arabic" ? "المصادقة الثنائية" : "Two-Factor Authentication",
    addExtraSecurity:
      language === "arabic"
        ? "إضافة طبقة إضافية من الأمان إلى حسابك"
        : "Add an extra layer of security to your account",
    appearance: language === "arabic" ? "المظهر" : "Appearance",
    darkModeLabel: language === "arabic" ? "الوضع الداكن" : "Dark Mode",
    switchBetweenThemes:
      language === "arabic" ? "التبديل بين السمات الفاتحة والداكنة" : "Switch between light and dark themes",
    languageLabel: language === "arabic" ? "اللغة" : "Language",
    chooseYourLanguage: language === "arabic" ? "اختر لغتك المفضلة" : "Choose your preferred language",
    english: language === "arabic" ? "الإنجليزية" : "English",
    arabic: language === "arabic" ? "العربية" : "العربية",
    emailNotifications: language === "arabic" ? "إشعارات البريد الإلكتروني" : "Email Notifications",
    smsNotifications: language === "arabic" ? "إشعارات الرسائل النصية" : "SMS Notifications",
    browserNotifications: language === "arabic" ? "إشعارات المتصفح" : "Browser Notifications",
    welcomeBack: language === "arabic" ? "مرحباً بعودتك" : "Welcome back",
    overviewOfTeaching:
      language === "arabic" ? "نظرة عامة على أنشطتك التدريسية" : "Here's an overview of your teaching activities",
  }

  return (
    <div className={`layout ${darkMode ? "dark-mode" : ""} ${language === "arabic" ? "rtl" : "ltr"}`}>
      <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-logo">🎓 Akhbar El-Youm</h2>
          <div className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
            <FaBars />
          </div>
        </div>

        <div className="sidebar-content">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className="tab-icon">{tab.icon}</div>
              {!collapsed && (
                <>
                  <span className="tab-label">{t[tab.id]}</span>
                  {tab.badge > 0 && <span className="tab-badge">{tab.badge}</span>}
                </>
              )}
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <div className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? <FaSun className="theme-icon" /> : <FaMoon className="theme-icon" />}
            {!collapsed && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
          </div>
        </div>
      </div>

      <div className="main">
        <header className="header">
          <div className="header-left">
          </div>

          <div className="header-right" ref={profileDropdownRef}>
            <div className="profile-dropdown" onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}>
              <div className="profile-info">
                <div className="profile-avatar">{doctor.name?.charAt(0) || "D"}</div>
                <span className="profile-name">{doctor.name}</span>
                <FaChevronDown className="dropdown-icon" />
              </div>

              {profileDropdownOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <div className="dropdown-avatar">{doctor.name?.charAt(0) || "D"}</div>
                    <div className="dropdown-user-info">
                      <h4>{doctor.name}</h4>
                      <p>{doctor.email}</p>
                    </div>
                  </div>

                  <div className="dropdown-divider"></div>

           <div className="dropdown-item" onClick={handleEditProfile}>
  <FaEdit className="dropdown-item-icon" />
  <span>{("Edit Profile")}</span>
</div>

<div className="dropdown-item" onClick={handleChangePassword}>
  <FaKey className="dropdown-item-icon" />
  <span>{("Change Password")}</span>
</div>


                  <div className="dropdown-item" onClick={toggleLanguage}>
                    <FaGlobe className="dropdown-item-icon" />
                    <span>{language === "english" ? t.arabic : t.english}</span>
                  </div>

                  <div className="dropdown-divider"></div>

                  <div className="dropdown-item logout" onClick={handleLogout}>
                    <FaSignOutAlt className="dropdown-item-icon" />
                    <span>Logout</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="content-wrapper">
          <div className="breadcrumb">
            <span className="breadcrumb-item">{t.home}</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-item active">{getBreadcrumbTitle()}</span>
          </div>

          <div className="content">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="tab-content"
              >
                {showEditProfile && (
  <EditProfileModal
    userProfile={userProfile}
    setUserProfile={setUserProfile}
    onClose={() => setShowEditProfile(false)}
  />
)}

{showChangePassword && (
  <ChangePasswordModal
    onClose={() => setShowChangePassword(false)}
  />
)}

                {activeTab === "dashboard" && (
                  <div className="dashboard-layout">
                    <div className="dashboard-header">
                      <h1>
                        {t.welcomeBack}, {doctor.name}
                      </h1>
                      <p className="subtitle">{t.overviewOfTeaching}</p>
                    </div>

                    <div className="dashboard-stats">
                      <div className="stat-card">
                        <div className="stat-icon courses">
                          <FaBook />
                        </div>
                        <div className="stat-info">
                          <h3>{t.activeCourses}</h3>
                          <div className="stat-value">{courses.filter((c) => c.status === "Active").length}</div>
                          <div className="stat-detail">
                            <span>
                              {t.total}: {courses.length} {t.coursesTitle}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="stat-card">
                        <div className="stat-icon attendance">
                          <FaUsers />
                        </div>
                        <div className="stat-info">
                          <h3>{t.totalStudents}</h3>
                          <div className="stat-value">{students.length}</div>
                          <div className="stat-detail">
                            <span>{t.acrossAllCourses}</span>
                          </div>
                        </div>
                      </div>

                      <div className="stat-card">
                        <div className="stat-icon gpa">
                          <FaChartBar />
                        </div>
                        <div className="stat-info">
                          <h3>{t.averageAttendance}</h3>
                          <div className="stat-value">{attendanceStats.averageAttendance}%</div>
                          <div className="stat-detail">
                            <span>{t.acrossAllCourses}</span>
                          </div>
                        </div>
                      </div>

                      <div className="stat-card">
                        <div className="stat-icon fingerprint">
                          <FaCalendarAlt />
                        </div>
                        <div className="stat-info">
                          <h3>{t.todaysClasses}</h3>
                          <div className="stat-value">
                            {
                              schedule.filter((s) => {
                                const today = new Date().toLocaleDateString("en-US", { weekday: "long" })
                                return s.day === today
                              }).length
                            }
                          </div>
                          <div className="stat-detail">
                            <span>{t.classesScheduledToday}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="dashboard-row">
                      <div className="dashboard-col">
                        <div className="dashboard-card">
                          <div className="card-header">
                            <h3>{t.todaysSchedule}</h3>
                            <button className="view-all-btn" onClick={() => setActiveTab("schedule")}>
                              {t.viewAll}
                            </button>
                          </div>

                          <div className="schedule-list">
                            {(() => {
                              const today = new Date().toLocaleDateString("en-US", { weekday: "long" })
                              const todaySessions = schedule.filter((session) => session.day === today)

                              if (todaySessions.length === 0) {
                                return <p className="no-data">{t.noClassesScheduledForToday}</p>
                              }

                              return todaySessions.map((session, index) => (
                                <div key={index} className="schedule-item">
                                  <div className="schedule-time">{session.startTime}</div>
                                  <div className="schedule-details">
                                    <h4>{session.courseName}</h4>
                                    <p>
                                      {session.location} • {session.duration}
                                    </p>
                                  </div>
                                </div>
                              ))
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="dashboard-card">
                      <div className="card-header">
                        <h3>{t.courseAttendanceOverview}</h3>
                        <select
                          className="course-select"
                          value={selectedCourse || ""}
                          onChange={(e) => setSelectedCourse(e.target.value)}
                        >
                          {courses.map((course) => (
                            <option key={course.courseCode} value={course.courseCode}>
                              {course.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="attendance-chart-container">
                        <div className="attendance-summary">
                          <div className="attendance-metric">
                            <h4>{t.averageAttendance}</h4>
                            <div className="metric-value">
                              {attendanceStats.courseStats?.find((c) => c.courseCode === selectedCourse)
                                ?.averageAttendance || 0}
                              %
                            </div>
                          </div>
                          <div className="attendance-metric">
                            <h4>{t.lastSession}</h4>
                            <div className="metric-value">
                              {attendanceStats.courseStats?.find((c) => c.courseCode === selectedCourse)
                                ?.lastSessionAttendance || 0}
                              %
                            </div>
                          </div>
                          <div className="attendance-metric">
                            <h4>{t.atRiskStudents}</h4>
                            <div className="metric-value">
                              {attendanceStats.courseStats?.find((c) => c.courseCode === selectedCourse)
                                ?.atRiskStudents || 0}
                            </div>
                          </div>
                        </div>

                        <div className="attendance-bars">
                          {attendanceStats.courseStats
                            ?.find((c) => c.courseCode === selectedCourse)
                            ?.sessions.map((session, index) => (
                              <div key={index} className="attendance-bar-container">
                                <div className="attendance-date">{session.date}</div>
                                <div className="attendance-bar-wrapper">
                                  <div
                                    className="attendance-bar"
                                    style={{ height: `${session.attendancePercentage}%` }}
                                  ></div>
                                </div>
                                <div className="attendance-percentage">{session.attendancePercentage}%</div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "profile" && (
                  <div className="profile-layout">
                    <div className="profile-header">
                      <div className="profile-avatar-large">{doctor.name?.charAt(0) || "D"}</div>
                      <div className="profile-header-info">
                        <h1>{doctor.name}</h1>
                        <p>
                          {doctor.title} • {doctor.department}
                        </p>
                      </div>
                      <button className="edit-profile-btn" onClick={handleEditProfile}>
                        <FaEdit /> {t.edit} {t.profile}
                      </button>
                    </div>

                    <div className="profile-content">
                      <div className="profile-section">
                        <h3>{t.personalInformation}</h3>
                        <div className="profile-info-grid">
                          <div className="profile-info-item">
                            <label>{t.fullName}</label>
                            <p>{doctor.name}</p>
                          </div>
                          <div className="profile-info-item">
                            <label>{t.emailAddress}</label>
                            <p>{doctor.email}</p>
                          </div>
                          <div className="profile-info-item">
                            <label>{t.facultyID}</label>
                            <p>{doctor.id}</p>
                          </div>
                          <div className="profile-info-item">
                            <label>{t.phoneNumber}</label>
                            <p>{doctor.phone || t.notProvided}</p>
                          </div>
                        </div>
                      </div>
                </div>
                  </div>
                )}

                {activeTab === "courses" && (
                  <div className="section-layout">
                    <div className="section-header">
                      <h1>{t.coursesTitle}</h1>
                      <p className="subtitle">{t.manageYourCourses}</p>
                    </div>

                    <div className="data-filters">
                      <div className="filter-group">
                        <select className="filter-select">
                          <option value="all">{t.allCourses}</option>
                          <option value="active">{t.active}</option>
                          <option value="completed">{t.completed}</option>
                          <option value="upcoming">{t.upcoming}</option>
                        </select>
                      </div>

                      <button className="action-button">
                        <FaBook /> {t.addNewCourse}
                      </button>
                    </div>

                    <div className="courses-grid">
                      {filteredCourses.map((course, index) => (
                        <div key={index} className={`course-card ${course.status.toLowerCase()}`}>
                          <div className="course-header">
                            <h3>{course.name}</h3>
                            <span className={`course-status ${course.status.toLowerCase()}`}>{course.status}</span>
                          </div>
                          <div className="course-details">
                            <div className="course-info">
                              <div className="course-info-item">
                                <label>{t.courseCode}</label>
                                <p>{course.courseCode}</p>
                              </div>
                              <div className="course-info-item">
                                <label>{t.creditHours}</label>
                                <p>{course.creditHours}</p>
                              </div>
                              <div className="course-info-item">
                                <label>{t.studentsCount}</label>
                                <p>{course.studentsCount}</p>
                              </div>
                              <div className="course-info-item">
                                <label>{t.averageAttendanceLabel}</label>
                                <p>{course.averageAttendance}%</p>
                              </div>
                            </div>
                          </div>
                          <div className="course-actions">
                            <button className="course-action-btn">{t.viewDetails}</button>
                            <button className="course-action-btn">{t.attendanceLabel}</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "students" && (
                  <div className="section-layout">
                    <div className="section-header">
                      <h1>{t.studentsTitle}</h1>
                      <p className="subtitle">{t.viewAndManageStudents}</p>
                    </div>
                    <div className="data-filters">
                      <div className="filter-group">
                        <select className="filter-select">
                          <option value="all">{t.allStudents}</option>
                          {courses.map((course) => (
                            <option key={course.courseCode} value={course.courseCode}>
                              {course.name}
                            </option>
                          ))}
                        </select>

                        <select className="filter-select">
                          <option value="all">{t.allYears}</option>
                          <option value="1">1st {t.year}</option>
                          <option value="2">2nd {t.year}</option>
                          <option value="3">3rd {t.year}</option>
                          <option value="4">4th {t.year}</option>
                        </select>
                      </div>

                      <button className="action-button" onClick={handleExportList}>
                        <FaFileAlt /> {t.exportList}
                      </button>
                    </div>

                    <div className="data-table-container">
                      {filteredStudents.length === 0 ? (
                        <div className="no-data-message">
                          <p>{t.noStudentsFound}</p>
                        </div>
                      ) : (
                        <table className="data-table">
                          <thead>
                            <tr>
                              <th>{t.id}</th>
                              <th>{t.name}</th>
                              <th>{t.email}</th>
                              <th>{t.department}</th>
                              <th>{t.year}</th>
                              <th>{t.attendanceLabel}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredStudents.map((student, index) => (
                              <tr key={index}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.department}</td>
                                <td>{student.year}</td>
                                <td>
                                  <span className={`status-badge ${student.attendance >= 75 ? "success" : "error"}`}>
                                    {student.attendance}%
                                  </span>
                                </td>

                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "attendance" && (
                  <div className="section-layout">
                    <div className="section-header">
                      <h1>{t.attendanceManagement}</h1>
                      <p className="subtitle">{t.trackAndManageAttendance}</p>
                    </div>

                    <div className="data-filters">
                      <div className="filter-group">
                        <select
                          className="filter-select"
                          value={selectedCourse || ""}
                          onChange={(e) => setSelectedCourse(e.target.value)}
                        >
                          <option value="">{t.selectCourse}</option>
                          {courses.map((course) => (
                            <option key={course.courseCode} value={course.courseCode}>
                              {course.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="action-buttons">
                        <button className="action-button" onClick={handleTakeAttendance}>
                          <FaClipboardList /> {t.takeAttendance}
                        </button>
                        <button className="action-button secondary" onClick={handleExportReport}>
                          <FaFileAlt /> {t.exportReport}
                        </button>
                      </div>
                    </div>

                    {selectedCourse ? (
                      <div className="attendance-container">
                        <div className="attendance-overview">
                          <div className="attendance-stat-card">
                            <h3>{t.averageAttendance}</h3>
                            <div className="attendance-stat-value">
                              {attendanceStats.courseStats?.find((c) => c.courseCode === selectedCourse)
                                ?.averageAttendance || 0}
                              %
                            </div>
                          </div>
                          <div className="attendance-stat-card">
                            <h3>{t.lastSession}</h3>
                            <div className="attendance-stat-value">
                              {attendanceStats.courseStats?.find((c) => c.courseCode === selectedCourse)
                                ?.lastSessionAttendance || 0}
                              %
                            </div>
                          </div>
                          <div className="attendance-stat-card">
                            <h3>{t.atRiskStudents}</h3>
                            <div className="attendance-stat-value">
                              {attendanceStats.courseStats?.find((c) => c.courseCode === selectedCourse)
                                ?.atRiskStudents || 0}
                            </div>
                          </div>
                        </div>

                        <div className="attendance-sessions">
                          <h3>
                            {t.attendanceLabel} {t.coursesTitle}
                          </h3>
                          <table className="data-table">
                            <thead>
                              <tr>
                                <th>{t.date}</th>
                                <th>{t.time}</th>
                                <th>{t.locationLabel}</th>
                                <th>{t.percentage}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {attendanceStats.courseStats
                                ?.find((c) => c.courseCode === selectedCourse)
                                ?.sessions.map((session, index) => (
                                  <tr key={index}>
                                    <td>{session.date}</td>
                                    <td>{session.time}</td>
                                    <td>{session.location}</td>
                                    <td>
                                      <span
                                        className={`status-badge ${session.attendancePercentage >= 75 ? "success" : "error"}`}
                                      >
                                        {session.attendancePercentage}%
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div className="no-course-selected">
                        <div className="no-data-message">
                          <FaBook className="no-data-icon" />
                          <h3>{t.noCourseSelected}</h3>
                          <p>{t.noCourseSelectedMessage}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "schedule" && (
                  <div className="section-layout">
                    <div className="section-header">
                      <h1>{t.teachingSchedule}</h1>
                      <p className="subtitle">{t.manageYourSchedule}</p>
                    </div>

                    <div className="schedule-calendar">
                      <div className="day-selector">
                        <button
                          className={`day-btn ${selectedDay === "All" ? "active" : ""}`}
                          onClick={() => setSelectedDay("All")}
                        >
                          {t.allDays}
                        </button>
                        {[t.sunday, t.monday, t.tuesday, t.wednesday, t.thursday, t.friday, t.saturday].map(
                          (day, index) => (
                            <button
                              key={index}
                              onClick={() =>
                                setSelectedDay(
                                  Object.values(t).indexOf(day) > -1
                                    ? Object.keys(t)[Object.values(t).indexOf(day)]
                                    : day,
                                )
                              }
                              className={`day-btn ${selectedDay === day ? "active" : ""}`}
                            >
                              {day}
                            </button>
                          ),
                        )}
                      </div>

                      <div className="schedule-content">
                        {filteredSchedule.length === 0 ? (
                          <div className="no-classes">
                            <div className="no-classes-icon">📅</div>
                            <h3>{t.noClassesScheduled}</h3>
                            <p>
                              {t.youHaveNoClasses} {selectedDay === "All" ? t.anyDay : selectedDay}.
                            </p>
                          </div>
                        ) : (
                          <div className="timeline">
                            {filteredSchedule.map((session, index) => (
                              <div key={index} className="timeline-item">
                                <div className="timeline-day">{session.day}</div>
                                <div className="timeline-time">
                                  <span>{session.startTime}</span>
                                  <span className="timeline-duration">{session.duration}</span>
                                </div>
                                <div className="timeline-content">
                                  <div className="timeline-card">
                                    <h3>{session.courseName}</h3>
                                    <div className="timeline-details">
                                      <span>
                                        <strong>{t.code}:</strong> {session.courseCode}
                                      </span>
                                      <span>
                                        <strong>{t.locationLabel}:</strong> {session.location}
                                      </span>
                                      <span>
                                        <strong>{t.studentsLabel}:</strong> {session.studentsCount}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                
                {activeTab === "settings" &&
                 (
                  <div className="section-layout">
                    <div className="section-header">
                      <h1>{t.settingsTitle}</h1>
                      <p className="subtitle">{t.accountPreferences}</p>
                    </div>
                    

                    <div className="settings-container">
                      <div className="settings-section">
                        <h3>{t.accountSettings}</h3>

                        <div className="settings-group">
                          <div className="settings-item">
                            <div className="settings-item-info">
                              <h4>{t.profileInformation}</h4>
                              <p>{t.updateYourInformation}</p>
                            </div>
                          <button className="settings-btn" onClick={() => setShowEditProfile(true)}>
  {t.edit}
</button>

                          </div>

                          <div className="settings-item">
                            <div className="settings-item-info">
                              <h4>{t.changePassword}</h4>
                              <p>{t.updateYourPassword}</p>
                            </div>
                           <button className="settings-btn" onClick={() => setShowChangePassword(true)}>
  {t.change}
</button>

                          </div>
                        </div>
                      </div>

                      <div className="settings-section">
                        <h3>{t.appearance}</h3>

                        <div className="settings-group">
                          <div className="settings-item">
                            <div className="settings-item-info">
                              <h4>{t.darkModeLabel}</h4>
                              <p>{t.switchBetweenThemes}</p>
                            </div>
                            <div className="toggle-switch">
                              <input type="checkbox" id="darkMode" checked={darkMode} onChange={toggleDarkMode} />
                              <label htmlFor="darkMode"></label>
                            </div>
                          </div>
                          <div className="settings-item">
                            <div className="settings-item-info">
                              <h4>{t.languageLabel}</h4>
                              <p>{t.chooseYourLanguage}</p>
                            </div>
                            <select className="settings-select" value={language} onChange={toggleLanguage}>
                              <option value="english">{t.english}</option>
                              <option value="arabic">{t.arabic}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard
