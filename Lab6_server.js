var express = require('express');
var app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require("mysql");
const port = process.env.PORT || 8000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());

var con = mysql.createConnection({
    // host: "localhost",
    // user: "root",
    // password: "",
    // database: "mydb"
    host: "sql3.freemysqlhosting.net",
    user: "sql3281084",
    password: "qR9dITRBLR",
    database: "sql3281084"
});

function getConnection(){
    return mysql.createConnection({
        host: "sql3.freemysqlhosting.net",
        user: "sql3281084",
        password: "qR9dITRBLR",
        database: "sql3281084"
        // host: "localhost",
        // user: "root",
        // password: "",
        // database: "mydb"
    })
  }

app.post('/endpoint', function(req, res){
    let size = req.body.length;
    console.log("length: " + size);

    let obj = req.body;
    console.log(obj[0]);

    let arrStore = [];

    for(let i = 0; i < obj.length; i++){
        arrStore.push(obj[i]);
    }

    console.log(arrStore);

    getConnection().connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        let sqlDelete = "DELETE FROM quiz";
        
        // delete all data in table quiz
        con.query(sqlDelete, function (err, result) {
          if (err) throw err;
          console.log("Table delete");
        });

        // insert
        for(let i = 0; i < size; i++){
            let sqlInsert = "INSERT INTO quiz (question, aw1, aw2, aw3, aw4, result1, result2, result3, result4) VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?)";
                
            con.query(sqlInsert, [arrStore[i].question, arrStore[i].aw[0], arrStore[i].aw[1], arrStore[i].aw[2], arrStore[i].aw[3], arrStore[i].result[0], arrStore[i].result[1], arrStore[i].result[2], arrStore[i].result[3]], function (err, result) {
                if (err) throw err;
                console.log("Table created");
            });
        }
    });
	res.send(req.body);
});

app.get("/frontend", (req, res) => {
    let sql = "select * from quiz"
        
    con.connect(function(err) {
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    });
    
});
  


console.log("Listen port 8000")

app.listen(port);































// var express = require('express');
// var app = express();
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const mysql = require("mysql");

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true })); 
// app.use(cors());

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "mydb"
// });

// // function getConnection(){
// //     return mysql.createConnection({
// //         // host: "sql3.freemysqlhosting.net",
// //         // user: "sql3281084",
// //         // password: "qR9dITRBLR",
// //         // database: "sql3281084"
// //         host: "localhost",
// //         user: "root",
// //         password: "",
// //         database: "mydb"
// //     })
// //   }

// app.post('/endpoint', function(req, res){
//     let size = req.body.length;
//     console.log("length: " + size);

//     let obj = req.body;
//     console.log(obj[0]);

//     let arrStore = [];

//     for(let i = 0; i < obj.length; i++){
//         arrStore.push(obj[i]);
//     }

//     console.log(arrStore);

//     con.connect(function(err) {
//         if (err) throw err;
//         console.log("Connected!");
//         let sqlDelete = "DELETE FROM quiz";
        
//         // delete all data in table quiz
//         con.query(sqlDelete, function (err, result) {
//           if (err) throw err;
//           console.log("Table delete");
//         });

//         // insert
//         for(let i = 0; i < 2; i++){
//             let sqlInsert = "INSERT INTO quiz (question, aw1, aw2, aw3, aw4, result1, result2, result3, result4) VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?)";
                
//             con.query(sqlInsert, [arrStore[i].question, arrStore[i].aw[0], arrStore[i].aw[1], arrStore[i].aw[2], arrStore[i].aw[3], arrStore[i].result[0], arrStore[i].result[1], arrStore[i].result[2], arrStore[i].result[3]], function (err, result) {
//                 if (err) throw err;
//                 console.log("Table created");
//             });
//         }
//     });

// 	res.send(req.body);
// });

// app.get("/frontend", (req, res) => {
//     let sql = "select * from quiz"
        

//     con.connect(function(err) {
//         con.query(sql, function (err, result) {
//             if (err) throw err;
//             console.log(result[0]);
//             res.send(result[0]);
//         });
//     });
    
  
//     // res.send("aaa" + results);
  
  
//   });
  


// console.log("Listen port 8000")

// app.listen(8000);