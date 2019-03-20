import express from 'express';
import models from './models';


const app = express();

app.get('/', (req ,res) => {
    res.status(200).json({
        message: 'Hello WDI-Infinity'
    })
})

// const peopleList =[
//     {firstName: 'Asma', lastName: 'Quraishi'},
//     {firstName: 'sara', lastName: 'ahmad'},
//     {firstName: 'badriah', lastName: 'shehri'},
//     {firstName: 'usman', lastName: 'bashir'},
//     {firstName: 'reem', lastName: 'fahad'}
// ];

app.get('/api/people',(req,res)=>{
   models.Person.findAll()
   .then(peopleFromDB =>{
    
    res.status(200).json({
        people: peopleFromDB
   })
   .catch(e=> console.log(e));

    });
});

app.get('/api/person/:id', (req, res) => {
    if( !isNaN(req.params.id) ) {
      models.Person.findByPk(req.params.id)
      .then(person => {
        if(person !== null) {
          res.status(200).json({ person: person });
        } else {
          res.status(404).json({ error: 'Person Not Found' });
        }
      })
      .catch(e => console.log(e));
    } else {
      res.status(406).json({ error: 'Invalid ID' });
    }
  });

const PORT = 3000;

app.listen(PORT, () => {
  console.log("server running on port"+PORT)
});