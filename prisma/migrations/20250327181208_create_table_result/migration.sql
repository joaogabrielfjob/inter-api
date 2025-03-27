-- CreateTable
CREATE TABLE "result" (
    "id" SERIAL NOT NULL,
    "identifier" TEXT NOT NULL,
    "opponent" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "league" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "emblem" TEXT NOT NULL,
    "interGoals" INTEGER NOT NULL,
    "opponentGoals" INTEGER NOT NULL,

    CONSTRAINT "result_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "result_identifier_key" ON "result"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "result_opponent_date_key" ON "result"("opponent", "date");
