import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
    // use a try catch block in case of errors with db
  try {
    const db = await openDB('jate', 1);

    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');

    await store.put(content);

    await tx.complete;
    console.log('Content added to the database:', content);
  } catch (error) {
    console.error('Error putting content into the database:', error);
  }
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // use a try catch block in case of errors with db
  try {

  // Create a connection to the database database and version we want to use.
  const textDb = await openDB('text', 1);

  const tx = textDb.transaction('text', 'readonly');

  const store = tx.objectStore('text');

  const request = store.getAll();

  const result = await request;
  console.log('Content added to the database:', content);
  return result; 
  } catch (error) {
    console.log("error putting content into the database:", error)
  }
};

initdb();
