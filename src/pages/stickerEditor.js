import React, { useState, useEffect } from 'react';
import md5 from 'md5';
import styled from 'styled-components';
import { createSticker, updateSticker } from '../API';

const StickerEditor = () => {
  const [name, setName] = useState('');
  const [page, setPage] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [tag, setTag] = useState('');
  const [description, setDescription] = useState('');
  const [isNew, setIsNew] = useState(true); // Variável para determinar se é uma nova figurinha ou uma atualização
  const [selectedSticker, setSelectedSticker] = useState(null); // Estado para armazenar a figurinha selecionada para edição

  const isAuthor = localStorage.getItem('role') === 'AUTHOR';

  const handleCoverUpload = async (event) => {
    const file = event.target.files[0];
    setCoverImage(URL.createObjectURL(file));

    const hash = await generateHash(file);
    setTag(hash);
  };

  const generateHash = async (file) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        const buffer = reader.result;
        const hash = md5(buffer);
        resolve(hash);
      };
    });
  };

  useEffect(() => {
    if (coverImage) {
      (async () => {
        const hash = await generateHash(coverImage);
        setTag(hash);
      })();
    }
  }, [coverImage]);

  const handleSaveSticker = async () => {
    try {
      const stickerData = {
        sticker_image: coverImage,
        sticker_json: {
          name,
          page,
          tag,
          description,
        },
      };

      if (isAuthor) {
        if (isNew) {
          // Criação de nova figurinha
          const sticker = await createSticker(stickerData);
          console.log('Figurinha criada com sucesso:', sticker);
          // Lógica para sucesso
        } else {
          // Atualização de figurinha existente
          const sticker = await updateSticker(selectedSticker.id, stickerData);
          console.log('Figurinha atualizada com sucesso:', sticker);
          // Lógica para sucesso
        }
      } else {
        console.error('Você não tem permissão para salvar figurinhas.');
        // Lógica para permissão negada
      }
    } catch (error) {
      console.error('Erro ao salvar figurinha:', error);
      // Lógica para tratamento de erro
    }
  };

  return (
    <Container>
      <EditorSection>
        <h2>{isAuthor ? 'Editar Figurinha' : 'Visualizar Figurinha'}</h2>
        <FormField>
          <InputLabel>Nome do Jogador:</InputLabel>
          <Input
            type="text"
            placeholder="Nome do Jogador"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isAuthor}
          />
        </FormField>
        <FormField>
          <InputLabel>Página:</InputLabel>
          <Select
            value={page}
            onChange={(e) => setPage(e.target.value)}
            disabled={!isAuthor}
          >
            <option value="">Selecione a Página</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </Select>
        </FormField>
        {isAuthor && (
          <FormField>
            <InputLabel>Upload Capa:</InputLabel>
            <FileInput
              type="file"
              onChange={handleCoverUpload}
            />
          </FormField>
        )}
        {coverImage && (
          <ImagePreview src={coverImage} alt="Capa" />
        )}
        <FormField>
          <InputLabel>Tag:</InputLabel>
          <Input
            type="text"
            value={tag}
            readOnly
          />
        </FormField>
        <FormField>
          <InputLabel>Descrição:</InputLabel>
          <TextArea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={!isAuthor}
          />
        </FormField>
        {isAuthor && (
          <Button onClick={handleSaveSticker}>
            {isNew ? 'Salvar Figurinha' : 'Atualizar Figurinha'}
          </Button>
        )}
      </EditorSection>
      <PreviewSection>
        <h2>Preview</h2>
        {coverImage && (
          <ImagePreviewLarge src={coverImage} alt="Capa" />
        )}
      </PreviewSection>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  display: flex;
`;

const EditorSection = styled.div`
  flex: 1;
`;

const PreviewSection = styled.div`
  margin-left: 20px;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FileInput = styled.input`
  display: block;
  margin-top: 5px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  width: 100%;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  margin-top: 10px;
`;

const ImagePreviewLarge = styled.img`
  width: 300px;
  height: 300px;
  margin-top: 10px;
`;

const Button = styled.button`
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

export default StickerEditor;
