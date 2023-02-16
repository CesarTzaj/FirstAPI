async function fetchUserData(userInfo){
  const response = await fetch(`${API}/auth/login`,{
    method: "POST",
    headers:{
      'content-type': 'application/json',
      'Connection': 'keep-alive',
      'Content-Length': '<calculated when request is sent>',
      'Host': '<calculated when request is sent>',
      'Authorization': "Bearer "
    },
    body: JSON.stringify(userInfo)  
  });

  try {
    if (response.ok) {
      const data = await response.json();
      console.log(data.access_token);
      const userInformation = await fetch(`${API}/auth/profile`,{
        method: "GET",
        headers:{
          'content-type': 'application/json',
          'Connection': 'keep-alive',
          'Content-Length': '<calculated when request is sent>',
          'Host': '<calculated when request is sent>',
          'Authorization': `Bearer ${data.access_token}`
        },
      });
      const userInfo = await userInformation.json();
      localStorage.setItem('token', JSON.stringify(data))
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      return response.ok
    }else{return response.ok}
   
    
    
  } catch (error) {
    return false
  }
  
  
}

function createAlert() {
  const aler = createElement('div',['email address is incorrect'],{
    role:"alert"}, ['alert', 'alert-warning']);
    return aler;
}

function validarEmail(valor) {
  const rGex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (rGex.test(valor)){
   return true
   
  } 
  return false
}

function logIn() {
  logInPage.innerHTML = "";
  let div = createElement("div");
  div.append(icon("close", "close"));
  let closeIcon = div;
  let btnlogin = btn("loginBtn", "Log in");
  let labelUsername = createElement("label", ["Username"],
   { for: "username" });
  let inputUser = createElement("input", [], {
    id: "username",
    type: "email",
    name: 'username',
    placeholder: "john_doe@comcast.com",
  });
  let labelPassword = createElement("label", ["Password"], 
  { for: "password" });
  let inputPassword = createElement("input",[],{
    id: 'password',
    type: 'password',
    name: 'password'
  });
  let form = createElement(
    "form",
    [
      closeIcon,
      labelUsername,
      inputUser,
      labelPassword,
      inputPassword,
      btnlogin,
    ], {},['log-in-page-form']
  );
  const aler = createAlert();
  btnlogin.addEventListener('click', async (Event)=>{
    Event.preventDefault()  
    const emailValidation = validarEmail(inputUser.value)
    if ( emailValidation && inputPassword.value !=='') {
        if (form.contains(aler)) {
          form.removeChild(aler)
        }
        const a = await fetchUserData({ email: inputUser.value,password: inputPassword.value})
        console.log(a);
        if (a) {
           logInPage.classList.remove("show");
           bgFilter.classList.remove("show");
           logInOption.classList.remove("show");
           setAvatar();
        }
        
    }else{        
      form.append(aler)
    }
  })
  logInPage.appendChild(form);
  let closeLogin = document.querySelector(".material-symbols-outlined.close");
  closeLogin.addEventListener("click", () => {
    logInPage.classList.remove("show");
  });
}

function singUp() {
  logInPage.innerHTML = "";
  const defaulAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegCgK5aWTTuv_K5TPd10DcJxphcBTBct6R170EamgcCOcYs7LGKVy7ybRc-MCwOcHljg&usqp=CAU'
  let div = createElement("div");
  div.append(icon("close", "close"));
  let closeIcon = div;
  const iconProfile = createElement('img',[]);
  const iconClose = icon("cancel", "cancel");
  const uploadProfile = createElement("input", [], {
    type: "file",
    id: "avatar",
    accept: "image/*",
    value: '',
  });
  const browseFile = createElement("p", ["Or Browse File"]);

  const UName = createElement("label", ["Name"], { for: "name" });
  const inputName = createElement("input", [], {
    id: "name",
    type: "text",
    placeholder: "John Connor",
    name: 'name'
  });
  const email = createElement("label", ["E-mail"], { for: "email" });
  const inputEmail = createElement("input", [], {
    id: "email",
    type: "email",
    name: 'email',
    placeholder: "JohnConnor@comcast.com",
  });
  const password = createElement("label", ["Password"], { for: "password" });
  const inputPassword = createElement("input", [], {
    id: "password",
    name: 'password',
    type: "password",
    value: ''
  });
  const confPassword = createElement("label", ["Password"], {
    for: "confPassword",
  });
  const inputconfPassword = createElement("input", [], {
    id: "confPassword",
    name: 'confPassword',
    type: "password",
  });
  const avatar = createElement("label", ["Picture"], { for: "avatar" });
  const picture = createElement("picture", [
    iconProfile,
    iconClose,
    uploadProfile,
    browseFile,
  ]);
  uploadProfile.addEventListener('change', (event)=>{
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0])
    console.log(reader.readyState);
    console.log(reader);
    console.log(reader.readyState);
    // iconProfile.src= uploadProfile.value;

    console.log(uploadProfile.value);
  } )
  const btnSingUp = btn("sigup", "Log in");
  const form = createElement("form", [
    closeIcon,
    UName,
    inputName,
    email,
    inputEmail,
    password,
    inputPassword,
    confPassword,
    inputconfPassword,
    avatar,
    picture,
    btnSingUp,
  ]);
  form.classList.add("log-in-page-form");
  logInPage.append(form);
 
  const aler = createAlert();
  btnSingUp.addEventListener('click', (Event)=>{
    
    Event.preventDefault()  
    const emailValidation =validarEmail(inputEmail.value)
    if ( emailValidation ) {
      fetchData({password: inputEmail.value,
        email: inputEmail.value })
        if (form.contains(aler)) {
          form.removeChild(aler)
        }
    }else{        
      form.append(aler)
    }
  })

  let closeLogin = document.querySelector(".material-symbols-outlined.close");
  closeLogin.addEventListener("click", () => {
    logInPage.classList.remove("show");
  });
 
}

function loginPopUP() {
  logInPage.innerHTML = "";
  const section = document.createElement("div");
  const signIn = document.createElement("article");
  const signUp = document.createElement("article");
  section.classList.add("accountOption");
  signIn.classList.add("ms-4", "mt-3");
  signUp.classList.add("ms-3", "mt-3");
  signIn.append("Sign in");
  signUp.append("Sign up");

  section.append(signIn, signUp);
  logInOption.classList.toggle("show");
  logInOption.append(section);

  signIn.addEventListener("click", () => {
    logIn();
    logInPage.classList.add("show");
  });

  signUp.addEventListener("click", () => {
    singUp();
    logInPage.classList.add("show");
  });
}

lognIn.addEventListener("click", () => {
  bgFilter.classList.toggle("show");
  loginPopUP();
});


dropdown.addEventListener('click', ()=>{
  categoriesInput.classList.toggle('dropdown-item')
})

