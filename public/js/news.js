const newsList = document.querySelector("#news-list");

// Fetch to get news on homwpage using newsApi
fetch("/api/news")
  .then((response) => response.json())
  .then((data) => {
    let articleCount = 0;

    // Loops through all the articles
    for (let i = 0; i < data.articles.length; i++) {
      const article = data.articles[i];

      // Will only show articles that arent removed
      if (article.title !== "[Removed]" && articleCount < 6) {
        const link = document.createElement("a");
        link.href = article.url;
        link.target = "_blank";
        link.id = "news-a";

        const li = document.createElement("li");
        li.textContent = article.title;
        li.id = "news-li";

        newsList.appendChild(link);
        link.appendChild(li);

        articleCount++;
      }
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
