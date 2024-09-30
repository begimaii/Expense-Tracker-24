const balanceAmount = document.getElementById("balance");
const moneyPlusAmount = document.getElementById("money-plus");
const moneyMinusAmount = document.getElementById("money-minus");
const historyList = document.getElementById("list");
const addTransactionForm = document.getElementById("form");
const newTransactionText = document.getElementById("text");
const newTransactionAmount = document.getElementById("amount");
const submitBtn = document.querySelector(".btn");

let transactions = [];

function addTransactions(e) {
  e.preventDefault();
  if (
    newTransactionText.value.trim() === "" ||
    newTransactionAmount.value.trim() === 0 ||
    isNaN(newTransactionAmount.value)
  ) {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: uniqueId(),
      text: newTransactionText.value,
      amount: +newTransactionAmount.value,
    };
    transactions.push(transaction);
    renderTransactions(transactions);
    updateTotalResults(transactions);
    newTransactionText.value = "";
    newTransactionAmount.value = "";
  }
  console.log(transactions);
}

submitBtn.addEventListener("click", addTransactions);

function uniqueId() {
  return Number(Math.floor(Math.random() * 1000));
}

function renderTransactions(transactions) {
  historyList.innerHTML = "";
  transactions.forEach((transaction) => {
    const { id, text, amount } = transaction;
    const sign = amount < 0 ? "-" : "+";
    const history = `  <li class="${amount > 0 ? "plus" : "minus"}">
  ${text} <span>${sign} ${Math.abs(amount)}</span><button    
   type = "button" class="delete-btn" data-id="${id}">x</button>
</li>`;
    historyList.innerHTML += history;
  });

  historyList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const id = e.target.getAttribute("data-id");
      deleteTransaction(id);
    }
  });
}
function deleteTransaction(id) {
  transactions = transactions.filter((el) => el.id !== id);
  renderTransactions(transactions);
  updateTotalResults(transactions);
}
// deletBtn.addEventListener("click", deleteTransaction);
function updateTotalResults() {
  const amounts = transactions.map((transaction) => transaction.amount);
  console.log(amounts);
  const total = amounts.reduce((acc, cur) => (acc += cur), 0).toFixed(2);
  const income = amounts
    .filter((el) => el > 0)
    .reduce((acc, cur) => (acc += cur), 0)
    .toFixed(2);
  const expense = (
    amounts.filter((el) => el < 0).reduce((acc, cur) => (acc += cur), 0) * -1
  ).toFixed(2);

  balanceAmount.innerHTML = `$${total}`;
  moneyPlusAmount.innerHTML = `$${income}`;
  moneyMinusAmount.innerHTML = `$${expense}`;
}
