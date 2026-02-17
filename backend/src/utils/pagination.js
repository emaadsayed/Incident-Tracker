const getPagination = (page = 1, limit = 10) => {
    const parsedPage = Math.max(parseInt(page) || 1, 1);
    const parsedLimit = Math.min(Math.max(parseInt(limit) || 10, 1), 100);
  
    const skip = (parsedPage - 1) * parsedLimit;
  
    return {
      page: parsedPage,
      limit: parsedLimit,
      skip
    };
  };
  
  module.exports = getPagination;
  