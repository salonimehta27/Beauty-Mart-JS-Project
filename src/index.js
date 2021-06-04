document.addEventListener("DOMContentLoaded",()=>{
//fetch("https://makeup-api.herokuapp.com/api/v1/products.json").then(resp=>resp.json()).then(product=>console.log(product)) 
// created individual fetch requests to fetch only certain brands
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
         mainContainer.innerHTML=" ";
         const name=document.createElement("h2")
         name.innerText=product.name;
         const img=document.createElement("img");
         img.src=product.image_link;
         img.className="product-image"
         const p=document.createElement('p');
         p.innerHTML=`Product description: <br> ${product.description}`;
            const commentForm=document.createElement("form")
            commentForm.id="commentInput";
            const commentInput=document.createElement("input")
            commentInput.type="text";
            commentInput.placeholder="Enter your Review"
            commentForm.append(commentInput);
            const submitReview=document.createElement("button");
            submitReview.innerText="Submit Review";
            submitReview.addEventListener("click",(e)=>
                {  
                   const commentSection=document.createElement("p");
                   commentSection.innerHTML=commentInput.value;
                   mainContainer.append(commentSection);

                   fetch(" http://localhost:3000/reviews",{
                   method:"POST",
                   headers:{
                   "Content-Type":"application/json",
                   "accept":"application/json"
                    },
                   body:JSON.stringify({
                    "review":commentInput.value
                       })
                    }).then(resp=>resp.json())
                    e.target.reset();
                     
                })
         mainContainer.append(name,img,p,commentInput,submitReview);
     })
    const p=document.createElement("p")
    p.innerText=` $ ${product.price} `;
    const addToCart=document.createElement("button")
    addToCart.className="addCartBtn";
    addToCart.innerText="ADD TO CART"
    addToCart.addEventListener("click",()=>{
        alert("item has been added to the cart");
    })
    
    const h3=document.createElement("h3")
    h3.innerText=`How many users liked: ${product.rating}`;
    createDiv.append(aTag,img,p,addToCart,h3);
    mainContainer.append(createDiv);
  
}

//  const btn=document.createElement("button")
        //  btn.innerText="⬅️"
        //  btn.className="arrow";
        //  btn.addEventListener("click",()=>
        //  { 
        //      mainContainer.innerHTML="";
        //     fetchNyx()
        //     fetchMaybelline()
        //     fetchClinique()
        //     fetchMilani()
        //  })


// const searchText=document.getElementById("searchId");
// const btn=document.getElementById("btnClick");
// btn.addEventListener("click",()=>
// {
//     console.log(searchText.value);
// })
// searchText.addEventListener("keyup",(e)=>{
//     if(e.keyCode===13)
//     {
//         e.preventDefault();
//         btn.addEventListener("click",(e)=>
//         {
//             alert("i am workign");
//         })
//     }
// })
// function buttonClick(){
//     alert("gtg");
// }
})
 // Promise.all([nyx,maybelline,clinique].map(brand => 
        //     fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?${brand=}`)
        //     .then(resp => resp.json())
        //   )).then(product=>displayData(product));


        // searchText.addEventListener("keyup",(e)=>{
//     e.preventDefault();
//    if(e.KeyCode===13)
//    {
//        btn.click();
//    }
// })
// function click(){

// }
// header.append(mainContainer)
  //  const ul=document.createElement("ul");
        //  const tags=document.createElement("li");
        //  tags.innerText=product.tag_list;
        //  ul.append(tags);
        // product[0].product_colors[0].hex_value);