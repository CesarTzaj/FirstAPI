

async function mainPicture(wrapper, url,status='') {
  wrapper.innerHTML=''
  const img = createElement('img',[],{src: url},['d-block', 'activeImage'])
  const container = createElement('div',[img],{},[,status])
  const mainContainer = createElement('div',[container],{},['carousel-inner'])
  wrapper.append(mainContainer)
}

function imagess(src, status){
  const img = createElement('img',[],{src},['d-block','w-100',status]);
  const button = createElement('button',[img],{type: 'button'})
  return button;
}

async function sideImage(product){
  console.log(product.category.id    );
  section.innerHTML=''
  displaySection.innerHTML=''
  categoriesInput.innerHTML=''

  productDetail.innerHTML=''
  const imagesasdfas = createElement('div',[],{},['images'])
  const mainPictureDiv = createElement('div')
  const productDetailsss = createElement('div',[],{id:'details'})
  const productRealted = createElement('section',[],{id: 'related'})
  const img =  [];
  product.images.map((src) =>{
    const image = imagess(src, 'active');
    
    image.addEventListener('click', ()=>{
      const currentActive = document.querySelector('.images button.active')
      currentActive.classList.remove('active')
      image.classList.add('active')
      mainPicture(mainPictureDiv , src, 'active')
    })
    image.addEventListener('mouseover', ()=>{
      const currentActive = document.querySelector('.images button.active')
      currentActive.classList.remove('active')
      mainPicture(mainPictureDiv,src, 'active')
      image.classList.add('active')
    })
    img.push(image);
     
  })
  img[0].classList.add('active')
  mainPicture(mainPictureDiv, product.images[0], 'active')
  details(productDetailsss, product);
  imagesasdfas.append(...img)
  productDetail.append(imagesasdfas , mainPictureDiv, productDetailsss,productRealted)
  getData(`${API}/categories/${product.category.id}/products`, productRealted, 20, 1,true) 
}

function details(wrapper, content) {
  
  const h1 = createElement('h1',[content.title]);
  const price = createElement('p',['Q ', content.price])
  const description = createElement('article',[content.description]);
  const span = createElement('span',['Category: ',content.category.name]);
  const btnAddtoCard = createElement('button',['+ card'])
  const section = createElement('section',[h1, price, description, span,btnAddtoCard],{},['details']);
  wrapper.append(section)
}


  