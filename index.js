var Base64 = require('js-base64').Base64;
var soap = require('strong-soap').soap;

const express = require('express');
const app = express();

const URL = 'http://pilot.id3global.com/ID3gWS/ID3global.svc?wsdl';
app.post('/uploadImage', (req, res) => {
    // Image data is transferred as a Base64 string
    let img = req.body.img; 
    let options = {};
    soap.createClient(URL, options, function (err, client) {
        if (err) {
            throw new Error('Sorry, an error occured: ' + err);
        }

        let uploadAndProcessMethod = client['ID3global']['basicHttpBinding_GlobalDocImage']['UploadAndProcess'];
        uploadAndProcessMethod(img, function (err, result, envelope, soapHeader) {
            if (err) {
                throw new Error('Sorry, an error occured: ' + err);
            }
            console.log(result);
            res.send('success');
        });
    });
});

app.listen(3000, function() {
    console.log('App running and listening on port 3000');
});