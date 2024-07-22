import { eq } from 'drizzle-orm';
import * as nodePostgres from 'drizzle-orm/node-postgres';
import * as pgCore from 'drizzle-orm/pg-core';

import * as database from '@/drizzle/schema';
import { BaseInterfaceRepository } from './repository.interface';

export abstract class BaseAbstractRepository<T, InsertSchema>
  implements BaseInterfaceRepository<T, InsertSchema>
{
  constructor(
    private readonly drizzle: nodePostgres.NodePgDatabase<typeof database>,
    private entity: pgCore.PgTableWithColumns<any>,
  ) {}

  public async findOneById(id: string): Promise<T | undefined> {
    const [res] = await this.drizzle
      .select()
      .from(this.entity)
      .where(eq(this.entity.id, id))
      .limit(1);

    return (res as T) ?? undefined;
  }

  public async delete(id: string): Promise<T | undefined> {
    const [deletedItem] = await this.drizzle
      .delete(this.entity)
      .where(eq(this.entity.id, id))
      .returning();

    return deletedItem as T;
  }

  public async findAll(): Promise<T[]> {
    return (await this.drizzle.select().from(this.entity)) as T[];
  }

  // updates entry by id
  public async update(
    id: string,
    data: Partial<InsertSchema>,
  ): Promise<T | undefined> {
    const [updatedItem] = await this.drizzle
      .update(this.entity)
      .set({ ...data })
      .where(eq(this.entity.id, id))
      .returning();

    return updatedItem as T;
  }

  public async create(data: Partial<InsertSchema>): Promise<T[]> {
    return (await this.drizzle
      .insert(this.entity)
      .values({ ...data })
      .returning()) as T[];
  }
}
