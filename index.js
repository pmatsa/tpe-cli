#! /usr/bin/env node
const { program } = require('commander')
/**
 *  Devices 
 */
const devicesList = require('./commands/devices/devices-list')
const deviceShowRef = require('./commands/devices/device-show-ref')
const deviceShowEUI = require('./commands/devices/device-show-eui')
const deviceAddRoute = require('./commands/devices/device-add-route')
const deviceDeleteRoute = require('./commands/devices/device-delete-route')
/**
 *  Routes 
 */
const routesList = require('./commands/routes/routes-list')
const routeShow = require('./commands/routes/route-show')
/**
 *  Configuration 
 */
const configure = require('./commands/configure')

program
    .command('configure <token>')
    .description('Set your API token to connect with Actility Thingpark Enterprise SaaS. ')
    .action(configure)

program
    .command('devices-list')
    .description('Lists all the devices on your SaaS TPE.')
    .action(devicesList)

program
    .command('device-show-ref <deviceRef>')
    .description('Show a device\'s extended information using the unique device TPE reference <deviceRef>.')
    .action(deviceShowRef)

program
    .command('device-show-eui <devEUI>')
    .description('Show a device\'s extended information using the unique device EUI.')
    .action(deviceShowEUI)

program
    .command('device-add-route <deviceRef> <newRoute>')
    .description('Add a new route on device\'s routes (application outputs) that already exist, using the unique device TPE reference <deviceRed>.')
    .action(deviceAddRoute)

program
    .command('device-delete-route <deviceRef> <route>')
    .description('Delete an existing route on device\'s routes (application outputs), using the unique device TPE reference <deviceRed>.')
    .action(deviceDeleteRoute)

program
    .command('routes-list')
    .description('Lists all the routes on your SaaS TPE.')
    .action(routesList)

program
    .command('route-show <routeRef>')
    .description('Lists a specific route information on your SaaS TPE.')
    .action(routeShow)

program.parse()