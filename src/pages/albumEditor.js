import React, { useState } from 'react';
import styled from 'styled-components';

const AlbumEditor = () => {
  const [albumName, setAlbumName] = useState('');
  const [pages, setPages] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [stickers, setStickers] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [selectedStickerIndex, setSelectedStickerIndex] = useState(null);

  const handleCoverUpload = (event) => {
    const file = event.target.files[0];
    setCoverImage(URL.createObjectURL(file));
  };

  const handleAddSticker = () => {
    const name = prompt('Nome do jogador:');
    const page = prompt('Página:');
    if (name && page) {
      const newSticker = { id: stickers.length + 1, name, page: parseInt(page) || 1 };
      setStickers([...stickers, newSticker]);
    }
  };

  const handleEditSticker = () => {
    if (selectedStickerIndex !== null) {
      const name = prompt('Nome do jogador:', stickers[selectedStickerIndex].name);
      const page = prompt('Página:', stickers[selectedStickerIndex].page);
      if (name && page) {
        const updatedStickers = stickers.map((sticker, i) =>
          i === selectedStickerIndex ? { ...sticker, name, page: parseInt(page) || 1 } : sticker
        );
        setStickers(updatedStickers);
      }
    } else {
      alert('Selecione um item para editar.');
    }
  };

  const handleDeleteAllStickers = () => {
    if (window.confirm('Tem certeza que deseja remover todas as figurinhas?')) {
      setStickers([]);
    }
  };

  const handleSelectSticker = (index) => {
    setSelectedStickerIndex(index);
  };

  const handlePageInputChange = (event) => {
    const value = event.target.value.replace(/\D/g, ''); // Aceitar somente números
    setPages(value === '' ? '' : parseInt(value)); // Converter para número ou manter vazio
  };

  const filteredStickers = stickers.filter(sticker =>
    sticker.name.includes(filterText)
  );

  return (
    <Container>
      <Section>
        <h2>Editar Álbum</h2>
        <Row>
          <Input
            type="text"
            placeholder="Nome do Álbum"
            value={albumName}
            onChange={(e) => setAlbumName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Páginas"
            value={pages === '' ? '' : pages}
            onChange={handlePageInputChange}
          />
          <UploadButton htmlFor="coverUpload">
            Upload Capa
            <input
              type="file"
              onChange={handleCoverUpload}
              style={{ display: 'none' }}
              id="coverUpload"
            />
          </UploadButton>
          {coverImage && <CoverImage src={coverImage} alt="Capa" />}
        </Row>
      </Section>
      <Section>
        <h2>Figurinhas</h2>
        <Row>
          <Button onClick={handleAddSticker}>+</Button>
          {stickers.length > 0 && (
            <Button onClick={handleEditSticker}>Editar</Button>
          )}
          <Input
            type="text"
            placeholder="Filtrar figurinhas"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <FilterButton>🔎</FilterButton>
          <Button onClick={handleDeleteAllStickers}>Deletar</Button>
        </Row>
        <StickerTable>
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Página</th>
            </tr>
          </thead>
          <tbody>
            {filteredStickers.map((sticker, index) => (
              <tr
                key={index}
                onClick={() => handleSelectSticker(index)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: selectedStickerIndex === index ? '#f0f0f0' : 'transparent'
                }}
              >
                <td>{String(sticker.id).padStart(2, '0')}</td>
                <td>{sticker.name}</td>
                <td>{sticker.page}</td>
              </tr>
            ))}
          </tbody>
        </StickerTable>
      </Section>
    </Container>
  );
};

// Estilização dos componentes
const Container = styled.div`
  padding: 20px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin-right: 10px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const UploadButton = styled.label`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #3f51b5;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #303f9f;
  }
`;

const CoverImage = styled.img`
  width: 100px;
  margin-left: 10px;
`;

const Button = styled.button`
  padding: 10px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  background-color: #3f51b5;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #303f9f;
  }
`;

const FilterButton = styled(Button)`
  margin-left: auto;
`;

const StickerTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  th, td {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: left;
  }
`;

export default AlbumEditor;
