const createReport = require('docx-templates').default;
const fs = require('fs');
const path = require('path');

module.exports = {
  async generate(req, res) {
    try {
      const file = fs.readFileSync(path.resolve('server/src/templates/MasterQAPP_version4_coded_01262021.docx'));
      const buffer = await createReport({
        template: file,
        output: 'buffer',
        data: req.body,
      });

      res.type('application/octet-stream');
      res.set('Content-Type', 'application/octet-stream');
      res.header('Content-type', 'application/octet-stream');

      res.write(buffer, 'binary');
      return res.status(200).end(null, 'binary');
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        error: `An error has occurred while generating the QAPP: ${error}`,
      });
    }
  },
};
