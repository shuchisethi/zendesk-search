const SEARCH = require('../src');
const USER_SELECTION = require('../src/user-selection');
const searchItems = require('./fixtures/searchableItems');
const HELPER = require('./spec-helper');

describe('main', () => {
  beforeEach(() => jest.resetModules());

  describe('When a user types \'quit\' on seeing the welcome message', () => {
    it('exits the process', async () => {
      const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {
        throw new Error('Mock');
      });
      await HELPER.mockWelcomePrompt('quit');
      await SEARCH.main();
      expect(mockExit).toBeCalled();
    });
  });

  describe('When user opts to proceed with Zendesk search', () => {
    it('displays next set of options to select', async () => {
      await HELPER.mockSearchOptions('quit');
      await HELPER.mockWelcomePrompt('1');
      await SEARCH.main(true, true);
      expect(USER_SELECTION.searchOptions).toHaveBeenCalled();
    });
  });

  describe('When user types \'quit\' on seeing the search options', () => {
    it('exits the process', async () => {
      await HELPER.mockSearchOptions('quit');
      const mockQuit = jest.spyOn(process, 'exit').mockImplementation(() => {
        throw new Error('Mock');
      });
      await HELPER.mockWelcomePrompt('1');
      await SEARCH.main(false, true);
      expect(mockQuit).toBeCalled();
    });
  });
});

describe('View list of searchable items', () => {
  let outputData;
  beforeEach(async () => {
    function consoleLog(inputs) {
      outputData += inputs;
    }
    console.log = jest.fn(consoleLog); // eslint-disable-line no-console
    await HELPER.mockWelcomePrompt('1');
    await HELPER.mockSearchOptions('2');
  });

  afterEach(() => {
    outputData = '';
    jest.resetModules();
  });


  describe('When user selects option - 2) view a list of searchable items', () => {
    it('displays the searchable items on the console', async () => {
      await SEARCH.main(true, true);
      expect(outputData).toMatch(/Search organizations with/);
      expect(outputData).toMatch(/Search users with/);
      expect(outputData).toMatch(/Search tickets with/);
    });

    it('displays the searchable items for users, tickets and organizations', async () => {
      await SEARCH.main(true, true);
      const outputArr = outputData.split('\n------------------------\n');
      const usersArr = outputArr['1'].split('\n');
      usersArr.splice(0, 2);
      expect(new Set(searchItems.users)).toEqual(new Set(usersArr));

      const ticketsArr = outputArr['2'].split('\n');
      ticketsArr.splice(0, 2);
      expect(new Set(searchItems.tickets)).toEqual(new Set(ticketsArr));

      const organizationArr = outputArr['3'].split('\n');
      organizationArr.splice(0, 2);
      expect(new Set(searchItems.organizations)).toEqual(new Set(organizationArr));
    });
  });
});

describe('Search Zendesk', () => {
  let outputData;
  beforeEach(async () => {
    function consoleLog(inputs) {
      outputData += inputs;
    }
    console.log = jest.fn(consoleLog); // eslint-disable-line no-console

    await HELPER.mockWelcomePrompt('1');
    await HELPER.mockSearchOptions('1');
  });

  afterEach(() => {
    outputData = '';
    jest.resetModules();
  });


  describe('When user searches for a searchTerm & searchValue that exists', () => {
    it('displays the matching elements', async () => {
      await HELPER.mockSearchInputsFromUser({ searchFile: 1, searchTerm: 'locale', searchVal: 'en-AU' });
      await SEARCH.main(true, true);
      expect(outputData).toMatch(/locale ---- en-AU/);
    });
  });

  describe('When search is done for a searchTerm and searchValue that does not exist', () => {
    it('displays \'No results found\' message to the user', async () => {
      await HELPER.mockSearchInputsFromUser({ searchFile: 1, searchTerm: 'doesNotExist', searchVal: 'doesNotExist' });
      await SEARCH.main(true, true);
      expect(outputData).toMatch(/No results found/);
    });
  });

  describe('When search is done for empty value ', () => {
    it('returns all the items with the searchTerm', async () => {
      await HELPER.mockSearchInputsFromUser({ searchFile: 1, searchTerm: 'created_at' });
      await SEARCH.main(true, true);
      expect(outputData).toMatch(/created_at/);
      const countOfSearchValue = (outputData.match(/created_at/g) || []).length;
      expect(countOfSearchValue).toBe(77);
    });
  });

  describe('When search is done for a searchValue of type Boolean', () => {
    it('returns the search results', async () => {
      await HELPER.mockSearchInputsFromUser({ searchFile: 3, searchTerm: 'shared_tickets', searchVal: 'false' });
      await SEARCH.main(true, true);
      expect(outputData).toMatch(/shared_tickets ---- false/);
      expect(outputData).not.toMatch(/shared_tickets ---- true/);
    });
  });

  describe('When search is done for a searchValue of type Object', () => {
    it('returns the search results', async () => {
      await HELPER.mockSearchInputsFromUser({ searchFile: 2, searchTerm: 'tags', searchVal: 'Iowa' });
      await SEARCH.main(true, true);
      expect(outputData).toMatch(/tags/);
      expect(outputData).toMatch(/Iowa/);
    });
  });

  describe('when search is done for a searchValue of type Integer', () => {
    it('returns the search results', async () => {
      await HELPER.mockSearchInputsFromUser({ searchFile: 3, searchTerm: '_id', searchVal: '101' });
      await SEARCH.main(true, true);
      expect(outputData).toMatch(/_id ---- 101/);
    });
  });

  describe('When search is done for searchTerm and searchValue which have related entities', () => {
    it('returns the search results with related entities', async () => {
      await HELPER.mockSearchInputsFromUser({ searchFile: 1, searchTerm: '_id', searchVal: '1' });
      await SEARCH.main(true, true);
      expect(outputData).toMatch(/organization_name/);
      expect(outputData).toMatch(/ticket_0/);
    });
  });
});
