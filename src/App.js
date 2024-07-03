import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Admin from './pages/admin';
import Login from './pages/login';
import UserForm from './pages/userForm';
import AlbumEditor from './pages/albumEditor';

const PrivateRoute = ({ element, isAbsolute, ...rest }) => {
  const isAdmin = JSON.parse(localStorage.getItem('admin')) === true;
  const isAdminAbsolute = JSON.parse(localStorage.getItem('adminAbsoluto')) === true;

  if (isAdminAbsolute || (isAdmin && !isAbsolute)) {
    return element;
  }
  return <Navigate to="/login" />;
};

const Header = () => {
  return (
    <HeaderContainer>
      <NavLink href="/login">Login</NavLink>
      <NavLink href="/album-editor">Editar Álbum</NavLink>
      <NavLink href="/admin">Admin</NavLink>
      <NavLink href="/user-form">Formulário de Usuário</NavLink>
    </HeaderContainer>
  );
};

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = JSON.parse(localStorage.getItem('admin')) === true;
    if (!isAdmin) {
      navigate('/login');
    }
  }, [navigate]);

  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthWrapper>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/album-editor" element={<PrivateRoute element={<AlbumEditor />} isAbsolute={false} />} />
          <Route path="/admin" element={<PrivateRoute element={<Admin />} isAbsolute={true} />} />
          <Route path="/user-form" element={<PrivateRoute element={<UserForm />} isAbsolute={true} />} />
        </Routes>
      </AuthWrapper>
    </BrowserRouter>
  );
};

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
