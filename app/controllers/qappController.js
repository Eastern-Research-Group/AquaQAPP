'use strict';

var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');
var expressions = require('angular-expressions');

var fs = require('fs');
var path = require('path');

class QAPP {
    constructor() {
    }

    generate(request, response) {
        //return "params: " + JSON.stringify(params);
        var templatevars = JSON.parse(request.body.qapp_data);
        var organizational_indicator = templatevars.context.organizational_indicator;
        var organizational_qapp_type = templatevars.context.organizational_qapp_type;

        //Load the docx file as a binary
        var content = fs
            .readFileSync(path.resolve(__dirname + "/../templates/" + organizational_indicator + "/" + organizational_qapp_type, 'GroupA.docx'), 'binary');

        var zip = new JSZip(content);

        var angularParser = function(tag) {
            return {
                get: tag === '.' ? function(s) { return s; } : function(s) {
                    return expressions.compile(tag.replace(/(’|“|”)/g, "'"))(s);
                }
            };
        }

        var doc = new Docxtemplater().setOptions({ parser: angularParser });
        doc.loadZip(zip);

        doc.setData(templatevars);

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
        response.set('Content-Type', 'application/octet-stream');
        response.header('Content-type', 'application/octet-stream');
        response.header('Content-disposition', 'inline; filename=' + templatevars.qapp.short_name +" QAPP.docx");

        response.write(buf, 'binary');
        response.status(200).end(null, 'binary');

        //response.status(200).send(buf);

        //response.send("output available @ <a href='" + request.protocol + "://" + request.hostname + ":" + request.socket.localPort + "/output/output.docx" +"'>Output</a>");
    }
}

const qapp = new QAPP();

module.exports = qapp;