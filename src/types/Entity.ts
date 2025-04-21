export interface Entity {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateEntityDTO = Pick<Entity, 'title' | 'description'>;
