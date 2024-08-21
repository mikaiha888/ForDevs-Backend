import { MigrationInterface, QueryRunner } from "typeorm";

export class First1724269863753 implements MigrationInterface {
    name = 'First1724269863753'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."contract_status_enum" AS ENUM('rejected', 'pending', 'accepted')`);
        await queryRunner.query(`CREATE TABLE "contract" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subject" character varying(255) NOT NULL DEFAULT 'Contrato para proyecto', "projectDescription" text NOT NULL DEFAULT 'Descripción del proyecto', "budget" double precision NOT NULL DEFAULT '1', "currency" character varying(10) NOT NULL DEFAULT 'ARS', "availableTime" character varying(50) NOT NULL DEFAULT 'Ahora', "status" "public"."contract_status_enum" NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "sender_id" uuid, "receiver_id" uuid, CONSTRAINT "PK_17c3a89f58a2997276084e706e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "plans" ("planName" character varying NOT NULL DEFAULT 'Free', "price" double precision NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_af9011aa81d61b640123dcf16bd" PRIMARY KEY ("planName"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(30) NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "technology" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_89f217a9ebf9b4bc1a0d74883ec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(100) NOT NULL, "description" character varying NOT NULL DEFAULT '', "image" character varying(512) NOT NULL DEFAULT 'image_notfound.jpg', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rating" integer NOT NULL, "comment" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "reviewer_id" uuid, "reviewedUser_id" uuid, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying(255) NOT NULL, "password" character varying NOT NULL, "bio" character varying(300), "aboutMe" character varying(5000), "image" character varying, "coverImage" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "planName" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "links" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "url" character varying NOT NULL, "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ecf17f4a741d3c5ba0b4c5ab4b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "like" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "projectId" uuid NOT NULL, CONSTRAINT "PK_eff3e46d24d416b52a7e0ae4159" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "commission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rate" double precision NOT NULL, "amount" double precision NOT NULL, "contractId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, CONSTRAINT "PK_d108d70411783e2a3a84e386601" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_tags" ("projectsId" uuid NOT NULL, "tagId" uuid NOT NULL, CONSTRAINT "PK_1a58c576c945ae2c45399342972" PRIMARY KEY ("projectsId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e65bc7ae3a0f3b34b30bbfe7c8" ON "project_tags" ("projectsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f32b78c2affb2ff0556eee81b2" ON "project_tags" ("tagId") `);
        await queryRunner.query(`CREATE TABLE "project_technologies" ("projectsId" uuid NOT NULL, "technologyId" uuid NOT NULL, CONSTRAINT "PK_89a53269ce44b0e9eb127e53635" PRIMARY KEY ("projectsId", "technologyId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2c6a0be5869d1a8bb93482b06e" ON "project_technologies" ("projectsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f8d58af88a6743390a911f257a" ON "project_technologies" ("technologyId") `);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_8382101aa8939ce7663c74a6907" FOREIGN KEY ("sender_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_3e48185d0816dbcbf428679ed02" FOREIGN KEY ("receiver_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_361a53ae58ef7034adc3c06f09f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_2f8adca6682f8238c64d767c9d3" FOREIGN KEY ("reviewer_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_6985d7bbc234d23fd322cca0cd9" FOREIGN KEY ("reviewedUser_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_64edafe239b25f1513a2ada5fac" FOREIGN KEY ("planName") REFERENCES "plans"("planName") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "links" ADD CONSTRAINT "FK_56668229b541edc1d0e291b4c3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_e8fb739f08d47955a39850fac23" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_66302700d86694c05c0e3184ae4" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commission" ADD CONSTRAINT "FK_00169695db83bc44a388364dbce" FOREIGN KEY ("contractId") REFERENCES "contract"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_tags" ADD CONSTRAINT "FK_e65bc7ae3a0f3b34b30bbfe7c8a" FOREIGN KEY ("projectsId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_tags" ADD CONSTRAINT "FK_f32b78c2affb2ff0556eee81b28" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_technologies" ADD CONSTRAINT "FK_2c6a0be5869d1a8bb93482b06e2" FOREIGN KEY ("projectsId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_technologies" ADD CONSTRAINT "FK_f8d58af88a6743390a911f257a7" FOREIGN KEY ("technologyId") REFERENCES "technology"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_technologies" DROP CONSTRAINT "FK_f8d58af88a6743390a911f257a7"`);
        await queryRunner.query(`ALTER TABLE "project_technologies" DROP CONSTRAINT "FK_2c6a0be5869d1a8bb93482b06e2"`);
        await queryRunner.query(`ALTER TABLE "project_tags" DROP CONSTRAINT "FK_f32b78c2affb2ff0556eee81b28"`);
        await queryRunner.query(`ALTER TABLE "project_tags" DROP CONSTRAINT "FK_e65bc7ae3a0f3b34b30bbfe7c8a"`);
        await queryRunner.query(`ALTER TABLE "commission" DROP CONSTRAINT "FK_00169695db83bc44a388364dbce"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_66302700d86694c05c0e3184ae4"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_e8fb739f08d47955a39850fac23"`);
        await queryRunner.query(`ALTER TABLE "links" DROP CONSTRAINT "FK_56668229b541edc1d0e291b4c3b"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_64edafe239b25f1513a2ada5fac"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_6985d7bbc234d23fd322cca0cd9"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_2f8adca6682f8238c64d767c9d3"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_361a53ae58ef7034adc3c06f09f"`);
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_3e48185d0816dbcbf428679ed02"`);
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_8382101aa8939ce7663c74a6907"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f8d58af88a6743390a911f257a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2c6a0be5869d1a8bb93482b06e"`);
        await queryRunner.query(`DROP TABLE "project_technologies"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f32b78c2affb2ff0556eee81b2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e65bc7ae3a0f3b34b30bbfe7c8"`);
        await queryRunner.query(`DROP TABLE "project_tags"`);
        await queryRunner.query(`DROP TABLE "commission"`);
        await queryRunner.query(`DROP TABLE "like"`);
        await queryRunner.query(`DROP TABLE "links"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "technology"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "plans"`);
        await queryRunner.query(`DROP TABLE "contract"`);
        await queryRunner.query(`DROP TYPE "public"."contract_status_enum"`);
    }

}
