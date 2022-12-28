import { MigrationInterface, QueryRunner } from 'typeorm';

export class removedCreatedByAndUpdatedBy1672213256766
  implements MigrationInterface
{
  name = 'removedCreatedByAndUpdatedBy1672213256766';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "flight" DROP COLUMN "createdBy"`);
    await queryRunner.query(`ALTER TABLE "flight" DROP COLUMN "lastChangedBy"`);
    await queryRunner.query(`ALTER TABLE "airline" DROP COLUMN "createdBy"`);
    await queryRunner.query(`ALTER TABLE "airline" DROP COLUMN "lastChangedBy"`);
    await queryRunner.query(`ALTER TABLE "airport" DROP COLUMN "createdBy"`);
    await queryRunner.query(`ALTER TABLE "airport" DROP COLUMN "lastChangedBy"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "airport" ADD "lastChangedBy" character varying(300) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "airport" ADD "createdBy" character varying(300) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "airline" ADD "lastChangedBy" character varying(300) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "airline" ADD "createdBy" character varying(300) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "flight" ADD "lastChangedBy" character varying(300) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "flight" ADD "createdBy" character varying(300) NOT NULL`);
  }
}
