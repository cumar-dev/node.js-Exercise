const books = require("../model/Books");
// get all books
exports.getBooks = async(req, res)=> {
    try {
        const getBooks = await books.find();
        res.json(getBooks);
    } catch (error) {
       res.status(500).json({ message: error.message });
    }
}

// get one book

exports.getInfoBooks = async(req, res)=> {
    const {id} = req.params;
    try {
        const getInfoBooks = await books.findById(id);
        res.json(getInfoBooks);
    } catch (error) {
         res.status(500).json({ message: error.message });
    }
}

// create books

exports.createBooks = async(req, res)=> {
    try {
        const newBooks = new books(req.body);
        const saved = await newBooks.save();
        res.status(201).json(saved)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// update

exports.updatedBooks = async(req, res)=> {
    const {id} = req.params;
    try {
       const updatedBooks = await books.findByIdAndUpdate(id, req.body, {new: true});
       if(!updatedBooks) return res.status(404).send("books not found");
       res.json(updatedBooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// delete

exports.deleteBooks = async(req, res)=> {
    const {id} = req.params;
    try {
        const deleteBooks = await books.findByIdAndDelete(id);
        if(!deleteBooks) return res.status(404).send("books not found");
        res.send(`books with ${id} deleted successfully`);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}