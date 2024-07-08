import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

const getTokenHeader = () => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    return { headers };
};

export const fetchAllUsers = async () => {
    try {
        const response = await api.get("/users", getTokenHeader());
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        throw error;
    }
};

export const getSpecifiedUser = async (userId) => {
  try {
    
      const response = await api.get(`/users/${localStorage.getItem("id")}`, getTokenHeader());
      return response.data;
  } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      throw error;
  }
};

export const createUser = async (newUser) => {
    try {
        const response = await api.post("/users", newUser, getTokenHeader());
        return response.data;
    } catch (error) {
        console.error("Erro ao criar figurinha:", error);
        throw error;
    }
};

export const editUser = async (userToEdit, userId) => {
    try {
        const response = await api.put(
            `/users/${userId}`,
            userToEdit,
            getTokenHeader()
        );
        return response.data;
    } catch (error) {
        console.error("Erro ao criar figurinha:", error);
        throw error;
    }
};

export const removeUser = async (newUserId) => {
    try {
        const response = await api.delete(
            `/users/${newUserId}`,
            getTokenHeader()
        );
        console.log(response.data)
        return [];
    } catch (error) {
        console.error("Erro ao criar figurinha:", error);
        throw error;
    }
};

export const fetchStickers = async () => {
    try {
        const response = await api.get(`/sticker/collectedAll/${localStorage.getItem("id")}`, getTokenHeader());
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar álbum:", error);
        throw error;
    }
};

export const fetchAlbum = async () => {
    try {
        const response = await api.get("/album", getTokenHeader());
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar álbum:", error);
        throw error;
    }
};

export const updateAlbum = async (albumData, albumImage) => {
    const formData = new FormData();
    formData.append(
        "album_json",
        new Blob([JSON.stringify(albumData)], { type: "application/json" })
    );
    formData.append("album_image", albumImage);

    try {
        const response = await api.put("/album", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar álbum:", error);
        throw error;
    }
};

export const createSticker = async (stickerData) => {
    try {
        const response = await api.post("/sticker", stickerData);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar figurinha:", error);
        throw error;
    }
};

export const updateSticker = async (stickerId, stickerData) => {
    try {
        const response = await api.put(`/sticker/${stickerId}`, stickerData);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar figurinha:", error);
        throw error;
    }
};

export default api;
