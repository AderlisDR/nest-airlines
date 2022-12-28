import { MigrationInterface, QueryRunner } from 'typeorm';

export class initMigration1672205491103 implements MigrationInterface {
  name = 'initMigration1672205491103';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "flight" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createdDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL, "internalComment" character varying(300), "flightNumber" character varying(4) NOT NULL, "source" character varying(100) NOT NULL, "destination" character varying(100) NOT NULL, "departurDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "arrivalDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "airlineId" uuid, CONSTRAINT "PK_bf571ce6731cf071fc51b94df03" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "airline" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createdDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL, "internalComment" character varying(300), "name" character varying(100) NOT NULL, CONSTRAINT "PK_9a0dd52135c26e0201205412623" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "airport" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createdDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL, "internalComment" character varying(300), "name" character varying(100) NOT NULL, "city" character varying(100) NOT NULL, "state" character varying(100) NOT NULL, CONSTRAINT "PK_ea1ecba8dec9bee0cb60194e788" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "airport_airlines_airline" ("airportId" uuid NOT NULL, "airlineId" uuid NOT NULL, CONSTRAINT "PK_7161f559ca207d6dced849720f3" PRIMARY KEY ("airportId", "airlineId"))`);
    await queryRunner.query(`CREATE INDEX "IDX_38f9cdadd6d6216a50766c447d" ON "airport_airlines_airline" ("airportId") `);
    await queryRunner.query(`CREATE INDEX "IDX_10341b914544c86c1c73f3cb2d" ON "airport_airlines_airline" ("airlineId") `);
    await queryRunner.query(`ALTER TABLE "flight" ADD CONSTRAINT "FK_9178ec2896690b7cd4d69c4bc12" FOREIGN KEY ("airlineId") REFERENCES "airline"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "airport_airlines_airline" ADD CONSTRAINT "FK_38f9cdadd6d6216a50766c447dc" FOREIGN KEY ("airportId") REFERENCES "airport"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "airport_airlines_airline" ADD CONSTRAINT "FK_10341b914544c86c1c73f3cb2d7" FOREIGN KEY ("airlineId") REFERENCES "airline"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "airport_airlines_airline" DROP CONSTRAINT "FK_10341b914544c86c1c73f3cb2d7"`);
    await queryRunner.query(`ALTER TABLE "airport_airlines_airline" DROP CONSTRAINT "FK_38f9cdadd6d6216a50766c447dc"`);
    await queryRunner.query(`ALTER TABLE "flight" DROP CONSTRAINT "FK_9178ec2896690b7cd4d69c4bc12"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_10341b914544c86c1c73f3cb2d"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_38f9cdadd6d6216a50766c447d"`);
    await queryRunner.query(`DROP TABLE "airport_airlines_airline"`);
    await queryRunner.query(`DROP TABLE "airport"`);
    await queryRunner.query(`DROP TABLE "airline"`);
    await queryRunner.query(`DROP TABLE "flight"`);
  }
}
