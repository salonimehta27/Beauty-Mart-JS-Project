document.addEventListener("DOMContentLoaded",()=>{
    // const findProduct=document.createElement("button")
    // findProduct.id="findBrand"
//fetch("https://makeup-api.herokuapp.com/api/v1/products.json").then(resp=>resp.json()).then(product=>console.log(product))
    

function fetchNyx()
{
        fetch("https://makeup-api.herokuapp.com/api/v1/products.json?brand=nyx")
        .then(resp=>resp.json()).then(product=>displayData(product))
     }
fetchNyx()
function fetchMaybelline()
{
    fetch("https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline")
    .then(resp=>resp.json()).then(product=>displayData(product))
}
fetchMaybelline()
function fetchClinique()
{
    fetch("https://makeup-api.herokuapp.com/api/v1/products.json?brand=clinique")
    .then(resp=>resp.json()).then(product=>displayData(product))
}
fetchClinique()
function fetchMilani()
{
    fetch("https://makeup-api.herokuapp.com/api/v1/products.json?brand=milani")
    .then(resp=>resp.json()).then(product=>displayData(product))
}
fetchMilani()
function displayData(product)
{
    product.forEach(element => {
        createCards(element)
    });
}
const mainContainer=document.getElementById("main-container");
function createCards(product){
    const createDiv=document.createElement("div");
    createDiv.className="card"

    const aTag=document.createElement("a");
    aTag.href="#"
    aTag.className="link"
    aTag.innerHTML=product.name;
    const img=document.createElement("img");
    img.src=product.image_link;
    img.className="product-image"
     aTag.addEventListener("click",()=>
     {
         mainContainer.innerHTML="";
         const img=document.createElement("img");
         img.src=product.image_link;
         img.className="product-image"
         const p=document.createElement('p');
         p.innerHTML=`Product description: <br> ${product.description}`;
         const btn=document.createElement("button")
         btn.innerText="⬅️"
         btn.className="arrow";
         btn.addEventListener("click",()=>
         { 
             mainContainer.innerHTML="";
            fetchNyx()
            fetchMaybelline()
            fetchClinique()
            fetchMilani
         })
         mainContainer.append(img,p,btn);
     })
    const p=document.createElement("p")
    p.innerText=` $ ${product.price} `;
    
    const h3=document.createElement("h3")
    h3.innerText=`How many users liked: ${product.rating}`;
    createDiv.append(aTag,img,p,h3);
    
    mainContainer.append(createDiv);
}

})
 // Promise.all([nyx,maybelline,clinique].map(brand => 
        //     fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?${brand}`)
        //     .then(resp => resp.json())
        //   )).then(product=>displayData(product));