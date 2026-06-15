import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { getWeatherForTrip } from "./service";

const tripsHandler = {
  async handler(request: FastifyRequest, reply: FastifyReply) {
    const response = await getWeatherForTrip(
    {
      city: 'Laramie',
      state: 'WY',
      country: 'US'
    },
      {
      street: '543 west 100 south',
      city: 'Logan',
      state: 'Utah',
      postalCode: '84321',
      country: 'US'
    });
    return reply.send({ response });
  }
}

const tripsPlugin = async (fastify: FastifyInstance) => {
  fastify.get('/trips', tripsHandler);
}

export default tripsPlugin
