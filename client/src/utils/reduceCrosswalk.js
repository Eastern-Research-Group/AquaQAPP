export default (data, field) => {
  return data.reduce((acc, curr) => {
    if (acc.indexOf(curr[field]) === -1 && curr[field] !== '*' && curr[field] !== '') {
      acc.push(curr[field]);
    }
    return acc;
  }, []);
};
