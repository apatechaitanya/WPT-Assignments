const express = require("express");
const app = express();

app.use(express.static("RS"));
app.get("/login", (req, resp) => {
  let username = req.query.username;
  let password = req.query.password;

  let loginstatus = { status: false, message: "login due to user" };
  if (username === password) {
    loginstatus.status = true;
    loginstatus.message = "success";
  }
  resp.send(loginstatus);

  // resp.send("Username is " + req.query.username);
});
app.get("/emp", (req, resp) => {
  let input = req.query.empno;
  let output = {
    status: false,
    empdetails: { empno: 0, empaddres: "", mobile: 4 },
  };
  if (parseInt(input) == 2) {
    output.status = true;
    output.empdetails.empno = 2;
    output.empdetails.empaddres = "IT PARK ";
    output.empdetails.mobile = 928391741;
  }
  resp.send(output);
  // resp.send("Empno : " + req.query.empno + " Emp Name : " + req.query.empname);
});
app.listen(900);
