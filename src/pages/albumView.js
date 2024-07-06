import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchAlbum } from '../API';

const CollectorAlbumView = () => {
  const [albumData, setAlbumData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSticker, setSelectedSticker] = useState(null);

  const stickersPerPage = 12; // Número de figurinhas por página, ajuste conforme necessário

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const album = await fetchAlbum();
        setAlbumData(album.stickers); // Ajuste conforme a estrutura do seu álbum no backend
      } catch (error) {
        console.error('Erro ao carregar álbum:', error);
      }
    };

    fetchAlbumData();
  }, []);

  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < Math.ceil(albumData.length / stickersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleStickerClick = (sticker) => {
    setSelectedSticker(sticker);
    // Lógica para abrir a tela de detalhes da figurinha, como um modal ou um redirecionamento
  };

  const displayedStickers = albumData.slice(
    (currentPage - 1) * stickersPerPage,
    currentPage * stickersPerPage
  );

  return (
    <Container>
      <Header>
        <Button href="/user-form">Trocar Senha</Button>
        <Button href="sticker-editor">Adquirir Nova Figurinha</Button>
        <Button href=''>Sobre</Button>
      </Header>
      <AlbumCover>
        <h2>Capa do Álbum</h2>
        {/* Coloque a imagem da capa do álbum aqui */}
      </AlbumCover>
      <StickerGrid>
        {displayedStickers.map((sticker, index) => (
          <StickerItem
            key={index}
            onDoubleClick={() => handleStickerClick(sticker)}
          >
            <img src={sticker.image} alt={sticker.name} />
            <StickerInfo>
              <span>{sticker.number}</span>
              <span>{sticker.name}</span>
            </StickerInfo>
          </StickerItem>
        ))}
      </StickerGrid>
      <PaginationControls>
        <Button onClick={() => handlePageChange('prev')}>Página Anterior</Button>
        <Button onClick={() => handlePageChange('next')}>Próxima Página</Button>
      </PaginationControls>
    </Container>
  );
};

const Container = styled.div`
  padding: 40px 60px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const Button = styled.a`
  text-decoration: none;
  padding: 10px 20px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #303f9f;
  }
`;

const AlbumCover = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const StickerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const StickerItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  img {
    width: 100px;
    height: 100px;
  }
`;

const StickerInfo = styled.div`
  margin-top: 10px;
  text-align: center;
  span {
    display: block;
  }
`;

const PaginationControls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export default CollectorAlbumView;
