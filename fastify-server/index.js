const app = require("fastify")({
  logger: true,
});

// app.register(require("./prisma-plugin"));
app.register(require("./routes"));

const start = async () => {
  try {
    await app.listen({ port: 4040 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
