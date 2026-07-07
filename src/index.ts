import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';

import tripsPlugin from './trips/plugin';

const server = Fastify();

server.register(cors, {origin: true });

server.register(tripsPlugin);

server.get('/ping', async () => {
  return { pong: true };
});

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3001;
    await server.listen({ port });
    console.log(`Server listening on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
