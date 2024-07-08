import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { createUser, fetchAllUsers, removeUser, editUser } from "../API";

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        fullName: "",
        userName: "",
        password: "",
        role: "",
    });
    const [userToRemove, setUserToRemove] = useState({});
    const [filterText, setFilterText] = useState("");
    const [updateUsers, setUpdateUsers] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const userData = await fetchAllUsers();
                setUsers(userData);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            }
        };

        getUsers();
    }, [updateUsers]);

    const handleAddUser = async () => {
        try {
            const userData = await createUser(newUser);
            setUpdateUsers(!updateUsers);
            setNewUser({
                fullName: "",
                userName: "",
                password: "",
                role: "",
            });
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    };

    const handleDeleteUser = async (user) => {
        await removeUser(user.id);
        setUpdateUsers(!updateUsers);
    };

    const handleEditUser = async (user) => {
        const userEdited = {
            fullName: "",
            userName: "",
            password: "",
            role: "",
        };

        userEdited.userName = prompt("Editar Usuário:", user.userName);
        userEdited.fullName = prompt("Editar Nome Completo:", user.fullName);
        userEdited.password = prompt("Editar Senha:", user.password);
        userEdited.role = prompt("Editar Perfil:", user.role);

        await editUser(userEdited, user.id);
    };

    const filteredUsers = users.filter(
        (user) =>
            user.userName.toLowerCase().includes(filterText.toLowerCase()) ||
            user.role.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <Container>
            <Title>Gerenciamento de Usuários</Title>
            <InputContainer>
                <Input
                    type="text"
                    placeholder="Username"
                    value={newUser.userName}
                    onChange={(e) =>
                        setNewUser({ ...newUser, userName: e.target.value })
                    }
                />
                <Input
                    type="text"
                    placeholder="Fullname"
                    value={newUser.fullName}
                    onChange={(e) =>
                        setNewUser({ ...newUser, fullName: e.target.value })
                    }
                />
                <Input
                    type="text"
                    placeholder="Senha"
                    value={newUser.password}
                    onChange={(e) =>
                        setNewUser({ ...newUser, password: e.target.value })
                    }
                />
                <Input
                    type="text"
                    placeholder="Role"
                    value={newUser.role}
                    onChange={(e) =>
                        setNewUser({ ...newUser, role: e.target.value })
                    }
                />
                <Button onClick={handleAddUser}>+</Button>
                {/* <Button onClick={handleDeleteUsers}>-</Button> */}
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
                        <EditButton onClick={() => handleEditUser(user)}>
                            Editar
                        </EditButton>
                        <EditButton onClick={() => handleDeleteUser(user)}>
                            Deletar
                        </EditButton>
                        {user.userName} - {user.role}
                    </UserItem>
                ))}
            </UserList>
        </Container>
    );
};

// Estilização dos componentes
const Container = styled.div`
    padding: 20px;
    font-family: "Roboto", sans-serif;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
        0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
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
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
        0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
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
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
        0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    transition: background-color 0.3s;
    &:hover {
        background-color: #303f9f;
    }
    &:focus {
        outline: none;
    }
`;

export default Admin;
