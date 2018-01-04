const router = require('express').Router()
// var multer = require('multer');
// var upload = multer({dest: 'uploads/'});
module.exports = router

var config = {
  keyFilename: 'my-project-key.json',
  projectId: 'my-project'
};
var vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient(config);

// router.post('/', upload.single('image'), (req, res, next) => {
//   console.log(req)
//   client
//   .labelDetection(req.file.path)
//   .then(
//     results => {
//     const labels = results[0].labelAnnotations;
//     console.log('Labels:');
//     labels.forEach(label => console.log(label.description));
//     res.send(results)
//     // res.redirect('/upload/result')
//     }
//   )
//   .catch(err => {
//     console.error('ERROR:', err);
//   });

  // Choose what the Vision API should detect
  // Choices are: faces, landmarks, labels, logos, properties, safeSearch, texts
  // var types = ['labels'];

  // Send the image to the Cloud Vision API
  // client.detect(req.file.path, types, function(err, detections, apiResponse) {
  //   if (err) {
  //     res.end('Cloud Vision Error');
  //   } else {
  //     res.writeHead(200, {
  //       'Content-Type': 'text/html'
  //     });
  //     res.write('<!DOCTYPE HTML><html><body>');

  //     // Base64 the image so we can display it on the page
  //     res.write('<img width=200 src="' + base64Image(req.file.path) + '"><br>');

  //     // Write out the JSON output of the Vision API
  //     res.write(JSON.stringify(detections, null, 4));

  //     // Delete file (optional)
  //     fs.unlinkSync(req.file.path);

  //     res.end('</body></html>');
  //   }
  // });
// })

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
