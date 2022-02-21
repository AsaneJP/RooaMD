import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateFirst1645466680106 implements MigrationInterface {
    name = 'CreateFirst1645466680106'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "contents" character varying NOT NULL, "createdAt" character varying NOT NULL, "updatedAt" character varying NOT NULL, "folderId" uuid NOT NULL, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "status" character varying NOT NULL, "createdAt" character varying NOT NULL, "updatedAt" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "folder" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "parentId" character varying NOT NULL, "createdAt" character varying NOT NULL, "updatedAt" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_6278a41a706740c94c02e288df8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_c0ff5c4422056c989237cf3a6e4" FOREIGN KEY ("folderId") REFERENCES "folder"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "folder" ADD CONSTRAINT "FK_a0ef64d088bc677d66b9231e90b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "folder" DROP CONSTRAINT "FK_a0ef64d088bc677d66b9231e90b"`);
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_c0ff5c4422056c989237cf3a6e4"`);
        await queryRunner.query(`DROP TABLE "folder"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "item"`);
    }

}
