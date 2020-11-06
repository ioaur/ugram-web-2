import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import { EntityManager } from "typeorm";
import { SeedingLogEntry } from "./seeding.entity";
import initialSeeding from "./seeds/initialseeding.seed";

@Injectable()
export class SeedingMiddleware implements NestMiddleware {
    private isSeedingComplete: Promise<boolean>;

    constructor(private readonly entityManager: EntityManager) {}

    async use(req: Request, res: Response, next: Function) {
        if (await this.isSeedingComplete) {
            return next();
        }

        this.isSeedingComplete = (async () => {
            if (!(await this.entityManager.findOne(SeedingLogEntry, { id: "initial-seeding" }))) {
                await this.entityManager.transaction(async (transactionalEntityManager) => {
                    await initialSeeding(transactionalEntityManager);
                });
            }

            return true;
        })();

        await this.isSeedingComplete;

        next();
    }
}
