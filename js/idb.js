import { openDB } from 'https://cdn.jsdelivr.net/npm/idb@7/+esm';

export default class DB{
  constructor(){}

  async setupDB(){
    return await openDB('SC2', 1, {
      upgrade(db) {
        // Create a store of objects
        db.createObjectStore( 'currencies' , { keyPath: 'id', autoIncrement: true });

        const ratesStore = db.createObjectStore('rates', {
          keyPath: 'pair'
        });
        ratesStore.createIndex('pair', 'pair');

      },
    });
  }

  
  async insertToDB(item, store) {
    const db = await this.setupDB();
    const tx =  db.transaction(store, 'readwrite');
    const dbStore = tx.objectStore(store);
    await dbStore.put(item);
    tx.done;
  }

  async retrieve(store, idx) { 
    const db = await this.setupDB();
    const tx = db.transaction(store);
    const dbStore = tx.objectStore(store);

    if(!idx) return dbStore.getAll();

    const value = await db.getFromIndex(store, 'pair', idx);
    return value;
  }
}
