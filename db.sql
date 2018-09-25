/* User Registration Table Schema

    CREATE TABLE `regtable` 
    (
        `ID` INT (2000) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        `username` VARCHAR(20) NOT NULL,
        `password` VARCHAR(20) NOT NULL,
        `email` VARCHAR(20) NOT NULL
    ); 
*/


/*  Chat History Table Schema

    CREATE TABLE `chathistory` 
    (
        `yourID` varchar(20) PRIMARY KEY, 
        `friendID` varchar(20) NOT NULL, 
        `link` varchar(100) NOT NULL
    ); 
*/