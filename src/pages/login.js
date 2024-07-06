import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Login = () => {
  const [nomeUsuario, setNomeUsuario] = useState(localStorage.getItem('name') || '');
  const [senha, setSenha] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from your API endpoint
    fetch('/api/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data); // Assuming data is an array of user objects
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const handleLogin = () => {
    const collector = users.find(
      user =>
        user.nome.toLowerCase() === nomeUsuario.toLowerCase() &&
        user.senha === senha &&
        user.perfil === 'Colecionador'
    );

    const admin = users.find(
      user =>
        user.nome.toLowerCase() === nomeUsuario.toLowerCase() &&
        user.senha === senha &&
        user.perfil === 'Administrador'
    );

    const author = users.find(
      user =>
        user.nome.toLowerCase() === nomeUsuario.toLowerCase() &&
        user.senha === senha &&
        user.perfil === 'Autor'
    );

    if (admin) {
      localStorage.setItem('role', 'ADMIN');
      localStorage.setItem('name', admin.nome);
      window.location.href = '/admin';
    } else if (collector) {
      localStorage.setItem('role', 'COLLECTOR');
      localStorage.setItem('name', collector.nome);
      window.location.href = '/sticker-editor';
    } else if (author) {
      localStorage.setItem('role', 'AUTHOR');
      localStorage.setItem('name', author.nome);
      window.location.href = '/album-editor';
    } else {
      alert('Credenciais inválidas. Tente novamente.');
    }
  };

  const handleLogout = () => {
    setNomeUsuario('');
    setSenha('');
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
          value={nomeUsuario}
          onChange={(e) => setNomeUsuario(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
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

// Estilização dos componentes
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
