import {MigrationInterface, QueryRunner} from "typeorm";

export class Auth1584489696911 implements MigrationInterface {
    name = 'Auth1584489696911'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ADD "googleid" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "phoneNumber" DROP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "phoneNumber" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "googleid"`, undefined);
    }

}
