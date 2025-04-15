export interface Entity {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateEntityDTO = Pick<Entity, 'name' | 'description'>;
