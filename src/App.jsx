import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthComponent, ProtectedRoute } from 'authnest-react';
import Home from "./pages/Home"
import ModalsTesting from "./pages/ModalsTesting"
import './App.css'

const NODE_ENV = 'development'

function App({ auth }) {

  const handleAuthSuccess = (authInstance) => {
    console.log('✅ User authenticated successfully!', authInstance);
  };

  const handleAuthFailure = (error) => {
    console.error('❌ Authentication failed:', error);
  };

  return (
    <>
      <AuthComponent
        options={{ debug: NODE_ENV === 'development' }}
        onAuthSuccess={handleAuthSuccess}
        onAuthFailure={handleAuthFailure}
        requireAuth={false} // Don't require auth for entire app
      >
        <Router>
          <Routes>
            {/* Public route */}
          
            
            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Home auth={auth} />
              </ProtectedRoute>
            } />
            <Route path="/modals" element={
              <ProtectedRoute>
                <ModalsTesting />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </AuthComponent>
    </>
  )
}

export default App