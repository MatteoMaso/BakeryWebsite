var express = require('express');
var router = express.Router();


/* POST to add a product for sell. */
router.post('/addproduct', function (req, res) {
    var db = req.db;
    var collection = db.get('productlist');
    collection.insert(req.body, function (err, result) {
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/* DELETE to deleteproduct ( if not selled for example ). */
router.delete('/deleteproduct/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('productlist');
    var productToDelete = req.params.id;
    collection.remove({ '_id': productToDelete }, function (err) {
        res.send((err === null) ? { msg: '' } : { msg: 'error: ' + err });
    });
});

/* POST to adduser. */
router.post('/addcaketype', function (req, res) {
    var db = req.db;
    var collection = db.get('caketype');
    collection.insert(req.body, function (err, result) {
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/* DELETE to delete a caketype. */
router.delete('/deletecaketype/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('caketype');
    var typeToDelete = req.params.id;
    collection.remove({ '_id': typeToDelete }, function (err) {
        res.send((err === null) ? { msg: '' } : { msg: 'error: ' + err });
    });
});


/* GET ingridients. */
router.get('/ingridientlist', function (req, res) {
    var db = req.db;
    var collection = db.get('ingridientlist');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

module.exports = router;
