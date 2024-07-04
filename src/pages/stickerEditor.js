import React, { useState, useEffect } from 'react';
import md5 from 'md5';
import styled from 'styled-components';

const StickerEditor = ({ isAuthor }) => {
  const [name, setName] = useState('');
  const [page, setPage] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [tag, setTag] = useState('');
  const [description, setDescription] = useState('');

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

export default StickerEditor;
