import { MigrationInterface, QueryRunner } from "typeorm";

export class ImageReactionsComments1586621055378 implements MigrationInterface {
    name = "ImageReactionsComments1586621055378";

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `CREATE TABLE "image_comment" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "creationDate" TIMESTAMP NOT NULL, "message" character varying(500) NOT NULL, "imageId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_a8465170860679862ee499cbde0" PRIMARY KEY ("id"))`,
            undefined
        );
        await queryRunner.query(
            `CREATE TABLE "user_images_liked_image" ("userId" integer NOT NULL, "imageId" integer NOT NULL, CONSTRAINT "PK_7fd8ec5fa305f32460a83ebf2ce" PRIMARY KEY ("userId", "imageId"))`,
            undefined
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_0951204016fe4a15f9eb6a1aa7" ON "user_images_liked_image" ("userId") `,
            undefined
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_08787cf82a670bb29a7a47c526" ON "user_images_liked_image" ("imageId") `,
            undefined
        );
        await queryRunner.query(
            `ALTER TABLE "image_comment" ADD CONSTRAINT "FK_f0c3f77daa6c2802b2f77a75fe2" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
            undefined
        );
        await queryRunner.query(
            `ALTER TABLE "image_comment" ADD CONSTRAINT "FK_9b7a0bda097c9fb72a9a5b0cdce" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
            undefined
        );
        await queryRunner.query(
            `ALTER TABLE "user_images_liked_image" ADD CONSTRAINT "FK_0951204016fe4a15f9eb6a1aa70" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
            undefined
        );
        await queryRunner.query(
            `ALTER TABLE "user_images_liked_image" ADD CONSTRAINT "FK_08787cf82a670bb29a7a47c5262" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
            undefined
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `ALTER TABLE "user_images_liked_image" DROP CONSTRAINT "FK_08787cf82a670bb29a7a47c5262"`,
            undefined
        );
        await queryRunner.query(
            `ALTER TABLE "user_images_liked_image" DROP CONSTRAINT "FK_0951204016fe4a15f9eb6a1aa70"`,
            undefined
        );
        await queryRunner.query(
            `ALTER TABLE "image_comment" DROP CONSTRAINT "FK_9b7a0bda097c9fb72a9a5b0cdce"`,
            undefined
        );
        await queryRunner.query(
            `ALTER TABLE "image_comment" DROP CONSTRAINT "FK_f0c3f77daa6c2802b2f77a75fe2"`,
            undefined
        );
        await queryRunner.query(`DROP INDEX "IDX_08787cf82a670bb29a7a47c526"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_0951204016fe4a15f9eb6a1aa7"`, undefined);
        await queryRunner.query(`DROP TABLE "user_images_liked_image"`, undefined);
        await queryRunner.query(`DROP TABLE "image_comment"`, undefined);
    }
}
