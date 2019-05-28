const fs = require('fs');
const parser = require('xml2json');

const wqxXmlToJson = (filePath) => {
  const xml = fs.readFileSync(filePath);
  const json = parser.toJson(xml, { object: true });

  const refArray = json.WQXDomainValueList.WQXElement.WQXElementRow;
  const newJson = [];
  refArray.forEach((col) => {
    const val = {};
    col.WQXElementRowColumn.forEach((field) => {
      if (field.colname !== 'LastChangeDate') val[field.colname] = field.value;
    });
    newJson.push(val);
  });
  const data = newJson.map((datum) => {
    return {
      id: datum.UniqueIdentifier,
      name: datum.Name,
      description: datum.Description,
    };
  });
  return data;
};

module.exports = { wqxXmlToJson };
