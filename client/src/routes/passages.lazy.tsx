import { createLazyFileRoute } from '@tanstack/react-router'
import {Passages} from "@/components/Passages/Passages";

export const Route = createLazyFileRoute('/passages')({
  component: Passages
})