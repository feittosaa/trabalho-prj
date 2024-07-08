import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../API';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [username, setUsername] = useState(localStorage.getItem('name') || '');
  const [password, setPassword] = useState('');

  useEffect(() => {

  }, []);

  const handleLogin = async () => {
    try {
      const bodyLogin = {
        username: username,
        password: password
      }
      const response = await api.post('/auth/signin', bodyLogin)
      console.log(response)
  
      if (response.status != 200) {
        throw new Error('Credenciais inválidas. Tente novamente.');
      }
  
      const data = await response.data;
      const token = data.accessToken;
      const user = jwtDecode(token);
      console.log(user);

      localStorage.setItem('role', user.role);
      localStorage.setItem('username', user.username);
      localStorage.setItem('id', user.id);
  
      if (user.role === 'ADMIN') {
        localStorage.setItem('role', 'ADMIN');
        localStorage.setItem('name', bodyLogin.username);
        localStorage.setItem('token', token);
        window.location.href = '/admin';
      } else if (user.role === 'COLLECTOR') {
        localStorage.setItem('role', 'COLLECTOR');
        localStorage.setItem('name', bodyLogin.username);
        localStorage.setItem('token', token);
        window.location.href = '/album-view';
      } else if (user.role === 'AUTHOR') {
        localStorage.setItem('role', 'AUTHOR');
        localStorage.setItem('name', bodyLogin.username);
        localStorage.setItem('token', token);
        window.location.href = '/album-editor';
      } else {
        alert('Credenciais inválidas. Tente novamente.');
      }
    } catch (error) {
      alert(error.message);
    }
  };
  

  const handleLogout = () => {
    setUsername('');
    setPassword('');
    localStorage.setItem('role', '');
    localStorage.setItem('name', '');
    console.log('Desconectado');
    window.location.reload();
  };

  return (
    <Container>
      <InputContainer onSubmit={handleLogin}>
        <Title>Login</Title>
        <Input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onSubmit={handleLogin}
        />
      </InputContainer>
      <ButtonContainer>
        <Button onClick={handleLogin}>Entrar</Button>
        <Button onClick={handleLogout}>Sair</Button>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 95vh;
  background-color: #f5f5f5;
`;

const Title = styled.h2`
  font-family: 'Roboto', sans-serif;
  color: #3f51b5;
`;

const InputContainer = styled.form`
  margin-top: -18vh;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  width: 280px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  &:focus {
    border-color: #3f51b5;
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #3f51b5;
  color: white;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  transition: background-color 0.3s;
  &:hover {
    background-color: #303f9f;
  }
  &:focus {
    outline: none;
  }
`;

export default Login;
