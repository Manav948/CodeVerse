import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com"],
  },
};

const path = require("path");
const withNextIntl = require("next-intl/plugin")("./i18n.ts");

export default withNextIntl(nextConfig);
