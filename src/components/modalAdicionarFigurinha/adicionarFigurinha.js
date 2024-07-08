// src/components/modalAdicionarFigurinha/AdicionarFigurinha.js
import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const getTokenHeader = () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };
  return { headers };
};

const AdicionarFigurinha = ({ isOpen, onClose }) => {
  const [tag, setTag] = useState('');
  const [stickerData, setStickerData] = useState({
    name: '',
    page: '',
    number: '',
    image: ''
  });
  const [imageSrc, setImageSrc] = useState('');
  const [error, setError] = useState('');

  const handleTagChange = (e) => {
    setTag(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await api.get(`/sticker/byMd5/${tag}`, getTokenHeader());
      setStickerData(response.data);

      // Fetch image separately
      const imageResponse = await api.get(`/image/${tag}`, {
        responseType: 'blob',
        ...getTokenHeader()
      });
      const imageUrl = URL.createObjectURL(imageResponse.data);
      setImageSrc(imageUrl);

      setError('');
    } catch (error) {
      setError('Erro ao buscar figurinha. Verifique o tag e tente novamente.');
      setStickerData({
        name: '',
        page: '',
        number: '',
        image: ''
      });
      setImageSrc('');
    }
  };

  const handleAddSticker = async () => {
    try {
      await api.post('/sticker/add', { tag }, getTokenHeader());
      onClose();
    } catch (error) {
      setError('Erro ao adicionar figurinha ao álbum.');
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h2>Adicionar Nova Figurinha</h2>
          <button onClick={onClose}>Fechar</button>
        </ModalHeader>
        <ModalBody>
          <Input
            type="text"
            placeholder="Digite o tag da figurinha"
            value={tag}
            onChange={handleTagChange}
          />
          <Button onClick={handleSearch}>Buscar Figurinha</Button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <StickerInfo>
            <Input
              type="text"
              placeholder="Nome do Jogador"
              value={stickerData.name}
              readOnly
            />
            <Input
              type="text"
              placeholder="Página"
              value={stickerData.page}
              readOnly
            />
            <Input
              type="text"
              placeholder="Número da Figurinha"
              value={stickerData.number}
              readOnly
            />
            {imageSrc && (
              <img src={imageSrc} alt={stickerData.name} />
            )}
            <Button onClick={handleAddSticker}>Inserir no Álbum</Button>
          </StickerInfo>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AdicionarFigurinha;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;

  h2 {
    margin: 0;
  }

  button {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
  }
`;

const ModalBody = styled.div`
  margin-top: 20px;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #3f51b5;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #303f9f;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

const StickerInfo = styled.div`
  margin-top: 20px;

  img {
    width: 100px;
    height: 100px;
    margin-top: 10px;
  }
`;
