import { createFileRoute } from "@tanstack/react-router";
import Entities from "../../pages/Entities.tsx";

export const Route = createFileRoute('/entities/')({
  component: Entities,
});
