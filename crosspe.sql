
-- -- CREATE TABLE Users(id int NOT NULL PRIMARY KEY, name varchar(200), email varchar(200))
-- -- CREATE TABLE Classes(id int NOT NULL PRIMARY KEY, type varchar(200), capacity int)
-- -- CREATE TABLE Bookings(
-- --     id int NOT NULL PRIMARY KEY,
-- --     user_id int,
-- --     class_id int,
-- --     status varchar(100),
-- --     FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
-- --     FOREIGN KEY (class_id) REFERENCES Classes(id) ON DELETE CASCADE
-- -- );

-- SELECT name FROM sqlite_master WHERE type='table' OR type='view';
-- update Classes set capacity=5
