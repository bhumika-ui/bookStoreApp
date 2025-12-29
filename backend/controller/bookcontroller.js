import Book from "../model/bookModel.js";

const getBook = async(req, res) => {
    try{
       const book = await Book.find();
       res.status(200).json(book);
    } catch(error) {
      console.log("error", error);
      res.status(500).json(error);
    }
};

const getBookById = async (req, res) => {
  try{
    const book = await Book.findById(req.params.id);
    if(!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch(error){
    console.log("error", error);
    res.status(500).json(error);
  }
};

export { getBook, getBookById };