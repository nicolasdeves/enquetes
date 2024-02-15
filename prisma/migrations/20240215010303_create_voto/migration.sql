-- CreateTable
CREATE TABLE "Voto" (
    "id" SERIAL NOT NULL,
    "sessaoId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "opcaoId" TEXT NOT NULL,
    "enqueteId" TEXT NOT NULL,

    CONSTRAINT "Voto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Voto_sessaoId_enqueteId_key" ON "Voto"("sessaoId", "enqueteId");

-- AddForeignKey
ALTER TABLE "Voto" ADD CONSTRAINT "Voto_opcaoId_fkey" FOREIGN KEY ("opcaoId") REFERENCES "Opcao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voto" ADD CONSTRAINT "Voto_enqueteId_fkey" FOREIGN KEY ("enqueteId") REFERENCES "Enquete"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
