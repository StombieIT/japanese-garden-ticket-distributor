import {createLazyFileRoute} from "@tanstack/react-router";
import {AuthForm} from "@/components/AuthForm/AuthForm";

export const Route = createLazyFileRoute("/_auth")({
  component: AuthForm,
});