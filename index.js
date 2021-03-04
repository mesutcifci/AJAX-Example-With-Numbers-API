let arrow = document.querySelector(".dropdown--arrow");
let dropdownItems = document.getElementsByClassName("dropdown--item");



function rotateArrow() {
    arrow.classList.toggle("js-arrow");
}

function showDropdownItems() {
    for (let item of dropdownItems) {
        if (item.classList.contains("js-item")) {
            item.classList.remove("js-item");
        } else {
            item.classList.add("js-item");
        }
    }
}

arrow.addEventListener("click", () => {
    rotateArrow();
    showDropdownItems();
});