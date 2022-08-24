const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");

const checkJwt = auth({
  audience: "https://cat-couture.com",
  issuerBaseURL: "https://dev-qlz4drmq.au.auth0.com",
});

const checkScopes = requiredScopes("read:reports");

module.exports = {
  checkJwt,
  checkScopes,
};
