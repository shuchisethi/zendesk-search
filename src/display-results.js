/* eslint-disable no-console */

function displaySearchableItems(searchableItems) {
  if (searchableItems.length) {
    for (let i = 0; i < searchableItems.length; i += 1) {
      for (const key in searchableItems[i]) { // eslint-disable-line no-restricted-syntax, guard-for-in
        let outputStr = '\n------------------------\n';
        outputStr += `\nSearch ${key} with \n`;
        outputStr += searchableItems[i][key].join('\n');
        console.log(outputStr);
      }
    }
  } else {
    console.log('No searchable elements found!!');
  }
}

function displayResults(searchResults) {
  if (searchResults.length) {
    console.log(`\n\n Found ${searchResults.length} item(s) \n\n`);
    searchResults.forEach((item) => {
      console.log('------------------------------------------');
      for (const key in item) { // eslint-disable-line  no-restricted-syntax, guard-for-in
        console.log(`${key} ---- ${item[key]}`);
      }
    });
  } else {
    console.log('No results found');
  }
}

module.exports = {
  displaySearchResults: displayResults,
  displaySearchableItems,
};
