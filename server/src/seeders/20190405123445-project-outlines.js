'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    var records = [];
    records.push({
      projectId: '1',
      outlineNumber: '1',
      outlineLevel: '1',
      outlineLabel: 'Prepared By',
      outlineSort: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      projectId: '1',
      outlineNumber: '2',
      outlineLevel: '1',
      outlineLabel: 'Prepared For',
      outlineSort: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      projectId: '1',
      outlineNumber: '3',
      outlineLevel: '1',
      outlineLabel: 'Project Organization/Personnel',
      outlineSort: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      projectId: '1',
      outlineNumber: '4',
      outlineLevel: '1',
      outlineLabel: 'Problem Definition/Background',
      outlineSort: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      projectId: '1',
      outlineNumber: '5',
      outlineLevel: '1',
      outlineLabel: 'Project Tasks',
      outlineSort: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      projectId: '1',
      outlineNumber: '6',
      outlineLevel: '1',
      outlineLabel: 'Project Schedule',
      outlineSort: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      projectId: '1',
      outlineNumber: '7',
      outlineLevel: '1',
      outlineLabel: 'Water Quality Concerns',
      outlineSort: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      projectId: '1',
      outlineNumber: '8',
      outlineLevel: '1',
      outlineLabel: 'Monitoring Locations',
      outlineSort: 8,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      projectId: '1',
      outlineNumber: '9',
      outlineLevel: '1',
      outlineLabel: 'Parameters',
      outlineSort: 9,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    records.push({
      projectId: '1',
      outlineNumber: '10',
      outlineLevel: '1',
      outlineLabel: 'Sample Design',
      outlineSort: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return queryInterface.bulkInsert('ProjectOutlines', records);
  }
};
