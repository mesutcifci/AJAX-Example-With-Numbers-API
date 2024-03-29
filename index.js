let dropdown = document.querySelector(".dropdown");
let dropdownArrow = document.querySelector(".dropdown--arrow");
let dropdownItemContainer = document.querySelector(".dropdown--item-container");
let selectedItemText = document.querySelector(".selected-item-text");

let input = document.querySelector(".input");
let factArea = document.querySelector(".facts");

let factType = "trivia";

function makeDropdownClickable() {
  dropdown.addEventListener("click", (event) => {
    rotateArrow();
    showDropdownItemContainer();
    clearInputValue(event.target);
    selectDropdownItem(event.target);
  });
}

function rotateArrow() {
  dropdownArrow.classList.toggle("js-arrow");
}

function showDropdownItemContainer() {
  dropdownItemContainer.classList.toggle("js-visible");
}

function selectDropdownItem(element) {
  if (element.classList.contains("dropdown--item")) {
    selectedItemText.textContent = element.textContent;
    factType = selectedItemText.textContent.toLowerCase();
    makeSelected(element);
  }
}

function makeSelected(element) {
  let selectedItem = document.querySelector(".js-selected");
  if (selectedItem != element) {
    selectedItem.classList.remove("js-selected");
    element.classList.add("js-selected");
  }
}

function clearInputValue(element) {
  if (
    element.classList.contains("dropdown--item") &&
    element.textContent != selectedItemText.textContent
  ) {
    input.value = "";
  }
}

function checkInputIsValid(inputValue) {
  const isEmptyString = inputValue.length <= 0;
  let isNumber = true;

  if (isEmptyString) {
    return false;
  } else {
    isNumber = !isNaN(Number(inputValue));
  }

  if (!isNumber) {
    return false;
  }

  return true;
}

function getData() {
  let inputValue = input.value.trim();
  const isInputValid = checkInputIsValid(inputValue);
  inputValue = Number(inputValue);

  /* get data with XMLHttpRequest
    if(inputValue != "") {
        let request = new XMLHttpRequest();
        request.open("GET", 'http://numbersapi.com/' + inputValue + "/" + factType);

        request.onload = () => {
            if(request.status == 200) {
                factArea.textContent = request.responseText;
            }
        }

        request.send();
    }
    */

  /* get data with fetch */

  if (isInputValid) {
    fetch("http://numbersapi.com/" + inputValue + "/" + factType)
      .then((response) => response.text())
      .then((data) => (factArea.textContent = data))
      .catch((err) => console.log(err));
  }
}

makeDropdownClickable();

input.addEventListener("input", getData);
