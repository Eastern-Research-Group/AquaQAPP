'use strict';

class QAPP {
   constructor() {
   }

   generate(params) {
      return "params: " + JSON.stringify(params);
   }
}

const qapp = new QAPP();

module.exports = qapp;
