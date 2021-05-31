document.addEventListener("DOMContentLoaded",()=>{
    // const findProduct=document.createElement("button")
    // findProduct.id="findBrand"
//fetch("https://makeup-api.herokuapp.com/api/v1/products.json").then(resp=>resp.json()).then(product=>console.log(product))
    
function renderData()
     {
        fetch("https://makeup-api.herokuapp.com/api/v1/products.json")
        .then(resp=>resp.json()).then(product=>displayData(product))
     }
renderData()
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
         const ul=document.createElement("ul");
        //  product.forEach((element)=>{
        //      const li= document.createElement('li');
        //      li.innerText=element.product_colors.hex_value;
        //      ul.append(li);
        //  })
         mainContainer.append(img,p,ul);
     })
    const p=document.createElement("p")
    p.innerText=` $ ${product.price} `;
    
    const h3=document.createElement("h3")
    h3.innerText=`How many users liked: ${product.rating}`;
    createDiv.append(aTag,img,p,h3);
    
    mainContainer.append(createDiv);
}

})