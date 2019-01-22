'use strict';

var createReport = require('docx-templates').default;

var fs = require('fs');
var path = require('path');

class QAPP {
    constructor() {
    }

    async generate(request, response) {
        //return "params: " + JSON.stringify(params);
        var templatevars = JSON.parse(request.body.qapp_data);
        var organizational_indicator = templatevars.context.organizational_indicator;
        var organizational_qapp_type = templatevars.context.organizational_qapp_type;

        //Load the docx file as a binary
        var content = fs
            .readFileSync(path.resolve("app/templates/" + organizational_indicator + "/" + organizational_qapp_type, 'GroupA.docx'));

        var buffer;
        try {
            buffer = await createReport({
                template: content,
                output: 'buffer',
                data: templatevars
            });
        } catch (error) {
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

        response.type('application/octet-stream');
        response.set('Content-Type', 'application/octet-stream');
        response.header('Content-type', 'application/octet-stream');
        response.header('Content-disposition', 'inline; filename=' + templatevars.qapp.short_name + " QAPP.docx");

        response.write(buffer, 'binary');
        response.status(200).end(null, 'binary');

        //response.status(200).send(buf);

        //response.status(200).send();
        //response.send("output available @ <a href='" + request.protocol + "://" + request.hostname + ":" + request.socket.localPort + "/output/output.docx" +"'>Output</a>");
    }
}

const qapp = new QAPP();

module.exports = qapp;
