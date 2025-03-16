/*
  Warnings:

  - The primary key for the `user_query` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `enrollment_role` on the `user_query` table. All the data in the column will be lost.
  - You are about to drop the column `jurusan` on the `user_query` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `user_query` table. All the data in the column will be lost.
  - You are about to drop the column `nim` on the `user_query` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `user_query` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `info_identitas_id` to the `user_query` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `user_query` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `user_query` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_query` DROP PRIMARY KEY,
    DROP COLUMN `enrollment_role`,
    DROP COLUMN `jurusan`,
    DROP COLUMN `nama`,
    DROP COLUMN `nim`,
    ADD COLUMN `info_identitas_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `role` VARCHAR(191) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `info_identitas` (
    `id` VARCHAR(191) NOT NULL,
    `infoNIK` VARCHAR(191) NOT NULL,
    `infoNama_lengkap` VARCHAR(191) NOT NULL,
    `infoJenis_kelamin` VARCHAR(191) NOT NULL,
    `infoAlamat` VARCHAR(191) NOT NULL,
    `infoAgama` VARCHAR(191) NOT NULL,
    `infoStatus_perkawinan` VARCHAR(191) NOT NULL,
    `infoKewarganegaraan` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `info_identitas_infoNIK_key`(`infoNIK`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `user_query_username_key` ON `user_query`(`username`);
