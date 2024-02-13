-- CreateTable
CREATE TABLE "Opcao" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "enqueteId" TEXT NOT NULL,

    CONSTRAINT "Opcao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Opcao" ADD CONSTRAINT "Opcao_enqueteId_fkey" FOREIGN KEY ("enqueteId") REFERENCES "Enquete"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
