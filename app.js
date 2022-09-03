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
                    <a onclick="viewNews()"class="nav-link" href="#">${category.category_name}</a>
                </li>
        
        `;

        navContainer.appendChild(li);
    }

}

const viewNews = () => {
    console.log('view')
}

loadAllNavTab();