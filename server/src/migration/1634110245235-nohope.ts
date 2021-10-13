import {MigrationInterface, QueryRunner} from "typeorm";

export class nohope1634110245235 implements MigrationInterface {
    name = 'nohope1634110245235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`dbs\`.\`admin\` (\`createDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteDate\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`dbs\`.\`product_img\` (\`createDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteDate\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`imgPath\` varchar(255) NOT NULL, \`productId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`dbs\`.\`product\` (\`createDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteDate\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`dbs\`.\`product_option\` (\`createDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteDate\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`productId\` int NULL, \`optionId\` int NULL, \`optionValueId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`dbs\`.\`option_value\` (\`createDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteDate\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`optionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`dbs\`.\`option\` (\`createDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteDate\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`meta\` enum ('text', 'color') NOT NULL DEFAULT 'text', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`dbs\`.\`receipt_option_product\` (\`createDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteDate\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`productName\` varchar(255) NOT NULL, \`productOptionName\` varchar(255) NOT NULL, \`productOptionValue\` varchar(255) NOT NULL, \`receiptProductId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`dbs\`.\`receipt_product\` (\`createDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteDate\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`pruductName\` varchar(255) NOT NULL, \`quanlity\` int NOT NULL, \`unitPrice\` varchar(255) NOT NULL, \`receiptId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`dbs\`.\`user\` (\`createDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteDate\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`dbs\`.\`receipt\` (\`createDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteDate\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`description\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`totalPrice\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`dbs\`.\`product_img\` ADD CONSTRAINT \`FK_5b52f440918a9d1ca1f13bf3bf8\` FOREIGN KEY (\`productId\`) REFERENCES \`dbs\`.\`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`dbs\`.\`product_option\` ADD CONSTRAINT \`FK_2ca1aab0a82e9c0058d8465ad02\` FOREIGN KEY (\`productId\`) REFERENCES \`dbs\`.\`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`dbs\`.\`product_option\` ADD CONSTRAINT \`FK_23e7d0e6bd9f9268c6988e0bd88\` FOREIGN KEY (\`optionId\`) REFERENCES \`dbs\`.\`option\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`dbs\`.\`product_option\` ADD CONSTRAINT \`FK_de2bca59588b130c7d7db8f68b1\` FOREIGN KEY (\`optionValueId\`) REFERENCES \`dbs\`.\`option_value\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`dbs\`.\`option_value\` ADD CONSTRAINT \`FK_2d7616b884ef55e6eb5af000f1d\` FOREIGN KEY (\`optionId\`) REFERENCES \`dbs\`.\`option\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`dbs\`.\`receipt_option_product\` ADD CONSTRAINT \`FK_1db6c9613b2ca172fcedacc96e0\` FOREIGN KEY (\`receiptProductId\`) REFERENCES \`dbs\`.\`receipt_product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`dbs\`.\`receipt_product\` ADD CONSTRAINT \`FK_08bfe33d6de04ea7518c4968977\` FOREIGN KEY (\`receiptId\`) REFERENCES \`dbs\`.\`receipt\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`dbs\`.\`receipt\` ADD CONSTRAINT \`FK_e011d4704c491f4d821d7ebb6ca\` FOREIGN KEY (\`userId\`) REFERENCES \`dbs\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dbs\`.\`receipt\` DROP FOREIGN KEY \`FK_e011d4704c491f4d821d7ebb6ca\``);
        await queryRunner.query(`ALTER TABLE \`dbs\`.\`receipt_product\` DROP FOREIGN KEY \`FK_08bfe33d6de04ea7518c4968977\``);
        await queryRunner.query(`ALTER TABLE \`dbs\`.\`receipt_option_product\` DROP FOREIGN KEY \`FK_1db6c9613b2ca172fcedacc96e0\``);
        await queryRunner.query(`ALTER TABLE \`dbs\`.\`option_value\` DROP FOREIGN KEY \`FK_2d7616b884ef55e6eb5af000f1d\``);
        await queryRunner.query(`ALTER TABLE \`dbs\`.\`product_option\` DROP FOREIGN KEY \`FK_de2bca59588b130c7d7db8f68b1\``);
        await queryRunner.query(`ALTER TABLE \`dbs\`.\`product_option\` DROP FOREIGN KEY \`FK_23e7d0e6bd9f9268c6988e0bd88\``);
        await queryRunner.query(`ALTER TABLE \`dbs\`.\`product_option\` DROP FOREIGN KEY \`FK_2ca1aab0a82e9c0058d8465ad02\``);
        await queryRunner.query(`ALTER TABLE \`dbs\`.\`product_img\` DROP FOREIGN KEY \`FK_5b52f440918a9d1ca1f13bf3bf8\``);
        await queryRunner.query(`DROP TABLE \`dbs\`.\`receipt\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`dbs\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`dbs\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`dbs\`.\`receipt_product\``);
        await queryRunner.query(`DROP TABLE \`dbs\`.\`receipt_option_product\``);
        await queryRunner.query(`DROP TABLE \`dbs\`.\`option\``);
        await queryRunner.query(`DROP TABLE \`dbs\`.\`option_value\``);
        await queryRunner.query(`DROP TABLE \`dbs\`.\`product_option\``);
        await queryRunner.query(`DROP TABLE \`dbs\`.\`product\``);
        await queryRunner.query(`DROP TABLE \`dbs\`.\`product_img\``);
        await queryRunner.query(`DROP TABLE \`dbs\`.\`admin\``);
    }

}
