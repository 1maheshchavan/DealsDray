let _express = require("express");
let _mysql2 = require("mysql2");
let body_parser = require("body-parser");
let app = _express();



//let _encoded = body_parser.urlencoded()
app.use(body_parser.urlencoded());
app.use(body_parser.json());
app.set("view engine", "ejs");

/*_________________   connect database  ______________________*/

let con = _mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "user_data",
});

con.connect(function (err) {
  if (err) {
    console.error('Error connecting to database:', err.stack);
    return;
  }
  console.log('Connected to database as ID:', con.threadId);
});


/*_________________  insert data  ______________________*/

// app.post("/insert", function (req, res) {
//   const { name, email, mobile, designation, gender, courses, profile_pic } = req.body;
//   let data = req.body;
//   con.query(
//     `INSERT INTO emp_data (name, email, contact, designation, gender, courses, profile_pic) VALUES ('${data.name}',${data.email} , ${data.contact}, ${data.designation}, ${data.gender}, ${data.courses}, ${data.profile_pic})`,

//     [name, email, mobile, designation, gender, courses, profile_pic],
//     (error, results) => {
//       if (error) {
//         console.error('Error adding user:', error);
//         res.status(500).send('Error adding user');
//       } else {
//         console.log('User added successfully');
//         res.redirect("/employeedata.ejs");
//       }
//     }
//   );
// });



/*_________________  show table data  ______________________*/

app.get("/employeedata", function (req, res) {
  con.query("SELECT * FROM emp_data", function (err, result) {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Error fetching data');
    } else {
      console.log(result);
      res.render("employeedata.ejs", { data: result });
    }
  });
});


/*_________________  insert form render  ______________________*/

app.get("/", function (req, res) {
  res.render("login.ejs");
});

app.get("/admin", function (req, res) {
  res.render("admin.ejs");
});

app.get("/createemploye.ejs", function (req, res) {
  res.render("createemploye.ejs");
});

app.get("/employeedata.ejs", function (req, res) {
  res.render("employeedata.ejs");
});

app.get("/employeeedit.ejs", function (req, res) {
  res.render("employeeedit.ejs");
});


/*_________________   create data  ______________________*/

app.post("/insert", function (req, res) {
  let data = req.body;
      res.redirect("admin");
    });

app.post("/insert", function (req, res) {
  let data = req.body;
      res.redirect("employeedata.ejs");
    });

/*___________________  Delete One data  ______________________*/

app.get("/delete/:id", function (req, res) {
  let data = req.body;
  let user_id = req.params.id;
  // console.log(user_id);
  con.connect(function (error) {
    if (error) throw error;

    con.query(
      `DELETE FROM emp_data WHERE id = ${user_id}`,
      function (err, result) {
        if (err) throw err;
        console.log("One data delete.");
        res.redirect("/");
      }
    );
  });
});


/*_________________  Update One data  ______________________*/

app.get("/update/:id", function (req, res) {
  let user_id = req.params.id;
  // let data = req.body
  // console.log(data);
  // console.log(user_id);
  con.connect(function (error) {
    if (error) throw error;

    con.query(
      `SELECT * FROM emp_data WHERE id=${user_id}`,
      function (err, result) {
        if (err) throw err;
        console.log("One data Update.");
        // res.redirect('/')
        console.log(result);
        res.render("edit.ejs", { user: result });
      }
    );
  });
});

/*_________________  Update One data  ______________________*/

app.post("/edit/:id", function (req, res) {
  let user_id = req.params.id;
  let update_data = req.body;

  con.connect(function (error) {
    if (error) throw error;

    con.query(
      `UPDATE emp_data SET name = '${update_data.name}',email='${update_data.email}' ,contact = '${update_data.contact}' , address = '${update_data.address}' WHERE id = ${user_id}`,
      function (err, result) {
        if (err) throw err;
        console.log("One data Update.");
        console.log(result);
        res.redirect("/");
      }
    );
  });
});



/*_________________ connect Server______________________*/
app.listen(8000, function () {
  console.log("Server is running.....!");
});