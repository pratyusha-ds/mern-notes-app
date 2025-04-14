const Note = require("../models/Note");

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = new Note({
      title,
      content,
      user: req.user._id,
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);

    if (!note || note.user.toString() !== req.user._id.toString()) {
      return res
        .status(404)
        .json({ message: "Note not found or not authorized" });
    }
    await note.deleteOne();
    res.json({ message: "Note removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const note = await Note.findById(id);

    if (!note || note.user.toString() !== req.user._id.toString()) {
      return res
        .status(404)
        .json({ message: "Note not found or not authorized" });
    }

    note.title = title || note.title;
    note.content = content || note.content;
    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getNotes, addNote, deleteNote, updateNote };
