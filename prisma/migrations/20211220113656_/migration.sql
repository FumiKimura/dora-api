-- CreateTable
CREATE TABLE "Gadget" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Gadget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT,
    "species" TEXT NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GadgetsOnCharacters" (
    "gadgetId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "GadgetsOnCharacters_pkey" PRIMARY KEY ("gadgetId","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gadget_name_key" ON "Gadget"("name");

-- AddForeignKey
ALTER TABLE "GadgetsOnCharacters" ADD CONSTRAINT "GadgetsOnCharacters_gadgetId_fkey" FOREIGN KEY ("gadgetId") REFERENCES "Gadget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GadgetsOnCharacters" ADD CONSTRAINT "GadgetsOnCharacters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
