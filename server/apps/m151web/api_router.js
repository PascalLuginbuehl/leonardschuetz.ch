const express = require("express");
const router  = new express.Router();
const mysql = require("mysql")
const connection = mysql.createConnection({
  host      : "127.0.0.1",
  port      : 3306,
  user      : "root",
  password  : "test",
  database  : "m151"
});
connection.connect();

router.use("/list", (req, res) => {
  connection.query("SELECT * FROM T_Persons", (err, rows) => {
    res.json({
      ok: true,
      message: rows
    })
  })
})

router.use("/edit_user", (req, res) => {
  const id = req.body.id;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const note = req.body.note;

  connection.query("UPDATE T_Persons SET firstname=?, lastname=?, note=? WHERE id=?", [
    firstname, lastname, note, id
  ], (err, rows) => {
    res.json({
      ok: true,
      message: "Updated"
    })
  })
})

router.use((req, res) => {
  res.json({
    ok: false,
    message: "Unknown api method"
  })
})

module.exports = router;
