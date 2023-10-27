import { openDB, deleteDB, wrap, unwrap } from 'https://cdn.jsdelivr.net/npm/idb@7/+esm';

export default class DB{
  constructor(){}

  async setupDB(store){
    return await openDB('SC2', 1, {
      upgrade(db) {
        // Create a store of objects
        const dbStore = db.createObjectStore( store , { keyPath: 'id', autoIncrement: true });
        dbStore.createIndex('code', 'code');
      },
    });
  }

  
  async insertToDB(item, store) {
    const db = await this.setupDB(store);
    const tx =  db.transaction(store, 'readwrite');
    const dbStore = tx.objectStore(store);
    await dbStore.put(item);
    tx.done;
  }

  async retrieve(store) { 
    const db = await this.setupDB(store);
    const tx = db.transaction(store);
    const dbStore = tx.objectStore(store);
    return dbStore.getAll();      
  }
}


  // Add an article:
//   await db.add('articles', {
//     title: 'Article 1',
//     date: new Date('2019-01-01'),
//     body: '…',
//   });
// const items = [
//     {
//         title: 'Article 1',
//         date: new Date('2019-01-01'),
//         body: '…',
//       },
//     {
//         title: 'Article 2',
//         date: new Date('2019-01-01'),
//         body: '…',
//       },
//       {
//         title: 'Article 3',
//         date: new Date('2019-01-02'),
//         body: '…',
//       }
// ]
//   // Add multiple articles in one transaction:
//   {
//     const tx = db.transaction('currencies', 'readwrite');
//     await Promise.all([
//       tx.store.add({
//         title: 'Article 2',
//         date: new Date('2019-01-01'),
//         body: '…',
//       }),
//       tx.store.add({
//         title: 'Article 3',
//         date: new Date('2019-01-02'),
//         body: '…',
//       }),
//       tx.done,
//     ]);
//   }

//   // Get all the articles in date order:
//   console.log(await db.getAllFromIndex('articles', 'date'));

//   // Add 'And, happy new year!' to all articles on 2019-01-01:
//   {
//     const tx = db.transaction('articles', 'readwrite');
//     const index = tx.store.index('date');

//     for await (const cursor of index.iterate(new Date('2019-01-01'))) {
//       const article = { ...cursor.value };
//       article.body += ' And, happy new year!';
//       cursor.update(article);
//     }

//     await tx.done;
//   }
// }

// demo()