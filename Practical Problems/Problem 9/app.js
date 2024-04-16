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

// Define schema for Product model
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
});

// Create Product model
const Product = mongoose.model('Product', productSchema);

// Creates a new product in MongoDB
const createProduct = (product) => {
    const newProduct = new Product(product);
    return newProduct.save();
};

// Retrieves all products from MongoDB
const getAllProducts = () => {
    return Product.find();
};

// Updates a product in MongoDB
const updateProduct = (productId, updatedProduct) => {
    return Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
};

// Deletes a product from MongoDB
const deleteProduct = (productId) => {
    return Product.findByIdAndDelete(productId);
};

// Example usage:
// Assuming you have created an Express app instance called "app"
connectToMongoDB();

// Test CRUD operations
createProduct({ name: 'Product 1', price: 10, quantity: 5 })
    .then(() => {
        console.log('Product created successfully');
        return getAllProducts();
    })
    .then((products) => {
        console.log('All products:', products);
        const productId = products[0]._id;
        return updateProduct(productId, { price: 15 });
    })
    .then((updatedProduct) => {
        console.log('Product updated:', updatedProduct);
        const productId = updatedProduct._id;
        return deleteProduct(productId);
    })
    .then(() => console.log('Product deleted'))
    .catch((err) => console.error('Error:', err));
