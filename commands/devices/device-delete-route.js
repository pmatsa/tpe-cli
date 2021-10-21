const conf = new (require('conf'))()
const chalk = require('chalk')
const axios = require('axios')
const deviceShowRef = require('./device-show-ref')
const routeShow = require('./../routes/route-show')

async function deviceDeleteRoute(deviceRef, route) {

    if (!conf.get('token')) {
        console.log(chalk.red.bold('No token set. Use "tpe configure <token>" to set.'))
        return null
    }

    let routeRefs = null
    let deviceOK = false
    let routeOK = false

    await Promise.all([
        deviceShowRef(deviceRef),
        routeShow(route)
    ]).then(([deviceResponse, routeResponse]) => {
        if (deviceResponse) {
            routeRefs = deviceResponse.routeRefs
            deviceOK = true
            console.log(chalk.greenBright('Device existing routes have been collected. ' + chalk.greenBright.bold(routeRefs)))
        } else {
            console.log(chalk.redBright('Error getting device routeRefs.'))
            return
        }

        if (routeResponse) {
            routeOK = true
            console.log(chalk.greenBright('Device route successfuly found on TPE. Proceeding to delete route...'))
        } else {
            console.log(chalk.redBright('This route could not be found on TPE.'))
            return
        }
    }).catch(error => {
        console.log(chalk.redBright(error))
    }).then(async response => {
        if (deviceOK && routeOK) {
            //check if route exists
            if (routeRefs.includes(route)) {
                routeRefs = routeRefs.filter(e => e !== route);

                data = {
                    "routeRefs": routeRefs
                }

                await axios.put('https://thingparkenterprise.eu.actility.com/thingpark/dx/core/latest/api/devices/' + deviceRef, data, {
                    headers: {
                        'Authorization': 'Bearer ' + conf.get('token'),
                        'Accept': 'application/json, application/xml',
                        'Content-Type': 'application/json'
                    }
                })
                    .then(function (response) {
                        // handle success
                        //console.log(response);
                        console.log(chalk.greenBright('Route deleted successfully. New routes: ') + chalk.greenBright.bold(routeRefs))
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(chalk.redBright.bold(error.response.data.message))
                    })

            } else {
                console.log(chalk.redBright('The route you are trying to delete does not exist for deviceRef ' + deviceRef + '.'))
            }
        }
    })

    return routeRefs
}

module.exports = deviceDeleteRoute
