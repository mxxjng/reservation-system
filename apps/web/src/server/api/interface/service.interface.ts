/* Basic Service Interface for handling crud */
export interface BaseServiceInterface<T, InserSchema> {
  create: (data: InserSchema, userId: string, userName: string) => Promise<T[]>;
  update: (
    id: string,
    data: InserSchema,
    userId: string,
    userName: string
  ) => Promise<T | undefined>;
  delete: (id: string, userId: string, userName: string) => Promise<T | undefined>;
  findOne: (id: string) => Promise<T | undefined>;
  findAll: () => Promise<T[]>;
}
