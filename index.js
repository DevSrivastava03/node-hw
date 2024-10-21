// Import the express library and assign it to a variable
import express from 'express'

// Create an instance of an express application 
const app = express()

// Set the port the application will be running on
const port = process.env.PORT || 3001

// Define a set of vegetables with their properties (taste in this case)
const vegetables = {
  carrot: {
      taste: "sweet"
  }, 
  broccoli: {
      taste: "bitter"
  }, 
  spinach: {
      taste: "earthy"
  }, 
  pepper: {
      taste: "spicy"
  }
}

// Set up a route to return information about a specific vegetable using URL parameters
app.get('/vegetable/:vegetable', (req, res) => {
  const vegetableName = req.params.vegetable.substring(1);
  
  if (vegetables[vegetableName]) {
    console.log(`Request received for vegetable: ${vegetableName} with taste ${vegetables[vegetableName].taste}`);
    res.send(`The taste of ${vegetableName} is ${vegetables[vegetableName].taste}.`);
  } else {
    res.status(404).send(`Vegetable ${vegetableName} not found.`);
  }
})

// Set up a route to find vegetables based on a query for taste
app.get('/', (req, res) => {
  const requestedTaste = req.query.taste;
  const matchingVegetables = [];

  console.log(`Request received for taste: ${requestedTaste}`);
  
  // Loop through vegetables to find matches by taste
  for (const vegetable in vegetables) {
    if (vegetables[vegetable].taste === requestedTaste) {
      matchingVegetables.push(vegetable);
      console.log(`Found matching vegetable: ${vegetable}, Taste: ${vegetables[vegetable].taste}`);
      res.send(`Found matching vegetable: ${vegetable}, Taste: ${vegetables[vegetable].taste}`)
    }
  }
})

// Set the application to listen on a port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
