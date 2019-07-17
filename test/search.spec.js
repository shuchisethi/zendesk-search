const SEARCH = require('../src/search');
const SAMPLE_SEARCH_DATA = require('./fixtures/sample-search-data');
const searchItems = require('./fixtures/searchableItems');

describe('Get Searchable Items', () => {
  describe('When provided with input JSON files data', () => {
    const searchableFiles = ['users.json', 'tickets.json', 'organizations.json'];
    const searchObj = new SEARCH({ searchableFiles, fileContents: SAMPLE_SEARCH_DATA.Records });

    it('returns the searchable items for organizations', async () => {
      const searchableItems = await searchObj.getSearchableItems();
      expect(new Set(searchItems.organizations)).toEqual(new Set(searchableItems['2'].organizations));
    });

    it('returns the searchable items for users', async () => {
      const searchableItems = await searchObj.getSearchableItems();
      expect(new Set(searchItems.users)).toEqual(new Set(searchableItems['0'].users));
    });

    it('returns the searchable items for tickets', async () => {
      const searchableItems = await searchObj.getSearchableItems();
      expect(new Set(searchItems.tickets)).toEqual(new Set(searchableItems['1'].tickets));
    });
  });
});

describe('Search for searchTerm & searchValue', () => {
  const searchableFiles = ['users.json', 'tickets.json', 'organizations.json'];
  const searchObj = new SEARCH({ searchableFiles, fileContents: SAMPLE_SEARCH_DATA.Records });

  describe('When provided with an option to search a file that does not exist', () => {
    it('throws an exception', async () => {
      await expect(searchObj.search(4))
        .rejects
        .toThrow();
    });
  });

  describe('When search is requested without a searchTerm', () => {
    it('throws an exception', async () => {
      await expect(searchObj.search(0))
        .rejects
        .toThrow();
    });
  });

  describe('When search is done for a searchTerm and searchValue that does not exist', () => {
    it('returns false', async () => {
      const searchResults = await searchObj.search(0, 'name', 'John Doe');
      expect(searchResults).toBeFalsy();
    });
  });

  describe('When search is done for a searchTerm and searchValue that exists', () => {
    it('returns all the matching elements', async () => {
      const searchResults = await searchObj.search(0, 'name', 'Francisca Rasmussen');
      expect(searchResults['0']).toMatchObject({ name: 'Francisca Rasmussen' });
    });
  });

  describe('When search is done for a searchTerm that exists without a searchValue', () => {
    it('returns all the matching elements containing the searchTerm', async () => {
      const searchResults = await searchObj.search(0, 'created_at');
      searchResults.forEach((searchResult) => {
        expect(searchResult).toHaveProperty('created_at');
      });
    });
  });

  describe('When search is done for a searchValue of type Boolean', () => {
    it('returns the search results', async () => {
      const searchResults = await searchObj.search(2, 'shared_tickets', 'false');
      searchResults.forEach((searchResult) => {
        expect(searchResult).toMatchSnapshot({
          shared_tickets: false,
        });
      });
    });
  });

  describe('When search is done for a searchValue of type Object', () => {
    it('returns the search results', async () => {
      const searchResults = await searchObj.search(0, 'tags', 'Springville');
      searchResults.forEach((searchResult) => {
        expect(searchResult.tags).toContain('Springville');
      });
    });
  });
});
