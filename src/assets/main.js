const API = "https://api.escuelajs.co/api/v1";
// variables for html
const section = document.querySelector(".cardContainer");
const displaySection = document.querySelector(".pagination");
const errorMessage = document.getElementById("error");
const searchInput = document.querySelector(".searchInput");
const homePage = document.querySelector(".home");
const logo = document.querySelector(".logo");
let categoriesInput;

let dropdown_menu = document.querySelector(".dropdown-menu");
// import { getData} from './asideOptions'

if (window.outerWidth < 768) {
  console.log("hola");
  categoriesInput = document.querySelector(".dropdown-menu");
} else {
  categoriesInput = document.querySelector(".categories");
}

let current_page = 1;
let rows_per_page = 20;
async function fetchData(urlApi) {
  try {
    const response = await fetch(urlApi);
    const data = response.json();

    return data;
  } catch (error) {
    errorMessage.innerText = error.status;
  }
}

async function getData(urlApi, wrapper, row_per_page, page) {
  wrapper.innerHTML = "";
  page--;
  let start = row_per_page * page;
  let end = start + row_per_page;

  try {
    let productList = await fetchData(urlApi);
    let itemPerPage = productList.slice(start, end);
    itemPerPage.map((producto) => {
      // Html tags
      const card = document.createElement("div");
      const image = document.createElement("img");
      const card_body = document.createElement("div");
      const title = document.createElement("h5");
      const description = document.createElement("p");
      const category = document.createElement("span");
      const PriceCart = document.createElement("div");
      const btnCart = document.createElement("button");
      const price = document.createElement("span");
      // html clases

      card.classList.add(
        "card",
        "col-12",
        "col-md-4",
        "col-lg-3",
        "mt-5",
        "text-start"
      );
      image.classList.add("card-img-top");
      image.setAttribute("id", "img");
      card_body.classList.add("card-body");
      title.classList.add("card-title");
      description.classList.add("card-text", "DescriptionSize", "fw-normal");
      category.classList.add("fw-bold");
      PriceCart.classList.add("row", "mb-2");
      btnCart.classList.add("btn", "btn-outline-success", "col-7", "ms-2");
      price.classList.add("col-3", "offset-1", "fs-6");

      // building html card
      btnCart.setAttribute("type", "button");
      image.setAttribute("src", producto.images);
      btnCart.innerText = "Agregar a cart";
      price.innerText = `Q ${producto.price}`;
      category.innerText = `${producto.category.name}  `;
      title.innerText = producto.title;
      description.innerText = producto.description;
      PriceCart.append(btnCart, price);
      card_body.append(title, description);
      card.append(image, card_body, category, PriceCart);
      wrapper.append(card);
    });
  } catch (error) {
    console.log(error);
    (errorMessage.innerText = error), error.status;
  }
}

function paginationButton(page, urlApi) {
  let button = document.createElement("li");
  if (current_page == page) {
    button.classList.add("active");
  }

  button.addEventListener("click", function () {
    current_page = page;
    getData(urlApi, section, rows_per_page, current_page);
    let current_button = document.querySelector(".pagination .active");
    current_button.classList.remove("active");
    button.classList.add("active");
  });
  return button;
}

async function setUpPagination(urlApi, wrapper, row_per_page) {
  wrapper.innerHTML = "";
  try {
    const products = await fetchData(urlApi);
    const pages = Math.ceil(products.length / row_per_page);
    if (pages > 1) {
      let previous = document.createElement("li");
    let previousSpan = document.createElement("span");
    previous.classList.add("page-item");
    previousSpan.classList.add("page-link");
    previousSpan.innerText = "Previous";
    previous.append(previousSpan);
    wrapper.append(previous);

    let paginationNumber = [];
    for (let index = 1; index <= pages; index++) {
      const page = paginationButton(index, urlApi);
      const pageA = document.createElement("a");
      page.classList.add("page-item");
      pageA.classList.add("page-link");
      pageA.innerText = index;
      page.append(pageA);
      paginationNumber.push(page)
      
    }
    wrapper.append(...paginationNumber);
    const next = document.createElement("li");
    const nextA = document.createElement("a");
    next.classList.add("page-item");
    nextA.classList.add("page-link");
    nextA.innerText = "Next";
    next.append(nextA);
    wrapper.append(next);
    }
    
  } catch (error) {
    (errorMessage.innerText = error), error.status;
  }
}
