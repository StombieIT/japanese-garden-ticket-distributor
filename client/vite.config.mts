import {defineConfig, loadEnv} from "vite";
import {fileURLToPath, URL} from "url";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import {TanStackRouterVite} from "@tanstack/router-vite-plugin";

console.log(fileURLToPath(new URL("./src/variables.styl", import.meta.url)));

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    return {
        base: env.VITE_BASE_URL,
        build: {
            outDir: env.VITE_SERVER_STATIC_PATH
        },
        plugins: [
            react(),
            svgr(),
            TanStackRouterVite(),
        ],
        resolve: {
            alias: [
                { find: "@", replacement: fileURLToPath(new URL("./src", import.meta.url)) }
            ]
        },
        css: {
            preprocessorOptions: {
                styl: {
                    imports: [
                        fileURLToPath(new URL("./src/variables.styl", import.meta.url))
                    ],
                }
            }
        }
    };
});