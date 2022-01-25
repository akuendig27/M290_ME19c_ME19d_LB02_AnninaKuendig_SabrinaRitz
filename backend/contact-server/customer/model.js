const sql = require('../db');

module.exports = class Customer {
    //constructor
    constructor() {
    }

    create(newCustomer, cbResult) {
        sql.query('INSERT INTO customer SET ?', newCustomer, (err,result) => {
            if (err){
                console.log('error: ',err);
                cbResult(err,null);
                return;
            }
            console.log('created contact: ', {id: result.insertId, ...newCustomer});
            cbResult(null,{
                msg: "New contact has been inserted!", id: result.insertId, ...newCustomer});
            })

    }

    /**
     * Select customer by ID
     * @param id: customer ID
     * @param customer: customer object literal
     * @param cbResult: result of sql statement
     */
    //Lese einen einzelnen Kunden anhand der ID aus
    //--Begin
    findById(id,cbResult) {
        let queryString = 'SELECT * FROM customer';
        queryString += ' WHERE id = ?';
        sql.query(queryString, parseInt(id), (err, result) => {
            if (err) {
                console.log("error:", err);
                cbResult(err, null);
                return;
            }

            //result of the select (greater than 0) has found a record (Tupel)
            if (result.length) {
                console.log("found customer: ", result[0]);
                cbResult(null, result[0]);
                return;
            }

            cbResult({kind: "not_found"}, null);
        });
    }
    //--End

    remove(id, cbResult){
        let queryString = 'DELETE FROM customer';
        queryString += ' WHERE id = ?';
        sql.query(queryString, parseInt(id), (err, result) => {
            if (err) {
                console.log("error:", err);
                cbResult(err, null);
                return;
            }

                console.log("delete customer: ", {id: id});
                //err = null, data zurückgeben
                cbResult(null, result, {id: id, msg:"customer deleted"});
            });
    }

    removeAll(cbResult){
        sql.query('DELETE FROM customer', (err,result) => {
            if (err){
                console.log("error: ", err);
                //err zurückgeben, data = null
                cbResult(err, null);
                return;
            }
            console.log("customer: ", result);
            //err = null, data zurückgeben
            cbResult(null, result, {msg:"all customers deleted"});
        })
    }

    /**
     * Get all customers
     * @param cbResult: result of sql statement
     */
    getAll(cbResult){
       sql.query('SELECT * FROM customer', (err,result) => {
           if (err){
               console.log("error: ", err);
               //err zurückgeben, data = null
               cbResult(err, null);
               return;
           }
           console.log("customer: ", result);
           //err = null, data zurückgeben
           cbResult(null, result);
       })
    }

    /**
     * Update customer by ID
     * @param id: customer ID
     * @param customer: customer object literal
     * @param cbResult: result of sql statement
     */
    updateById(id,customer, cbResult){
        let queryString = 'Update customer SET email = ?, firstName = ?, lastName = ?, userName = ?, phoneNumber = ?, password = ?';
        queryString += ' WHERE id = ?';
        sql.query(queryString,
            [customer.email, customer.firstName, customer.lastName,customer.userName, customer.phoneNumber, customer.password, parseInt(id)],
            (err, result) => {
                if (err){
                    console.log("error: ", err);
                    //err zurückgeben, data = null
                    cbResult(err, null);
                    return;
                }

                if (result.affectedRows === 0){
                    // not found customer with the id
                    cbResult({kind: "not_found"}, null);
                    return;
                }

                console.log("updated customer: ", {id: id, ...customer});
                //err = null, data zurückgeben
                cbResult(null, {id: id, ...customer});

            }
        );
    };
}