/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repository = process.env.GITHUB_REPOSITORY?.includes("/")
  ? process.env.GITHUB_REPOSITORY.split("/")[1]
  : "";
const basePath = isGithubActions && repository ? `/${repository}` : "";
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
