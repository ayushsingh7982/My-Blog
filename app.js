import Express from "express";
const app = Express();
const port = 3000;



app.set('view engine', 'ejs');
app.use(Express.static('public'));
app.use(Express.urlencoded({ extended: true }));


let posts = [];

// Home route - displays posts and the form to create a post
app.get('/', (req, res) => {
  res.render('index', { posts });
});

// Route to create a new post
app.post('/create', (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: Date.now(), title, content };
  posts.push(newPost);
  res.redirect('/');
});

// Route to display the edit form
app.get('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  res.render('edit', { post });
});

// Route to handle post editing
app.post('/edit/:id', (req, res) => {
  const { title, content } = req.body;
  const post = posts.find(p => p.id == req.params.id);
  post.title = title;
  post.content = content;
  res.redirect('/');
});

// Route to delete a post
app.post('/delete/:id', (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect('/');
  
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
