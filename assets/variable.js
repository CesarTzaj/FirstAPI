const API = "https://api.escuelajs.co/api/v1";
// variables for html
const section = document.querySelector("#cardContainer");
const displaySection = document.querySelector("#pagination");
const errorMessage = document.getElementById("error");
const searchInput = document.querySelector(".searchInput");
const homePage = document.querySelector(".home");
const logo = document.querySelector(".logo");
const logInOption = document.querySelector(".logInOption")
const lognIn = document.querySelector("#log-in")
const bgFilter = document.querySelector(".BgFilter")
const logInPage = document.querySelector('.log-in-page')
const productDetail = document.querySelector('.productDetail')
const related = document.querySelector('#related')
const dropdown = document.querySelector('.dropdown')
let categoriesInput;

let dropdown_menu = document.querySelector(".dropdown-menu");
// import { getData} from './asideOptions'

if (window.outerWidth < 800) {
  categoriesInput = document.querySelector(".dropdown-menu");
} else {
  categoriesInput = document.querySelector(".categories");
}
console.log(dropdown);

