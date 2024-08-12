import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1723487807975 implements MigrationInterface {
    name = 'FirstMigration1723487807975'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(30) NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rating" integer NOT NULL, "comment" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "reviewerId" uuid, "reviewedUserId" uuid, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying(255) NOT NULL, "password" character varying NOT NULL, "bio" character varying(300), "aboutMe" character varying(5000), "image" character varying, "coverImage" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(100) NOT NULL, "description" character varying NOT NULL DEFAULT '', "image" character varying(512) NOT NULL DEFAULT 'image_notfound.jpg', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "technology" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_89f217a9ebf9b4bc1a0d74883ec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "like" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "projectId" uuid NOT NULL, CONSTRAINT "PK_eff3e46d24d416b52a7e0ae4159" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."contract_status_enum" AS ENUM('rejected', 'pending', 'accepted')`);
        await queryRunner.query(`CREATE TABLE "contract" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "senderId" uuid NOT NULL, "receiverId" uuid NOT NULL, "subject" character varying(255) NOT NULL DEFAULT 'Contrato para proyecto', "projectDescription" text NOT NULL DEFAULT 'Descripción del proyecto', "budget" double precision NOT NULL DEFAULT '1', "currency" character varying(10) NOT NULL DEFAULT 'ARS', "availableTime" character varying(50) NOT NULL DEFAULT 'Ahora', "status" "public"."contract_status_enum" NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, CONSTRAINT "PK_17c3a89f58a2997276084e706e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "commission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rate" double precision NOT NULL, "amount" double precision NOT NULL, "contractId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, CONSTRAINT "PK_d108d70411783e2a3a84e386601" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag_projects_projects" ("tagId" uuid NOT NULL, "projectsId" uuid NOT NULL, CONSTRAINT "PK_4aa52e280392e23add809f30bd4" PRIMARY KEY ("tagId", "projectsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c255baf9ac7337f560fde762a3" ON "tag_projects_projects" ("tagId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2f795f382efc1c6039c7d90570" ON "tag_projects_projects" ("projectsId") `);
        await queryRunner.query(`CREATE TABLE "technology_projects_projects" ("technologyId" uuid NOT NULL, "projectsId" uuid NOT NULL, CONSTRAINT "PK_cf50cf98db86f3c9506a25de677" PRIMARY KEY ("technologyId", "projectsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a62a3050030c5707e74f370416" ON "technology_projects_projects" ("technologyId") `);
        await queryRunner.query(`CREATE INDEX "IDX_49fe225b4fba2273221b42d1ca" ON "technology_projects_projects" ("projectsId") `);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_34413365b39e3bf5bea866569b4" FOREIGN KEY ("reviewerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_50d8f2705a47085014d25291858" FOREIGN KEY ("reviewedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_361a53ae58ef7034adc3c06f09f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_e8fb739f08d47955a39850fac23" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_66302700d86694c05c0e3184ae4" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_460d945a17d9bc1b3cff9949513" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_f7b400aff168a3ece1392558c9a" FOREIGN KEY ("receiverId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commission" ADD CONSTRAINT "FK_00169695db83bc44a388364dbce" FOREIGN KEY ("contractId") REFERENCES "contract"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag_projects_projects" ADD CONSTRAINT "FK_c255baf9ac7337f560fde762a3e" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tag_projects_projects" ADD CONSTRAINT "FK_2f795f382efc1c6039c7d905704" FOREIGN KEY ("projectsId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "technology_projects_projects" ADD CONSTRAINT "FK_a62a3050030c5707e74f3704167" FOREIGN KEY ("technologyId") REFERENCES "technology"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "technology_projects_projects" ADD CONSTRAINT "FK_49fe225b4fba2273221b42d1ca6" FOREIGN KEY ("projectsId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "technology_projects_projects" DROP CONSTRAINT "FK_49fe225b4fba2273221b42d1ca6"`);
        await queryRunner.query(`ALTER TABLE "technology_projects_projects" DROP CONSTRAINT "FK_a62a3050030c5707e74f3704167"`);
        await queryRunner.query(`ALTER TABLE "tag_projects_projects" DROP CONSTRAINT "FK_2f795f382efc1c6039c7d905704"`);
        await queryRunner.query(`ALTER TABLE "tag_projects_projects" DROP CONSTRAINT "FK_c255baf9ac7337f560fde762a3e"`);
        await queryRunner.query(`ALTER TABLE "commission" DROP CONSTRAINT "FK_00169695db83bc44a388364dbce"`);
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_f7b400aff168a3ece1392558c9a"`);
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_460d945a17d9bc1b3cff9949513"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_66302700d86694c05c0e3184ae4"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_e8fb739f08d47955a39850fac23"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_361a53ae58ef7034adc3c06f09f"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_50d8f2705a47085014d25291858"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_34413365b39e3bf5bea866569b4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_49fe225b4fba2273221b42d1ca"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a62a3050030c5707e74f370416"`);
        await queryRunner.query(`DROP TABLE "technology_projects_projects"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2f795f382efc1c6039c7d90570"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c255baf9ac7337f560fde762a3"`);
        await queryRunner.query(`DROP TABLE "tag_projects_projects"`);
        await queryRunner.query(`DROP TABLE "commission"`);
        await queryRunner.query(`DROP TABLE "contract"`);
        await queryRunner.query(`DROP TYPE "public"."contract_status_enum"`);
        await queryRunner.query(`DROP TABLE "like"`);
        await queryRunner.query(`DROP TABLE "technology"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP TABLE "tag"`);
    }

}
