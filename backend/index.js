// <<<<<<<<<<<<<<  ✨ Codeium Command 🌟 >>>>>>>>>>>>>>>>
const express = require('express'); // Importing the Express module
const fs = require('fs'); // Importing the File System module
const path = require('path'); // Importing the Path module
const cors = require('cors'); // Importing the CORS module

const app = express(); // Creating an instance of the Express application
const port = 3000; // Setting the port number

app.use(cors()); // Enabling CORS for all routes
app.use(express.json()); // Parsing incoming requests with JSON payloads

const filePath = path.join(__dirname, 'values.json'); // Creating a file path using the current directory and the file name

const readData = () => { // Defining a function to read data from the file
	if (fs.existsSync(filePath)) { // Checking if the file exists
		const data = fs.readFileSync(filePath); // Reading the contents of the file
		// console.log("data-->",JSON.parse(data)) // Logging the contents of the file wher is in Buffer form
		return JSON.parse(data); // Parsing the data as JSON
	}
	return []; // Returning an empty array if the file does not exist
};

const writeData = (data) => { // Defining a function to write data to the file
	console.log("data-->", data)
	fs.writeFileSync(filePath, JSON.stringify(data, 3, null)); // Writing the data to the file as a JSON string with indentation
};

app.get('/api/pairs', (req, res) => { // Defining a route for the GET request to /api/pairs
	const data = readData(); // Reading the data from the file
	res.status(200).json(data); // Sending the data as a JSON response with status code 200
});

app.post('/api/pairs', (req, res) => { // Defining a route for the POST request to /api/pairs

	let newpairs = req.body
	newpairs.map((data) => {
		data.id = Math.floor(Math.random() * 1000).toString() // Generating a random ID
	})
	console.log("newpairs-->", newpairs)
	// newpairs.id = Math.floor(Math.random() * 1000); // Generating a random ID

	const existingPairs = readData(); // Reading the existing data from the file
	console.log("existingPairs-->", existingPairs)
	const updatedPairs = [...existingPairs, ...newpairs]; // Combining the existing data with the new data
	console.log("updatedPairs-->", updatedPairs)
	writeData(updatedPairs); // Writing the updated data to the file
	res.status(201).json(updatedPairs); // Sending the updated data as a JSON response with status code 201
});

app.put('/api/pairs/:id', (req, res) => { // Defining a route for the PUT request to /api/pairs/:id)
	const { id } = req.params; // Getting the ID from the request parameters
	const { name, value } = req.body; // Getting the name and value from the request body
	const existingPairs = readData(); // Reading the existing data from the file
	const updatedPairs = existingPairs.map((pair) => { // Mapping over the existing data
		if (pair.id == id) { // Checking if the ID matches
			return { ...pair, name, value }; // Updating the name and value
		}
		return pair; // Returning the original pair
	});
	writeData(updatedPairs); // Writing the updated data to the file
	res.status(200).json(updatedPairs); // Sending the updated data as a JSON response with status code 200
});

app.delete('/api/pairs/:id', (req, res) => {
	const { id } = req.params;
	console.log("id-->", id)
	const existingPairs = readData();

	console.log("delelel", existingPairs.indexOf(id))

	const updatedPairs = existingPairs.map((data, index) => {
		if (data.id == id)
			console.log("dnsjf", index)
		delete existingPairs[index]
	})
	console.log("updatedPairs-->", updatedPairs)
	writeData(updatedPairs); // Writing the updated data to the file
	res.status(200).json(updatedPairs); // Sending the updated data as a JSON response with status code 200
	//

});
app.listen(port, () => { // Starting the server and listening on the specified port
	console.log(`Server running at http://localhost:${port}`); // Logging the server URL
});

