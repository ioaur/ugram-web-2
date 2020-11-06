import { MigrationInterface, QueryRunner } from "typeorm";

export class Notifications1586637291416 implements MigrationInterface {
    name = "Notifications1586637291416";

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `CREATE TABLE "user_notification" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "creationDate" TIMESTAMP NOT NULL, "message" character varying(500) NOT NULL, "seen" boolean NOT NULL, "userId" integer NOT NULL, "imageId" integer, "relatedUserId" integer, CONSTRAINT "PK_8840aac86dec5f669c541ce67d4" PRIMARY KEY ("id"))`,
            undefined
        );
        await queryRunner.query(
            `ALTER TABLE "user_notification" ADD CONSTRAINT "FK_4e1f9bde02fc8e6e46aa2638fe2" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
            undefined
        );
        await queryRunner.query(
            `ALTER TABLE "user_notification" ADD CONSTRAINT "FK_43a12d3cac756e1a9d44b267af1" FOREIGN KEY ("relatedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
            undefined
        );
        await queryRunner.query(
            `ALTER TABLE "user_notification" ADD CONSTRAINT "FK_dce2a8927967051c447ae10bc8b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
            undefined
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `ALTER TABLE "user_notification" DROP CONSTRAINT "FK_dce2a8927967051c447ae10bc8b"`,
            undefined
        );
        await queryRunner.query(
            `ALTER TABLE "user_notification" DROP CONSTRAINT "FK_43a12d3cac756e1a9d44b267af1"`,
            undefined
        );
        await queryRunner.query(
            `ALTER TABLE "user_notification" DROP CONSTRAINT "FK_4e1f9bde02fc8e6e46aa2638fe2"`,
            undefined
        );
        await queryRunner.query(`DROP TABLE "user_notification"`, undefined);
    }
}
