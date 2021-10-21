const conf = new (require('conf'))()
const chalk = require('chalk')
const axios = require('axios')

async function routesList() {

    if (!conf.get('token')) {
        console.log(chalk.red.bold('No token set. Use "tpe configure <token>" to set.'))
        return null
    }

    let routes = null

    await axios.get('https://thingparkenterprise.eu.actility.com/thingpark/dx/core/latest/api/routes', {
        headers: {
            'Accept': 'application/json, application/xml',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + conf.get('token')
        }
    })
        .then(function (response) {
            // handle success
            console.log(response.data);
            //console.log(chalk.yellowBright(Object.keys(response.data).length + " devices total. Use pageIndex for other pages."))
            routes = response.data
        })
        .catch(function (error) {
            // handle error
            console.log(error)
        })

    return routes

}

module.exports = routesList
