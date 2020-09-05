var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cake' });
});

/* GET admin page. */
router.get('/admin', function (req, res, next) {
    res.render('admin', { title: 'Admin area' });
});

/* GET product list. */
router.get('/productlist', function (req, res) {
    var db = req.db;
    var collection = db.get('productlist');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

/* GET cake type list. */
router.get('/caketype', function (req, res) {
    var db = req.db;
    var collection = db.get('caketype');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

/* GET ingridients list. */
router.get('/ingridients', function (req, res) {
    var db = req.db;
    var collection = db.get('ingridients');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

/* GET caketypelist. */
router.get('/caketypes', function (req, res) {
    var db = req.db;
    var collection = db.get('caketype');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

/* Get cake */
router.delete('/getcake/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('caketypes');
    var idRequired = req.params.id;
    collection.find({ '_id': idRequired }, function (e, docs) {
        res.json(docs);
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
