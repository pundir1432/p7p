import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ButtonSite from './pages/Button';
import ProductPage from './pages/Product/Product';
import Navbar from './componets/Navbar';
import Footer from './componets/Footer';
import ProtectedRoute from './componets/PrivateRoute';
import Signup from './componets/login/Signup';
import Login from './componets/login/Login';
import { AuthProvider } from './componets/AuthContext';
import Account from './pages/Account/Account';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Main />
      </Router>
    </AuthProvider>
  );
}

function Main() {
  const location = useLocation();
  const hideNavbarRoutes = ['/', '/signup'];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* <Route path=" /forgot-password" element={<Forgetpassword />} />
            <Route path="/reset-password" element={<Resetpassword />} /> */}
            <Route path="/home" element={<ProtectedRoute Component={Home} />} />
            <Route path="/product" element={<ProtectedRoute Component={ProductPage} />} />
            <Route path="/account" element={<ProtectedRoute Component={Account} />} />
            <Route path="/dashboard" element={<ProtectedRoute Component={Dashboard} />} />
            <Route path="/button" element={<ProtectedRoute Component={ButtonSite} />} />
         
          </Routes>
      {!hideNavbarRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;