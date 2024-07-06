import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchAllUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

export const fetchAlbum = async () => {
  try {
    const response = await api.get('/album');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar álbum:', error);
    throw error;
  }
};

export const updateAlbum = async (albumData, albumImage) => {
  const formData = new FormData();
  formData.append('album_json', new Blob([JSON.stringify(albumData)], { type: 'application/json' }));
  formData.append('album_image', albumImage);

  try {
    const response = await api.put('/album', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar álbum:', error);
    throw error;
  }
};

export const createSticker = async (stickerData) => {
  try {
    const response = await api.post('/sticker', stickerData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar figurinha:', error);
    throw error;
  }
};

export const updateSticker = async (stickerId, stickerData) => {
  try {
    const response = await api.put(`/sticker/${stickerId}`, stickerData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar figurinha:', error);
    throw error;
  }
};

export default api;
