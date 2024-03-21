import { SiteConfig } from "@/types";

const site_url = process.env.NEXT_PUBLIC_APP_URL!;

export const siteConfig: SiteConfig = {
  name: "Tail track",
  description:
    "Tail track: A open source custom event tracker for your next project.",
  url: site_url,
  ogImage: `${site_url}/landing.png`,
  links: {
    twitter: "",
    github: "",
  },
};
