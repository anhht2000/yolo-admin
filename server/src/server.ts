import express from 'express';
import { createConnection } from 'typeorm';
import { ExpressConfig } from './config/ExpressConfig';
import * as dotenv from 'dotenv';
dotenv.config();

const Boostrap = async () => {
  const connect = await createConnection();
  await connect.runMigrations();
  const app = express();
  new ExpressConfig(app);

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`App Listen On: http://localhost:${PORT}`));
};

Boostrap().catch((err) => console.log(err));
