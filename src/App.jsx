import React, { useEffect } from 'react'
  import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
  import { useStore } from './store/useStore'
  import Onboarding from './pages/Onboarding'
  import Dashboard from './pages/Dashboard'
  import Profile from './pages/Profile'
  import Insights from './pages/Insights'
  import DataEntry from './pages/DataEntry'
  import BottomNav from './components/BottomNav'

  function App() {
    const { user, loadUserData } = useStore()

    useEffect(() => {
      loadUserData()
    }, [loadUserData])

    return (
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
          {!user ? (
            <Routes>
              <Route path="*" element={<Onboarding />} />
            </Routes>
          ) : (
            <>
              <div className="pb-16">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/insights" element={<Insights />} />
                  <Route path="/data" element={<DataEntry />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </div>
              <BottomNav />
            </>
          )}
        </div>
      </Router>
    )
  }

  export default App
