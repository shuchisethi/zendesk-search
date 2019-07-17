const PATH = require('path');
const SEARCH_HELPER = require('./search-related-entities');

class Search {
  constructor(options) {
    this.searchableFiles = options.searchableFiles;
    this.fileContents = options.fileContents;
  }

  async getSearchableItems() {
    try {
      return this.fileContents.map((content, index) => {
        if (content.length) {
          const fileName = PATH.parse(this.searchableFiles[index]).name;
          return { [fileName]: Object.keys(content['0']) };
        }
        return false;
      });
    } catch (err) {
      throw new Error(err);
    }
  }


  async search(fileToSearch, searchTerm, searchVal = '') {
    try {
      if (typeof fileToSearch === 'undefined' || typeof searchTerm === 'undefined') {
        throw new Error('Either of search inputs not provided - fileToSearch, searchTerm');
      }
      if (typeof this.searchableFiles[fileToSearch] === 'undefined') {
        throw new Error('Invalid value of fileToSearch provided');
      }

      const searchedItems = this.fileContents[fileToSearch].filter((obj) => {
        if (searchTerm in obj) {
          if (searchVal !== '') {
            if (typeof (obj[searchTerm]) === 'object') {
              return ((obj[searchTerm].includes(searchVal)) ? obj : null);
            }
            return ((obj[searchTerm].toString() === searchVal) ? obj : null);
          }
          return obj;
        }
        return false;
      });

      if (searchedItems.length) {
        const searchHelper = new SEARCH_HELPER({ fileToSearch, fileContents: this.fileContents, searchedItems });
        searchHelper.searchRelatedEntities(fileToSearch, searchedItems, this.fileContents);
        return searchedItems;
      }
      return false;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = Search;
