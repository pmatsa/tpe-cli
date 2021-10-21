const conf = new (require('conf'))()
const chalk = require('chalk')
const axios = require('axios')

function configure(token) {

    axios.get('https://thingparkenterprise.eu.actility.com/thingpark/dx/admin/latest/api/oauth/tokeninfo?access_token=' + token, {
        headers: {
            'Accept': 'application/json, application/xml',
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            // handle success
            console.log(response.data);
            conf.set('token', token)

            console.log(chalk.green.bold('Token set successfully.'))
        })
        .catch(function (error) {
            // handle error
            console.log(chalk.red.bold(error.response.data.message))
        })
        .then(function () {
            //executes all the time 
        });
}

module.exports = configure