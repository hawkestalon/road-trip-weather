import { FastifyInstance } from 'fastify';
import { getWeatherForTrip } from './service';
import { tripInfoSchema } from './schema';
import { routeOptions } from '../types';

const tripsHandler = routeOptions({
  schema: tripInfoSchema,
  async handler(request, reply) {
    const response = await getWeatherForTrip(request.body.start, request.body.destination);
    return reply.send({ response });
  },
});

const tripsPlugin = async (fastify: FastifyInstance) => {
  fastify.post('/trips', tripsHandler);
};

export default tripsPlugin;
