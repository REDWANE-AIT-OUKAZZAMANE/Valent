/** @type {import('next').NextConfig} */
const useBasePath = process.env.GITHUB_ACTIONS === "true";
const repositoryEnv = process.env.GITHUB_REPOSITORY ?? "";
const repositoryParts = repositoryEnv.split("/");
const repository =
  repositoryParts.length > 1 ? repositoryParts[1] : repositoryParts[0];
const basePath =
  useBasePath && repository.length > 0 ? `/${repository}` : "";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
