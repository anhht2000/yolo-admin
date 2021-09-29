import express from 'express';
import { createConnection } from 'typeorm';
import { ExpressConfig } from './config/ExpressConfig';

const Boostrap = async () => {
  const connect = await createConnection();
  const app = express();
  new ExpressConfig(app);

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () =>
    console.log(`App Listen On: http://localhost:${PORT}`)
  );
  console.log("1");

  // connect.close();
};

Boostrap().catch((err) => console.log(err));
