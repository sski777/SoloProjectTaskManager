import { expressjwt } from 'express-jwt'
import jwksRsa from 'jwks-rsa'

const jwtCheck = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-z6tatywvih7xm0cl.us.auth0.com/.well-known/jwks.json`,
  }),
  audience: 'https://FlowMate.com/api',
  issuer: `https://dev-z6tatywvih7xm0cl.us.auth0.com/`,
  algorithms: ['RS256'],
});

export default jwtCheck