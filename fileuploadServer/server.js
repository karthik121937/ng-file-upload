const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const PORT = 8000;
app.use('/form', express.static(__dirname + '/index.html'));

// default options
app.use(fileUpload());

app.get('/ping', function (req, res) {
  res.send('pong');
});

app.post('/upload', function (req, res) {
  let sampleFile;
  let uploadPath;

  if (Object.keys(req.files).length == 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  for (key of Object.keys(req.files)) {
    let sampleFile = req.files[key];
    // console.log('typeeeeeeee',typeof sampleFile, sampleFile,'----------\n')
    if (Array.isArray(sampleFile)) {
      console.log('array caseeeee')
      console.log(sampleFile)
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
      console.log(sampleFile)
      uploadPath = 'uploads/' + sampleFile.name;

      sampleFile.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send(err);
        }

      });
    }
  }
  res.send('File uploaded to ' + uploadPath);

});

app.listen(PORT, function () {
  console.log('Express server listening on port ', PORT); // eslint-disable-line
});