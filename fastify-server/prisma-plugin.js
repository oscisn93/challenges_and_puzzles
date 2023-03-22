const fastifyPlugin = require('fastify-plugin');
const { FastifyPluginAsync } = require('fastify');
const { PrismaClient } = require('@prisma/client');

async function prismaPlugin (app, options) {
  const prisma = new PrismaClient();
  await prisma.$connect();

  app.decorate('prisma', prisma);
  app.addHook('onClose', async (app) => {
    await app.prisma.$disconnect();
  });
}

module.exports = fastifyPlugin(prismaPlugin);
