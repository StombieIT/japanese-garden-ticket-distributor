import { createLazyFileRoute } from '@tanstack/react-router'
import {Users} from "@/components/Users/Users";

export const Route = createLazyFileRoute('/users')({
  component: Users
})