const cookieSessionOptions = {
  name: 'session',
  sameSite: 'Strict',
  secure: true,
  // secureProxy: true,
  maxAge: 24 * 60 * 60 * 1000,
  keys: [ process.env.COOKIE_KEY_1, process.env.COOKIE_KEY_2 ],
  domain: process.env.CLIENT_BASE_URL
}

module.exports = cookieSessionOptions;
