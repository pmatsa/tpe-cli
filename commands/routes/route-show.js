const conf = new (require('conf'))()
const chalk = require('chalk')
const axios = require('axios')

async function routeShow(routeRef) {

    if (!conf.get('token')) {
        console.log(chalk.red.bold('No token set. Use tpe configure <token> to set.'))
    }

    let route = null

    await axios.get('https://thingparkenterprise.eu.actility.com/thingpark/dx/core/latest/api/routes/' + routeRef, {
        headers: {
            'Accept': 'application/json, application/xml',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + conf.get('token')
        }
    })
        .then(function (response) {
            // handle success
            console.log(response.data);
            route = response.data
        })
        .catch(function (error) {
            // handle error
            console.log(chalk.redBright.bold(error.response.data.message))
        })

    return route
}

module.exports = routeShow
