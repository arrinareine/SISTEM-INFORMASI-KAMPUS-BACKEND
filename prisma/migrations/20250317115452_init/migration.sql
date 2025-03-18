/*
  Warnings:

  - A unique constraint covering the columns `[id_fakultas]` on the table `informasi_fakultas` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `informasi_fakultas` MODIFY `tanggal_pendirian` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `informasi_fakultas_id_fakultas_key` ON `informasi_fakultas`(`id_fakultas`);
