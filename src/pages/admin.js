import React, { useState } from 'react';
import styled from 'styled-components';

const Admin = () => {
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

  const [users, setUsers] = useState(mockUsers);
  const [newUser, setNewUser] = useState('');
  const [filterText, setFilterText] = useState('');

  const handleAddUser = () => {
    if (newUser) {
      setUsers([...users, { nome: newUser, perfil: 'Desconhecido' }]);
      setNewUser('');
    }
  };

  const handleDeleteUsers = () => {
    setUsers([]);
  };

  const handleEditUser = (index) => {
    const editedUser = prompt('Editar Usuário:', users[index].nome);
    const editedProfile = prompt('Editar Perfil:', users[index].perfil);
    if (editedUser && editedProfile) {
      const updatedUsers = users.map((user, i) =>
        (i === index ? { ...user, nome: editedUser, perfil: editedProfile } : user)
      );
      setUsers(updatedUsers);
    }
  };

  const filteredUsers = users.filter(user =>
    user.nome.toLowerCase().includes(filterText.toLowerCase()) ||
    user.perfil.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <Container>
      <Title>Gerenciamento de Usuários</Title>
      <InputContainer>
        <Input
          type="text"
          placeholder="Novo usuário"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        <Button onClick={handleAddUser}>+</Button>
        <Button onClick={handleDeleteUsers}>-</Button>
      </InputContainer>
      <InputContainer>
        <Input
          type="text"
          placeholder="Filtrar usuários"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        🔎
      </InputContainer>
      <UserList>
        {filteredUsers.map((user, index) => (
          <UserItem key={index}>
            <EditButton onClick={() => handleEditUser(index)}>Editar</EditButton>
            {user.nome} - {user.perfil}
          </UserItem>
        ))}
      </UserList>
    </Container>
  );
};

// Estilização dos componentes
const Container = styled.div`
  padding: 20px;
  font-family: 'Roboto', sans-serif;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #3f51b5;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 200px;
  &:focus {
    border-color: #3f51b5;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #3f51b5;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-right: 10px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  transition: background-color 0.3s;
  &:hover {
    background-color: #303f9f;
  }
  &:focus {
    outline: none;
  }
`;

const UserList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const UserItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 16px;
`;

const EditButton = styled.button`
  margin: 0 10px;
  padding: 5px;
  border: none;
  border-radius: 4px;
  background-color: #3f51b5;
  color: white;
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

export default Admin;
