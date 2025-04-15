import { createFileRoute } from '@tanstack/react-router'
import EntityDetails from "../../pages/EntityDetails.tsx";
import { getEntityById } from "../../store/entities";

export const Route = createFileRoute('/entities/$id')({
  component: EntityDetails,
  loader: ({ params: { id } }) => getEntityById(Number(id))
})
