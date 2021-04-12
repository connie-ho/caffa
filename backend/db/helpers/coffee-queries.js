const db = require("../");

const getCoffees = function () {
  const text = `
  SELECT * FROM coffees
  `;

  return db
    .query(text)
    .then((data) => data.rows)
    .catch((err) => console.error(this, "query failed", err.stack));
};

const getCoffee = function (coffeeId) {
  const text = `
  SELECT * FROM coffees
  WHERE id = $1;`;
  const values = [coffeeId];

  return db
    .query(text, values)
    .then((data) => data.rows[0])
    .catch((err) => console.error(this, "query failed", err.stack));
};

const getMostFavouritedCoffees = function () {
  const text = `
  SELECT coffees.* 
  FROM coffees 
  INNER JOIN favourites 
  ON favourites.coffee_id = coffees.id 
  GROUP BY coffees.id;`;

  return db
    .query(text)
    .then((data) => data.rows)
    .catch((err) => console.error(this, "query failed", err.stack));
};

const addCoffee = function (params) {
  const {
    name,
    description,
    region,
    roast,
    brand,
    acidity,
    grain_species,
    image_url,
  } = params;

  const text = `
  INSERT INTO coffees (name, description, region, roast, brand, acidity, grain_species, image_url)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`;
  const values = [
    name,
    description,
    region,
    roast,
    brand,
    acidity,
    grain_species,
    image_url,
  ];

  return db
    .query(text, values)
    .then((data) => data.rows[0])
    .catch((err) => console.error(this, "query failed", err.stack));
};

// const editCoffee = function(params) {
//   const values = [];
//   let text = `
//   UPDATE coffees
//   SET `;

//   if (params.name) {
//     values.push(params.name);
//     text += `name = $${values.length} `;
//   }

//   if (params.done) {
//     values.push(params.done);
//     text += `done = $${values.length} `;
//   }

//   if (params.category_id) {
//     values.push(params.category_id);
//     text += `category_id = $${values.length} `;
//   }

//   if (params.priority) {
//     values.push(params.priority);
//     text += `priority = $${values.length} `;
//   }

//   values.push(params.userId, params.coffeeId);
//   text += `WHERE user_id = $${values.length - 1} AND id = $${values.length} RETURNING *`;

//   return db.query(text, values)
//     .then(data => data.rows[0])
//     .catch(err => console.error(this, 'query failed', err.stack));
// };
module.exports = {
  getCoffees,
  getMostFavouritedCoffees,
  getCoffee,
  addCoffee,
};
