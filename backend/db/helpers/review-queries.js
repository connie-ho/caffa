const db = require("..");

const getReviews = function(coffeeId) {
  const text = `
  SELECT * FROM reviews
  WHERE coffee_id = $1
  `;

  const values = [coffeeId];

  return db
    .query(text, values)
    .then((data) => data.rows)
    .catch((err) => console.error(this, "query failed", err.stack));
};

const getCoffee = function(coffeeId) {
  const text = `
  SELECT * FROM coffees
  WHERE id = $1;`;
  const values = [coffeeId];

  return db
    .query(text, values)
    .then((data) => data.rows[0])
    .catch((err) => console.error(this, "query failed", err.stack));
};

const addReview = function(params) {
  const {
    rating,
    description,
    user_id,
    coffee_id
  } = params;

  const text = `
  INSERT INTO coffees (name, description, region, roast, brand, acidity, grain_species, image_url)
  VALUES ($1, $2, $3, $4) RETURNING *;`;
  const values = [
    rating,
    description,
    user_id,
    coffee_id
  ];

  return db
    .query(text, values)
    .then((data) => data.rows[0])
    .catch((err) => console.error(this, "query failed", err.stack));
};

const editReview = function(params) {
  const values = [];
  let text = `
  UPDATE reviews
  SET `;

  if (params.description) {
    values.push(params.description);
    text += `description = $${values.length} `;
  }

  if (params.rating) {
    values.push(params.rating);
    text += `rating = $${values.length} `;
  }

  values.push(params.user_id, params.coffee_id);
  text += `WHERE user_id = $${values.length - 1} AND id = $${values.length} RETURNING *`;

  return db.query(text, values)
    .then(data => data.rows[0])
    .catch(err => console.error(this, 'query failed', err.stack));
};

const deleteReview = function(review_id) {
  let text = `
  DELETE FROM reviews
  WHERE id = $1 RETURNING *`;
  const values = [review_id];

  return db.query(text, values)
    .then(data => 'Deleted')
    .catch(err => console.error(this, 'query failed', err.stack));
};


module.exports = {
  getReviews,
  addReview,
  editReview,
  deleteReview
};
