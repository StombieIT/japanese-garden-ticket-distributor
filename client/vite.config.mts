import {defineConfig, loadEnv} from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    return {
        base: env.VITE_BASE_URL,
        build: {
            outDir: env.VITE_SERVER_STATIC_PATH
        },
        plugins: [
            react()
        ],
    };
});