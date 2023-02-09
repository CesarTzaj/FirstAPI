home()
searchInput.addEventListener("keydown", searchByKeword, false);

getCategories(API, categoriesInput);
homePage.addEventListener('click', home, false);
logo.addEventListener('click', home, false)
//export {home}