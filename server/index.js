const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Create MySQL connection
const db = mysql.createPool({
    host: 'mysql_db', // the host name MYSQL_DATABASE: node_mysql
    user: 'MYSQL_USER', // database user MYSQL_USER: MYSQL_USER
    password: 'MYSQL_PASSWORD', // database user password MYSQL_PASSWORD: MYSQL_PASSWORD
    database: 'books' // database name MYSQL_HOST_IP: mysql_db
  })

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hi There')
  });

//---------------------------------IMPLEMENTING CRUD------------------------------------------------

//get all books in the database
app.get('/get',(req,res)=>{
  const SelectQuery="SELECT * FROM books_reviews";
  db.query(SelectQuery,(err,result)=>{
    res.send(result)
  })
})

//adding books in database
app.post("/insert",(req,res)=>{
  const bookName=req.body.setBookName
  const bookReview=req.body.setReview
  const InsertQuery="INSERT INTO books_reviews (book_name, book_review) VALUES (?, ?)";
  db.query(InsertQuery,[bookName,bookReview],(err,result)=>{
    console.log(result)
  })
})

//deleting book from database
app.delete("/delete/:bookId",(req,res)=>{
  const bookId=req.params.bookId
  const deleteQuery="DELETE FROM books_reviews WHERE id=?"
  db.query(deleteQuery,bookId,(err,result)=>{
    if (err) console.log(err)
  })
})

//update a book review
app.put("/update/:bookId",(req,res)=>{
  const bookReview=req.body.reviewUpdate
  const bookId=req.body.bookId
  const UpdateQuery="UPDATE books_reviews SET book_review = ? WHERE id = ?"
  db.query(UpdateQuery,[bookReview,bookId],(err,result)=>{
    if(err) console.log(err)
  })
})

app.listen('8080')