const BookData = require("../../../database/data/BookData");

exports.BookListPage = (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10);
    const itemsPerPage = 2;
    const totalItems = BookData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (isNaN(page) || page < 1 || page > totalPages) {
      return res.redirect("/admin/invalid-request");
    }

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    const pageData = BookData.slice(startIndex, endIndex);

    res.status(200).json({
      message: "Success Params Request",
      currentPage: page,
      totalPages: totalPages,
      bookListLength: totalItems,
      bookData: pageData,
    });
  } catch (error) {
    console.error("Error in request function:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};



exports.BookData = (req, res, next) => {
  try {
    const getBookData = BookData;
    res.status(200).json({
      message: "Render Book List",
      data: getBookData,
    });
  } catch (error) {
    console.error("Error in BookData function:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
