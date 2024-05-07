import {createLazyFileRoute} from '@tanstack/react-router'
import {RegisterForm} from "@/components/RegisterForm/RegisterForm";

export const Route = createLazyFileRoute('/_auth/register')({
    component: RegisterForm
});