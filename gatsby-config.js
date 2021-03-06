const path = require("path");
const licenseOptions = require("./licenseOptions");
const packageLock = require("./package-lock.json");

require("dotenv").config({
  path: `.env`,
});

process.env["GATSBY_BRANCH"] = process.env.BRANCH;

module.exports = {
  siteMetadata: {
    publicUrl: "https://typeitjs.com",
    title: `TypeIt`,
    description: `The most versatile JavaScript typewriter effect library on the planet.`,
    author: {
      name: "Alex MacArthur",
      twitterHandle: "@amacarthur",
      social: [
        "https://www.linkedin.com/in/alexmacarthur",
        "https://www.twitter.com/amacarthur",
        "https://github.com/alexmacarthur",
      ],
    },
    navItems: [
      {
        title: "Pricing",
        path: "/#pricing",
      },
      {
        title: "Installation",
        path: "/#installation",
      },
      {
        title: "Flavors",
        path: "/#flavors",
      },
      {
        title: "Documentation",
        path: "/docs",
        nested: [
          {
            title: "Vanilla JavaScript",
            path: "/docs",
          },
          {
            title: "React Component",
            path: "/docs/react",
          },
          {
            title: "WordPress Plugin",
            path: "/docs/wordpress",
          },
        ],
      },
    ],
    typeItVersion: packageLock.dependencies.typeit.version,
    perks: [
      {
        text: "~4kb gzipped",
        component: "Feather",
      },
      {
        text: "no dependencies",
        component: "Laugh",
      },
      {
        text: "super flexible API",
        component: "Spock",
      },
      {
        text: "SEO-friendly",
        component: "Signs",
      },
    ],
    licenseOptions,
    homeSlices: {
      flavors: {
        description: `For easy usage in a wide variety of projects, TypeIt's ready to go in multiple different packages. Purchase a license, and you get to choose which implementation is best for your needs.`,
      },
      pricing: {
        description: `It's <strong>free</strong> for use in any personal or open source project (check out the code on <a href="https://github.com/alexmacarthur/typeit">GitHub!</a>). For a less restrictive commercial license, choose one of the following: `,
      },
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
      },
    },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-preact`,
    {
      resolve: "gatsby-plugin-webfonts",
      options: {
        fonts: {
          google: [
            {
              family: `Source Sans Pro`,
              variants: [`300`, `400`, `600`, `700`],
            },
          ],
        },
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: `${__dirname}/public/icons/`,
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `copy`,
        path: `${__dirname}/src/copy/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
            },
          },
          `gatsby-remark-prismjs`,
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `50`,
              removeAccents: true,
              icon: false,
            },
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "noopener noreferrer",
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `TypeIt`,
        short_name: `typeit`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#805ad5`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@variables": path.resolve(__dirname, "src/css/variables"),
        },
        extensions: [".js"],
      },
    },
  ],
};
