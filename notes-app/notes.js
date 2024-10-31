const chalk = require("chalk");
const fs = require("fs");

function getNotes() {
  return "Your notes ...";
}

// Add note by title and body
const addNotes = (title, body) => {
  let notes = loadNotes();
  let duplicatedNotes = notes.find((note) => note.title === title);

  debugger
  
  
  if (duplicatedNotes) {
    console.log("Note already exists");
    return;
  }

  notes.push({ title, body });
  saveNotes(notes);
  console.log("new Note was added");
};

// Remove selected Note by title
const removeNotes = (title) => {
  let notes = loadNotes();
  if (!notes.length) {
    console.log(chalk.red("There are no notes in here currently"));
    return;
  }

  let newNotes = notes.filter((note) => note.title !== title);

  //  if old and new array have the same length we return
  if (notes.length === newNotes.length) {
    console.log(chalk.red("Note not found"));
    return;
  }

  saveNotes(newNotes);
  console.log(chalk.green("Note removed"));
};


// List all existing Notes
const listAllNotes = () => {
  const loadedNotes = loadNotes()
  console.log(chalk.inverse("Your notes"))
  
  if(!loadedNotes.length) {
    console.log(chalk.red("No notes to list"))
    return}

  loadedNotes.forEach(note => console.log(chalk.blue(note.title)))
}



// Read notes title and body
const readNote = (title) => {
  const notes = loadNotes()
  let toReadNote = notes.find(note => note.title === title)


  if (!toReadNote) {
    console.log(chalk.red.inverse("Note wasn't found"))
    return
  }

  console.log(`Note title : ${toReadNote.title}\nNote body : ${toReadNote.body}`)

}




// Save notes in notes.json file
const saveNotes = (notes) => {
  let dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

// Load notes to start using them, if they don't exist load []
const loadNotes = () => {
  try {
    let dataBuffer = fs.readFileSync("notes.json");
    let dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = { getNotes, addNotes, removeNotes, listAllNotes , readNote};
