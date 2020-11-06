import {MigrationInterface, QueryRunner} from "typeorm";

export class deleteConstraint1587262895464 implements MigrationInterface {
    name = 'deleteConstraint1587262895464'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_notification" DROP CONSTRAINT "FK_4e1f9bde02fc8e6e46aa2638fe2"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_notification" DROP CONSTRAINT "FK_43a12d3cac756e1a9d44b267af1"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_notification" DROP CONSTRAINT "FK_dce2a8927967051c447ae10bc8b"`, undefined);
        await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_45e32ef472ca9c5a5863073c36d"`, undefined);
        await queryRunner.query(`ALTER TABLE "image_comment" DROP CONSTRAINT "FK_9b7a0bda097c9fb72a9a5b0cdce"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_notification" ADD CONSTRAINT "FK_4e1f9bde02fc8e6e46aa2638fe2" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_notification" ADD CONSTRAINT "FK_43a12d3cac756e1a9d44b267af1" FOREIGN KEY ("relatedUserId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_notification" ADD CONSTRAINT "FK_dce2a8927967051c447ae10bc8b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_45e32ef472ca9c5a5863073c36d" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "image_comment" ADD CONSTRAINT "FK_9b7a0bda097c9fb72a9a5b0cdce" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "image_comment" DROP CONSTRAINT "FK_9b7a0bda097c9fb72a9a5b0cdce"`, undefined);
        await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_45e32ef472ca9c5a5863073c36d"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_notification" DROP CONSTRAINT "FK_dce2a8927967051c447ae10bc8b"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_notification" DROP CONSTRAINT "FK_43a12d3cac756e1a9d44b267af1"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_notification" DROP CONSTRAINT "FK_4e1f9bde02fc8e6e46aa2638fe2"`, undefined);
        await queryRunner.query(`ALTER TABLE "image_comment" ADD CONSTRAINT "FK_9b7a0bda097c9fb72a9a5b0cdce" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_45e32ef472ca9c5a5863073c36d" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_notification" ADD CONSTRAINT "FK_dce2a8927967051c447ae10bc8b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_notification" ADD CONSTRAINT "FK_43a12d3cac756e1a9d44b267af1" FOREIGN KEY ("relatedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_notification" ADD CONSTRAINT "FK_4e1f9bde02fc8e6e46aa2638fe2" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
