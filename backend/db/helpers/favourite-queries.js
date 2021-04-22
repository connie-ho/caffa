const db = require("..");

const getFavourites = function () {
  const text = `
  SELECT * FROM favourites
  `;

  return db
    .query(text)
    .then((data) => data.rows)
    .catch((err) => console.error(this, "query failed", err.stack));
};

const getUserFavourites = function (userId) {
  const text = `
  SELECT coffees.* 
  FROM coffees INNER JOIN favourites 
  ON favourites.coffee_id = coffees.id 
  JOIN users ON users.id = favourites.user_id 
  WHERE users.id = 1 
  GROUP BY coffees.id;`
  const values = [userId];

  return db
    .query(text, values)
    .then((data) => data.rows)
    .catch((err) => console.error(this, "query failed", err.stack));
};

const addFavourite = function (params) {
  const { user_id, coffee_id } = params;

  const text = `
  INSERT INTO favourites (user_id, coffee_id)
  VALUES ($1, $2) RETURNING *;`;
  const values = [user_id, coffee_id];

  return db
    .query(text, values)
    .then((data) => data.rows[0])
    .catch((err) => console.error(this, "query failed", err.stack));
};

const deleteFavourite = function (favouriteID) {
  let text = `
  DELETE FROM favourites
  WHERE id = $1 RETURNING *;`;
  const values = [favouriteID];

  return db
    .query(text, values)
    .then((data) => "Deleted")
    .catch((err) => console.error(this, "query failed", err.stack));
};

module.exports = {
  getFavourites,
  getUserFavourites,
  addFavourite,
  deleteFavourite
};
