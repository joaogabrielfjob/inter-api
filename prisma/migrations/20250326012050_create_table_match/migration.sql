-- CreateTable
CREATE TABLE "match" (
    "id" SERIAL NOT NULL,
    "identifier" TEXT NOT NULL,
    "opponent" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "league" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "emblem" TEXT NOT NULL,

    CONSTRAINT "match_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "match_identifier_key" ON "match"("identifier");
