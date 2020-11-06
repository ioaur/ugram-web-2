import { MigrationInterface, QueryRunner } from "typeorm";

export class FreshStart1582472649743 implements MigrationInterface {
    name = "FreshStart1582472649743";

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE IF EXISTS "user" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "image" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "seeding_log_entry" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "tag" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "tag_images_image" CASCADE`);

        await queryRunner.query(
            `CREATE TABLE "user" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(50) NOT NULL, "firstname" character varying(50) NOT NULL, "lastname" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "phoneNumber" character varying(50) NOT NULL, "registrationDate" TIMESTAMP NOT NULL, "profilePictureId" integer, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "REL_f58f9c73bc58e409038e56a405" UNIQUE ("profilePictureId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
            undefined
        );
        await queryRunner.query(
            `CREATE TABLE "tag" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`,
            undefined
        );
        await queryRunner.query(
            `CREATE TABLE "image" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "uploadedById" integer NOT NULL, "description" character varying, "url" character varying NOT NULL, "mentionUserId" integer, "creationDate" TIMESTAMP NOT NULL, CONSTRAINT "REL_5462aa105480569b44e1bd9d06" UNIQUE ("mentionUserId"), CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`,
            undefined
        );
        await queryRunner.query(
            `CREATE TABLE "seeding_log_entry" ("id" character varying NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e3986f57903dd6cd7f05a6fb5f4" PRIMARY KEY ("id"))`,
            undefined
        );
        await queryRunner.query(
            `CREATE TABLE "tag_images_image" ("tagId" integer NOT NULL, "imageId" integer NOT NULL, CONSTRAINT "PK_3ed4ae3a37f326ad91f904feb4e" PRIMARY KEY ("tagId", "imageId"))`,
            undefined
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_c892b13c9424d43a8b12445d03" ON "tag_images_image" ("tagId") `,
            undefined
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_db5d9959bc7077892e0aa1f0f5" ON "tag_images_image" ("imageId") `,
            undefined
        );
        await queryRunner.query(
            `ALTER TABLE "user" ADD CONSTRAINT "FK_f58f9c73bc58e409038e56a4055" FOREIGN KEY ("profilePictureId") REFERENCES "image"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
            undefined
        );
        await queryRunner.query(
            `ALTER TABLE "image" ADD CONSTRAINT "FK_5a32ea481d14333cc36c38ebfd4" FOREIGN KEY ("uploadedById") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
            undefined
        );
        await queryRunner.query(
            `ALTER TABLE "image" ADD CONSTRAINT "FK_5462aa105480569b44e1bd9d064" FOREIGN KEY ("mentionUserId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
            undefined
        );
        await queryRunner.query(
            `ALTER TABLE "tag_images_image" ADD CONSTRAINT "FK_c892b13c9424d43a8b12445d031" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
            undefined
        );
        await queryRunner.query(
            `ALTER TABLE "tag_images_image" ADD CONSTRAINT "FK_db5d9959bc7077892e0aa1f0f54" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
            undefined
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `ALTER TABLE "tag_images_image" DROP CONSTRAINT "FK_db5d9959bc7077892e0aa1f0f54"`,
            undefined
        );
        await queryRunner.query(
            `ALTER TABLE "tag_images_image" DROP CONSTRAINT "FK_c892b13c9424d43a8b12445d031"`,
            undefined
        );
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_5462aa105480569b44e1bd9d064"`, undefined);
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_5a32ea481d14333cc36c38ebfd4"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_f58f9c73bc58e409038e56a4055"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_db5d9959bc7077892e0aa1f0f5"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_c892b13c9424d43a8b12445d03"`, undefined);
        await queryRunner.query(`DROP TABLE "tag_images_image"`, undefined);
        await queryRunner.query(`DROP TABLE "seeding_log_entry"`, undefined);
        await queryRunner.query(`DROP TABLE "image"`, undefined);
        await queryRunner.query(`DROP TABLE "tag"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
    }
}
