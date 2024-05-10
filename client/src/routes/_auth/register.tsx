import {createFileRoute} from '@tanstack/react-router'
import {RegisterForm} from "@/components/Form/RegisterForm";

export const Route = createFileRoute('/_auth/register')({
    component: RegisterForm
});