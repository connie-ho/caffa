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

const getUser = function (userId) {
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

module.exports = {
    getUser,
    getUserByEmail,
    getUsers
};
