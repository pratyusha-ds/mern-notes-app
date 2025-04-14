import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const getNotes = async (token) => {
  const res = await axios.get(`${baseUrl}/notes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const addNote = async (noteData, token) => {
  const res = await axios.post(`${baseUrl}/notes`, noteData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const deleteNote = async (noteId, token) => {
  const res = await axios.delete(`${baseUrl}/notes/${noteId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const updateNote = async (noteId, updatedNote, token) => {
  const res = await axios.put(`${baseUrl}/notes/${noteId}`, updatedNote, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const notesApi = {
  getNotes,
  addNote,
  deleteNote,
  updateNote,
};
