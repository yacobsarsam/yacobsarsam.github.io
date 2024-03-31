//Hämtar produktinfo ifrån local storage
const productFromStorage = JSON.parse(localStorage.getItem('selectedItem'));
console.log(productFromStorage);

//Actionlistener på formuläret. 
const getForm = document.getElementById('getForm')
getForm.addEventListener('submit', changePage); 

//Validering + Ändrar utseendet på sidan. Tar bort form and lägger till orderbekräftelse + returnknapp.
function changePage(e) {
  e.preventDefault(); // formulär skickas ej direkt, block görs innan

  //Kollar så att samtliga valideringsregler är uppfyllda. Returnerar true eller false. 
  let isNameOk = ValidateInput(e, document.getElementById('name').value);
  let isEmailOk = ValidateEmail(e);
  let isAdressOk = ValidateInput(e, document.getElementById('address').value);
  let isZipOk = ValidateZip(e);
  let isCityOk = ValidateInput(e, document.getElementById('city').value);

  //Om validering OK, submit genomförs och ändrar utseende. 
    if (isNameOk && isEmailOk && isZipOk && isAdressOk && isCityOk) {
    getForm.innerHTML = 
    `<h1>
    Tack för din beställning!<br><hr>Vi hanterar den så fort vi kan.:<br></h1>
    <a id="goFrontPage" href="index.html" class="btn btn-primary">Gå till startsida</a>`
    getForm.style.textAlign = 'center' 
    getForm.style.margin = '10px'
    document.getElementById('goFrontPage').addEventListener('click', clearStorage) //ActionL till goFrontPage-knapp. Rensar storage. 
  }
}


//Namn, gatuadress och ort kan anväda samma validering, har samma kravspecifikationer. Lär skicka in en variabel som input till metoden
function ValidateInput(e, input) {
  //const name = document.getElementById('name').value;
 if (input.length >= 2 && input.length < 50) { 
    console.log("namn ok")
    return true;
 }
 else { 
  alert("Namnet måste vara mellan 2-50 bokstäver");
  return false;
 }
}

function ValidateEmail(e) {
  const input = document.getElementById('email').value;
  if (input.length < 50) {
    console.log("email ok")
    return true;
  } 
  else {
    alert("Felaktig email");
    return false;
  }
}

// den här får jag inte till...
function ValidateTelephone(e) {
  const input = document.getElementById('phone').value;
  const regex = /^(\+?\d{1,3}[- ]?)?\(?\d{2,3}\)?[- ]?\d{3,4}[- ]?\d{3,4}$/;
  if (regex.test(input)) {
    console.log("telefon ok")
    return true;
  } 
  else {
    alert("Felaktigt telefonnummer");
    return false;
  }
}

function ValidateZip(e){
  const input = document.getElementById('zip').value;
  const regex = /^\d{5}$/;
  if (regex.test(input)) {
    console.log("zip ok")
    return true;
  } 
  else {
    alert("zip felaktig");
    return false;
  }
}

//Funktion för att rensa lagrad info om produkten ifrån local storage. 
function clearStorage() {
  localStorage.clear();
}

