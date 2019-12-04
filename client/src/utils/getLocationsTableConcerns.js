export default (object, getConcerns) => {
  const concerns = [];
  if (object['Water Quality Concerns'] && object['Water Quality Concerns'].length !== 0) {
    object['Water Quality Concerns'].forEach((concern) => {
      concerns.push(concern.label);
    });
  } else {
    getConcerns.forEach((concern) => {
      concerns.push(concern.label);
    });
  }
  object.waterConcerns = concerns.join(', ');
  return object.waterConcerns;
};
