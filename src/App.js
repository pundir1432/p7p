import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ButtonSite from './pages/Button';
import ProductPage from './pages/Product/Product';
import Navbar from './componets/Navbar';
import Footer from './componets/Footer';
import PrivateRoute from './componets/PrivateRoute';
import Signup from './componets/login/Signup';
import Login from './componets/login/Login';
import { AuthProvider } from './componets/AuthContext';

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
  const hideNavbarRoutes = ['/', '/signup']; // Add paths where Navbar should be hidden

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/button" element={<ButtonSite />} />
          <Route path="/product" element={<ProductPage />} />
        </Route>
      </Routes>
    
      {!hideNavbarRoutes.includes(location.pathname) &&   <Footer />}
    </>
  );
}

export default App;

