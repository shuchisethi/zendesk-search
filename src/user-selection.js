const READLINE = require('readline');
const PATH = require('path');

const rl = READLINE.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function welcomePrompt() {
  return new Promise((resolve) => {
    rl.question('\n\nWelcome to Zendesk Search \n Type \'quit\' to exit at anytime, Press \'Enter\' to continue \n', (answer) => {
      resolve(answer);
    });
  });
}

function searchOptions() {
  return new Promise((resolve) => {
    const options = `\n\nSelect search options: 
             * Press 1 to search Zendesk 
             * Press 2 to view a list of searchable items
             * Type 'quit' to exit \n`;
    rl.question(options, (answer) => {
      resolve(answer);
    });
  });
}


function fileToSearch(searchableFiles) {
  return new Promise((resolve) => {
    let options = '\nSelect ';
    searchableFiles.forEach((file, index) => {
      options += `\n ${index + 1}) ${PATH.parse(file).name} `;
    });
    options += ' \n';
    rl.question(options, (answer) => {
      resolve(answer);
    });
  });
}

function termToSearch() {
  return new Promise((resolve) => {
    const options = 'Enter Search term \n';
    rl.question(options, (answer) => {
      resolve(answer);
    });
  });
}

function valueToSearch() {
  return new Promise((resolve) => {
    const options = 'Enter Search value \n';
    rl.question(options, (answer) => {
      resolve(answer);
    });
  });
}

async function searchInputsFromUser(filesList) {
  const searchFile = await fileToSearch(filesList);
  if (searchFile > 0 && searchFile <= filesList.length) {
    const searchTerm = await termToSearch();
    if (searchTerm) {
      const searchVal = await valueToSearch();
      return { searchFile, searchTerm, searchVal };
    }
  }
  return false;
}

function closeReadStream() {
  return rl.close();
}

module.exports = {
  welcomePrompt,
  searchOptions,
  closeReadStream,
  searchInputsFromUser,
};
