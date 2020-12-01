const fs = require('fs')

// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const multipart = require('fastify-multipart')

fastify.register(multipart)

fastify.post('/', async (request, reply) => {
  
  const parts = await request.parts()
  for await (const part of parts) {
    if (part.file) {
      await pump(part.file, fs.createWriteStream(part.filename))
    } else {
      request.log.info(part)
    }
  }
  
  return { responseFrom: 'my-end-service' }
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
