export default (questions, name) => {
  if (questions.length) {
    return questions.find((q) => q.questionName === name).id;
  }
  return null;
};
