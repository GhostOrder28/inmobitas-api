const cookieSessionOptions = {
  name: 'session',
  sameSite: 'None',
  secure: true,
  // secureProxy: true,
  maxAge: 24 * 60 * 60 * 1000,
  keys: [ process.env.COOKIE_KEY_1, process.env.COOKIE_KEY_2 ],
}

module.exports = cookieSessionOptions;
