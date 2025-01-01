const corsOptions = {
  origin: [
    `https://${process.env.CLIENT_BASE_URL}`,
    `https://www.${process.env.CLIENT_BASE_URL}`,
    ...(
      process.env.CLIENT_PRIVATE_URL ? [ 
        `https://${process.env.CLIENT_PRIVATE_URL}`,
      ] : []
    )
  ],
  credentials: true,
}

console.log('corsOptions: ', corsOptions);

export default corsOptions
