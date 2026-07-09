import type { Metadata } from "next";
import { DownloadCTA } from "@/components/DownloadCTA";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { GitHubRepoSection } from "@/components/GitHubRepoSection";
import { GitHubReleasesSection } from "@/components/GitHubReleasesSection";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { JsonLd } from "@/components/JsonLd";
import { getReleases, getRepo } from "@/lib/github";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const [repo, releases] = await Promise.all([getRepo(), getReleases()]);
  const latestVersion = releases[0]?.tagName;

  return (
    <>
      <JsonLd latestVersion={latestVersion} />
      <Header />
      <main id="main-content">
        <Hero />
        <Features />
        <HowItWorks />
        <GitHubRepoSection repo={repo} />
        <GitHubReleasesSection releases={releases} />
        <DownloadCTA />
      </main>
      <Footer />
    </>
  );
}
