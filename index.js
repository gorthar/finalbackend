const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const BookRecords = require("./BookRecords")

const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    BookRecords.find()
      .then((books) => res.send(books))
      .catch((error) => res.status(500).send("Internal Server Error"));
  });

  app.delete("/:id", async (req, res) => {
    try {
      const deletedBookRecord = await BookRecords.findByIdAndDelete(req.params.id);
      if (!deletedBookRecord) {
        return res.status(404).json({ message: "BookRecord not found" });
      }
      res
        .status(200)
        .json({ message: "BookRecord deleted successfully", BookRecords: deletedBookRecord });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to delete BookRecord", error: error.message });
    }
  });
  app.put("/:id", async (req, res) => {
    try {
      const bookRecord = await BookRecords.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title ,
          author: req.body.author,
          description: req.body.description,
        },
        { new: true }
      );
      if (!bookRecord) return res.status(404).send("bookRecord not found");
      res
        .status(200)
        .json({ message: "bookRecord updated successfully", bookRecord });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to update bookRecord", error: error.message });
    }
  });

  app.post("/", async (req, res) => {
    console.log(req.body)
    const bookRecord = new BookRecords({
        title: req.body.title ,
        author: req.body.author,
        description: req.body.description,
    });
    try {
      const result = await bookRecord.save();
      //send success message
      res.status(200).json({ message: "bookRecord saved successfully", result });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to save bookRecord", error: error.message });
    }
  });


//
mongoose
  .connect("mongodb+srv://dkahraman08:dogukan123@cluster0.qjlmbs6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(process.env.CONNECTION_STRING)
    console.log("Connected to MongoDB");
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Listening on port ${port}...`));
  })
  .catch((error) => {
    console.log("Error:", error);
  });
