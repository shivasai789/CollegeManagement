import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import './index.css'


export default function StudentDashboard() {
  const { user, logout } = useAuth()
  const [enrolledCourses, setEnrolledCourses] = useState([
    { id: 1, name: 'Introduction to Computer Science', grade: 'A', attendance: 90 },
    { id: 2, name: 'Data Structures', grade: 'B+', attendance: 85 },
  ])
  const [availableCourses, setAvailableCourses] = useState([
    { id: 3, name: 'Algorithms', creditHours: 3 },
    { id: 4, name: 'Database Systems', creditHours: 4 },
  ])

  const handleEnroll = (courseId) => {
    const course = availableCourses.find(c => c.id === courseId)
    setEnrolledCourses([...enrolledCourses, { ...course, grade: '-', attendance: 0 }])
    setAvailableCourses(availableCourses.filter(c => c.id !== courseId))
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-800">Student Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 mr-4">Welcome, {user.username}</span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enrolled Courses</h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
              {enrolledCourses.map((course) => (
                <li key={course.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">{course.name}</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Grade: {course.grade}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        Attendance: {course.attendance}%
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Available Courses</h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
              {availableCourses.map((course) => (
                <li key={course.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">{course.name}</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {course.creditHours} credit hours
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <button
                        onClick={() => handleEnroll(course.id)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs"
                      >
                        Enroll
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}