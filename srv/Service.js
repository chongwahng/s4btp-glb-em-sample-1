module.exports = async function (srv) {
    const cds = require('@sap/cds')
    const messaging = await cds.connect.to('messaging')

    messaging.on('cf/dev/poc/test/hello', msg => {
        console.log('Event Receiver - Handler Hook')
        console.log(msg)
    })

    messaging.on('*', async msg => { console.log(msg) })

    this.on('publish', async (req) => {
        console.log(`Payload from action call /api/publish ==> ${JSON.stringify(req.data)}`)
        let msg = {}
        Object.assign(msg, { message: req.data.message })
        console.log(`Emitting event to Message Broker ==> ${JSON.stringify(msg)}`)
        await messaging.emit(req.data.topic, msg)
        return JSON.stringify(msg)
    })
}