import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Splash from './components/splash/splash';
import Admin from './pages/admin';
import AlbumEditor from './pages/albumEditor';
import Login from './pages/login';
import UserForm from './pages/userForm';
import StickerEditor from './pages/stickerEditor';

const userRoles = {
  COLLECTOR: 'COLLECTOR',
  ADMIN: 'ADMIN',
  AUTHOR: 'AUTHOR',
};

const getUserRole = () => {
  const role = localStorage.getItem('role');
  return role;
};

const PrivateRoute = ({ element, allowedRoles }) => {
  const navigate = useNavigate();
  const userRole = getUserRole();

  useEffect(() => {
    if (!allowedRoles.includes(userRole)) {
      navigate('/login');
    }
  }, [navigate, allowedRoles, userRole]);

  return allowedRoles.includes(userRole) ? element : <Navigate to="/login" />;
};

const Header = () => {
  const userRole = getUserRole();

  return (
    <HeaderContainer>
      <NavLink href="/login">Login</NavLink>
      <NavLink href="/user-form">Formulário de Usuário</NavLink>
      {userRole === userRoles.AUTHOR && <NavLink href="/album-editor">Editar Álbum</NavLink>}
      {userRole === userRoles.ADMIN && <NavLink href="/admin">Admin</NavLink>}
      {userRole === userRoles.AUTHOR && <NavLink href="/sticker-editor">Editor de Adesivos</NavLink>}
    </HeaderContainer>
  );
};

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();
  const userRole = getUserRole();

  useEffect(() => {
    if (!userRole) {
      navigate('/login');
    }
  }, [navigate, userRole]);

  return <>{children}</>;
};

const App = () => {

  /*
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <LoadingScreen>
        <Splash />
      </LoadingScreen>
    );
  }

  */

  return (
    <BrowserRouter>
      <AuthWrapper>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-form" element={<UserForm />} />
          <Route path="/sticker-editor" element={<PrivateRoute element={<StickerEditor />} allowedRoles={[userRoles.AUTHOR]} />} />
          <Route path="/album-editor" element={<PrivateRoute element={<AlbumEditor />} allowedRoles={[userRoles.AUTHOR]} />} />
          <Route path="/admin" element={<PrivateRoute element={<Admin />} allowedRoles={[userRoles.ADMIN]} />} />
        </Routes>
      </AuthWrapper>
    </BrowserRouter>
  );
};

const LoadingScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
  font-weight: bold;
`;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #3f51b5;
  color: white;
  padding: 10px 0;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: white;
  padding: 10px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #303f9f;
  }
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;
