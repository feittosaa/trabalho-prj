import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Admin from './pages/admin';
import Login from './pages/login';
import UserForm from './pages/userForm';
import AlbumEditor from './pages/albumEditor';

const PrivateRoute = ({ element, ...rest }) => {
  const isAdmin = JSON.parse(localStorage.getItem('admin')) === true;
  const isAdminAbsoluto = JSON.parse(localStorage.getItem('adminAbsoluto')) === true;

  // Verifica se o usuário é administrador absoluto
  if (isAdminAbsoluto) {
    return element;
  } else if (isAdmin) {
    // Verifica se está tentando acessar /admin ou /user-form
    if (rest.path === '/admin' || rest.path === '/user-form') {
      return <Navigate to="/login" />;
    } else {
      return element;
    }
  } else {
    return <Navigate to="/login" />;
  }
};

const Header = () => {
  return (
    <HeaderContainer>
      <NavLink to="/album-editor">Editar Álbum</NavLink>
      <NavLink to="/admin">Admin</NavLink>
      <NavLink to="/user-form">Formulário de Usuário</NavLink>
    </HeaderContainer>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/album-editor" element={<PrivateRoute element={<AlbumEditor />} />} />
        <Route path="/admin" element={<PrivateRoute element={<Admin />} />} />
        <Route path="/user-form" element={<PrivateRoute element={<UserForm />} />} />
      </Routes>
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

const NavLink = styled(Link)`
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
