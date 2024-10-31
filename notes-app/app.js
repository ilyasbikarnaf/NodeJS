const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes.js");

// console.log(chalk.blue("Whassap"));
// console.log(chalk.green("Success"));
// console.log(3, 534, "asdflaksdj");

// console.log(notes.getNotes())
//Create an adding Command
yargs.command({
  command: "add",
  describe: "adding a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "This is a description",
      type: "string",
      demandOption: true,
    },
  },
  handler: function (argv) {
    notes.addNotes(argv.title, argv.body);
  },
});

yargs.command({
  command: "remove",
  describe: "remove a note",
  builder: {
    title: {
      describe: "remove title",
      type: "string",
      demandOption: true,
    },
  },
  handler: function (argv) {
    notes.removeNotes(argv.title);
  },
});

yargs.command({
  command: "list",
  describe: "listing notes",
  handler: function () {
    notes.listAllNotes()
  },
});

yargs.command({
  command: "read",
  describe: "reading current notes",
  builder:{
    title : {
      demandOption : true,
      type : 'string',
      describe : "display titles and their body"
    }
  },
  handler: function (argv) {
    notes.readNote(argv.title)
  },
});

// const argv = yargs.argv
// console.log(process.argv)
// console.log(yargs.argv)
yargs.parse();
