const corsOptions = {
  origin: [
    `https://${process.env.CLIENT_BASE_URL}`,
    `https://www.${process.env.CLIENT_BASE_URL}`,
  ],
  credentials: true,
}

module.exports = corsOptions
