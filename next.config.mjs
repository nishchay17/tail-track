import createJiti from "jiti";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {};
const jiti = createJiti(fileURLToPath(import.meta.url));

jiti("./lib/env.ts");

export default nextConfig;
