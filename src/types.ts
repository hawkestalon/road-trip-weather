import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import {
  ContextConfigDefault,
  FastifyBaseLogger,
  FastifySchema,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteGenericInterface,
  RouteShorthandOptionsWithHandler,
} from 'fastify';

export type RouteOptionsTypebox<TSchema extends FastifySchema> = RouteShorthandOptionsWithHandler<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  RouteGenericInterface,
  ContextConfigDefault,
  TSchema,
  TypeBoxTypeProvider,
  FastifyBaseLogger
>;

export const routeOptions = <TSchema extends FastifySchema>(opts: RouteOptionsTypebox<TSchema>) =>
  opts;
