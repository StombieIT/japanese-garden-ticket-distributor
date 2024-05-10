import {createRoot} from "react-dom/client";
import {createRouter, RouterProvider} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "@/state-management";
import "./index.css";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
    interface Register {

        router: typeof router;
    }
}

const root = createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <RouterProvider router={router} />
);
