const API = 'https://api.escuelajs.co/api/v1/products';

 

async function fetchData(urlApi){
    const response = await fetch(urlApi);
    return await response.json()
}
 (async function (urlApi){
    
    try {
        const a = await fetchData(`${urlApi}`);

        console.log(a);

    } catch (error) {
        console.log(error);
    }

})(API);

async function slices ( list){
     let a =await list.length
     console.log(Math.ceil(a/20), ' as');
}

// let list = [1,2,6,4,8,6,4,8,6,4,4,6,4,8,6,0,4,8,6,4,6,8,8,4,6,4,6,4];
// console.log(list);
// console.log(list.splice(1,1,0,0,0,0));
// console.log(list);

// let current_page =Math.ceil(list.length/5);
// let rows = 5;
// function Display(items, wrapper, row_per_page, page){
//     wrapper.innerHTML = '';
//     page--;
//     let start = row_per_page*page;
//     let end = start +row_per_page;
//     let paginatedItems = items.slice(start,end);
//     for (let index = 0; index < paginatedItems.length; index++) {
//         const element = paginatedItems[index];
//         console.log(element);
//     }
// }


// Display(list,'' ,rows,current_page)


// const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

// console.log(animals.slice(-2));
// console.log(animals.length);

// console.log(animals.slice(0,5));