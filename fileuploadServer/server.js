const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const PORT = 8000;
app.use('/form', express.static(__dirname + '/index.html'));

// default options
app.use(fileUpload());

app.get('/ping', function(req, res) {
  res.send('pong');
});

app.post('/upload', async function(req, res) {
  let sampleFile;
  let uploadPath;

  if (Object.keys(req.files).length == 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  for (key of Object.keys(req.files)){
    let sampleFile = req.files[key];
    console.log(sampleFile)
    uploadPath = __dirname + '/uploads/' + sampleFile.name;
  
    await sampleFile.mv(uploadPath, function(err) {
      if (err) {
        return res.status(500).send(err);
      }
  
  });

}
res.send('File uploaded to ' + uploadPath);

});

app.listen(PORT, function() {
  console.log('Express server listening on port ', PORT); // eslint-disable-line
});