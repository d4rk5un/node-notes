/*eslint no-console: "off"*/
/*eslint no-undef: "off"*/
/*eslint-env es6*/
/*eslint strict: ["error", "global"]*/
'use strict';

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const bodyOption = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
};

const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};

//parsing arguments easier
const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOption
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: titleOptions
  })
  .command('remove', 'Remove a note', {
    title: titleOptions
  })
  .help()
  .argv;

//using command line arguments to pass data in our app
var command = argv._[0];

//run different command depending on what user wants to use
if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Note created');
    notes.logNote(note);
  } else {
    console.log('Note title already exist');
  }
} else if (command === 'list') {
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'read') {
  var note = notes.getNote(argv.title);
  if (note) {
    console.log('Note read');
    notes.logNote(note);
  } else {
    console.log('Note not found');
  }

} else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title)
  var message = noteRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);
} else {
  console.log('Command not recongnized');
}

//fetching node, removing node
//read, remove

//getNote func which takes title
//log - 'Getting title' + title

//removeNote title
