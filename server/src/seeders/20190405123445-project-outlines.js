'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    var records = [];
    records.push({
      projectId: '1',
      outlineNumber: '1.0',
      outlineLevel: '1',
      outlineLabel: 'Project Management',
      outlineSort: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      projectId: '1',
      outlineNumber: '1.1',
      outlineLevel: '2',
      outlineLabel: 'Concern Selection',
      outlineSort: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      projectId: '1',
      outlineNumber: '1.2',
      outlineLevel: '2',
      outlineLabel: 'Title and Approval Page',
      outlineSort: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      projectId: '1',
      outlineNumber: '2',
      outlineLevel: '1',
      outlineLabel: 'Data Generation',
      outlineSort: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      projectId: '1',
      outlineNumber: '2.1',
      outlineLevel: '2',
      outlineLabel: 'Pollutants',
      outlineSort: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return queryInterface.bulkInsert('ProjectOutlines', records);
  }
};
