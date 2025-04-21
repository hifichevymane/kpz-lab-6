import { createFileRoute } from '@tanstack/react-router'
import EntityDetails from "../../pages/EntityDetails.tsx";
import { getEntityById } from "../../entities";

export const Route = createFileRoute('/entities/$id')({
  component: EntityDetails,
  loader: async ({ params: { id } }) => {
    const entity = await getEntityById(Number(id));
    return entity;
  }
})
