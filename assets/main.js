
function icon(className,  type) {
  const span = document.createElement('span');
  span.classList.add('material-symbols-outlined', className);
  span.append(type)
  return span;
}

function btn(className, content) {
  let btn = document.createElement('button');
  btn.setAttribute('type', 'button');
  btn.append(content)
  btn.classList.add(className)
  return btn; 
}

function createElement(tag, content=[], atributes='' ) {
  const tagName = document.createElement(tag);
  content.map(cont =>{
    tagName.append(cont)
  })
  Object.entries(atributes).map(atribute =>{
    tagName.setAttribute(atribute[0],atribute[1]);
  });
  if (tag ==='label') {
    console.log(tagName);
  }
  return tagName;
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
    const cards = []
    itemPerPage.map((producto) => {
      const image = createElement("img",[],{ 
        id: 'img',
        src: producto.images
       });
      const title = createElement("h5",[producto.title]);
      const description = createElement("p" ,[producto.description]);
      const category = createElement("span", [producto.category.name]);
      
      const btnCart = createElement("button",['Agregar a cart'], {type: 'button'});
      const price = createElement("span", ['Q ',producto.price ]);
      const PriceCart = createElement("div",[btnCart, price]);
      const card_body = createElement("div", [title, description]);
      const card = createElement("div",[image, card_body, category, PriceCart]);
      // html clases
      card.classList.add("card","col-12","col-md-4","col-lg-3","mt-5","text-start" );
      image.classList.add("card-img-top");
      card_body.classList.add("card-body");
      title.classList.add("card-title");
      description.classList.add("card-text", "DescriptionSize", "fw-normal");
      category.classList.add("fw-bold");
      PriceCart.classList.add("row", "mb-2");
      btnCart.classList.add("btn", "btn-outline-success", "col-7", "ms-2");
      price.classList.add("col-3", "offset-1", "fs-6");  
      cards.push(card)
    
    });
    wrapper.append(...cards);
  } catch (error) {
    console.log(error);
    (errorMessage.innerText = error), error.status;
  }
}

function paginationButton(page, urlApi) {
  let button = createElement("li");
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
    
    let previousSpan = createElement("span",["Previous"]);
    let previous = createElement("li",[previousSpan]);
    previous.classList.add("page-item");
    previousSpan.classList.add("page-link");
    wrapper.append(previous);
    let paginationNumber = [];
    for (let index = 1; index <= pages; index++) {
      const page = paginationButton(index, urlApi);
      const pageA = createElement("a", [index]);
      page.classList.add("page-item");
      pageA.classList.add("page-link");
      page.append(pageA);
      paginationNumber.push(page)
      
    }
    wrapper.append(...paginationNumber);
    
    const nextA = createElement("a",[['Next']]);
    const next = createElement("li",[nextA]);
    next.classList.add("page-item");
    nextA.classList.add("page-link");
    wrapper.append(next);
    }
    
  } catch (error) {
    (errorMessage.innerText = error), error.status;
  }
}
