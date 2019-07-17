class SearchRelatedEntities {
  constructor(options) {
    this.fileToSearch = options.fileToSearch;
    this.fileContents = options.fileContents;
    this.searchedItems = options.searchedItems;
    this.userObj = options.fileContents['0'];
    this.ticketObj = options.fileContents['1'];
    this.organisationObj = options.fileContents['2'];
  }

  findTicketsOfUser(userId) {
    const matchingObj = this.ticketObj.filter(obj => (obj.submitter_id === userId));
    if (matchingObj) {
      return matchingObj.map(obj => obj.subject);
    }
    return false;
  }

  findTicketsOfOrganization(organizationId) {
    const matchingObj = this.ticketObj.filter(obj => (obj.organization_id === organizationId));
    if (matchingObj) {
      return matchingObj.map(obj => obj.subject);
    }
    return false;
  }

  findUsersOfOrganization(organizationId) {
    const matchingObj = this.userObj.filter(obj => (obj.organization_id === organizationId));
    if (matchingObj) {
      return matchingObj.map(obj => obj.name);
    }
    return false;
  }

  findOrganisationName(organisationId) {
    const searchedObj = this.organisationObj.find(obj => (obj._id === organisationId));
    if (searchedObj) {
      return searchedObj.name;
    }
    return false;
  }

  findUserName(userId) {
    const searchedObj = this.userObj.find(obj => (obj._id === userId));
    if (searchedObj) {
      return searchedObj.name;
    }
    return false;
  }


  searchRelatedEntities() {
    switch (this.fileToSearch) {
      case 0: // users
        this.searchedItems.map((item) => {
          if ('organization_id' in item) {
            const organizationName = this.findOrganisationName(item.organization_id);
            if (organizationName) { item.organization_name = organizationName; }
          }
          const ticketsArr = this.findTicketsOfUser(item._id);
          if (ticketsArr.length) {
            for (let i = 0; i < ticketsArr.length; i += 1) {
              const keyName = `ticket_${i}`;
              item[keyName] = ticketsArr[i];
            }
          }
          return false;
        });
        break;
      case 1: // tickets
        this.searchedItems.map((item) => {
          if ('submitter_id' in item) {
            const userName = this.findUserName(item.submitter_id);
            if (userName) { item.user_id = userName; }
          }
          if ('organization_id' in item) {
            const organizationName = this.findOrganisationName(item.organization_id);
            if (organizationName) { item.organization_name = organizationName; }
          }
          return false;
        });
        break;
      case 2: // organizations
        this.searchedItems.map((item) => {
          const ticketsArr = this.findTicketsOfOrganization(item._id);
          if (ticketsArr.length) {
            for (let i = 0; i < ticketsArr.length; i += 1) {
              const keyName = `ticket_${i}`;
              item[keyName] = ticketsArr[i];
            }
          }
          const usersArr = this.findUsersOfOrganization(item._id);
          if (usersArr.length) {
            for (let i = 0; i < usersArr.length; i += 1) {
              const keyName = `user_${i}`;
              item[keyName] = usersArr[i];
            }
          }
          return false;
        });
        break;
      default:
        break;
    }
  }
}


module.exports = SearchRelatedEntities;
