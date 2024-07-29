-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "inTrash" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Folder" ADD COLUMN     "inTrash" BOOLEAN NOT NULL DEFAULT false;
