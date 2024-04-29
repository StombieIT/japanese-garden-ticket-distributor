import {defineConfig, loadEnv} from "vite";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    return {
        base: "./",
        build: {
            outDir: env.VITE_SERVER_STATIC_PATH
        }
    };
});