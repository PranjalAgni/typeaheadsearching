import { initalizeServer } from "./app";

const run = async () => {
  const port = process.env.PORT || 3000;

  const server = await initalizeServer();
  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

run();
