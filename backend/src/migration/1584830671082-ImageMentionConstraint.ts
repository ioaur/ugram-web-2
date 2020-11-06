import { MigrationInterface, QueryRunner } from "typeorm";

export class ImageMentionConstraint1584830671082 implements MigrationInterface {
    name = "ImageMentionConstraint1584830671082";

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_5462aa105480569b44e1bd9d064"`, undefined);
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "REL_5462aa105480569b44e1bd9d06"`, undefined);
        await queryRunner.query(
            `ALTER TABLE "image" ADD CONSTRAINT "FK_5462aa105480569b44e1bd9d064" FOREIGN KEY ("mentionUserId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
            undefined
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_5462aa105480569b44e1bd9d064"`, undefined);
        await queryRunner.query(
            `ALTER TABLE "image" ADD CONSTRAINT "REL_5462aa105480569b44e1bd9d06" UNIQUE ("mentionUserId")`,
            undefined
        );
        await queryRunner.query(
            `ALTER TABLE "image" ADD CONSTRAINT "FK_5462aa105480569b44e1bd9d064" FOREIGN KEY ("mentionUserId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
            undefined
        );
    }
}
