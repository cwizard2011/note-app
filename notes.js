const fs = require('fs');

const fetchNotes = () => {
  try {
    const notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);  
  } catch (e) {
    return [];
  }

};

const saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

const addNote = (title, body) => {
  let notes = fetchNotes();
  let note = {
    title,
    body
  };
  const duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
  
};

const getAll = () => {
  return fetchNotes();
};
const getNote = (title) => {
  let notes = fetchNotes();
  let filteredNotes = notes.filter((note) => note.title === title);
  return filteredNotes[0];
};
const removeNote = (title) => {
  let notes = fetchNotes();
  const removableNotes = notes.filter((note) => note.title !== title);
  saveNotes(removableNotes);

  return notes.length !== removableNotes.length;
};

const logNote = (note) => {
  console.log('--');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
}
module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
}