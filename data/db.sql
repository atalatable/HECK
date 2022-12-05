DROP TABLE IF EXISTS tags;

CREATE TABLE tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR NOT NULL DEFAULT "Default name"
);

DROP TABLE IF EXISTS write_ups;

CREATE TABLE write_ups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR NOT NULL DEFAULT "Default name",
  date DATE NOT NULL,
  catid INTEGER,
  wu_description VARCHAR DEFAULT "This is a write-up description",
  FOREIGN KEY(catid) REFERENCES categories(id)
);

DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR NOT NULL DEFAULT "Default name"
);

DROP TABLE IF EXISTS tags_wu;

CREATE TABLE tags_wu (
  tagid INTEGER,
  wuid INTEGER,
  FOREIGN KEY(tagid) REFERENCES tags(id),
  FOREIGN KEY(wuid) REFERENCES write_ups(id)
);