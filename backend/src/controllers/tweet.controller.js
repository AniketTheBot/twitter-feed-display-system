// This is a placeholder test function for now.
const healthcheck = (req, res) => {
  res.status(200).json({
    message: 'Backend is running and healthy!',
    status: 'OK',
  });
};

export { healthcheck };