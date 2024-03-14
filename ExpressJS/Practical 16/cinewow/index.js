const express = require('express');
const connectDB = require('./db');
require('dotenv').config();

const app = express();

// Connect to the database
connectDB();

app.use(express.json());

// Routes

app.get('/api/v1/getMovies', async (req, res) => {
    try {
      let query = {};
  
      // Parse query parameters for advanced filtering
      if (req.query.rating) {
        const ratingFilter = {};
        const ratingOperators = ['$gte', '$gt', '$lte', '$lt'];
        for (const op of ratingOperators) {
          if (req.query.rating[op]) {
            ratingFilter[op] = req.query.rating[op];
          }
        }
        query.rating = ratingFilter;
      }
      if (req.query.title) {
        query.title = { $regex: req.query.title, $options: 'i' }; // Case-insensitive regex search
      }
      if (req.query.director) {
        query.director = { $regex: req.query.director, $options: 'i' }; // Case-insensitive regex search
      }
      if (req.query.releaseYear) {
        const releaseYearFilter = {};
        const releaseYearOperators = ['$gte', '$gt', '$lte', '$lt'];
        for (const op of releaseYearOperators) {
          if (req.query.releaseYear[op]) {
            releaseYearFilter[op] = req.query.releaseYear[op];
          }
        }
        query.releaseYear = releaseYearFilter;
      }
  
      // Projection
      let projection = { createdAt: 0 }; // Exclude createdAt field by default
      if (req.query.fields) {
        const fields = req.query.fields.split(',');
        fields.forEach(field => {
          projection[field] = 1;
        });
      }
  
      // Sorting
      let sort = {};
      if (req.query.sort) {
        const sortFields = req.query.sort.split(',');
        for (const field of sortFields) {
          let sortOrder = 1; // Default to ascending order
          if (field.startsWith('-')) {
            sortOrder = -1;
            field = field.substring(1); // Remove '-' sign
          }
          sort[field] = sortOrder;
        }
      }
  
      // Pagination
      let page = parseInt(req.query.page) || 1;
      let limit = parseInt(req.query.limit) || 10;
      let skip = (page - 1) * limit;
  
      // Query the database with the constructed query, sorting, pagination, and projection
      const movies = await Movie.find(query)
                                 .sort(sort)
                                 .skip(skip)
                                 .limit(limit)
                                 .select(projection);
  
      res.json(movies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });  
  

// Get a specific movie by ID
app.get('/api/v1/getMovie/:movieID', (req, res) => {
  const { movieID } = req.params;
  // Your implementation to get a movie by ID from the database
});

// Add a new movie
app.post('/api/v1/addMovie', (req, res) => {
  const movieData = req.body;
  // Your implementation to add a new movie to the database
});

// Update a movie by ID
app.patch('/api/v1/updateMovie/:movieID', (req, res) => {
  const { movieID } = req.params;
  const updatedFields = req.body;
  // Your implementation to update a movie by ID in the database
});

// Delete a movie by ID
app.delete('/api/v1/deleteMovie/:movieID', (req, res) => {
  const { movieID } = req.params;
  // Your implementation to delete a movie by ID from the database
});

// Define a route for movie statistics
// Define a route for movie statistics with additional computation
// Define a route for movie statistics with additional sorting
app.get('/api/v1/movieStats', async (req, res) => {
    try {
      // Define the aggregation pipeline
      const pipeline = [
        {
          $match: {
            rating: { $gte: 8.2 }
          }
        },
        {
          $group: {
            _id: null,
            totalMovies: { $sum: 1 },
            minYear: { $min: '$releaseYear' },
            maxYear: { $max: '$releaseYear' },
            averageRating: { $avg: '$rating' }
          }
        },
        {
          $sort: {
            averageRating: -1 // Sort by averageRating in descending order
          }
        }
      ];
  
      // Perform aggregation using the defined pipeline
      const stats = await Movie.aggregate(pipeline);
  
      res.json(stats);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });  

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});