/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

exports.onRenderBody = ({ setBodyAttributes }, _pluginOptions) => {
  setBodyAttributes({
    "data-branch": process.env.GATSBY_BRANCH,
  });
};
