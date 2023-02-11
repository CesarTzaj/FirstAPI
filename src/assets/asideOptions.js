//import { home } from "./controller";


async function home() {
  setUpPagination(`${API}/products`, displaySection, rows_per_page);
  getData(`${API}/products`, section, rows_per_page, current_page);
}

async function fetchDataCategory(urlApi) {
  const response = await fetch(`${urlApi}/categories`);
  return response.json();
}
async function getByCategory(url) {
  await getData(url, section, rows_per_page, current_page);
  await setUpPagination(url, displaySection, rows_per_page);
}

async function getByCategoryInput(id) {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.checked = false;
    if (id == input.id) {    
      console.log(input);  
      input.checked = true;
    }
  });

}

async function getCategories(urlApi, wrapper) {
  try {
    let results = [];
    let categories = await fetchDataCategory(urlApi);

    categories.map((category) => {
      
      let checkBox = createElement("input",[],{
        type: 'checkbox',
        id: category.id
      });
      let categoryDescription = createElement("label",[category.name],{for: category.id});
      let categoryContainer = createElement("div",[checkBox, categoryDescription]);
      checkBox.addEventListener("click", async () => {
        await getByCategoryInput(category.id);
        await getByCategory(`${API}/categories/${category.id}/products`);
      });
      // classes
      categoryContainer.classList.add("input-group");
      checkBox.classList.add("form-check-input", "mt-3"); 
      categoryDescription.classList.add("ms-2", "mt-2", "fs-5");

      results.push(categoryContainer);
    });
    wrapper.append(...results);
  } catch (error) {
    console.log(error);
  }
}
async function searchByKeword(event) {

  if (searchInput.value.length > 2) {
    let keyword = searchInput.value;
    let url = `${API}/products?title=${keyword}`;
    setTimeout(async () => {
      await getData(url, section, rows_per_page, current_page);
      await setUpPagination(url, displaySection, rows_per_page);
    }, 500);
    if (event.key == "Enter") {
      event.preventDefault();
    }
  } else {
    home();
  }
}





