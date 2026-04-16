import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    // server: {
    //     port: 5173,
    //     open: true,
    // },

    server: {
        host: true,
        port: 3000,
        open: true,
        proxy: {
            "/api": {
                target: "http://10.1.1.227:5001/api/v1/",
                changeOrigin: true,
                secure: false,
                rewrite: (p) => p.replace(/^\/api/, ""),
            },
        },
    },

    build: {
        outDir: 'build',
    },
    esbuild: {
        loader: 'jsx',
        include: /src\/.*\.jsx?$/,
        exclude: [],
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                '.js': 'jsx',
            },
        },
    },
    envPrefix: 'REACT_APP_',
})
