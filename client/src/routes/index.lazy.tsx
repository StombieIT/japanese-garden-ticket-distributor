import {createLazyFileRoute} from "@tanstack/react-router";
import {Content} from "@/components/Content/Content";

export const Route = createLazyFileRoute("/")({
    component: Content,
});
