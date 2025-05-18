import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchNotes,
  addNewNote,
  removeNote,
  updateNote,
} from "../features/notes/notesSlice";
import { logoutUser } from "../features/user/userSlice";
import { Pencil, Trash2, Plus, Home } from "lucide-react";

const Notes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { notes, status, error } = useSelector((state) => state.notes);
  const { user, token } = useSelector((state) => state.user);

  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [editNoteId, setEditNoteId] = useState(null);
  const [editNoteData, setEditNoteData] = useState({ title: "", content: "" });

  useEffect(() => {
    if (token) dispatch(fetchNotes(token));
  }, [dispatch, token]);

  const handleAddNote = () => {
    if (!newNote.title || !newNote.content) return;
    dispatch(addNewNote({ noteData: newNote, token }));
    setNewNote({ title: "", content: "" });
  };

  const handleDeleteNote = (id) => {
    dispatch(removeNote({ noteId: id, token }));
  };

  const handleEditNote = (note) => {
    setEditNoteId(note._id);
    setEditNoteData({ title: note.title, content: note.content });
  };

  const handleUpdateNote = () => {
    dispatch(updateNote({ noteId: editNoteId, noteData: editNoteData, token }));
    setEditNoteId(null);
    setEditNoteData({ title: "", content: "" });
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-12"
      style={{ backgroundImage: "url('/images/bg-image.jpg')" }}
    >
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl text-red-900">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            Hey,{" "}
            <span className="text-red-900">{user?.username || "User"}!</span>{" "}
          </h2>
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer hover:text-red-500 transition"
          >
            <Home size={16} />
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Logout
          </button>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-center">Your Notes</h2>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Title"
            className="px-4 py-2 rounded-md bg-white/20 placeholder-white text-purple-800 focus:outline-none overflow-hidden"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            style={{
              maxWidth: "100%",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          />
          <input
            type="text"
            placeholder="Content"
            className="px-4 py-2 rounded-md bg-white/20 placeholder-white text-purple-800 focus:outline-none"
            value={newNote.content}
            onChange={(e) =>
              setNewNote({ ...newNote, content: e.target.value })
            }
          />
          <button
            onClick={handleAddNote}
            className="col-span-full flex items-center justify-center gap-2 px-4 py-2 bg-black/80 hover:bg-black transition rounded-md text-white font-semibold"
          >
            <Plus size={18} />
            Add Note
          </button>
        </div>

        {status === "loading" && <p>Loading notes...</p>}
        {error && <p className="text-red-300">{error}</p>}

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white/20 backdrop-blur-lg p-4 rounded-lg shadow-md text-purple-800 relative"
            >
              {editNoteId === note._id ? (
                <>
                  <input
                    type="text"
                    value={editNoteData.title}
                    onChange={(e) =>
                      setEditNoteData({
                        ...editNoteData,
                        title: e.target.value,
                      })
                    }
                    className="w-full mb-2 bg-transparent border-b border-white pt-4 focus:outline-none"
                    style={{
                      maxWidth: "100%",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontSize: "1.5rem",
                    }}
                  />
                  <textarea
                    value={editNoteData.content}
                    onChange={(e) =>
                      setEditNoteData({
                        ...editNoteData,
                        content: e.target.value,
                      })
                    }
                    className="w-full bg-transparent border-b border-white focus:outline-none resize-none"
                    style={{
                      minHeight: "150px",
                      fontSize: "1.1rem",
                      lineHeight: "1.6",
                    }}
                  />
                  <button
                    onClick={handleUpdateNote}
                    className="mt-2 flex items-center justify-center gap-2 px-4 py-2 bg-black/80 hover:bg-black transition rounded-md text-white font-semibold"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <h3
                    className="text-2xl font-semibold mb-1 pt-2"
                    style={{
                      wordWrap: "break-word",
                      fontSize: "1.5rem",
                    }}
                  >
                    {note.title}
                  </h3>
                  <p
                    className="text-base mb-4"
                    style={{
                      wordWrap: "break-word",
                      fontSize: "1.1rem",
                      lineHeight: "1.6",
                    }}
                  >
                    {note.content}
                  </p>
                </>
              )}

              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => handleEditNote(note)}
                  className="text-purple-800 hover:text-yellow-300"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => handleDeleteNote(note._id)}
                  className="text-purple-800 hover:text-red-400"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;
