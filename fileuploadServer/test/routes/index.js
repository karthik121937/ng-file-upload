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


    if (Array.isArray(sampleFile)) {
      console.log('array caseeeee')
      // console.log(sampleFile)
      sampleFile.forEach(element => {
        uploadPath = 'uploads/' + element.name;

        element.mv(uploadPath, function (err) {
          if (err) {
            return res.status(500).send(err);
          }
        });
      });
    } else {
      console.log("object case")
      // console.log(sampleFile)
      uploadPath = 'uploads/' + sampleFile.name;

      sampleFile.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send(err);
        }

      });
    }
    // uploadPath = 'uploads/' + sampleFile.name;

    // sampleFile.mv(uploadPath, function (err) {
    //   if (err) {
    //     return res.status(500).send(err);
    //   }

    // });
  }
  res.json({ status: true });

});
module.exports = router;
