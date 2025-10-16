//file1
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:9500", //one time activity no need of changing all time when url changes
        changeOrigin: true, //CORS
        secure: false, //https false
      },
    }, //it looks like the rest call will be done by the frontend server but internally it will be redirected to the backend server via this proxy
    // this is done not to show the backend url in the frontend code or ui network tab this is step1
  },
});
