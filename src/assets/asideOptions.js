//import { home } from "./controller";


async function home() {
  setUpPagination(`${API}/products`, displaySection, rows_per_page);
  getData(`${API}/products`, section, rows_per_page, current_page);
}

async function fetchDataCategory(urlApi) {
  console.log(`${urlApi}/categories`);
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
      input.checked = true;
    }
  });

}

async function getCategories(urlApi, wrapper) {
  try {
    let results = [];
    let categories = await fetchDataCategory(urlApi);

    categories.map((category) => {
      let categoryContainer = document.createElement("div");
      let checkBox = document.createElement("input");
      let categoryDescription = document.createElement("label");
      checkBox.addEventListener("click", async () => {
        await getByCategoryInput(category.id);
        await getByCategory(`${API}/categories/${category.id}/products`);
      });
      // classes
      categoryContainer.classList.add("input-group");
      checkBox.classList.add("form-check-input", "mt-3");
      checkBox.setAttribute("type", "checkbox");
      checkBox.setAttribute("value", category.id);

      checkBox.setAttribute("id", category.id);
      categoryDescription.setAttribute("for", category.id);
      categoryDescription.classList.add("ms-2", "mt-2", "fs-5");

      categoryDescription.innerText = category.name;
      categoryContainer.append(checkBox, categoryDescription);
      results.push(categoryContainer);
    });
    wrapper.append(...results);
  } catch (error) {
    alert(error);
    console.log(error);
  }
}
async function searchByKeword(event) {

  if (searchInput.value.length > 2) {
    console.log();
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





