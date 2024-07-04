import React, { useState } from 'react';
import styled from 'styled-components';

const UserForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState('Colecionador');

  const isAdmin = localStorage.getItem('role') === 'ADMIN'

  const handleSubmit = () => {
    console.log('Usuário:', username);
    console.log('Senha:', password);
    console.log('Perfil:', profile);
  };

  const handleCancel = () => {
    setUsername('');
    setPassword('');
    setProfile('Colecionador');
    console.log('Cancelado');
  };

  return (
    <Container>
      <Title>Formulário de Usuário</Title>
      <InputContainer>
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
        />
        {isAdmin && (
          <Select
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
          >
            <option value="Administrador">Administrador</option>
            <option value="Autor">Autor</option>
            <option value="Colecionador">Colecionador</option>
          </Select>
        )}
      </InputContainer>
      <ButtonContainer>
        <Button onClick={handleSubmit}>OK</Button>
        <Button onClick={handleCancel}>Cancelar</Button>
      </ButtonContainer>
    </Container>
  );
};

export default UserForm;

// Estilização dos componentes
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: 'Roboto', sans-serif;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #3f51b5;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 200px;
  &:focus {
    border-color: #3f51b5;
    outline: none;
  }
`;

const Select = styled.select`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 220px;
  &:focus {
    border-color: #3f51b5;
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #3f51b5;
  color: white;
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
