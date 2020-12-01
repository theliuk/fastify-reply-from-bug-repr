// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const replyFrom = require('fastify-reply-from')
const multipart = require('fastify-multipart')

//I register this because, in the real world I need it, within the same plugin where I proxy requests.
fastify.register(multipart)

fastify.register(replyFrom, {
  base: 'http://my-end-service:3000'
})

fastify.addHook('onRequest', async(req, res) => {
  //Perform some logic to decide wheter proxy the request or not
  return res.from('/')
})

fastify.post('/', async (request, reply) => {
  return { responseFrom: 'my-reverse-proxy' }
})

const start = async () => {
  try {
    await fastify.listen(3000, '0.0.0.0')
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
