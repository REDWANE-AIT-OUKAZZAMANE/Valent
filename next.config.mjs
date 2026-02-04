/** @type {import('next').NextConfig} */
const isRunningInGitHubActions = process.env.GITHUB_ACTIONS === "true";
const repositoryEnv = process.env.GITHUB_REPOSITORY ?? "";
const repositoryParts = repositoryEnv.split("/");
const repository = repositoryParts.length > 1 ? repositoryParts[1] : "";
const basePath = isRunningInGitHubActions && repository ? `/${repository}` : "";
const assetPrefix = basePath;

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
