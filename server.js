require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());






mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected!'))
    .catch(err => console.error('❌ MongoDB error:', err.message));




app.get('/', (req, res) => {
    res.json({
        message: '☕ Coffee Shop API is running!',
        status: 'success',
        time: new Date()
    });
});








app.get('/api/products', (req, res) => {
    const products = [
        { id: 1, name: 'Espresso', price: 2.00, category: 'hot' },
        { id: 2, name: 'Cappuccino', price: 3.50, category: 'hot' },
        { id: 3, name: 'Latte', price: 3.75, category: 'hot' },
        { id: 4, name: 'Green Tea', price: 2.50, category: 'hot' },
        { id: 5, name: 'Iced Coffee', price: 3.00, category: 'cold' },
        { id: 6, name: 'Iced Tea', price: 2.75, category: 'cold' },
        { id: 7, name: 'Fruit Smoothie', price: 4.50, category: 'cold' },
        { id: 8, name: 'Cheesecake', price: 4.00, category: 'food' },
        { id: 9, name: 'Chocolate Croissant', price: 3.25, category: 'food' },
        { id: 10, name: 'Blueberry Muffin', price: 2.75, category: 'food' },
        { id: 11, name: 'Bagel with Cream Cheese', price: 3.00, category: 'food' },
        { id: 12, name: 'Turkey Sandwich', price: 5.00, category: 'food' },
        { id: 13, name: 'Garden Salad', price: 4.50, category: 'food' },
        { id: 14, name: 'Pizza fruits de mer', price: 8.50, category: 'food' }
    ];
    res.json(products);
});



const orderSchema = new mongoose.Schema({
    items: Array,
    total: Number,
    paymentMethod: String,
    status: { type: String, default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);



app.post('/api/orders', async (req, res) => {
    try {
        console.log('📥 New order received!');

        const newOrder = new Order({
            items: req.body.items,
            total: req.body.total,
            paymentMethod: req.body.paymentMethod || 'cash'
        });

        await newOrder.save();

        console.log('✅ Order saved to MongoDB:', newOrder._id);

        res.json({
            success: true,
            message: 'Order received!',
            orderId: newOrder._id
        });
    } catch (error) {
        console.error('❌ Error saving order:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error saving order'
        });
    }
});

app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            total: orders.length,
            orders: orders
        });
    } catch (error) {
        console.error('❌ Error getting orders:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error getting orders'
        });
    }
});




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('═══════════════════════════════════════════');
    console.log('☕ Coffee Shop Backend is running!');
    console.log('═══════════════════════════════════════════');
    console.log(`🌐 Server: http://localhost:${PORT}`);
    console.log(`📦 Products: http://localhost:${PORT}/api/products`);
    console.log(`📋 Orders: http://localhost:${PORT}/api/orders`);
    console.log('═══════════════════════════════════════════');
});


