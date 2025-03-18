-- CreateTable
CREATE TABLE `user_query` (
    `id` VARCHAR(191) NOT NULL,
    `info_identitas_id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `nomor_telepon` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `user_query_email_key`(`email`),
    UNIQUE INDEX `user_query_username_key`(`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `informasi_fakultas` (
    `id_fakultas` VARCHAR(191) NOT NULL,
    `nama_fakultas` VARCHAR(191) NOT NULL,
    `kode_dikti` VARCHAR(191) NOT NULL,
    `kode_universitas` VARCHAR(191) NOT NULL,
    `kode_fakultas` VARCHAR(191) NOT NULL,
    `tanggal_pendirian` DATETIME(3) NOT NULL,
    `kelompok_fakultas` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_fakultas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
