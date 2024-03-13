export const siteConfig = {
  name: "aptus",
  url: "https://events.esmechicago.com",
  ogImage: "https://ui.shadcn.com/og.jpg",
  description: "Unique culinary, cocktails and art events at Esmé Chicago",
  links: {
    esme_landing: "https://esmechicago.com",
    esme_elite_landing: "https://esmechicago.com/elite-enroll",
    esme_bar: "https://www.esmechicago.com/bar-esme-about",
    esme_private_events: "https://www.esmechicago.com/private-events-at-esme",
  },
  images: {
    login:
      "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80",
  },
}

export type SiteConfig = typeof siteConfig
