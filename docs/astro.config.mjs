// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Matchzy Overtime Manager",
      social: {
        github: "https://github.com/sivert-io/matchzy-overtime-manager",
      },
      sidebar: [
        {
          label: "Getting Started",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Introduction", slug: "getting-started" },
            { label: "Step 1: Cloning", slug: "getting-started/step-1" },
            { label: "Step 2: Environment", slug: "getting-started/step-2" },
            { label: "Step 3: Starting MOM", slug: "getting-started/step-3" },
            { label: "Step 4: Configure CS2", slug: "getting-started/step-4" },
          ],
        },
        {
          label: "Reference",
          collapsed: true,
          autogenerate: { directory: "reference" },
        },
      ],
      credits: true,
      defaultLocale: "en",
    }),
  ],
});
