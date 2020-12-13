import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("User.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS fotos (id INTEGER PRIMARY KEY NOT NULL, titulo TEXT NOT NULL, imagemUri TEXT NOT NULL, endereco TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL)",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
          console.log("Deu erro ao criar tabela FOTOS: " + err);
        }
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS trackers (id INTEGER PRIMARY KEY NOT NULL, endereco INTEGER NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL)",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
          console.log("Erro ao criar tabela trackers: " + err);
        }
      );
    });
  });
  return promise;
};

export const inserirFoto = (titulo, imagemUri, endereco, lat, lng) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO fotos (titulo, imagemUri, endereco, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [titulo, imagemUri, endereco, lat, lng],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchFotos = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM fotos`,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const inserirTracker = (endereco, lat, lng) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO trackers (endereco, lat, lng) VALUES (?, ?, ?)`,
        [endereco, lat, lng],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchTrackers = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM trackers`,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
