const db = require("..");

const getReviews = function () {
  const text = `
  SELECT * FROM reviews
  `;

  return db
    .query(text)
    .then((data) => data.rows)
    .catch((err) => console.error(this, "query failed", err.stack));
};

const addReview = function (params) {
  const { rating, description, user_id, coffee_id } = params;

  const text = `
  INSERT INTO reviews (rating, description, user_id, coffee_id)
  VALUES ($1, $2, $3, $4) RETURNING *;`;
  const values = [Number(rating), description, user_id, coffee_id];

  return db
    .query(text, values)
    .then((data) => data.rows[0])
    .catch((err) => console.error(this, "query failed", err.stack));
};

const editReview = function (params) {
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

  values.push(params.id);
  text += `WHERE id = $${values.length} RETURNING *`;

  return db
    .query(text, values)
    .then((data) => data.rows[0])
    .catch((err) => console.error(text, "query failed", err.stack));
};

const deleteReview = function (review_id) {
  let text = `
  DELETE FROM reviews
  WHERE id = $1 RETURNING *`;
  const values = [review_id];

  return db
    .query(text, values)
    .then((data) => "Deleted")
    .catch((err) => console.error(this, "query failed", err.stack));
};

module.exports = {
  getReviews,
  addReview,
  editReview,
  deleteReview,
};
