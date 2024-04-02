const mysql = require('../config/config');
const User = {};
User.create = (user, result) => {
const sql = `
INSERT INTO users(
email,
name,
lastname,
phone,
image,
password,
created_at,
updated_at
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
;
db.query(
sql,
[
user.email,
user.name,
user.lastname,
user.phone,
user.image,
user.password,
new Date(),
new Date()
],
(err, res) => {
if (err) {
console.log('error: ', err);
result(err, null);
}
else {
console.log('Id del nuevo Usuario: ', res.insertId);
result(null, res.insertId);
}
}
)
};
module.exports = User;


User.findAll = result => { 
    db.query(`SELECT * FROM server_pa_parchar.usuario`, (err, res) => { 
        if (err) { 
            console.log('error: ', err); 
            result(err, null); 
        } else { 
            result(null, res); 
} 
}); 
} 
User.findById = (id, result) => { 
db.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => { 
if (err) { 
console.log('error: ', err); 
result(err, null); 
} else { 
result(null, res); 
} 
}); 
}