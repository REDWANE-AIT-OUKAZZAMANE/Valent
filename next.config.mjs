/** @type {import('next').NextConfig} */
const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const repositoryEnv = process.env.GITHUB_REPOSITORY ?? "";
const repository = repositoryEnv.split("/")[1] || "";
const basePath = isGitHubActions && repository ? `/${repository}` : "";

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
