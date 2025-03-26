/*
  Warnings:

  - A unique constraint covering the columns `[opponent,date]` on the table `match` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "match_opponent_date_key" ON "match"("opponent", "date");
