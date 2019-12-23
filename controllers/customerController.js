const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
//const Employee = mongoose.model('Employee');
const Customer = mongoose.model('Customer');

router.get('/', (req, res) => {
    res.render("customer/addOrEdit", {
        viewTitle: "Insert Customer"
    });
});

router.post('/', (req, res) => {
    // console.log('check')
    console.log(req.body._id)
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var customer = new Customer();
    customer.fullName = req.body.fullName;
    customer.email = req.body.email;
    customer.mobile = req.body.mobile;
    customer.amount = req.body.amount;
    customer.status = 0;
    customer.status1 = 0;
    customer.save((err, doc) => {
        if (!err)
            res.redirect('customer/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("customer/addOrEdit", {
                    viewTitle: "Insert Customer",
                    customer: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    //  console.log(req.body);
    //req.body.status=1;
    // console.log(req.body)
    Customer.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        // console.log(req.body);
        // // req.body.status=1;
        // console.log(req.body)
        if (!err) { res.redirect('customer/list'); 
        // console.log(doc)  
    }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("customer/addOrEdit", {
                    viewTitle: 'Update Customer',
                    customer: req.body
                });
               
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Customer.find((err, docs) => {
        if (!err) {
            res.render("customer/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving customer list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    // console.log('update clicked')
    Customer.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("customer/addOrEdit", {
                viewTitle: "Update Customer",
                customer: doc
            });
        }
    });
});










router.get('/delete/:id', (req, res) => {
    // console.log(req.params.id)

    Customer.findByIdAndRemove(req.params.id, (err, doc) => { 
        // console.log(req.params.id)

        if (!err) {
            res.redirect('/customer/list');
        }
        else { console.log('Error in customer delete :' + err); }
    });
});





router.post('/paid', (req, res) => {
    

    // console.log(req.params.id)
    // console.log("ayush");
        // console.log(req.params.id) 
        paidRecord(req, res);
    
});

function paidRecord(req, res) {
     //  console.log(req.body);
    req.body.status=1;
    req.body.status1=0;
    // console.log("hi");
    // console.log(req.body)
    Customer.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        // console.log(req.body);
        req.body.status=1;
        req.body.status1=0;
        // console.log(req.body)
        if (!err) { res.redirect('/customer/list'); 
        // console.log(doc)  
    }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("customer/addOrEdit", {
                    viewTitle: 'Update Customer',
                    customer: req.body
                });
               
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/paid/:id', (req, res) => {
    // console.log('paid clicked')
    
    Customer.findById(req.params.id, (err, doc) => {
        
        if (!err) {
            // console.log(doc)
            // paidRecord(doc,res)
            res.render("customer/paid", {
                viewTitle: "Finalize Customer",
                customer: doc
            });
        }
    });
});








router.post('/hold', (req, res) => {
    

    // console.log(req.params.id)
    // console.log("ayush");
        // console.log(req.params.id) 
        holdRecord(req, res);
    
});

function holdRecord(req, res) {
     //  console.log(req.body);
    req.body.status1=1;
    // console.log("hi");
    // console.log(req.body)
    Customer.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        // console.log(req.body);
        req.body.status1=1;
        // console.log(req.body)
        if (!err) { res.redirect('/customer/list'); 
        // console.log(doc)  
    }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("customer/addOrEdit", {
                    viewTitle: 'Update Customer',
                    customer: req.body
                });
               
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/hold/:id', (req, res) => {
    console.log('hold clicked')
    
    Customer.findById(req.params.id, (err, doc) => {
        
        if (!err) {
            // console.log(doc)
            // paidRecord(doc,res)
            res.render("customer/hold", {
                viewTitle: "Hold Customer",
                customer: doc
            });
        }
    });
});



module.exports = router;