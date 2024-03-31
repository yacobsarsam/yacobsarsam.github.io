document.addEventListener('DOMContentLoaded', getProducts);
//add addEventListener to "+" and "-" buttons in cart
function attachButtonListeners() {
    currentLocalestorage.forEach(function (product) {
        let minusBtn  = document.querySelector('[data-id="minus-'+product.id+'"]');
        console.log(minusBtn);  
        console.log("minusbtm: " + "minus-'+product.id+'");
        minusBtn.addEventListener('click', functionM);
              
        let plusBtn = document.querySelector('[data-id="plus-' + product.id +'"]');
        plusBtn.addEventListener('click', functionP);
    });
}
//Funktion när man klickt på "-" button
function functionM(em){
    em.preventDefault();
        console.log("Minus knapp trycktes");
    
        let id1= parseInt(em.target.getAttribute('data-id').substring(6));
        console.log(id1);
        currentLocalestorage= JSON.parse(localStorage.getItem("selectedItem"));
             
        for(let i =0; i<currentLocalestorage.length;i++){
            if(currentLocalestorage[i].id==id1){
            console.log("bef: "+currentLocalestorage[i].qty);
            if(currentLocalestorage[i].qty==1){
                currentLocalestorage.splice(i,1);
            }
            else
            {
                currentLocalestorage[i].qty= currentLocalestorage[i].qty-1;
            }
            
        } }
        localStorage.setItem("selectedItem",JSON.stringify(currentLocalestorage));   
        
        buildvarukorg();
    }

    //Funktion när man klickt på "+" button
function functionP(ep){
    ep.preventDefault();
    let id1= parseInt(ep.target.getAttribute('data-id').substring(5));
    console.log(id1);
    console.log("Plus knapp trycktes");
    currentLocalestorage= JSON.parse(localStorage.getItem("selectedItem"));
         
    for(let i =0; i<currentLocalestorage.length;i++){
        if(currentLocalestorage[i].id==id1){
        console.log("bef: "+currentLocalestorage[i].qty);
        currentLocalestorage[i].qty= currentLocalestorage[i].qty+1;
        console.log("after: "+currentLocalestorage[i].qty);
    } 
}
    localStorage.setItem("selectedItem",JSON.stringify(currentLocalestorage));   
    
    buildvarukorg();
}
//get products from API
function getProducts() {
    fetch('https://fakestoreapi.com/products')
        .then((res) => res.json())
        .then((data) => {
            data1=data;

            console.log("data1 = " +data1[1].id);
            
            console.log("data1 = " +JSON.stringify(data1).valueOf(1));
            console.log("data = " +data);
            let output = '';
            data.forEach(function (product) {
                output += `
                    <div class="col-xl-4 col-md-6">
                        <h2 class="text-dark" >${product.title}</h2>
                        <img src="${product.image}" class="card-img-top img-fluid" alt="">
                        <div class="card-body align-self-end">
                            <!-- <p class="card-text">${product.description}</p> -->
                            <p class="card-text text-dark">Price: <small class="text-muted">${product.price}$</small></p>
                            <p class="card-text text-dark">Category: <small class="text-muted">${product.category}</small></p>
                            <a id="${product.id}" class="align-self-end btn btn-primary">Köp</a>
                        </div>
                    </div>
                `;
            });
            document.getElementById('output').innerHTML = output;
        
                    
            data.forEach(function (product) {
            let buyBtn = document.getElementById(product.id);
            console.log(product.id);
            buyBtn.addEventListener('click', function(){ 
                saveProductToLocalstorage(product);            
            });    
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}
// Lägger till object (of selected product) to LocaleStorage
function saveProductToLocalstorage(product) {
    console.log(product);
    let obj = {
        id: product.id,
        title: product.title,
        qty: 1,
        price: product.price
    };
    if(localStorage.getItem("selectedItem")==null){   
        let currentLocalestorage=[];
        currentLocalestorage.push(obj);
        localStorage.setItem("selectedItem",JSON.stringify(currentLocalestorage));
    }
    else{
        if(find(obj)){
            currentLocalestorage= JSON.parse(localStorage.getItem("selectedItem"));
            for(let i =0; i<currentLocalestorage.length;i++){
                if(currentLocalestorage[i].id==obj.id)
                currentLocalestorage[i].qty= currentLocalestorage[i].qty+obj.qty;
            }
            //currentLocalestorage.push(obj);
            localStorage.setItem("selectedItem",JSON.stringify(currentLocalestorage));    
        }
        else{
            currentLocalestorage= JSON.parse(localStorage.getItem("selectedItem"));
            currentLocalestorage.push(obj);
            localStorage.setItem("selectedItem",JSON.stringify(currentLocalestorage));    
        };
    }
    buildvarukorg();
}
//Find object from LocaleStorage and return True if find
function find(obj){
    currentLocalestorage= JSON.parse(localStorage.getItem("selectedItem"));
    let match  = currentLocalestorage.filter(item=>{if (item.id==obj.id) return true});
    console.log("match = "+ JSON.stringify(match ))
    if(match && match[0])
    {
        console.log("match0 = "+ match[0].id)

    return match[0];
}
}
 //build cart (articles, price, and others)
    function buildvarukorg(){
        currentLocalestorage= JSON.parse(localStorage.getItem("selectedItem"));
        let vk = document.getElementById("Varukorg-tab");
        
        //update number of item in cart
        let antalItemsCart = document.getElementsByClassName("badge");
        antalItemsCart[0].innerHTML=currentLocalestorage.length


        console.log("antalitems"+currentLocalestorage.length)
        vk.innerHTML="";
        console.log(currentLocalestorage)
        let vkChild =`<table class="table" >
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Antla</th>
            <th scope="col">pris</th>
            <th scope="col">Totalt</th>
          </tr>
        </thead>
        <tbody>`;
        for(let i =0; i<currentLocalestorage.length; i++)
        {
            vkChild+= `<tr id="">
            <th scope="row">${currentLocalestorage[i].title}</th>
            <td><div>
              <button data-id="minus-${currentLocalestorage[i].id}"> -</button>
              <input type="number" name="" id="" size="4" value="${currentLocalestorage[i].qty}" >  
              <button data-id="plus-${currentLocalestorage[i].id}">+</button>
              </div>      
            </td>
            <td>${currentLocalestorage[i].price}</td>
            <td>${currentLocalestorage[i].price * currentLocalestorage[i].qty}</td>
          </tr>`; 
          // Call function to attach event listeners after buttons are generated    
}
        vkChild+=`</tbody>`;
        console.log(vkChild);
    vk.innerHTML=vkChild;
    //get total summa
    let summa=getsumma();
    let vk1 = document.getElementById("Varukorg-tab");
    vk1.innerHTML+=`<div id="cart-foot">
    <button type="button" class="tom-varukorg btn btn-danger" id="tom-varukorg" >Töm varukorg</button>
    <br>
    <br> <br>
    <h5 id="total-sum">Total att betala ${summa.toFixed(2)} kr</h5>
</div>
<a href="form.html" type="button" class="btn btn-success" id="till-kassa" >Till kassan</a>`;
clrCartBtn=document.getElementById('tom-varukorg');
clrCartBtn.addEventListener('click',clearVK);

clrCartBtn=document.getElementById('till-kassa');
clrCartBtn.addEventListener('click',kassa);

attachButtonListeners(); 
}
//Tömmar varukorg
function clearVK(){
    console.log("inne i clear");
    localStorage.clear();
    buildvarukorg();
    
}
//get total summa på varor i varukorg
function getsumma(){
    let s=0;
    currentLocalestorage= JSON.parse(localStorage.getItem("selectedItem"));
            for(let i =0; i<currentLocalestorage.length;i++){
                s+=(currentLocalestorage[i].price) * parseInt(currentLocalestorage[i].qty);
            }
            console.log("s=" +s);
            return s;
}