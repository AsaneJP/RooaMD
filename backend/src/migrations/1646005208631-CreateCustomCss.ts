import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCustomCss1646005208631 implements MigrationInterface {
    name = 'CreateCustomCss1646005208631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "folder" ADD "header1" character varying`);
        await queryRunner.query(`ALTER TABLE "folder" ADD "header2" character varying`);
        await queryRunner.query(`ALTER TABLE "folder" ADD "header3" character varying`);
        await queryRunner.query(`ALTER TABLE "folder" ADD "header4" character varying`);
        await queryRunner.query(`ALTER TABLE "folder" ADD "header5" character varying`);
        await queryRunner.query(`ALTER TABLE "folder" ADD "header6" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "folder" DROP COLUMN "header6"`);
        await queryRunner.query(`ALTER TABLE "folder" DROP COLUMN "header5"`);
        await queryRunner.query(`ALTER TABLE "folder" DROP COLUMN "header4"`);
        await queryRunner.query(`ALTER TABLE "folder" DROP COLUMN "header3"`);
        await queryRunner.query(`ALTER TABLE "folder" DROP COLUMN "header2"`);
        await queryRunner.query(`ALTER TABLE "folder" DROP COLUMN "header1"`);
    }

}
