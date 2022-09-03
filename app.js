const loadAllNavTab = () => {

    fetch(`https://openapi.programming-hero.com/api/news/categories`)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
    toggleSpinner(true);

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

    const noNews = document.getElementById('no-found-message');
    if (news.length === 0) {
        noNews.classList.remove('d-none');
    } else {
        noNews.classList.add('d-none');
    }

    const itemAvailable = document.getElementById('item');
    itemAvailable.value = `Items Found: ${news.length}`;





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
    <img src="${posts.author.img}"class="card-img-bottom rounded-circle author" ><span class="text-dark">${posts.author.name ? posts.author.name:"No name"}</span>
    <i class="fa-duotone fa-eye">${posts.total_view ? posts.total_view:'Empty'}</i>
    <button class="btn btn-primary mb-2" type="button" data-bs-toggle="modal" data-bs-target="#newsDetailModal">More</button>
    
    </div>
    </div>
    
    `;
        newsConatiner.appendChild(div);



        const modalTitle = document.getElementById('exampleModalLabel');
        modalTitle.innerHTML = `
            
            <div>
                <h5 >${posts.title}</h5>
                <p class="fs-6">${posts.details}</p>
                <p>View:${posts.total_view}</p>
            </div>
            <div>
            
            
            `;



    })

    toggleSpinner(false);


}
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    } else {
        loaderSection.classList.add('d-none');
    }
}


loadAllNavTab();