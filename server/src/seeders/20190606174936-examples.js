module.exports = {
  up: async (queryInterface) => {
    const records = [];
    records.push({
      questionId: 18,
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    });
    records.push({
      questionId: 18,
      text:
        'Eget felis eget nunc lobortis mattis aliquam faucibus purus. Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et netus. Ut aliquam purus sit amet. Bibendum enim facilisis gravida neque. Duis at consectetur lorem donec massa sapien. Duis ultricies lacus sed turpis tincidunt. Vitae turpis massa sed elementum tempus egestas sed sed. Amet risus nullam eget felis eget.',
    });
    records.push({
      questionId: 21,
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    });
    return queryInterface.bulkInsert('Examples', records);
  },
};
