import { createLazyFileRoute } from '@tanstack/react-router'
import {TimesTable} from "@/components/Table/TimesTable";

export const Route = createLazyFileRoute('/times')({
  component: TimesTable
})