const express = require('express') ; 
const cors = require('cors') ; 
const app = express() ; 

app.use(cors()); 
app.use(express.json()); 
app.get('/' , (req, res)=> {
    res.json({
        message: '☕  Coffee Shop API is running! ', 
        status: 'success' , 
        time : new Date()
    }); 
});

app.get('/api/products', (req, res) => {
    const products = [
    
    ];
    res.json(products) ; 
}); 











let orders = [];


app.post('/api/orders', (req, res) => {
    console.log('📥 New order received!');
    
    const order = req.body;
    order.id = 'ORD-' + Date.now();
    order.status = 'pending';
    order.createdAt = new Date().toISOString();
    
    orders.push(order);
    
    console.log('✅ Order saved! Total:', orders.length);
    
    res.json({
        success: true,
        message: 'Order received!',
        orderId: order.id
    });
});

app.get('/api/orders', (req, res) => {
    res.json({
        success: true,
        total: orders.length,
        orders: orders
    });
});








const PORT = process.env.PORT || 3000 ; 

app.listen(PORT, () => {
    console.log('═══════════════════════════════════════════');
    console.log('☕ Coffee Shop Backend is running!');
    console.log('═══════════════════════════════════════════');
    console.log(`🌐 Server: http://localhost:${PORT}`);
    console.log(`📦 Products: http://localhost:${PORT}/api/products`);
    console.log(`📋 Orders: http://localhost:${PORT}/api/orders`);
    console.log('═══════════════════════════════════════════');
});