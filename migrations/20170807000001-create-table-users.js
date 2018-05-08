'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
async function up(sequelize) {
    // language=PostgreSQL
    sequelize.query(`
        CREATE TABLE "users" (
            "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
            "firstName" VARCHAR(30) NOT NULL,
            "lastName" VARCHAR(30) NOT NULL,
            "email" VARCHAR(100) UNIQUE NOT NULL,
            "password" TEXT NOT NULL,
            "birthday" TIMESTAMP,
            "createdAt" TIMESTAMP NOT NULL,
            "updatedAt" TIMESTAMP NOT NULL,
            "deletedAt" TIMESTAMP
        );
    `);
    console.log('*Table users created!*');
}
exports.up = up;
async function down(sequelize) {
    // language=PostgreSQL
    sequelize.query(`DROP TABLE users`);
}
exports.down = down;
