import React, { Component, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Button, Container, Card, Row } from 'react-bootstrap'

export default function App(){
  const [bookName, setBookName] = React.useState('');
  const [review, setReview] = React.useState('');
  const [fetchData, setFetchData] = React.useState([]);
  const [reviewUpdate, setReviewUpdate] = React.useState('');

  const handleChange = (e) => {
    let name=e.target.name;
    let value=e.target.value;
    setBookName({[name]:value});
}

  const handleChangeReview = (e) => {
    setReviewUpdate(e.target.value);
  }

  useEffect(() => {
    axios.get('/api/get')
    .then((response) => {
      setFetchData(response.data);
    });
  }
  ,[]);
  
   const submitReview = () => {
   axios.post('/api/insert', {
     bookName: bookName,
     bookReview: review
     })
     .then(() => {
        alert('successful insert');
      }
    )
    console.log(bookName);
    document.location.reload();
  };

  const deleteReview = (id) => {
    if(window.confirm("Are you sure you want to delete this review?")){
      axios.delete(`/api/delete/${id}`);
      document.location.reload();
    }
}

  const updateReview = (id) => {
    axios.put('/api/update', {
      bookReview: reviewUpdate,
      id: id
    });
    document.location.reload();
  }
let card = fetchData.map((val,key) => {
  return(
    
      <Card style={{ width: '18rem' }} className='m-2'> 
        <Card.Body>
          <Card.Title>{val.book_name}</Card.Title>
          <Card.Text>{val.book_review}</Card.Text>
          <input name='reviewUpdate' onChange={handleChangeReview} placeholder='Update Review' ></input>
               <Button className='m-2' onClick={() => { updateReview(val.id) }}>Update</Button>
               <Button onClick={() => { deleteReview(val.id) }}>Delete</Button>
        </Card.Body>
      </Card>
  
  );
});

return (
  <div className='App'>
      <h1>Dockerized Fullstack React Application</h1>
      <div className='form'>
          <input name='setBookName' placeholder='Enter Book Name' onChange={handleChange} />
          <input name='setReview' placeholder='Enter Review' onChange={handleChange} />
      </div>
      <Button className='my-2' variant="primary" onClick={submitReview}>Submit</Button> <br /><br />
      <Container>
          <Row>
              {card}
          </Row>
      </Container>
  </div>
);

}

