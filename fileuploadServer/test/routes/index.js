var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/signup', function (req, res) {
  console.log(req.body)
  let sampleFile;
  let uploadPath;

  if (Object.keys(req.files).length == 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  for (key of Object.keys(req.files)) {
    let sampleFile = req.files[key];
    uploadPath = 'uploads/' + sampleFile.name;

    sampleFile.mv(uploadPath, function (err) {
      if (err) {
        return res.status(500).send(err);
      }

    });
  }
  res.json({ status: true });

});
module.exports = router;
