import type { GlobalConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

const localText = (name: string, label?: string, required = false) => ({
  name,
  type: "text" as const,
  label: label ?? name,
  localized: true,
  required,
});

const localRich = (name: string, label?: string) => ({
  name,
  type: "richText" as const,
  label: label ?? name,
  localized: true,
  editor: lexicalEditor({}),
});

export const HomePageGlobal: GlobalConfig = {
  slug: "page-home",
  label: "Home Page",
  admin: {
    group: "Pages",
  },
  access: { read: () => true },
  versions: {
    max: 20,
  },
  fields: [
    // ── Hero ────────────────────────────────────────────────────────────────
    {
      name: "hero",
      type: "group",
      label: "Hero Banner",
      fields: [
        {
          name: "backgroundImage",
          type: "upload",
          relationTo: "media" as const,
          label: "Background Image",
        },
        localText("eyebrow", "Eyebrow (small text above heading)"),
        localText("heading", "Heading", true),
        localText("subheading", "Subheading / schedule line"),
      ],
    },

    // ── Sunday Service ───────────────────────────────────────────────────────
    {
      name: "sundayService",
      type: "group",
      label: "Sunday Service Card",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media" as const,
          label: "Panel Image",
        },
        localText("eyebrow", "Eyebrow (small label)"),
        localText("heading", "Heading", true),
        localRich("body", "Body paragraph"),
        {
          name: "scheduleItems",
          type: "array",
          label: "Schedule Items",
          fields: [
            localText("time", "Time", true),
            localText("label", "Label", true),
            localText("sub", "Sub-label"),
          ],
        },
        localText("watchLiveUrl", "Watch Live URL (YouTube)"),
        localText("watchLiveLabel", "Watch Live button label"),
        localText("findUsLabel", "Find Us button label"),
        localText("addressLine", "Address display line"),
      ],
    },

    // ── Prayer Feature ───────────────────────────────────────────────────────
    {
      name: "prayerFeature",
      type: "group",
      label: "Prayer Feature Card",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media" as const,
          label: "Panel Image",
        },
        localText("eyebrow", "Eyebrow"),
        localText("heading", "Heading", true),
        localRich("body", "Body paragraph"),
        localText("ctaLabel", "Button label"),
      ],
    },

    // ── Recent Sermons ───────────────────────────────────────────────────────
    {
      name: "sermons",
      type: "group",
      label: "Recent Sermons Section",
      fields: [
        localText("heading", "Section Heading", true),
        {
          name: "featuredSermon",
          type: "relationship",
          relationTo: "sermons" as const,
          label: "Featured Sermon (optional — overrides latest)",
          required: false,
          admin: {
            description:
              "Pin a specific sermon here. If left blank, the most recently uploaded sermon is shown automatically.",
          },
        },
      ],
    },

    // ── Activities ───────────────────────────────────────────────────────────
    {
      name: "activities",
      type: "group",
      label: "Activities Section",
      fields: [
        localText("heading", "Section Heading", true),
        {
          name: "items",
          type: "array",
          label: "Activity Cards",
          fields: [
            localText("fellowship", "Fellowship name (e.g. Alpha Fellowship)"),
            localText("title", "Activity title", true),
            localText("dateLabel", "Date label (e.g. Jun 2025)"),
            localRich("description", "Description"),
            {
              name: "photos",
              type: "array",
              label: "Photos",
              fields: [
                {
                  name: "photo",
                  type: "upload",
                  relationTo: "media" as const,
                  required: true,
                },
              ],
            },
            {
              name: "legacyPhotoPaths",
              type: "array",
              label: "Legacy photo paths (temporary)",
              fields: [{ name: "path", type: "text" as const }],
              admin: { description: "Only used while migrating images to the media library." },
            },
          ],
        },
      ],
    },
  ],
};
