document.addEventListener("DOMContentLoaded",()=>{
//fetch("https://makeup-api.herokuapp.com/api/v1/products.json").then(resp=>resp.json()).then(product=>console.log(product)) 
// created individual fetch requests to fetch only certain brands
const baseURL="https://makeup-api.herokuapp.com/api/v1/products.json?brand=";

function fetchNyx()
{
    fetch(`${baseURL}nyx`)
    .then(resp=>resp.json()).then(product=>displayData(product))
}
fetchNyx()
function fetchMaybelline()
{
    fetch(`${baseURL}maybelline`)
    .then(resp=>resp.json()).then(product=>displayData(product))
}
fetchMaybelline()
function fetchClinique()
{
    fetch(`${baseURL}clinique`)
    .then(resp=>resp.json()).then(product=>displayData(product))
}
fetchClinique()
function fetchMilani()
{
    fetch(`${baseURL}milani`)
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
    aTag.id="aId"
    aTag.innerHTML=product.name;

    const img=document.createElement("img");
    img.src=product.image_link;
    img.className="product-image"

     aTag.addEventListener("click",()=>
     {  // all of these work ****
         //  add to your blog post different ways to empty the innerHTML
        while (mainContainer.firstChild) mainContainer.removeChild(mainContainer.firstChild);
        // mainContainer.querySelectorAll("*").forEach(el => el.remove())
        mainContainer.innerHTML="";
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
        commentInput.placeholder="Enter your Review";
        
        const submitReview=document.createElement("button");
        submitReview.innerText="Submit Review";

        commentForm.append(commentInput,submitReview);

            commentForm.addEventListener("submit",(e)=>
                { 
                    e.preventDefault();
                    const commentSection=document.createElement("p");
                        p.className="comment-box"
                        commentSection.innerHTML=commentInput.value;
                        mainContainer.append(commentSection);
                  product.forEach(()=>{
                      fetch(`http://localhost:3000/reviews/${product.id}`,{
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
                })
          mainContainer.append(name,img,p,commentForm);
          
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

////////////tried in one request failed 

        // function fetchRequest()
// {
//     const arr=["nyx","maybelline","clinique","milani"];
// Promise.all(arr.map( ()=> 
//             fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=${arr}`)
//             .then(resp => resp.json())
//           )).then(product=>displayData(product));



// //     const arr=["nyx","maybelline","clinique","milani"];
// //   arr.forEach(()=>{
// //       fetch(`${baseURL}${arr}`).then(resp=>resp.json()).then(product=>displayData(product));
// //   })
// }
// fetchRequest();
//  let htmlstring=mainContainer.innerHTML;
        // //  htmlstring= (htmlstring.trim) ? htmlstring.trim() : htmlstring.replace(/^\s+/,'');
        //  htmlstring.innerText=" ";