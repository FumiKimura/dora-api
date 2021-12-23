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
CREATE TABLE "_CharacterToGadget" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Gadget_name_key" ON "Gadget"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToGadget_AB_unique" ON "_CharacterToGadget"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToGadget_B_index" ON "_CharacterToGadget"("B");

-- AddForeignKey
ALTER TABLE "_CharacterToGadget" ADD FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToGadget" ADD FOREIGN KEY ("B") REFERENCES "Gadget"("id") ON DELETE CASCADE ON UPDATE CASCADE;
