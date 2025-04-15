import { useLoaderData } from "@tanstack/react-router";
import type { Entity } from "../types/Entity";

export default function EntityDetails(): JSX.Element {
  const entity: Entity = useLoaderData({ from: '/entities/$id' });
  return <div>{JSON.stringify(entity)}</div>
}
