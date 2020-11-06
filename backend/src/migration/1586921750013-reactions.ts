import {MigrationInterface, QueryRunner} from "typeorm";

export class reactions1586921750013 implements MigrationInterface {
    name = 'reactions1586921750013'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "reaction" ("id" SERIAL NOT NULL, "value" integer NOT NULL, "imageId" integer NOT NULL, CONSTRAINT "PK_41fbb346da22da4df129f14b11e" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user_reactions_reaction" ("userId" integer NOT NULL, "reactionId" integer NOT NULL, CONSTRAINT "PK_ccc532378ab3ee7dad7eec2acc7" PRIMARY KEY ("userId", "reactionId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_07ab83533f955a38200181073b" ON "user_reactions_reaction" ("userId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_072572ea96be237740839cf7b1" ON "user_reactions_reaction" ("reactionId") `, undefined);
        await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_45e32ef472ca9c5a5863073c36d" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_reactions_reaction" ADD CONSTRAINT "FK_07ab83533f955a38200181073b7" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_reactions_reaction" ADD CONSTRAINT "FK_072572ea96be237740839cf7b14" FOREIGN KEY ("reactionId") REFERENCES "reaction"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_reactions_reaction" DROP CONSTRAINT "FK_072572ea96be237740839cf7b14"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_reactions_reaction" DROP CONSTRAINT "FK_07ab83533f955a38200181073b7"`, undefined);
        await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_45e32ef472ca9c5a5863073c36d"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_072572ea96be237740839cf7b1"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_07ab83533f955a38200181073b"`, undefined);
        await queryRunner.query(`DROP TABLE "user_reactions_reaction"`, undefined);
        await queryRunner.query(`DROP TABLE "reaction"`, undefined);
    }

}
