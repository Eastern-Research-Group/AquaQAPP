'use strict';

var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');
var fs = require('fs');
var path = require('path');

class QAPP {
   constructor() {
   }

   generate(request,response) {
      //return "params: " + JSON.stringify(params);

      //Load the docx file as a binary
      var content = fs
         .readFileSync(path.resolve(__dirname + "/../templates/massbays", 'input.docx'), 'binary');

      var zip = new JSZip(content);

      var doc = new Docxtemplater();
      doc.loadZip(zip);

      //set the templateVariables
      doc.setData({
         first_name: 'John',
         last_name: 'Doe',
         phone: '0652455478',
         description: 'New Website'
      });

      try {
         // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
         doc.render()
      }
      catch (error) {
         var e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties,
         }
         console.log(JSON.stringify({ error: e }));
         // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
         throw error;
      }

      var buf = doc.getZip()
         .generate({ type: 'nodebuffer' });

      // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
      //fs.writeFileSync(path.resolve(__dirname + "/../public/output/", 'output.docx'), buf);

      response.type('application/octet-stream');
      response.header('Content-type', 'application/octet-stream');
      response.header('Content-disposition', 'inline; filename=' + "output.docx");

      return response.status(200).send(buf);

      //response.send("output available @ <a href='" + request.protocol + "://" + request.hostname + ":" + request.socket.localPort + "/output/output.docx" +"'>Output</a>");
   }
}

const qapp = new QAPP();

module.exports = qapp;
