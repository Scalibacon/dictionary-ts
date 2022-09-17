import path from 'path';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

class DBConnection {
  static connection: Database;

  async createConnection() {
    // depois pegar o filename pelo process.env
    let databaseName: string;

    if(process.env.NODE_ENV === 'test'){
      databaseName = 'database-test.sqlite';
    } else {
      databaseName = 'database.sqlite';
    }

    const filename = path.join(__dirname, databaseName);

    DBConnection.connection = await open({
      filename: filename,
      driver: sqlite3.Database
    });

    await this.initialSetup();
    console.log('Connection with database created!');
  }

  async closeConnection(){
    await DBConnection.connection.close();
  }

  async initialSetup() {
    const tableIsCreated = await checkIfTableExists('user');
    if(tableIsCreated) return;

    console.log('Starting database initial setup...');
    await this.createDatabaseTables();
  }

  async createDatabaseTables() {
    sqlite3.verbose();

    await createUserTable();
    await createHistoryTable();
    await createFavoriteTable();
  }
}

async function createFavoriteTable(){
  const query = 
  `
    CREATE TABLE IF NOT EXISTS favorite (
      user_id VARCHAR NOT NULL,
      word VARCHAR NOT NULL,
      added DATETIME NOT NULL,
      PRIMARY KEY(user_id, word),
      FOREIGN KEY(user_id) REFERENCES user(user_id)
    )
  `;

  await DBConnection.connection.exec(query);
}

async function createHistoryTable(){
  const query = 
  `
    CREATE TABLE IF NOT EXISTS history (
      user_id VARCHAR NOT NULL,
      word VARCHAR NOT NULL,
      added DATETIME NOT NULL,
      PRIMARY KEY(user_id, word),
      FOREIGN KEY(user_id) REFERENCES user(user_id)
    )
  `;

  await DBConnection.connection.exec(query);
}

async function createUserTable() {
  const query = 
  `
    CREATE TABLE IF NOT EXISTS user (
      user_id VARCHAR NOT NULL PRIMARY KEY,
      name VARCHAR NOT NULL,
      email VARCHAR NOT NULL,
      password VARCHAR NOT NULL
    )
  `;

  await DBConnection.connection.exec(query);
}

async function checkIfTableExists(table: string) {
  const query = `SELECT name FROM sqlite_master WHERE type='table' AND name=?`;

  const result = await DBConnection.connection.get(query, [table]);

  if(!result){
    return false;
  }

  return true;
}

export default DBConnection;