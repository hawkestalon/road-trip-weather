import { Type } from '@fastify/type-provider-typebox';

const addressSchema = Type.Object({
  street: Type.Optional(Type.String()),
  city: Type.String(),
  state: Type.String(),
  postalCode: Type.Optional(Type.String()),
  coutnry: Type.Optional(Type.String()),
});

export const tripInfoSchema = {
  body: Type.Object({
    start: addressSchema,
    destination: addressSchema,
  }),
  response: {
    '200': Type.Any(),
  },
};
