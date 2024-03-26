import cors from 'cors'; // Import the cors middleware
import express from 'express'
const app = express()
const port = 3000
app.use(cors());



// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle POST requests from the HTML page
app.post('/getCoordinates', (req, res) => {
    const { src, des } = req.body;
    
    // Execute the dijfunc function with the provided source and destination
    let coordinates;
    if (des==999 || des==998 ) {
        console.log(src);
        console.log(des);
        let temp_des = nearest_amenity(src, des);
        coordinates = dijfunc2(src, temp_des);
    }else{
        coordinates = dijfunc2(src, des);
    }

    // Check if coordinates were found
    if (coordinates) {
        res.json(coordinates);
    } else {
        res.status(404).json({ error: 'No path found.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
