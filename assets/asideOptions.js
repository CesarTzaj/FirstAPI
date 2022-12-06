const APICategory = 'https://api.escuelajs.co/api/v1/categories';

let categoriesInput = document.querySelector('.categories')
let dropdown_menu = document.querySelector('.dropdown-menu')
async function fetchData(urlApi) {
  const response = await fetch(urlApi);
  return response.json()
}

async function getCategories (urlApi, wrapper ){
  try {
    let categories = await fetchData(urlApi);
    categories.map(category =>{
      let categoryContainer = document.createElement('div');
      let checkBox = document.createElement('input');
      let categoryDescription = document.createElement('label');
      // classes
      categoryContainer.classList.add('input-group' );
      checkBox.classList.add('form-check-input', 'mt-3');
      checkBox.setAttribute('type', 'checkbox');
      checkBox.setAttribute( 'value',category.id)
      categoryDescription.classList.add('ms-2', 'mt-2','fs-5');

      categoryDescription.innerText = category.name;
      categoryContainer.append(checkBox,categoryDescription)
      wrapper.append(categoryContainer);
    })
  } catch (error) {
    alert(error)
    console.log(error)
  }
}
getCategories(APICategory, categoriesInput);

getCategories(APICategory, dropdown_menu);

let inputs=  []
inputs.push( document.getElementsByClassName('form-check-input'))
inputs.map(Element => console.log(Element.value))
let input = document.querySelector('.input')
console.log(input.value, 'a');