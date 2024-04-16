const mongoose = require('mongoose');

// Establish connection to MongoDB using Mongoose
const connectToMongoDB = () => {
    mongoose.connect('mongodb://localhost:27017/mydatabase', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));
};

// Define schema for User model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true }
});

// Create User model
const User = mongoose.model('User', userSchema);

// Adds a new user to the MongoDB database
const addUserToDatabase = (user) => {
    const newUser = new User(user);
    newUser.save()
        .then(() => console.log('User added successfully'))
        .catch((err) => console.error('Error adding user:', err));
};

// Express route to get all users from MongoDB
const getAllUsers = (req, res) => {
    User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json({ error: err.message }));
};

// Example usage:
// Assuming you have created an Express app instance called "app"
connectToMongoDB();

// Express route to add a new user
app.post('/users', (req, res) => {
    addUserToDatabase(req.body);
    res.send('User added');
});

// Express route to get all users
app.get('/users', getAllUsers);
