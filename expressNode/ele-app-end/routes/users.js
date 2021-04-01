var express = require('express');
var router = express.Router();
var usecontroller = require('../controller/users.js')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/send_verification',usecontroller.send_verification)
router.post('/login',usecontroller.login)
router.post('/Filter_dropdown',usecontroller.Filter_dropdown)
router.post('/Filter_screen',usecontroller.Filter_screen)
router.post('/discounts',usecontroller.discounts)
router.post('/consumption',usecontroller.consumption)
router.post('/milkytea',usecontroller.milkytea)
router.post('/comment',usecontroller.comment)
router.post('/merchant',usecontroller.merchant)
router.post('/getusers',usecontroller.getusers)
router.post('/addaddress',usecontroller.addaddress)
router.post('/updateaddress',usecontroller.updateaddress)
router.post('/removeaddress',usecontroller.removeaddress)
router.post('/addorder',usecontroller.addorder)

module.exports = router;
