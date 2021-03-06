const db = require("../");

const getUsers = function () {
  const text = `
  SELECT * FROM users
  `;

  return db
    .query(text)
    .then((data) => data.rows)
    .catch((err) => console.error(this, "query failed", err.stack));
};

const getUserById = function (userId) {
  const text = `
  SELECT * FROM users
  WHERE id = $1;`;
  const values = [userId];
  
  return db
    .query(text, values)
    .then((data) => data.rows[0])
    .catch((err) => console.error(this, "query failed", err.stack));
};

const getUserByEmail = function (email) {

  const text = `
  SELECT * FROM users 
  WHERE email = $1;`;
  const values = [email];
    
  return db
    .query(text, values)
    .then((data) => data.rows[0])
    .catch((err) => err);
};

const addUser = function(params) {

  const {
    first_name,
    last_name,
    email,
    password,
  }= params;
  
  const text = `
  INSERT into users (first_name, last_name, email, password)
  VALUES($1, $2, $3, $4)
  RETURNING *;`;

  const values = [first_name, last_name, email, password]
  return db
  .query(text, values)
  .then((data) => data.rows[0])
  .catch((err) => console.error(this, "query failed", err.stack));

}

const editUser = function(params) {

  const {
    id,
    first_name,
    last_name,
    email,
  } = params;

  const text = `
  UPDATE users 
  SET first_name = $2, last_name = $3, email = $4
  WHERE id = $1;`;

  const values = [id, first_name, last_name, email]
  return db
  .query(text, values)
  .then((data) => data.rows[0])
  .catch((err) => console.error(this, "query failed", err.stack));
  
}

// const addUser = (firstName, lastName, email, password) => {
//     const query = {
//         text: `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *` ,
//         values: [firstName, lastName, email, password]
//     }

//     return db.query(query)
//         .then(result => result.rows[0])
//         .catch(err => err);
// }

// const getUsersPosts = () => {
//     const query = {
//         text: `SELECT users.id as user_id, first_name, last_name, email, posts.id as post_id, title, content
//     FROM users
//     INNER JOIN posts
//     ON users.id = posts.user_id`
//     }

//     return db.query(query)
//         .then(result => result.rows)
//         .catch(err => err);

// }

// const getUserReviews = function (userId) {
//   const text = `
//   SELECT reviews.* 
//   FROM reviews 
//   INNER JOIN favourites ON favourites.coffee_id = coffees.id 
//   JOIN users ON users.id = favourites.user_id 
//   WHERE users.id = $1 
//   GROUP BY coffees.id;`
//   const values = [coffeeId];

//   return db
//     .query(text, values)
//     .then((data) => data.rows)
//     .catch((err) => console.error(this, "query failed", err.stack));
// };

module.exports = {
    getUserById,
    getUserByEmail,
    getUsers,
    editUser,
    addUser
};
