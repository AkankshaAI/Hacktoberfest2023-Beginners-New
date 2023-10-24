// jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const PDFDocument = require('pdfkit');
const fs = require('fs');


let port = process.env.PORT || 3000;

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const connectionString = process.env.CONNECTION_STRING

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(port, function () {
      console.log("Server started on port " + port);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB Atlas:', error);
  });

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Post = mongoose.model("Post", postSchema);

app.get('/', (req, res) => {
  Post.find({})
    .then(posts => {
      res.render('home', {
        startingContent: homeStartingContent,
        posts: posts
      });
    })
    .catch(error => {
      res.send(error);
    });
    
});
app.get("/generate", (req, res) => {
  // Fetch all the posts from the MongoDB database
  Post.find({})
    .then(posts => {
      // Create a new PDF document
      const doc = new PDFDocument();

      // Pipe the PDF document to a writable stream
      const stream = fs.createWriteStream('posts.pdf');
      doc.pipe(stream);

      // Loop through the retrieved posts and add them to the PDF document
      posts.forEach(post => {
        doc.fontSize(16).text(post.title, { underline: true });
        doc.fontSize(12).text(post.content);
        doc.fontSize(12).text(post.id);
        doc.moveDown();
      });

      // Finalize the PDF document and close the stream
      doc.end();

      // Send the PDF file as a response
      stream.on('finish', () => {
        res.download('posts.pdf');
      });

      console.log('PDF generated successfully.');
    })
    .catch(error => {
      console.error(error);
      res.send("Error generating PDF");
    });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
  });

  post.save()
    .then(() => {
      res.redirect("/");
    })
    .catch(error => {
      res.send(error);
    });
});

app.get("/posts/:postId", function (req, res) {

  const requestedPostId = req.params.postId;

  Post.findOne({ _id: requestedPostId })
    .then(post => {
      res.render("post", {
        title: post.title,
        content: post.content,
        postId: post._id.toString() // Convert postId to a string
      });
    })
    .catch(error => {
      res.send(error);
    });
});
app.post("/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId;

  Post.findOneAndDelete({ _id: requestedPostId })
    .then(() => {
      res.redirect("/"); // Redirect to the home page or any other desired page
    })
    .catch(error => {
      res.send(error);
    });
});

app.get("/posts/:postId/edit", function (req, res) {
  const requestedPostId = req.params.postId;

  Post.findOne({ _id: requestedPostId })
    .then(post => {
      res.render("edit", {
        title: post.title,
        content: post.content,
        postId: post._id.toString() // Convert postId to a string
      });
    })
    .catch(error => {
      res.send(error);
    });
});

app.post("/posts/:postId/edit", function (req, res) {
  const requestedPostId = req.params.postId;
  const updatedTitle = req.body.title;
  const updatedContent = req.body.content;

  Post.updateOne(
    { _id: requestedPostId },
    { $set: { title: updatedTitle, content: updatedContent } }
  )
    .then(() => {
      res.redirect('/');
    })
    .catch(error => {
      res.send(error);
    });
});




app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});
