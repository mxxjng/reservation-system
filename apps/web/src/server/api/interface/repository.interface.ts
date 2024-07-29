export interface BaseInterfaceRepository<T, InsertSchema> {
  findOneById(id: string): Promise<T | undefined>;
  delete(id: string): Promise<T | undefined>;
  findAll(): Promise<T[]>;
  create(data: InsertSchema): Promise<T[]>;
  update(id: string, data: Partial<InsertSchema>): Promise<T | undefined>;
}
