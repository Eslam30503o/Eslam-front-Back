// src/services/studentService.js
// ✅ mock API responses until backend is ready

export const fetchStudentProfile = async () => {
    return {
      displayName: "David Rezaik Amin",
      email: "David@student.com",
      department: "Computer Engineering",
      year: "4th Year",
      gpa: 3.4,
      fingerprintRegistered: true
    };
  };
  
  // Example API: fetchTimetable with courseCode
export const fetchTimetable = async () => {
    return [
      {
        courseCode: "CS201",
        course: "Operating Systems",
        day: "Sunday",
        time: "09:00 AM - 10:30 AM",
        instructor: "Dr. Omar",
        location: "Hall 1"
      },
      {
        courseCode: "CS303",
        course: "AI Fundamentals",
        day: "Sunday",
        time: "01:00 PM - 03:00 PM",
        instructor: "Dr. Sara",
        location: "Lab 3"
      },
      {
        courseCode: "CS202",
        course: "Database Systems",
        day: "Wednesday",
        time: "12:00 PM - 02:00 PM",
        instructor: "Dr. Kim",
        location: "Hall 2"
      },
      {
        courseCode: "CS305",
        course: "Computer Networks",
        day: "Thursday",
        time: "08:30 AM - 10:00 AM",
        instructor: "Dr. Rania",
        location: "Room B1"
      }
    ];
  };
  
  export const fetchAttendanceSummary = async () => {
    return {
      total: 30,
      attended: 26,
      missed: 4,
      percentage: 86.6
    };
  };
  
  export const fetchFingerprintLogs = async () => {
    return [
      { date: "2025-05-05", time: "09:00 AM", location: "Main Gate", result: "Success", courseCode: "CS201" },
      { date: "2025-05-05", time: "01:05 PM", location: "Main Gate", result: "Success", courseCode: "CS303" },
      { date: "2025-05-04", time: "08:55 AM", location: "Library", result: "Failed", courseCode: "CS305" }
    ];
  };
  
  
  export const matchFingerprint = async () => {
    const success = Math.random() > 0.2;
    return {
      success,
      message: success ? "Fingerprint matched ✅" : "Fingerprint not matched ❌"
    };
  };

  export const fetchCourseAttendance = async () => {
    return [
      {
        courseCode: "CS201",
        name: "Operating Systems",
        instructor: "Dr. Omar",
        credit: 3,
        status: "Ongoing"
      },
      {
        courseCode: "CS303",
        name: "AI Fundamentals",
        instructor: "Dr. Sara",
        credit: 4,
        status: "Ongoing"
      },
      {
        courseCode: "CS305",
        name: "Computer Networks",
        instructor: "Dr. Rania",
        credit: 3,
        status: "Completed"
      }
    ];
  };
  