/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `Session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Session" DROP COLUMN "expiresAt";
