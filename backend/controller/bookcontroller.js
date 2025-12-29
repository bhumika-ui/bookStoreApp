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

const searchBooks = async(req, res) => {
  try{
    const { q } = req.query;
    if(!q){
      return res.status(400).json({ message: "Search query required" });
    }
    
    const books = await Book.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { title: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } }
      ]
    });

    res.status(200).json(books);
  } catch(error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export { getBook, getBookById, searchBooks };