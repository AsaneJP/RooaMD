import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeItemTable1645857177392 implements MigrationInterface {
    name = 'ChangeItemTable1645857177392'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_c0ff5c4422056c989237cf3a6e4"`);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "folderId"`);
        await queryRunner.query(`ALTER TABLE "item" ADD "parentId" character varying`);
        await queryRunner.query(`ALTER TABLE "item" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_5369db3bd33839fd3b0dd5525d1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_5369db3bd33839fd3b0dd5525d1"`);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "parentId"`);
        await queryRunner.query(`ALTER TABLE "item" ADD "folderId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_c0ff5c4422056c989237cf3a6e4" FOREIGN KEY ("folderId") REFERENCES "folder"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
