document.addEventListener("DOMContentLoaded",()=>{
//fetch("https://makeup-api.herokuapp.com/api/v1/products.json").then(resp=>resp.json()).then(product=>console.log(product)) 
// created individual fetch requests to fetch only certain brands
const baseURL="https://makeup-api.herokuapp.com/api/v1/products.json?brand=";
// multiple fetch requests for fetching individual brands 
const brands=["nyx","maybelline","clinique","milani"];
function fetchAll()
{   
    brands.map((brands)=>{
        fetch(`${baseURL}${brands}`)
        .then(resp=>resp.json()).then(product=>displayData(product))
    })
}
fetchAll();
function displayData(product)
{
    product.map(element => {
        createCards(element)
    });
}
const mainContainer=document.getElementById("main-container");

function createCards(product)
{
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

        const productType=document.createElement("p")
        productType.innerText=`Product Type: ${product.product_type.toUpperCase()}`;
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
            renderComments(commentInput.value);
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
            fetchComments(product.id);
                    // reviews.map(x=>x.productId===product.id)
                    
        mainContainer.append(name,img,p,productType,commentForm);
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
    createDiv.append(aTag,img,p,addToCart);
    mainContainer.append(createDiv);
  
}
function renderComments(comment) // // commentInput.value passed
{ 
    const commentSection=document.createElement("li");
    commentSection.className="comment-box"
    const comUL=document.createElement("ul");
    commentSection.innerHTML=`📝${comment}`;
    comUL.append(commentSection);
    mainContainer.append(comUL);
}

function fetchComments(product)// product.id is passed to compare
{  
    fetch(`http://localhost:3000/reviews/`).then(resp=>resp.json()).then(review=>review.map((x)=>{
        if(x.productId===product){
        renderComments(x.review)}
    }))
}

function cart()
{   
    mainContainer.innerHTML="";
    fetch(`http://localhost:3000/cart`).then(resp=>resp.json()).then(cart=>cart.map(cart=>renderCart(cart)))

}

document.getElementById("cart").addEventListener("click",cart)
function deleteFromCart(ids) // passing card.id from delete button event listener
{
    //console.log(cart);
    fetch(`http://localhost:3000/cart/${ids}`,{
    method:"DELETE",
    headers:{
        "content-type":'application/json'
    }
    }).then(resp=>resp.json())
}
function renderCart(cart)
{
    const h2=document.createElement("h2");
    h2.innerText=cart.title;

    const img= document.createElement("img");
    img.src=cart.img;
    img.className="cartImage"

    const p= document.createElement("p");
    p.innerText=`$ ${cart.price}`
    
    const deleteButton=document.createElement("button");
    deleteButton.innerText="delete item from cart"
    deleteButton.className="deleteItem"

    deleteButton.addEventListener("click",()=>
    {   
        deleteFromCart(cart.id);
        mainContainer.innerHTML="";
        fetch(`http://localhost:3000/cart`).then(resp=>resp.json()).then(cart=>cart.map(cart=>renderCart(cart)))
    })

    const checkout=document.createElement("button");
    checkout.innerText="Place order for this Item";
    checkout.className="placeOrder"

    checkout.addEventListener("click",()=>{

        mainContainer.innerHTML="";
        const order=document.createElement("h3");
        order.innerText="YAYYY!! Your order has been placed!!"
        const h2=document.createElement("h2");
        h2.innerText="Thank you for shopping with us!"
        mainContainer.append(order,h2);
        const ids=cart.id;
        deleteFromCart(ids); 
    })
    mainContainer.append(h2,img,p,deleteButton,checkout);
}

/// cart button event

// this function is solely for search button, in this case our search button is an submit button.
// so a user can either click the button or just hit enter 

function search()
{
    // event listener on the form itself
    document.getElementById("searchbar").addEventListener("submit",(e)=>
    {
        e.preventDefault();
        console.log(brands);
        const val=e.target.lastElementChild.value.toString(); // value of this is input text in search field 

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

function fetchNyx()
{
    fetch(`${baseURL}nyx`)
    .then(resp=>resp.json()).then(product=>displayData(product))
}
function fetchMaybelline()
{
    fetch(`${baseURL}maybelline`)
    .then(resp=>resp.json()).then(product=>displayData(product))
}
function fetchClinique()
{
    fetch(`${baseURL}clinique`)
    .then(resp=>resp.json()).then(product=>displayData(product))
}
function fetchMilani()
{
    fetch(`${baseURL}milani`)
    .then(resp=>resp.json()).then(product=>displayData(product))
}
})