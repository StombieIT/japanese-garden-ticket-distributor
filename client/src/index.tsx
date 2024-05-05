import {createRoot} from "react-dom/client";
import {App} from "@/components/App/App";
import "./index.css";
import {BrowserRouter} from "react-router-dom";

const root = createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <BrowserRouter basename={import.meta.env.VITE_ROUTER_BASE_URL}>
        <App />
    </BrowserRouter>
);
