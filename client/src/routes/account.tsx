import { createFileRoute } from '@tanstack/react-router'
import {Account} from "@/components/Account/Account";

export const Route = createFileRoute('/account')({
  component: Account
})