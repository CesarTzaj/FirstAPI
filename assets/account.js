
function logIn() {
  logInPage.innerHTML = '';
  let div = createElement('div')
  div.append(icon('close', 'close'))
  let closeIcon = div  
  let btnlogin= btn('loginBtn', 'Log in') ;
  let labelUsername = createElement('label',['Username'],{for: 'username'});
  let inputUser = createElement('input',[],{
    id: 'username',
    type: 'email',
    placeholder: 'john_doe@comcast.com'});
  let labelPassword = createElement('label', ['Password'],{for: 'password'});
  let inputPassword = createElement('input');
  let form = createElement('form',
  [closeIcon, labelUsername, inputUser, labelPassword, inputPassword, btnlogin], {
    id: 'password',
    type: 'password', 
    
  });
  form.classList.add('log-in-page-form');


  logInPage.appendChild(form);
  let  closeLogin = document.querySelector('.material-symbols-outlined.close');
  closeLogin.addEventListener('click', ()=>{
    logInPage.classList.remove("show")
  });
}

function singUp() {
  logInPage.innerHTML = '';

  let div = createElement('div');
  div.append(icon('close', 'close'));
  let closeIcon = div;
  const iconProfile = icon('profile', 'account_circle');
  const iconClose = icon('cancel', 'cancel' );
  const uploadProfile =createElement('input', [], {
    type: 'file',
    id: 'avatar',
    accept: 'image/*',
  });
  const browseFile = createElement('p',['Or Browse File']);

  const UName = createElement('label', ['Name'],{for: 'name'});
  const inputName = createElement('input',[],{
    id: 'name', 
    type: 'text', 
    placeholder: 'John Connor'
  });
  const email = createElement('label', ['E-mail'],{for: 'email'});
  const inputEmail = createElement('input',[],{
    id: 'email', 
    type: 'email', 
    placeholder: 'JohnConnor@comcast.com'
  });
  const password = createElement('label', ['Password'],{for: 'password'});
  const inputPassword = createElement('input',[],{
    id: 'password', 
    type: 'password', 
  });
  const confPassword = createElement('label', ['Password'],{for: 'confPassword'});
  const inputconfPassword = createElement('input',[],{
    id: 'confPassword', 
    type: 'password', 
  });
  const avatar = createElement('label', ['Picture'],{for: 'avatar'});
  const picture = createElement('picture', [iconProfile, iconClose,uploadProfile,browseFile]);
  const btnSingUp = btn('sigup', 'Log in');
  const form = createElement('form',
   [closeIcon,UName, inputName, email, inputEmail,
   password, inputPassword, confPassword, inputconfPassword,
  avatar, picture, btnSingUp]);
  form.classList.add('log-in-page-form')
  logInPage.append(form);

  let  closeLogin = document.querySelector('.material-symbols-outlined.close');
  closeLogin.addEventListener('click', ()=>{
    logInPage.classList.remove("show")
  });
}

function loginPopUP() {
  logInPage.innerHTML = '';
  const section = document.createElement('div');
  const signIn = document.createElement('article');
  const signUp = document.createElement('article');
  section.classList.add('accountOption');
  signIn.classList.add('ms-4', 'mt-3');
  signUp.classList.add('ms-3', 'mt-3')
  signIn.append('Sign in');
  signUp.append('Sign up');

  section.append(signIn, signUp);
  logInOption.classList.toggle('show');
  logInOption.append(section); 

  signIn.addEventListener('click', () =>{  
    logIn();  
    logInPage.classList.add("show")
  })

  signUp.addEventListener('click', () =>{  
    singUp();  
    logInPage.classList.add("show")
  })
}

lognIn.addEventListener("click", ()=>{
  bgFilter.classList.toggle("show")
  loginPopUP();
})




