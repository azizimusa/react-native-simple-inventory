import SQLite from 'react-native-sqlite-storage';
import { addMonths, format } from "date-fns";

const db = SQLite.openDatabase(
  {
    name: 'affin.db',
    location: 'default',
  },
  () => {
    console.log('Database connected!');
  }, //on success
  error => {
    console.log('Database error', error);
  }, //on error
);
export class Database {
  async createTable() {
    try {
      await db.executeSql('DROP TABLE inventory');

      await db.executeSql(`CREATE TABLE IF NOT EXISTS inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      itemName TEXT NOT NULL,
      expiryDate TEXT NOT NULL
    )`);
      console.log('Table created successfully');
    } catch (error) {
      console.error('Error creating table:', error);
    }
  }

  async getCategories(): Promise<unknown> {
    return await this.executeSql(
      'SELECT category FROM inventory GROUP BY category',
    );
  }

  async getCategoryItem(category: String): Promise<unknown> {
    const currentDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"); //2024-02-30T09:16:01

    return await this.executeSql(
      'SELECT * FROM inventory WHERE category =? AND expiryDate >=?',
      [category, currentDate],
    );
  }

  async getExpiredItem(category: String) {
    const currentDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"); //2024-02-30T09:16:01

    return await this.executeSql(
      'SELECT * FROM inventory WHERE category =? AND expiryDate <?',
      [category, currentDate],
    );
  }

  async getAlmostExpiredItem(category: String) {

    return await this.executeSql(
      // "SELECT * FROM inventory WHERE category =? AND ? - strftime('%s', expiryDate) < ?",
      'SELECT * FROM inventory\n' +
        "      WHERE category =? AND strftime('%Y-%m', expiryDate) = strftime('%Y-%m', 'now', 'localtime')\n" +
        "      AND strftime('%s', expiryDate) - strftime('%s', 'now') < 0",
      [category],
    );
  }

  async getItemsExpiringThisMonth(category: string) {

    const currentDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
    const nextMonthDate = addMonths(new Date(currentDate), 1);
    const nextMonthFormatted = format(nextMonthDate, "yyyy-MM-dd'T'HH:mm:ss");

    return await this.executeSql(
      "    SELECT * FROM inventory\n" +
      "    WHERE category = ? AND expiryDate >=? AND expiryDate <?",
      [category,currentDate,nextMonthFormatted],
    );
  }

  async getItemsExpiringNextMonth(category: string) {
    const currentDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
    const nextMonthDate = addMonths(new Date(currentDate), 1);
    const nextMonthFormatted = format(nextMonthDate, "yyyy-MM-dd'T'HH:mm:ss");

    const next2MonthDate = addMonths(new Date(currentDate), 2);
    const next2MonthFormatted = format(next2MonthDate, "yyyy-MM-dd'T'HH:mm:ss");

    return await this.executeSql(
      "    SELECT * FROM inventory\n" +
      "    WHERE category = ? AND expiryDate >=? AND expiryDate <?",
      [category,nextMonthFormatted,next2MonthFormatted],
    );
  }

  async executeSql(sql: string, params = []) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          sql,
          params,
          (_, results) => resolve(results),
          (_, error) => reject(error),
        );
      });
    });
  }

  async insertItems(itemList: any) {
    for (let i = 0; i < itemList.length; i++) {
      let iCat = itemList[i].item_cat;
      let iName = itemList[i].item_name;
      let expiry = itemList[i].expiry_date;

      let sql =
        'INSERT INTO inventory (category, itemName, expiryDate) VALUES (?,?,?)';

      try {

        db.executeSql(
          sql,
          [iCat, iName, expiry],
          () => {
            // console.log('adding', iName);
          },
          error => {
            console.log('error insert', error);
          },
        );
      } catch (error) {
        console.log(error);
      }
    }
  }
}
