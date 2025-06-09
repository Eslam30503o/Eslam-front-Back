export async function fetchCourses() {
  return [
    { name: "AI", code: "AI101" },
    { name: "Web Dev", code: "WD202" },
  ]
}

export async function addCourse(course) {
  console.log("Added course", course)
}

export async function fetchStudents() {
  return [
    { email: "student1@example.com" },
    { email: "student2@example.com" },
  ]
}

export async function addStudent(student) {
  console.log("Added student", student)
}

export async function linkFingerprint(email, fingerprintId) {
  console.log(`Linked ${fingerprintId} to ${email}`)
}
