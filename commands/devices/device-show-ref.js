const conf = new (require('conf'))()
const chalk = require('chalk')
const axios = require('axios')

async function deviceShow(deviceRef) {

    let device = null

    if (!conf.get('token')) {
        console.log(chalk.red.bold('No token set. Use tpe configure <token> to set.'))
        return null
    }

    await axios.get('https://thingparkenterprise.eu.actility.com/thingpark/dx/core/latest/api/devices/' + deviceRef, {
        headers: {
            'Accept': 'application/json, application/xml',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + conf.get('token')
        }
    })
        .then(function (response) {
            // handle success
            console.log(response.data);
            device = response.data
        })
        .catch(function (error) {
            // handle error
            console.log(chalk.redBright.bold(error.response.data.message))
        })

    return device
}

module.exports = deviceShow
