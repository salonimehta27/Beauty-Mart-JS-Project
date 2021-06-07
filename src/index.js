document.addEventListener("DOMContentLoaded",()=>{
//fetch("https://makeup-api.herokuapp.com/api/v1/products.json").then(resp=>resp.json()).then(product=>console.log(product)) 
// created individual fetch requests to fetch only certain brands
const baseURL="https://makeup-api.herokuapp.com/api/v1/products.json?brand=";
// multiple fetch requests for fetching individual brands 
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
        {  // **** all of these work ****
            //  add to your blog post different ways to empty the innerHTML
            // while (mainContainer.firstChild) mainContainer.removeChild(mainContainer.firstChild);
            // mainContainer.querySelectorAll("*").forEach(el => el.remove())
            mainContainer.innerHTML="";

            const name=document.createElement("h2")
            name.innerText=product.name;
            name.className="product-name"

            const img=document.createElement("img");
            img.src=product.image_link;
            img.className="product-image"

            const p=document.createElement('p');
            p.innerHTML=`Product description: <br> ${product.description}`;
            /// creates a form for reviews 
                const commentForm=document.createElement("form")
                commentForm.id="commentInput";

                const commentInput=document.createElement("input")
                commentInput.id="enter-comment"
                commentInput.type="text";
                commentInput.placeholder="Enter your Review";
                
                const submitReview=document.createElement("button");
                submitReview.innerText="Submit Review";

                commentForm.append(commentInput,submitReview);
                commentForm.addEventListener("submit",(e)=>
                    { 
                    e.preventDefault();
                    renderComments(commentInput.value)
                    // const mainContainer=document.getElementById("main-container");
                   // mainContainer.append(commentSection);
                        fetch(`http://localhost:3000/reviews/`,{
                        method:"POST",
                        headers:{
                        "Content-Type":"application/json",
                        "accept":"application/json"
                        },
                        body:JSON.stringify({
                        "review":commentInput.value,
                        "productId":product.id
                        })
                        }).then(resp=>resp.json())
                        e.target.reset();
                        
                    })
                    fetchComments();
                    // reviews.map(x=>x.productId===product.id)
                    
            mainContainer.append(name,img,p,commentForm);
        }) 
     /// aTag ends here with the link listener
     ///************************************ 
     
     // adds the product price
    const p=document.createElement("p")
    p.innerText=` $ ${product.price} `;
    
     // adds the add to cart button
    const addToCart=document.createElement("button")
    addToCart.className="addCartBtn";
    addToCart.innerText="ADD TO CART"
        // event listener
        addToCart.addEventListener("click",()=>{
        alert("item has been added to the cart");
        fetch(`http://localhost:3000/cart`,{
        method:"POST",
        headers:{
        "Content-Type":"application/json",
        "accept":"application/json"
        },
        body:JSON.stringify({
        "title":product.name,
        "productId":product.id,
        "img":product.image_link,
        "price":product.price
        })
        }).then(resp=>resp.json())
    })
    const h3=document.createElement("h3")
    h3.innerText=`How many users liked: ${product.rating}`;
    createDiv.append(aTag,img,p,addToCart,h3);
    mainContainer.append(createDiv);
  
}
function renderComments(comment)
{ 
    
    const commentSection=document.createElement("li");
    commentSection.className="comment-box"
    const comUL=document.createElement("ul");
    // const comInput=document.getElementById("enter-comment")
    commentSection.innerHTML=comment;
    comUL.append(commentSection);
    mainContainer.append(comUL);
}
function fetchComments()
{   
    // const review=e.target.children[0].value;
    fetch(`http://localhost:3000/reviews/`).then(resp=>resp.json()).then(review=>review.map((x)=>{
        //x.productId===product.id
   renderComments(x.review)
       } 
    ))
    
}
function renderCart(cart){
    const h2=document.createElement("h2");
    h2.innerText=cart.title;
    const img= document.createElement("img");
    img.src=cart.img;
    const p= document.createElement("p");
    p.innerText=`$ ${cart.price}`
    const checkout=document.createElement("button");
    checkout.innerText="Place order for this Item";

    checkout.addEventListener("click",()=>{
        mainContainer.innerHTML="";
        const order=document.createElement("h3");
        order.innerText="YAYYY!! Your order has been placed!!"
        const h2=document.createElement("h2");
        h2.innerText="Thank you for shopping with us!"
        mainContainer.append(order,h2);
        const ids=cart.id;
        console.log(cart);
        fetch(`http://localhost:3000/cart/${ids}`,{
        method:"DELETE",
        headers:{
            "content-type":'application/json'
        }
        }).then(resp=>resp.json())
    })
    mainContainer.append(h2,img,p,checkout);
}

/// cart button event
document.getElementById("cart").addEventListener("click",cart)

function cart()
{   mainContainer.innerHTML="";
    fetch(`http://localhost:3000/cart`).then(resp=>resp.json()).then(cart=>cart.forEach(cart=>renderCart(cart)))
}
// this function is solely for search button, in this case our search button is an submit button.
// so a user can either click the button or just hit enter 
function search()
{
    // event listener on the form itself
    document.getElementById("searchbar").addEventListener("submit",(e)=>
    {
        e.preventDefault();
        const val=e.target.lastElementChild.value.toString();
        // console.log(val);
        if(val.toLowerCase()==="nyx")
        {   
            mainContainer.innerHTML="";
            fetchNyx();
        }
        else if(val.toLowerCase()==="milani")
        {
            mainContainer.innerHTML="";
            fetchMilani();
        }
        else if(val.toLowerCase()==="clinique")
        {
            mainContainer.innerHTML="";
            fetchClinique();
        }
        else if(val.toLowerCase()==="maybelline")
        {
            mainContainer.innerHTML="";
            fetchMaybelline();
        }
        else 
        {
             alert("Please enter correct Brand name");
        }
        e.target.reset();
    })
}
search();
})
// function addToCart()
// {
 
// }
// function getComments()
// {
//     fetch("http://localhost:3000/reviews").then(resp=>resp.json())
// }
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