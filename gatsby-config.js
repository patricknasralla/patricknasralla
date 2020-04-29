/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: 'patricknasralla.com',
    description: 'Personal website of Dr. Patrick Nasralla.',
    siteUrl: 'https://patricknasralla.com',
    author: {
      name: 'Patrick Nasralla',
      url: 'https://patricknasralla.com',
      email: 'patricknasralla@tr33llion.com',
    },
    social: {
      twitter: 'https://twitter.com/gominosensei',
      github: 'https://github.com/patricknasralla',
    },
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 980,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.6rem`,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              inlineCodeMarker: `§`,
            },
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://patricknasralla.com`,
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Montserrat`,
            variants: [`300`, `500`, `700`],
          },
          {
            family: `Libre Baskerville`,
            variants: [`400`, `400i`, `700`],
          },
          {
            family: `IBM Plex Mono`,
            variants: [`400`, `400i`, `600`, `600i`],
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Patrick Nasralla`,
        short_name: `patricknasralla.com`,
        start_url: `/`,
        background_color: `#101921`,
        theme_color: `#DADDDF`,
        display: `browser`,
        icon: `src/assets/img/site_icon-192.png`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
  ],
};
