import { createLazyFileRoute } from '@tanstack/react-router'
import {Statuses} from "@/components/Statuses/Statuses";

export const Route = createLazyFileRoute('/statuses')({
  component: Statuses
})