import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { seedAdmin } from './app/utils/seedAdmin';

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    app.listen(config.port, () => {
      seedAdmin();
      console.log(`Brhex solution listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
