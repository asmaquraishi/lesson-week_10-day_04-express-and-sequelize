import express from 'express';
import models from '../models';
import bodyParser from 'body-parser';


const router = express.Router();


///get all people ///
router.get('/api/people',(req,res)=>{
    models.Person.findAll()
    .then(peopleFromDB =>{
     
     res.status(200).json({
     people: peopleFromDB
    })
    .catch(e=> console.log(e)); 
     });
 });


/// get person by record ID ////
router.get('/api/person/:id', (req, res) => {
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


//create new record
 router.post('/api/person', (req,res)=>{
    models.Person.create(req.body)

    .then(personNewFromDB => {

     res.status(201).json({person:personNewFromDB})
    })
    .catch(e => console.log(e));
 });


//update 

// Update an existing Person

router.put('/api/person/:id', (req, res) => {
  // Find Person By ID sent to us by User in the URL
  models.Person.findByPk(req.params.id).then(person => {
    // Call the Update function on the Person the database sent us back.
    // Only update the fields I care about.
    person.update({
      first_name: req.body.first_name,
      last_name: req.body.last_name
    }).then(person => {
      // The database was able to update the user
      // And it sent us back an updated Record with the new information
      // We can now send back this new information to the user
      res.status(200).json({ person: person });
    }).catch(e => console.log(e));

  }).catch(e => console.log(e));
});


//Delete

//my solve
// app.delete('/api/person/:id',(req,res)=> {
//     models.Person.destroy({
//         where: {id: req.params.id }
//     })
//   .then(person => {
//     res.status(201).json({message: "sucsess"})
//   })
//   .catch(e => console.log(e));

// });


//usman solve
router.delete('/api/person/:id',(req,res)=> {
      models.Person.findByPk(req.params.id)
      .then(person => {

       person.destroy().then(()=> {
           res.status(200).json({
               result: `Record ID ${req.params.id} Deleted` , 
               success: true
           });
       })
       .catch(e => console.log(e));
    })
        .catch(e => console.log(e));
});
 
//spret all the routes in app.js 
//export to use it everywhere
export default router;