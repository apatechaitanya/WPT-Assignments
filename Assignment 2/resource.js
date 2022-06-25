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

app.get("/insertResource", (req, resp) => {
  let resid = req.query.resid;
  let resname = req.query.resname;
  let resstatus = req.query.resstatus;
  let inertStatus = {
    status: false,
    message: "login due to user",
  };

  con.query(
    "insert into resource values(?,?,?)",
    [resid, resname, resstatus],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        inertStatus.status = true;
        inertStatus.message = "inserted";
      }
      resp.send(inertStatus);
    }
  );
});

// update
app.get("/updateResource", (req, resp) => {
  let resid = req.query.resid;
  let resname = req.query.resname;
  let resstatus = req.query.resstatus;
  let updateStatus = {
    status: false,
    message: "login due to user",
  };

  con.query(
    "update resource set resname= ?,resstatus= ? where resid=?",
    [resname, resstatus, resid],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        updateStatus.status = true;
        updateStatus.message = "updated";
      }
      resp.send(updateStatus);
    }
  );
});
app.get("/updateitemdetails", (req, resp) => {
  let itemno = req.query.itemno;
  let itemname = req.query.itemname;
  let price = req.query.price;
  let category = req.query.category;

  let updateStatus = {
    status: false,
    message: "not able to update",
  };
  con.query(
    "update item set price = ?,category=? where itemno = ?",
    [price, category, itemno],
    (err, res1) => {
      if (err) {
        console.log(err);
      } else {
        updateStatus.status = true;
        updateStatus.message = "updated";
      }
      resp.send(updateStatus);
    }
  );
});
//multiple select
app.get("/mulResource", (req, resp) => {
  let resstatus = req.query.resstatus;

  let multipleStatus = {
    status: false,
    itemdetails: {
      resid: 0,
      resname: "",
      resstatus: 0,
    },
  };
  con.query(
    "select resid,resname,resstatus from resource where resstatus =?",
    [resstatus],
    (err, rows) => {
      if (err) {
        console.log(err);
      }
      resp.send(rows);
    }
  );
});

app.listen(400, () => {
  console.log("Working Dont Worry");
});
