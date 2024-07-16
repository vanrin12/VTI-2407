
var productListMockData = [
    {
        imgSrc: "https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-1-1.jpg",
        title: "Card title",
        text: 'Some quick.',
        link: '#'
    },
    {
        imgSrc: "https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-1-1.jpg",
        title: "Card title",
        text: 'Some quick.',
        link: '#'
    },
    {
        imgSrc: "https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-1-1.jpg",
        title: "Card title",
        text: 'Some quick.',
        link: '#'
    },
    {
        imgSrc: "https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-1-1.jpg",
        title: "Card title",
        text: 'Some quick.',
        link: '#'
    },
    {
        imgSrc: "https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-1-1.jpg",
        title: "Card title",
        text: 'Some quick.',
        link: '#'
    }, {
        imgSrc: "https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-1-1.jpg",
        title: "Card title",
        text: 'Some quick.',
        link: '#'
    },
    {
        imgSrc: "https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-1-1.jpg",
        title: "Card title",
        text: 'Some quick.',
        link: '#'
    }
];

$(function () {
    LoadContentPage();

    renderListProduct();
});
function LoadContentPage() {
    $(".menu-section").load("./Menu.html");
    $(".banner-section").load("./Banner.html");

}

function renderListProduct() {
    const productListContainer = $('.product-list');
    var products = JSON.parse(localStorage.getItem("products")) || [];
    products.forEach(product => {
        const productItem = $(`<div class="col-3">
        <div class="card">
            <img src="${product.image}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.info}</p>
            </div>
        </div>
    </div>`);
        productListContainer.append(productItem);
    })
}