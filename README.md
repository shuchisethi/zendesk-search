# Zendesk Search

- Prompts user for various search options
- Looks up the search requested(search term & search value) in datafiles and displays the search results on the console

## Tech stack
* [Node.js](https://github.com/nodejs)
* [JEST](https://jestjs.io/)
* [Eslint](https://eslint.org/)

## Setup
This application is developed and tested on v10.16.0(latest LTS version) of Node.js

### Node.js setup

Verify the node version using - ```node --version```

#### Installing Node.js on OSX or Linux
If node isn't install, install is using nvm
- Download the nvm install script via cURL:

`curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash`

- Reload system environment ```source ~/.bashrc```

- Verify that nvm was installed correctly ```nvm --version```

- Install the latest LTS version of Node.js
```nvm install --lts```

- Use the latest LTS version
```nvm use --lts```

#### Installing Node.js on Windows
https://nodejs.org/en/download/

#### Cloning the Repository
```git clone https://github.com/shuchisethi/zendesk-search.git```

Install Node dependencies ```npm install```

Running the search program ```npm run search```

## Testing
```
npm run test
```

## Linting
```
npm run lint
```

## Assumptions
- The program assumes that datafiles are valid JSON and sit in folder ./inputFiles/
- Currently search is supported within three datafiles only - ./inputFiles/organizations.json, ./inputFiles/tickets.json, ./inputFiles/users.json
- All the three files need to exist for program to work
- The elements of each Object in datafiles remain the same
- Search is case-sensitive

## How it works?
- Displays the welcome message to user 

<kbd>![image](https://user-images.githubusercontent.com/4567768/61338739-40eb0300-a87e-11e9-9574-12cc3ea2bc95.png)</kbd>

- If user 'Enters' to proceed, user is shown options to select

<kbd>![image](https://user-images.githubusercontent.com/4567768/61338793-7bed3680-a87e-11e9-8361-0f6cad9eb3c6.png)</kbd>

- User selects option 1

<kbd>![image](https://user-images.githubusercontent.com/4567768/61338922-e4d4ae80-a87e-11e9-9a01-15b5a02bc9ea.png)</kbd>

- User selects option 2

<kbd>![image](https://user-images.githubusercontent.com/4567768/61338849-b3f47980-a87e-11e9-85a3-cb3f9a921be2.png)</kbd>

- User types - quit

<kbd>![image](https://user-images.githubusercontent.com/4567768/61338973-10579900-a87f-11e9-9675-d800d944d64b.png)</kbd>
