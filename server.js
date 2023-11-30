import Fastify from 'fastify'
import cors from '@fastify/cors'
const PORT = process.env.PORT || 3030;

const fastify = Fastify({
    logger: false,
  })

fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST'],
});

fastify.get('/', async (request, reply) => {
  return 'Tunnel For Sentry Nolemon /tunnel';
});

fastify.post('/tunnel', async (request, reply) => {
  try {
    const envelope = request.body;

    const pieces = envelope.split('\n');

    const header = JSON.parse(pieces[0]);

    const { host, pathname, username } = new URL(header.dsn);

    const projectId = pathname.slice(1);

    const url = `https://${host}/api/${projectId}/envelope/?sentry_key=${username}`;

    const options = {
      headers: {
        'Content-Type': 'fistifylication/x-sentry-envelope',
      },
    };

    const response = await fistify.axios.post(url, envelope, options);

    reply.status(201).send({ message: 'Success', data: response?.data });
  } catch (e) {
    const error = e?.response || e?.message;
    reply.status(400).send({ message: 'Invalid request', error });
  }
});

try {
    await fastify.listen({ port: PORT })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }