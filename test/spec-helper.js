const USER_SELECTION = require('../src/user-selection');

async function mockWelcomePrompt(resolveWithVal = '') {
  jest.spyOn(USER_SELECTION, 'welcomePrompt').mockImplementation(() => new Promise((resolve) => {
    resolve(resolveWithVal);
  }));
}

async function mockSearchOptions(option) {
  jest.spyOn(USER_SELECTION, 'searchOptions').mockImplementation(() => new Promise((resolve) => {
    resolve(option);
  }));
}

async function mockSearchInputsFromUser(option) {
  jest.spyOn(USER_SELECTION, 'searchInputsFromUser').mockImplementation(() => new Promise((resolve) => {
    resolve(option);
  }));
}

module.exports = {
  mockSearchInputsFromUser,
  mockSearchOptions,
  mockWelcomePrompt,
};
