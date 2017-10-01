/*eslint no-console: "off"*/
/*eslint no-undef: "off"*/
/*eslint-env es6*/
/*eslint strict: ["error", "global"]*/
'use strict';

const fs = require('fs');

var fetchNotes = () => {
  try {
    //try if file exist and read from it
    var noteString = fs.readFileSync('notes-data.json');
    return JSON.parse(noteString);
  } catch (e) {
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };

  //check for duplicate notes and filter them if exist in the file
  var duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var getAll = () => {
  return fetchNotes();
};

var getNote = (title) => {
  //fetch the notes
  var notes = fetchNotes();
  //node.filter to return title === title passed as argument [0 - not found or 1 the note we want]
  var getFilteredNotes = notes.filter((note) => note.title === title);
  //return the arr[0] from the filter
  return getFilteredNotes[0];
  console.log(`Getting title: ${title}`);
};

var removeNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
};

var logNote = (note) => {
  console.log('--');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
}
