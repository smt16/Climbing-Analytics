import { NextFunction } from 'express';
import { Db, Document, InsertOneResult, MongoClient, MongoServerError, WithId } from 'mongodb';

// All DB collections for collection arg types
type collection =
  'users'

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
  public static async getOne(
    next: NextFunction,
    collection: collection,
    query: Record<string, any>,
  ): Promise<WithId<Document> | null | void> {
    try {
      await this.connect();

      const coll = this.db.collection(collection);

      const res = await coll.findOne(query);

      return res;
    } catch (e) {
      next(e);
    } finally {
      await this.client.close();
    }
  }

  /**
  * Insert a single row into a DB collection
  */
  public static async insert(
    collection: string,
    data: Record<string, any>,
  ): Promise<InsertOneResult<Document> | MongoServerError> {
    try {
      await this.connect();

      const coll = this.db.collection(collection);

      const res = await coll.insertOne(data);

      return res;
    } catch (e) {
      return e as MongoServerError;
    } finally {
      await this.client.close();
    }
  }
}
