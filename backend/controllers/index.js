const indexModel = require('../models/index')

const connect = async (req, res, next) => {
  try {
    const body = req?.body || {}
    const data = await indexModel.connect(body)
    return res.status(200).json({
      error: false,
      response_code: 200,
      response_desc: 'Success',
      data: data
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      error: true,
      response_code: error.statusCode || 500,
      response_desc: error.message || "Something went wrong.",
    });
  }
};

module.exports = { connect }