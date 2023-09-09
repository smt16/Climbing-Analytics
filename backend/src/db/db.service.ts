import { Db, Document, MongoClient, WithId } from 'mongodb';

// All DB collections for collection arg types
type collection =
  'users'

const client = new MongoClient(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@climbinganalytics.ihhngvy.mongodb.net/?retryWrites=true&w=majority`,
);
let db: Db;

async function connect() {
  await client.connect();
  db = client.db('ClimbingAnalytics');
}

/**
 * Get one row from the DB
 */
export async function getOne(collection: collection, query: Record<string, any>): Promise<WithId<Document> | null> {
  try {
    await connect();

    const coll = db.collection(collection);

    return coll.findOne(query);
  } catch (e) {
    console.error(e);
    return null;
  } finally {
    await client.close();
  }
}
