const balance=document.querySelector("#balance");
const inc_amt=document.querySelector("#inc-amt");
const exp_amt=document.querySelector("#exp-amt");
const form=document.querySelector("#form");
const description=document.querySelector("#decs");
const amount=document.querySelector("#amount");
const trans=document.querySelector("#trans");

/*
const dummyData=[
    { id: 1, description: "Flower", amount:-20},
    { id: 2, description: "Salary", amount:35000},
    { id: 3, description: "Book", amount:-200},
    { id: 4, description: "Camera", amount:-1500},
    { id: 5, description: "Petrol", amount:-200},
]
let transactions=dummyData;
*/
const localStroageTrans=JSON.parse(localStorage.getItem("trans"));
let transactions=localStorage.getItem("trans") !=null?
localStroageTrans:[];

function loadTransactionDetails(transcation){
  const sign=transcation.amount < 0 ? "-" : "+" ;
  const item= document.createElement("li")
  item.classList.add(transcation.amount < 0 ? "exp" : "inc")
  trans.appendChild(item);
  item.innerHTML=`${transcation.description}
  <span>${sign} ${Math.abs(transcation.amount)} <span>
  <button class="btn-del" onclick="removeTrans(${transcation.id})">x</button>`;
}

function removeTrans(id) {
  if (confirm("Are you sure you want to delete your Transaction?")) {
    transactions = transactions.filter((transaction) => transaction.id != id);
    config();
    updateLocalStroage();
  } else {
    return;
  }
}
function updateMoney(){
  const amounts=transactions.map((transaction) => transaction.amount);
  const total=amounts.reduce((acc,item) => (acc +=item),0).toFixed(2);
  balance.innerHTML=`₹ ${total}`;

  const income = amounts.filter((item) => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2); 
  inc_amt.innerHTML = `₹ ${income}`; 

  const expense = amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0).toFixed(2); 
  exp_amt.innerHTML = `₹ ${Math.abs(expense)}`; 
}
function addTransaction(event){
  event.preventDefault();
  if(description.value.trim() =="" ||amount.value.trim()==""){
    alert("Please Enter the Description and amount");
  }
  else{
    const transcation={
      id: uniqueId(),
      description:description.value,
      amount:+amount.value,
    };
    transactions.push(transcation);
    loadTransactionDetails(transcation);
    description.value="";
    amount.value="";
    updateMoney();
    updateLocalStroage()
  }
}
form.addEventListener("submit",addTransaction);

function config(){
    trans.innerHTML="";
    transactions.forEach(loadTransactionDetails);
    updateMoney();
}
window.addEventListener("load",function(){
   config();
});

function updateLocalStroage(){
  localStorage.setItem("trans",JSON.stringify(transactions));
}

function uniqueId(){
  return Math.floor(Math.random() * 100000)
}