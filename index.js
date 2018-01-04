var jwt = require('jsonwebtoken');
var express = require('express');

const app = express();

app.get('/api', function (req, res) {
    res.json({text: 'Api working as expected '});
})

app.get('/api/protected', ensureToken, function (req, res) {

    //If I have reached here, that means some token was available in the header
    jwt.verify(req.token,'secret_key', function(err,data){
        if(err) {
            console.log(err);
            res.sendStatus(403);
        }else{
            res.json(
                {
                    text: 'Protected Api working as expected ',
                    data
                
                });
        }
    })
})

app.post('/api/login', function (req, res) {
    const user = {
        id: 3
    };
    const token = jwt.sign(user, 'secret_key');
    res.json({token});
})

function ensureToken(req, res, next) {
    const bearerHeaders = req.get('authorization');
    if (bearerHeaders) {
        const bearer = bearerHeaders.split(" ");
        const bearerToken = bearer[1];
        console.log(bearerToken);
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

app
    .listen(3000, function () {
        console.log('App listening to port 3000');
    });
