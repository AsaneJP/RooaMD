import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeTable1645873972265 implements MigrationInterface {
    name = 'ChangeTable1645873972265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "parentId"`);
        await queryRunner.query(`ALTER TABLE "item" ADD "parentId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "parentId"`);
        await queryRunner.query(`ALTER TABLE "item" ADD "parentId" uuid DEFAULT uuid_generate_v4()`);
    }

}
