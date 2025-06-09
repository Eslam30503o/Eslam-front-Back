// src/services/doctorService.js
// Mock API responses for doctor dashboard

export const fetchDoctorProfile = async () => {
    return {
      id: "FAC-2023-001",
      name: "Dr. Robert Raafat",
      email: "Robert.Raafat@akhbaracademy.edu",
      phone: "+20 1203032133",
      department: "Computer Engineering",
      title: "Associate Professor",
      office: "Building C, Room 214",
      officeHours: "Sunday & Tuesday, 2-4 PM",
      experience: 12,
      researchAreas: ["Artificial Intelligence", "Machine Learning", "Computer Vision"]
    };
  };
  
  export const fetchCourses = async () => {
    return [
      {
        courseCode: "CS201",
        name: "Operating Systems",
        creditHours: 3,
        studentsCount: 45,
        averageAttendance: 87,
        status: "Active"
      },
      {
        courseCode: "CS303",
        name: "AI Fundamentals",
        creditHours: 4,
        studentsCount: 38,
        averageAttendance: 92,
        status: "Active"
      },
      {
        courseCode: "CS305",
        name: "Computer Networks",
        creditHours: 3,
        studentsCount: 42,
        averageAttendance: 78,
        status: "Active"
      },
      {
        courseCode: "CS401",
        name: "Advanced Algorithms",
        creditHours: 4,
        studentsCount: 25,
        averageAttendance: 95,
        status: "Upcoming"
      },
      {
        courseCode: "CS202",
        name: "Database Systems",
        creditHours: 3,
        studentsCount: 50,
        averageAttendance: 82,
        status: "Completed"
      }
    ];
  };
  
  export const fetchSchedule = async () => {
    return [
      {
        day: "Sunday",
        courseCode: "CS201",
        courseName: "Operating Systems",
        startTime: "09:00 AM",
        endTime: "10:30 AM",
        duration: "1.5 hours",
        location: "Hall 1",
        studentsCount: 45
      },
      {
        day: "Sunday",
        courseCode: "CS303",
        courseName: "AI Fundamentals",
        startTime: "01:00 PM",
        endTime: "03:00 PM",
        duration: "2 hours",
        location: "Lab 3",
        studentsCount: 38
      },
      {
        day: "Tuesday",
        courseCode: "CS201",
        courseName: "Operating Systems",
        startTime: "09:00 AM",
        endTime: "10:30 AM",
        duration: "1.5 hours",
        location: "Hall 1",
        studentsCount: 45
      },
      {
        day: "Wednesday",
        courseCode: "CS305",
        courseName: "Computer Networks",
        startTime: "12:00 PM",
        endTime: "02:00 PM",
        duration: "2 hours",
        location: "Hall 2",
        studentsCount: 42
      },
      {
        day: "Thursday",
        courseCode: "CS303",
        courseName: "AI Fundamentals",
        startTime: "08:30 AM",
        endTime: "10:00 AM",
        duration: "1.5 hours",
        location: "Room B1",
        studentsCount: 38
      }
    ];
  };
  
  export const fetchAttendanceStats = async () => {
    return {
      averageAttendance: 85,
      courseStats: [
        {
          courseCode: "CS201",
          courseName: "Operating Systems",
          averageAttendance: 87,
          lastSessionAttendance: 91,
          atRiskStudents: 3,
          sessions: [
            {
              date: "May 2, 2025",
              time: "09:00 AM",
              location: "Hall 1",
              presentCount: 41,
              absentCount: 4,
              attendancePercentage: 91
            },
            {
              date: "Apr 28, 2025",
              time: "09:00 AM",
              location: "Hall 1",
              presentCount: 39,
              absentCount: 6,
              attendancePercentage: 87
            },
            {
              date: "Apr 25, 2025",
              time: "09:00 AM",
              location: "Hall 1",
              presentCount: 40,
              absentCount: 5,
              attendancePercentage: 89
            },
            {
              date: "Apr 21, 2025",
              time: "09:00 AM",
              location: "Hall 1",
              presentCount: 38,
              absentCount: 7,
              attendancePercentage: 84
            },
            {
              date: "Apr 18, 2025",
              time: "09:00 AM",
              location: "Hall 1",
              presentCount: 37,
              absentCount: 8,
              attendancePercentage: 82
            }
          ]
        },
        {
          courseCode: "CS303",
          courseName: "AI Fundamentals",
          averageAttendance: 92,
          lastSessionAttendance: 95,
          atRiskStudents: 1,
          sessions: [
            {
              date: "May 2, 2025",
              time: "01:00 PM",
              location: "Lab 3",
              presentCount: 36,
              absentCount: 2,
              attendancePercentage: 95
            },
            {
              date: "Apr 28, 2025",
              time: "01:00 PM",
              location: "Lab 3",
              presentCount: 35,
              absentCount: 3,
              attendancePercentage: 92
            },
            {
              date: "Apr 25, 2025",
              time: "01:00 PM",
              location: "Lab 3",
              presentCount: 34,
              absentCount: 4,
              attendancePercentage: 89
            },
            {
              date: "Apr 21, 2025",
              time: "01:00 PM",
              location: "Lab 3",
              presentCount: 36,
              absentCount: 2,
              attendancePercentage: 95
            },
            {
              date: "Apr 18, 2025",
              time: "01:00 PM",
              location: "Lab 3",
              presentCount: 35,
              absentCount: 3,
              attendancePercentage: 92
            }
          ]
        },
        {
          courseCode: "CS305",
          courseName: "Computer Networks",
          averageAttendance: 78,
          lastSessionAttendance: 81,
          atRiskStudents: 7,
          sessions: [
            {
              date: "May 1, 2025",
              time: "12:00 PM",
              location: "Hall 2",
              presentCount: 34,
              absentCount: 8,
              attendancePercentage: 81
            },
            {
              date: "Apr 27, 2025",
              time: "12:00 PM",
              location: "Hall 2",
              presentCount: 32,
              absentCount: 10,
              attendancePercentage: 76
            },
            {
              date: "Apr 24, 2025",
              time: "12:00 PM",
              location: "Hall 2",
              presentCount: 33,
              absentCount: 9,
              attendancePercentage: 79
            },
            {
              date: "Apr 20, 2025",
              time: "12:00 PM",
              location: "Hall 2",
              presentCount: 31,
              absentCount: 11,
              attendancePercentage: 74
            },
            {
              date: "Apr 17, 2025",
              time: "12:00 PM",
              location: "Hall 2",
              presentCount: 34,
              absentCount: 8,
              attendancePercentage: 81
            }
          ]
        }
      ]
    };
  };
  
  export const fetchStudentsList = async () => {
    return [
      {
        id: "STU-2023-001",
        name: "Ahmed Tarek",
        email: "ahmed@student.com",
        department: "Computer Engineering",
        year: "4th Year",
        attendance: 86,
        courses: [
          {
            courseCode: "CS201",
            grades: {
              midterm: 85,
              assignments: 90,
              final: 88,
              total: 87,
              letter: "A-"
            }
          },
          {
            courseCode: "CS303",
            grades: {
              midterm: 92,
              assignments: 95,
              final: 90,
              total: 92,
              letter: "A"
            }
          }
        ]
      },
      {
        id: "STU-2023-002",
        name: "Sara Mohamed",
        email: "sara@student.com",
        department: "Computer Engineering",
        year: "4th Year",
        attendance: 92,
        courses: [
          {
            courseCode: "CS201",
            grades: {
              midterm: 78,
              assignments: 85,
              final: 80,
              total: 81,
              letter: "B"
            }
          },
          {
            courseCode: "CS303",
            grades: {
              midterm: 88,
              assignments: 90,
              final: 85,
              total: 87,
              letter: "A-"
            }
          }
        ]
      },
      {
        id: "STU-2023-003",
        name: "Omar Khaled",
        email: "omar@student.com",
        department: "Computer Engineering",
        year: "4th Year",
        attendance: 78,
        courses: [
          {
            courseCode: "CS201",
            grades: {
              midterm: 65,
              assignments: 70,
              final: 72,
              total: 69,
              letter: "C"
            }
          },
          {
            courseCode: "CS305",
            grades: {
              midterm: 75,
              assignments: 80,
              final: 78,
              total: 78,
              letter: "B-"
            }
          }
        ]
      },
      {
        id: "STU-2023-004",
        name: "Nour Ahmed",
        email: "nour@student.com",
        department: "Computer Engineering",
        year: "3rd Year",
        attendance: 95,
        courses: [
          {
            courseCode: "CS201",
            grades: {
              midterm: 92,
              assignments: 95,
              final: 94,
              total: 94,
              letter: "A"
            }
          },
          {
            courseCode: "CS303",
            grades: {
              midterm: 90,
              assignments: 92,
              final: 88,
              total: 90,
              letter: "A"
            }
          }
        ]
      },
      {
        id: "STU-2023-005",
        name: "Youssef Ali",
        email: "youssef@student.com",
        department: "Computer Engineering",
        year: "4th Year",
        attendance: 65,
        courses: [
          {
            courseCode: "CS201",
            grades: {
              midterm: 60,
              assignments: 65,
              final: 62,
              total: 62,
              letter: "D"
            }
          },
          {
            courseCode: "CS305",
            grades: {
              midterm: 55,
              assignments: 60,
              final: 58,
              total: 58,
              letter: "F"
            }
          }
        ]
      }
    ];
  };
  
  export const fetchNotifications = async () => {
    return [
      {
        id: 1,
        message: "Reminder: Faculty meeting tomorrow at 2 PM in Conference Room A.",
        date: "May 5, 2025",
        isRead: false
      },
      {
        id: 2,
        message: "New academic calendar for next semester has been published.",
        date: "May 3, 2025",
        isRead: false
      },
      {
        id: 3,
        message: "Your request for lab equipment has been approved.",
        date: "May 1, 2025",
        isRead: true
      },
      {
        id: 4,
        message: "Reminder: Final exam submission deadline is May 15.",
        date: "April 28, 2025",
        isRead: true
      },
      {
        id: 5,
        message: "Student Ahmed Tarek has requested a meeting.",
        date: "April 25, 2025",
        isRead: true
      }
    ];
  };
  
  export const fetchGradeDistribution = async () => {
    return {
      "CS201": [
        { grade: "A", count: 10 },
        { grade: "A-", count: 8 },
        { grade: "B+", count: 7 },
        { grade: "B", count: 6 },
        { grade: "B-", count: 5 },
        { grade: "C+", count: 4 },
        { grade: "C", count: 3 },
        { grade: "D", count: 1 },
        { grade: "F", count: 1 }
      ],
      "CS303": [
        { grade: "A", count: 15 },
        { grade: "A-", count: 10 },
        { grade: "B+", count: 6 },
        { grade: "B", count: 4 },
        { grade: "B-", count: 2 },
        { grade: "C+", count: 1 },
        { grade: "C", count: 0 },
        { grade: "D", count: 0 },
        { grade: "F", count: 0 }
      ],
      "CS305": [
        { grade: "A", count: 8 },
        { grade: "A-", count: 7 },
        { grade: "B+", count: 9 },
        { grade: "B", count: 8 },
        { grade: "B-", count: 5 },
        { grade: "C+", count: 3 },
        { grade: "C", count: 1 },
        { grade: "D", count: 1 },
        { grade: "F", count: 0 }
      ]
    };
  };
  
  export const fetchRecentActivity = async () => {
    return [
      {
        id: 1,
        type: "attendance",
        description: "Recorded attendance for CS303 - AI Fundamentals",
        time: "Today, 1:30 PM"
      },
      {
        id: 2,
        type: "grade",
        description: "Updated grades for CS201 -  1:30 PM"
      },
      {
        id: 2,
        type: "grade",
        description: "Updated grades for CS201 - Operating Systems",
        time: "Today, 11:45 AM"
      },
      {
        id: 3,
        type: "course",
        description: "Added new lecture materials for CS305 - Computer Networks",
        time: "Yesterday, 3:15 PM"
      },
      {
        id: 4,
        type: "attendance",
        description: "Recorded attendance for CS201 - Operating Systems",
        time: "Yesterday, 9:30 AM"
      },
      {
        id: 5,
        type: "grade",
        description: "Graded assignments for CS303 - AI Fundamentals",
        time: "May 3, 2025, 2:00 PM"
      }
    ];
  };
  
  