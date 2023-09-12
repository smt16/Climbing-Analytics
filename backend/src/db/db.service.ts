import { Db, Document, InsertOneResult, MongoClient, MongoServerError, WithId } from 'mongodb';

// All DB collections for collection arg types
type collection =
  'users'

export type dbError = {
  code: string | number | undefined,
  keyValue?: Record<string, any>
}

export default class DB {
  private static client: MongoClient;

  private static db: Db;

  private static async connect() {
    this.client = new MongoClient(process.env.DB_URL as string);
    await this.client.connect();
    this.db = this.client.db('ClimbingAnalytics');
  }

  /**
  * Get one row from the DB
  */
  public static async getOne(collection: collection, query: Record<string, any>): Promise<WithId<Document> | null | dbError> {
    try {
      await this.connect();

      const coll = this.db.collection(collection);

      return coll.findOne(query);
    } catch (e) {
      const err = e as MongoServerError;

      return {
        code: err.code,
      };
    } finally {
      await this.client.close();
    }
  }

  /**
  * Insert a single row into a DB collection
  */
  public static async insert(collection: string, data: Record<string, any>): Promise<InsertOneResult<Document> | dbError> {
    try {
      await this.connect();

      const coll = this.db.collection(collection);

      const res = await coll.insertOne(data);

      return res;
    } catch (e) {
      const err = e as MongoServerError;

      return {
        code: err.code,
        keyValue: err.keyValue,
      };
    } finally {
      await this.client.close();
    }
  }
}
