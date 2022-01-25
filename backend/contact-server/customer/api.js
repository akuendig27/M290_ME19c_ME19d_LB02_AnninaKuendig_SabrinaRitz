const customer = require('./contoller');
module.exports = app => {
    //Create a new customer (SQL-Insert)
    app.post('/customer', customer.create);

    // Retrieve a single Customer with login id
    app.get('/customer/:id', customer.findOne);

    //Retrieve all customers (SQL-SELECT)
    app.get('/customers', customer.findAll);

    //Update a customer with customerId (SQL-UPDATE)
    app.put('/customer/:id', customer.update);

    // Delete a Customer with customerId
    app.delete('/customer/:id', customer.remove);

    // Delete all Customers
    app.delete('/customers', customer.removeAll);
}
