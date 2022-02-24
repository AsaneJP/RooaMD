import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeFolderTable1645714809203 implements MigrationInterface {
  name = 'ChangeFolderTable1645714809203';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "folder" ALTER COLUMN "parentId" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "folder" ALTER COLUMN "parentId" SET NOT NULL`,
    );
  }
}
