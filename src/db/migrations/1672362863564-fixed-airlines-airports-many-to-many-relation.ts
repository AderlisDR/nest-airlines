import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixedAirlinesAirportsManyToManyRelation1672362863564
  implements MigrationInterface
{
  name = 'fixedAirlinesAirportsManyToManyRelation1672362863564';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "airport_airlines_airline" DROP CONSTRAINT "FK_10341b914544c86c1c73f3cb2d7"`);
    await queryRunner.query(`ALTER TABLE "airport_airlines_airline" ADD CONSTRAINT "FK_10341b914544c86c1c73f3cb2d7" FOREIGN KEY ("airlineId") REFERENCES "airline"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "airport_airlines_airline" DROP CONSTRAINT "FK_10341b914544c86c1c73f3cb2d7"`);
    await queryRunner.query(`ALTER TABLE "airport_airlines_airline" ADD CONSTRAINT "FK_10341b914544c86c1c73f3cb2d7" FOREIGN KEY ("airlineId") REFERENCES "airline"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
  }
}
