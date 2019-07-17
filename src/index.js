/* eslint-disable no-console */
const PATH = require('path');
const USER_SELECTION = require('./user-selection');
const HELPER = require('./common/helper');
const SEARCH = require('./search');
const DISPLAY_RESULTS = require('./display-results');

const searchableFiles = ['./inputFiles/users.json', './inputFiles/tickets.json', './inputFiles/organizations.json'];
let fileContents;
let searchHelper;

async function main(showWelcomeMsg = true, test = false) {
  try {
    if (showWelcomeMsg) {
      const userResp = await USER_SELECTION.welcomePrompt();
      if (userResp === 'quit') {
        USER_SELECTION.closeReadStream();
        process.exit();
      }
    }
    const userSelection = await USER_SELECTION.searchOptions();

    fileContents = fileContents || await HELPER.readFiles(searchableFiles);
    searchHelper = searchHelper || new SEARCH({ searchableFiles, fileContents });

    switch (userSelection) {
      case '1': { // user opts to search
        const userSearchInputs = await USER_SELECTION.searchInputsFromUser(searchableFiles);
        if (userSearchInputs) {
          const fileToSearch = (userSearchInputs.searchFile - 1);
          console.log(`Searching ${PATH.parse(searchableFiles[fileToSearch]).name} for '${userSearchInputs.searchTerm}' with a value of '${userSearchInputs.searchVal}'`);

          await searchHelper.search(fileToSearch, userSearchInputs.searchTerm, userSearchInputs.searchVal).then((searchResults) => {
            DISPLAY_RESULTS.displaySearchResults(searchResults);
          });
        } else {
          console.log('Invalid Input!!');
        }
        break;
      }
      case '2': // user opts to see searchable items
        await searchHelper.getSearchableItems(searchableFiles).then(async (items) => {
          DISPLAY_RESULTS.displaySearchableItems(items);
        });
        break;
      case 'quit':
        USER_SELECTION.closeReadStream();
        process.exit(0);
        break;
      default:
        console.log('Invalid input!!');
        break;
    }
    if (!test) {
      main(false);
    }
  } catch (e) {
    console.log(`Exception: ${e}`);
    //process.exit(1);
  }
}

module.exports = {
  main,
  searchableFiles,
};
