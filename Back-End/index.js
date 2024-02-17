const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
const path = require('path')
const mongoose =require('mongoose')
const port = 3000;
app.use(cors());

main().catch((err) => {
  console.error(err); // Log the error
  res.status(500).send("Error saving blog data"); // Send an appropriate error response
});
async function main(){
  await mongoose.connect(
    `mongodb+srv://akash0121:NDG5mxxbfvrvZx8r@cluster0.pm6ibja.mongodb.net/Blog-DataBase`
  );
  console.log('DataBase Connected')
}

const blogSchema = new mongoose.Schema({
  name: String,
  title: String,
  description: String,
});

const Blog = mongoose.model('Blog-Details',blogSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get('/fetchAll', (req, res) => {
  Blog.find({})
  .then(posts => {
      console.log(posts);
      res.json(posts); // Send the posts as JSON response
  })
  .catch(err => {
      console.error('Failed to fetch posts', err);
      res.status(500).json({ error: 'Failed to fetch posts' });
  });
});


app.post("/blog", (req, res) => {
  console.log(req.body.name)
  console.log(req.body.title)
  console.log(req.body.description)

  const newBlog = new Blog({
    name: req.body.name,
    title: req.body.title,
    description: req.body.description
  });
  newBlog.save().then(()=>{
    res.sendFile(path.join(__dirname, 'index.html'));
  })
  .catch((err)=>{
    console.log(err)
    res.send("Registration Failed")
  })
});

app.listen(port, () => {
  console.log(`server is listen in ${port} Port `);
});
