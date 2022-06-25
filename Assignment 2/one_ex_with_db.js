const express = require("express");
const app = express();

const mysql = require("mysql2");
let dbparams = {
  host: "localhost",
  user: "root",
  password: "cdac",
  database: "pleasework",
  port: 3306,
};
const con = mysql.createConnection(dbparams);

app.use(express.static("RS"));
app.get("/login", (req, resp) => {
  let username = req.query.username;
  let password = req.query.password;

  let loginstatus = { status: false, message: "login due to user" };
  con.query(
    'select userid,password from cursers where userid = ? and password = ?',
    [username, password],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
            if (rows.length > 0) {
            loginstatus.status = true;
              loginstatus.message = "login successful";
              resp.redirect("./pincode.html")
            }
        }
        resp.send(loginstatus);
    }
  );

  // resp.send("Username is " + req.query.username);
});

app.listen(900);
