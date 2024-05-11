import {createRootRoute} from '@tanstack/react-router'
import {App} from "@/components/App/App";
import {StatusContent} from "@/components/StatusContent/StatusContent";

export const Route = createRootRoute({
    component: App,
    notFoundComponent: () => <StatusContent status={404} />
});
