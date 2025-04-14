import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notesApi } from "./notesApi";

const initialState = {
  notes: [],
  status: "idle",
  error: null,
};

export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (token) => {
    const notes = await notesApi.getNotes(token);
    return notes;
  }
);

export const addNewNote = createAsyncThunk(
  "notes/addNote",
  async ({ noteData, token }) => {
    const newNote = await notesApi.addNote(noteData, token);
    return newNote;
  }
);

export const removeNote = createAsyncThunk(
  "notes/deleteNote",
  async ({ noteId, token }) => {
    await notesApi.deleteNote(noteId, token);
    console.log(noteId);
    return noteId;
  }
);

export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async ({ noteId, noteData, token }) => {
    console.log(noteData);
    const updated = await notesApi.updateNote(noteId, noteData, token);

    return updated;
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewNote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewNote.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes.push(action.payload);
      })
      .addCase(addNewNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(removeNote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeNote.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes = state.notes.filter((note) => note._id !== action.payload);
        console.log(state.notes);
      })
      .addCase(removeNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateNote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.notes.findIndex(
          (note) => note._id === action.payload._id
        );
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setNotes } = notesSlice.actions;

export default notesSlice.reducer;
