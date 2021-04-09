const db = require('../');

const getCoffees = function() {
  const text = `
  SELECT * FROM coffees
  `;

  return db.query(text)
    .then(data => data.rows)
    .catch(err => console.error(this, 'query failed', err.stack));
};

module.exports = {
  getCoffees
};