
function icon(className, type) {
  const span = document.createElement('span');
  span.classList.add('material-symbols-outlined', className);
  span.append(type)
  return span;
}
function createElement(tag, content = [], atributes = '', classesName=[]) {
  const tagName = document.createElement(tag);
  content.map(cont => {
    tagName.append(cont)
  })
  Object.entries(atributes).map(atribute => {
    tagName.setAttribute(atribute[0], atribute[1]);
  });
  classesName.map(className => {
    tagName.classList.add(className)
  })
  return tagName;
}

function setAvatar() {
  lognIn.innerHTML=''
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const defaulAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegCgK5aWTTuv_K5TPd10DcJxphcBTBct6R170EamgcCOcYs7LGKVy7ybRc-MCwOcHljg&usqp=CAU'
  let setPicture = userInfo?.avatar ?? defaulAvatar;
  const avatar = createElement('img',[setPicture], {alt: 'user Avatar', src: setPicture},['me-3'])
  let setName = userInfo?.name ?? "My Account"
  lognIn.append(avatar, setName)

}
setAvatar()
function btn(className, content) {
  let btn = document.createElement('button');
  btn.setAttribute('type', 'button');
  btn.append(content)
  btn.classList.add(className)
  return btn;
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

async function getData(urlApi, wrapper, row_per_page, page, proDetail = false) {
  wrapper.innerHTML = "";
  page--;
  let start = row_per_page * page;
  let end = start + row_per_page;

  try {
    let productList = await fetchData(urlApi);
    let itemPerPage = productList.slice(start, end);
    const cards = []
    itemPerPage.map((producto) => {
      const image = createElement("img", [], {
        id: 'img',
        src: producto.images
      },['card-img-top','cardImage']);
      const title = createElement("h5", [producto.title],{},['card-title']);
      const price = createElement("span", ['Q ', producto.price]);
      const btnCart = createElement("button", ['+ Add'], { type: 'button' },
      ["btn", "btn-outline-success", "col-5", "mx-auto"]);
      const PriceCart = createElement("div", [btnCart]);
      const card_body = createElement("div", [title]);
      const card = createElement("div", [image, card_body, price, PriceCart],{},
      ["card", "col-12", "col-md-3", "col-lg-3", "mt-5", "text-start",'border-0']);
      // html clases
      card_body.classList.add("card-body");
      PriceCart.classList.add("row", "mb-2");
      cards.push(card)
      image.addEventListener('click', ()=>{
        sideImage(producto)
      })
    });
    let divContainer = createElement('div')
    if (proDetail) {
      divContainer.classList.add('cardContainer')
    }else{
      divContainer.classList.add('row', 'justify-content-center',
      'justify-content-md-between')
    }
    
    divContainer.append(...cards)
    wrapper.append(divContainer);
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

      let previousSpan = createElement("span", ["Previous"]);
      let previous = createElement("li", [previousSpan]);
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

      const nextA = createElement("a", [['Next']]);
      const next = createElement("li", [nextA]);
      next.classList.add("page-item");
      nextA.classList.add("page-link");
      const ulPagination = createElement('ul',[previous,...paginationNumber,next]
      ,{},['pagination'])
      
      wrapper.append(ulPagination);
    }

  } catch (error) {
    (errorMessage.innerText = error), error.status;
  }
}
