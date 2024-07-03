import React, { useState } from 'react';
import styled from 'styled-components';

const mockUsers = [
  { id: 1, nome: 'Coleman', perfil: 'Autor', senha: 'senha1' },
  { id: 2, nome: 'Torry', perfil: 'Colecionador', senha: 'senha2' },
  { id: 3, nome: 'Si', perfil: 'Colecionador', senha: 'senha3' },
  { id: 4, nome: 'Joete', perfil: 'Administrador', senha: 'senha4' },
  { id: 5, nome: 'Annice', perfil: 'Autor', senha: 'senha5' },
  { id: 6, nome: 'Hendrik', perfil: 'Autor', senha: 'senha6' },
  { id: 7, nome: 'Basilius', perfil: 'Administrador', senha: 'senha7' },
  { id: 8, nome: 'Rochell', perfil: 'Administrador', senha: 'senha8' },
  { id: 9, nome: 'Dylan', perfil: 'Autor', senha: 'senha9' },
  { id: 10, nome: 'Adriena', perfil: 'Colecionador', senha: 'senha10' },
  { id: 11, nome: 'Evelyn', perfil: 'Administrador', senha: 'senha11' },
  { id: 12, nome: 'Reggie', perfil: 'Colecionador', senha: 'senha12' },
  { id: 13, nome: 'Dexter', perfil: 'Administrador', senha: 'senha13' },
  { id: 14, nome: 'Tammie', perfil: 'Colecionador', senha: 'senha14' },
  { id: 15, nome: 'Vidovik', perfil: 'Administrador', senha: 'senha15' }
];

const Login = () => {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    const user = mockUsers.find(
      user =>
        user.nome.toLowerCase() === nomeUsuario.toLowerCase() &&
        user.senha === senha
    );

    const userAbsoluto = mockUsers.find(
      user =>
        user.nome.toLowerCase() === nomeUsuario.toLowerCase() &&
        user.senha === senha &&
        user.perfil == 'Administrador'
    );

    if (userAbsoluto) {
      localStorage.setItem('adminAbsoluto', JSON.stringify(true));
      localStorage.setItem('admin', JSON.stringify(true));
      window.location.href = '/admin';
    } else if (user) {
      localStorage.setItem('adminAbsoluto', JSON.stringify(false));
      localStorage.setItem('admin', JSON.stringify(true));
      window.location.href = '/album-editor';
    } else {
      alert('Credenciais inválidas. Tente novamente.');
    }
  };

  const handleLogout = () => {
    setNomeUsuario('');
    setSenha('');
    localStorage.setItem('admin', JSON.stringify(false));
    localStorage.setItem('adminAbsoluto', JSON.stringify(false));
    console.log('Desconectado');
  };

  return (
    <Container>
      <Title>Login</Title>
      <InputContainer onSubmit={handleLogin}>
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
  height: 100vh;
  background-color: #f5f5f5;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
  color: #3f51b5;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
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
