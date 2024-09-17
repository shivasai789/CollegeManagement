import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Login from './components/Login'
import './global.css'
import AdminDashboard from './components/AdminDashboard'
import FacultyDashboard from './components/FacultyDashboard'
import StudentDashboard from './components/StudentDashboard'
import { AuthProvider, useAuth } from './contexts/AuthContext'

function PrivateRoute({ children, allowedRoles }) {
  const { user } = useAuth()
  
  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles.includes(user.role)) {
    return children
  }

  return <Navigate to="/" replace />
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/admin" 
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/faculty" 
              element={
                <PrivateRoute allowedRoles={['faculty']}>
                  <FacultyDashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/student" 
              element={
                <PrivateRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </PrivateRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}