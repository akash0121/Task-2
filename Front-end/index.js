function createPost(){
    console.log("Creating....");
    window.open('index2.html', '_self');
}

// Api call
function getAllPost(){
    return fetch('http://localhost:3000/fetchAll')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
      });
}

// Function to create a new article element
function createArticle(post) {
    const article = document.createElement('article');
    const name = document.createElement('h2');
    const title = document.createElement('h2');
    const content = document.createElement('p');

    name.textContent = post.name;
    name.classList.add('article-name');

    title.textContent = post.title;
    title.classList.add('article-title');

    content.textContent = post.description;
    content.classList.add('article-content');


    article.appendChild(name);
    article.appendChild(title);
    article.appendChild(content);

    return article;
}

function addArticlesToPage(posts) {
    const blogContent = document.querySelector('.blog-content');
    posts.forEach(post => {
        const article = createArticle(post);
        blogContent.appendChild(article);
    });
}


document.addEventListener("DOMContentLoaded", function() {
    getAllPost().then(posts => {
        addArticlesToPage(posts);
    });
});

