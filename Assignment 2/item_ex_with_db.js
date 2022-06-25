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

app.get("/itemdetails", (req, resp) => {
  let itemno = req.query.itemno;
  let itemname = req.query.itemname;
  let price = req.query.price;
  let category = req.query.category;

  let inertStatus = {
    status: false,
    message: "login due to user",
  };
  con.query(
    "insert into item (itemno,itemname,price,category) values(?,?,?,?)",
    [itemno, itemname, price, category],
    (err, res1) => {
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

//update--
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
app.get("/multiple", (req, resp) => {
  
  let category = req.query.category;

  let multipleStatus = {
    status: false,
    itemdetails: {
      itemno: 0,
      itemname: "",
      price: 0,
      category: "",
    },
  };
  con.query(
    "select itemno,itemname,price,category from item where category =?",
    [category],
    (err, rows) => {
      if (err) {
        console.log(err);
      }
      // else {
      //   if (rows.length > 0) {
      //     multipleStatus.status = true;
      //     multipleStatus.itemdetails = rows[0];
      //     // console.log(rows);
      //     for (let i = 0; i < rows.length; i++) {
      //       console.log(
      //         rows[i].itemno +
      //         " " +
      //         rows[i].itemname +
      //         " " +
      //         rows[i].price +
      //         " " +
      //         rows[i].category
      //       );
      //     }
      //   }
      // }
      resp.send(rows);
    }
  );
});

app.get("/single", (req, resp) => {
  
  let itemno = req.query.itemno;

  let singleStatus = {
    status: false,
    itemdetails: {
      itemno: 0,
      itemname: "",
      price: 0,
      category: "",
    },
  };
  con.query(
    "select itemno,itemname,price,category from item where itemno =?",
    [itemno],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        if (rows.length > 0) {
          singleStatus.status = true;
          singleStatus.itemdetails = rows[0];
          // console.log(rows);
          // for (let i = 0; i < rows.length; i++) {
          //   console.log(
          //     rows[i].itemno +
          //     " " +
          //     rows[i].itemname +
          //     " " +
          //     rows[i].price +
          //     " " +
          //     rows[i].category
          //   );
          // }
        }
      }
      resp.send(singleStatus);
    }
  );
});

app.listen(400);