import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Lazy load pages for better performance
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AIDetection = lazy(() => import('./pages/AIDetection'));
const Games = lazy(() => import('./pages/Games'));
const Tests = lazy(() => import('./pages/Tests'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Profile = lazy(() => import('./pages/Profile'));

// Loading component for Suspense
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  </div>
);

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <PageLoader />;
  }
  
  return user ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={
                  <PrivateRoute>
                    <Layout />
                  </PrivateRoute>
                }>
                  <Route index element={
                    <Suspense fallback={<PageLoader />}>
                      <Dashboard />
                    </Suspense>
                  } />
                  <Route path="ai-detection" element={
                    <Suspense fallback={<PageLoader />}>
                      <AIDetection />
                    </Suspense>
                  } />
                  <Route path="games" element={
                    <Suspense fallback={<PageLoader />}>
                      <Games />
                    </Suspense>
                  } />
                  <Route path="tests" element={
                    <Suspense fallback={<PageLoader />}>
                      <Tests />
                    </Suspense>
                  } />
                  <Route path="analytics" element={
                    <Suspense fallback={<PageLoader />}>
                      <Analytics />
                    </Suspense>
                  } />
                  <Route path="profile" element={
                    <Suspense fallback={<PageLoader />}>
                      <Profile />
                    </Suspense>
                  } />
                </Route>
              </Routes>
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;