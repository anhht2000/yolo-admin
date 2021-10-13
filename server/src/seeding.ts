import { createConnection } from 'typeorm';
import { data } from './seed/seed';

const Boostrap = async () => {
  const connect = await createConnection();
  await connect.runMigrations();
  await data()
  connect.close()
};

Boostrap().catch((err) => console.log(err));
