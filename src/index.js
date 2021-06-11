document.addEventListener("DOMContentLoaded",()=>{
//fetch("https://makeup-api.herokuapp.com/api/v1/products.json").then(resp=>resp.json()).then(product=>console.log(product)) 

const baseURL="https://makeup-api.herokuapp.com/api/v1/products.json?brand=";
// created an array of brands that i wanted to fetch from the api and used map to iterate over the array and fetch the brands
const mainContainer=document.getElementById("main-container");

function fetchAll()
{   
    const brands=["nyx","maybelline","clinique","milani"];
         brands.map((brands)=>{
         fetch(`${baseURL}${brands}`)
        .then(resp=>resp.json())
        .then(product=>displayData(product))
        })
}fetchAll();

function displayData(product)
{
        product.map(element => {
        createCards(element)
    });
}

function createCards(product)
{
    const createDiv=document.createElement("div");
    createDiv.className="card"

    const aTag=document.createElement("a");
          aTag.href="#"
          aTag.className="link"
          aTag.id="aId"
          aTag.innerHTML=product.name;

    function postItemToCart()
    {
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
    }

    aTag.addEventListener("click",()=>
    {  // **** all of these work ****
        //  add to your blog post different ways to empty the innerHTML
        // while (mainContainer.firstChild) mainContainer.removeChild(mainContainer.firstChild);
        // mainContainer.querySelectorAll("*").forEach(el => el.remove())
        mainContainer.innerHTML="";

        const name=document.createElement("h2")
              name.innerText=product.name;
              name.className="cartAppear"
              name.id="nameTitle"

        const img=document.createElement("img");
              img.src=product.image_link;
              img.className="imgonA"

        const pr=document.createElement("p")
              pr.innerText=` $ ${product.price} `;
              pr.id="price"
              pr.className="cartAppear"

        const addItem=document.createElement("button");
              addItem.innerText="Add this item to cart"
              addItem.className="cartAppear"
              addItem.id="additem"

              addItem.addEventListener("click",()=>
              {
                postItemToCart()
              })

        const p=document.createElement('p');
              p.innerHTML=`Product description: <br> <br>${product.description}`;
              p.className="cartAppear";

        const productType=document.createElement("p")
              productType.innerText=`Product Type: ${product.product_type.toUpperCase()}`;
              productType.className="cartAppear";

            /// creates a form for reviews 
        const commentForm=document.createElement("form")
              commentForm.id="commentInput";

        const commentInput=document.createElement("input")
              commentInput.id="enter-comment";
              commentInput.type="text";
              commentInput.className="cartAppear";
              commentInput.placeholder="Enter your Review";
            
        const submitReview=document.createElement("button");
              submitReview.innerText="Submit Review";
              submitReview.className="submit-review";

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
      
        mainContainer.append(name,img,pr,addItem,p,productType,commentForm);
    }) 
     /// aTag ends here with the link listener
     ///************************************ 

        const img=document.createElement("img");
              img.src=product.image_link;
              img.className="product-image"
            
     // adds the product price
        const p=document.createElement("p")
              p.innerText=` $ ${product.price} `;
              p.id="price"
    
     // adds the add to cart button
        const addToCart=document.createElement("button")
              addToCart.className="addCartBtn";
              addToCart.innerText="ADD TO CART"
        // event listener
              addToCart.addEventListener("click",()=>{
              postItemToCart();
            })
        createDiv.append(aTag,img,p,addToCart);
        mainContainer.append(createDiv);
  
}
function renderComments(comment) // // commentInput.value passed
{ 
        const commentSection=document.createElement("li");
              commentSection.className="comment-box";
              commentSection.innerHTML=`📝${comment}`;
              
        const comUL=document.createElement("ul");
              comUL.append(commentSection);
        mainContainer.append(comUL);
}
function fetchComments(product)// product.id is passed to compare
{  
        fetch(`http://localhost:3000/reviews/`)
        .then(resp=>resp.json())
        .then(review=>review.map((x)=>{
            if(x.productId===product){
            renderComments(x.review)}
    }))
}
function cart(){
    
    // mainContainer.innerHTML=""
    console.log(mainContainer.firstChild)
    if(mainContainer.firstChild==="null")
    {
        alert("cart is empty")
    }
// {    mainContainer.innerHTML="";
//     console.log(mainContainer.firstChild)
//     const message=document.createElement("h2");
//         message.innerText="Cart is Empty"
//     if(mainContainer.firstChild==="null")
//     {  
//         mainContainer.append(message);
//     }
    mainContainer.innerHTML="";
    fetch(`http://localhost:3000/cart`)
    .then(resp=>resp.json())
    .then(cart=>cart.map(cart=>renderCart(cart)))
}
document.getElementById("cart").addEventListener("click",()=>
{
    cart();
})

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
          h2.className="cartAppear"
          h2.id="titleId"

    const img= document.createElement("img");
          img.src=cart.img;
          img.className="cartImage"

    const p= document.createElement("p");
          p.innerText=`$ ${cart.price}`
          p.className="cartAppear"
          p.id="price";
    
    const deleteButton=document.createElement("button");
          deleteButton.innerText="delete item from cart"
          deleteButton.className="deleteItem"

    deleteButton.addEventListener("click",()=>
    {   
        deleteFromCart(cart.id);
        mainContainer.innerHTML="";
        fetch(`http://localhost:3000/cart`)
        .then(resp=>resp.json())
        .then(cart=>cart.map(cart=>renderCart(cart)))
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

            const backToCart=document.createElement("button");
                  backToCart.innerText="Back to cart"
                  backToCart.className="backToCart"
                  backToCart.addEventListener("click",()=>
                  {
                    mainContainer.innerHTML="";
                    fetch(`http://localhost:3000/cart`)
                    .then(resp=>resp.json())
                    .then(cart=>cart.map(cart=>renderCart(cart)))
                  })
            const contShop=document.createElement("button");
                  contShop.innerText="Continue Shopping";
                  contShop.className="placeOrder" 
                            // used the same class as for place the order button to style it same
                  contShop.addEventListener("click",()=>{
                  mainContainer.innerHTML="";
                fetchAll();
                });
            mainContainer.append(order,h2,backToCart,contShop);
            const ids=cart.id;
            deleteFromCart(ids); 
        })
    mainContainer.append(h2,img,p,deleteButton,checkout);
}

// this function is solely for search button, in this case our search button is an submit button.
// so a user can either click the button or just hit enter 

function search()
{
    // event listener on the form itself
    document.getElementById("searchbar").addEventListener("submit",(e)=>
    {
        e.preventDefault();
        //console.log(brands);
        const val=e.target.lastElementChild.value.toString(); // value of this is input text in search field 
        // console.log(val);

        if(val.toLowerCase()==="nyx")
        {   
            fetchMakeup("nyx");
        }
        else if(val.toLowerCase()==="milani")
        {
            fetchMakeup("milani")
        }
        else if(val.toLowerCase()==="clinique")
        { 
            fetchMakeup("clinique");
        }
        else if(val.toLowerCase()==="maybelline")
        {
            fetchMakeup("maybelline");
        }
        else 
        {
             alert("Please enter correct Brand name");
        }
        e.target.reset();
        mainContainer.innerHTML="";
    })
}
search();

function fetchMakeup(brand)
{
    fetch(`${baseURL}${brand}`)
    .then(resp=>resp.json()).then(product=>displayData(product))
}
})