import {createFileRoute, createLazyFileRoute} from "@tanstack/react-router";
import {SignInForm} from "@/components/Form/SignInForm";

export const Route = createFileRoute("/_auth/sign-in")({
    component: SignInForm,
});
