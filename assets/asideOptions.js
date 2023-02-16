async function home() {
  console.log('asdfas');
  setUpPagination(`${API}/products`, displaySection, rows_per_page);
  getData(`${API}/products`, section, rows_per_page, current_page);
  getCategories(API, categoriesInput);
  
  categoriesInput.classList.remove('dropdown-item')
  productDetail.innerHTML = '';
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
  wrapper.innerHTML =""
  try {
    let results = [];
    let categories = await fetchDataCategory(urlApi);
    let title = createElement('h1',['Categorias'],{},['fs-4', 'text-start', 'mt-lg-5'])
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
    wrapper.append(title,...results);
  } catch (error) {
    console.log(error);
  }
}

async function searchByKeword(event) {

  if (searchInput.value.length > 2) {
    let keyword = searchInput.value;
    let url = `${API}/products?title=${keyword}`;    
      await getData(url, section, rows_per_page, current_page);
      await setUpPagination(url, displaySection, rows_per_page);    
    if (event.key == "Enter") {
      event.preventDefault();
    }
  } else {
    home();
  }
}





