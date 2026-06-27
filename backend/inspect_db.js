import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function inspectDb() {
  await mongoose.connect(process.env.MONGODB_URI);
  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log("Collections:", collections.map(c => c.name).join(", "));
  
  const results = {};
  for (const c of collections) {
    const doc = await mongoose.connection.db.collection(c.name).findOne();
    if (doc) {
      results[c.name] = doc;
    }
  }
  
  console.log(JSON.stringify(results, null, 2));
  process.exit(0);
}

inspectDb().catch(console.error);
