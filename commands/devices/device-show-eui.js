const conf = new (require('conf'))()
const chalk = require('chalk')
const axios = require('axios')

async function deviceShowEUI(deviceEUI) {

    if (!conf.get('token')) {
        console.log(chalk.red.bold('No token set. Use tpe configure <token> to set.'))
        return null
    }

    let device = null

    await axios.get('https://thingparkenterprise.eu.actility.com/thingpark/dx/core/latest/api/devices?deviceEUI=' + deviceEUI + '&extendedInfo=true', {
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
            console.log(error)
        })

    return device
}

module.exports = deviceShowEUI
