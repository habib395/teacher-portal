import { Route, Routes } from 'react-router-dom'
import './App.css'
import AboutMe from './components/public/AboutMe'
import AllClasses from './components/public/AllClasses'
import ContactMe from './components/public/ContactMe'
import Footer from './components/public/Footer'
import HeroSection from './components/public/HeroSection'
import MyVision from './components/public/MyVision'
import Navbar from './components/public/Navbar'
import TotalStudent from './components/public/TotalStudent'
import Login from './pages/public/Login'
import AdminLayout from './layouts/AdminLayout'
import ProtectedRoute from './routes/ProtectedRoute'
import AdminDashboard from './pages/admin/AdminDashboard'
import TeacherLayout from './layouts/TeacherLayout'
import StudentLayout from './layouts/StudentLayout'
import TeacherDashboard from './pages/teacher/TeacherDashboard'
import StudentDashboard from './pages/student/StudentDashboard'
import ManageTeachers from './pages/admin/ManageTeachers'
import ManageStudents from './pages/admin/ManageStudents'
import Attendance from './pages/teacher/Attendance'
import MarksEntry from './pages/teacher/MarkEntry'
import MyResult from './pages/student/MyResult'
import Assignments from './pages/student/Assignments'
import CreateAssignment from './pages/teacher/CreateAssignment'

import AdminNotice from './pages/admin/AdminNotice'
import AdminSettings from './pages/admin/AdminSettings'

import LeaveRequests from './pages/teacher/LeaveRequests'
import UploadMaterials from './pages/teacher/UploadMaterials'

import LeaveApplication from './pages/student/LeaveApplication'
import StudentPresentations from './pages/student/StudentPresentations'
import StudyMaterials from './pages/student/StudyMaterials'
import AssignPresentation from './pages/teacher/AssignPresentation'
import ManageCourses from './pages/admin/ManageCourse'


function HomePage() {

  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutMe />
      <AllClasses />
      <TotalStudent />
      <MyVision />
      <ContactMe />
      <Footer />
    </>
  )
}

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />

      {/* Admin routes protected */}
      <Route element={<ProtectedRoute allowedRole="admin" />}>
        <Route path="/admin" element={<AdminLayout />} >
          <Route index element={<AdminDashboard />} />
          <Route path="teachers" element={<ManageTeachers />} />
          <Route path="students" element={<ManageStudents />} />
          <Route path="courses" element={<ManageCourses />} />
          <Route path="notices" element={<AdminNotice />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Route>

      {/* Teacher routes protected */}
      <Route element={<ProtectedRoute allowedRole="teacher" />}>
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="marks" element={<MarksEntry />} />
          <Route path="assignments" element={<CreateAssignment />} />
          <Route path="leave-requests" element={<LeaveRequests />} />
          <Route path="upload-materials" element={<UploadMaterials />} />
          <Route path="presentations" element={<AssignPresentation />} />
        </Route>
      </Route>

      {/* Student routes protected */}
      <Route element={<ProtectedRoute allowedRole="student" />}>
        <Route path="/student" element={<StudentLayout />} >
          <Route index element={<StudentDashboard />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="leave" element={<LeaveApplication />} />
          <Route path="presentations" element={<StudentPresentations />} />
          <Route path="materials" element={<StudyMaterials />} />
          <Route path="result" element={<MyResult />} />
        </Route>
      </Route>

    </Routes>
  )
}

export default App