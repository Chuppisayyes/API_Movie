const successCode = (res, message, data, statusCode = 200) => {
    res.status(statusCode || 200).json({
      statusCode,
      message,
      data,
    });
  };
  
  const errorCode = (res, message, data, statusCode = 400) => {
    res.status(statusCode || 400).json({
      statusCode,
      message,
      data,
    });
  };
  
  const failCode = (res, message, statusCode = 500) => {
    res.status(statusCode || 500).json({
      statusCode,
      message,
    });
  };
  
  module.exports = { successCode, errorCode, failCode };
  