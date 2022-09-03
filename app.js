const loadAllNavTab = () => {

    fetch(`https://openapi.programming-hero.com/api/news/categories`)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
}

const displayCategories = categories => {
    const navContainer = document.getElementById('all-category');

    for (const category of categories) {
        const li = document.createElement('li')
        li.innerHTML = `
        
        <li class="nav-item">
                    <a onclick="viewNews(${category.category_id})"class="nav-link" href="#">${category.category_name}</a>
                </li>
        
        `;

        navContainer.appendChild(li);
    }

}

const viewNews = category_id => {
    // https://openapi.programming-hero.com/api/news/category/{category_id}

    const url = `https://openapi.programming-hero.com/api/news/category/0${category_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
}
const displayNews = news => {
    console.log(news[0])
    const newsConatiner = document.getElementById('news-container');
    newsConatiner.textContent = ``;

    news.forEach(posts => {

        const div = document.createElement('div');
        div.classList.add('col');
        console.log(posts);

        div.innerHTML = `
    <div class="card containerPost">
    <img src="${posts.image_url
    }" class="w-full card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title text-wrap">${posts.title}</h5>
        <p class=" card-text post ">${posts.details}</p>
    </div>
    <div>
    <div class="d-flex justify-content-evenly">
    <img src="${posts.author.img}"class="card-img-bottom rounded-circle author" ><span class="text-dark">${posts.author.name}</span>
    <i class="fa-duotone fa-eye">${posts.total_view}</i>
    <button class="btn btn-primary mb-2" type="button">More</button>
    
    </div>
    </div>
    
    `;
        newsConatiner.appendChild(div);

    })




}

loadAllNavTab();