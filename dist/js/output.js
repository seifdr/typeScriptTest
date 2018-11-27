// get a reference to all the faculty cards
var cards = document.body.querySelectorAll('.card');
// console.log( cards );
// cards.style.border = "1px solid red";
var facultyFilter = document.body.querySelector('select#filterOptions');
console.log(facultyFilter);
facultyFilter.addEventListener('change', function (e) {
    if (this.value) {
        var cards_1 = document.body.getElementsByClassName(this.value);
        console.log(cards_1);
        hideCards(cards_1);
    }
    else {
        var cards_2 = document.body.getElementsByClassName('card');
        showCards(cards_2);
    }
});
function hideCards(htmlNodes) {
    for (var index = 0; index < htmlNodes.length; index++) {
        htmlNodes[index].style.display = "none";
        console.log(htmlNodes[index]);
    }
}
function showCards(htmlNodes) {
    for (var index = 0; index < htmlNodes.length; index++) {
        htmlNodes[index].style.display = "block";
        console.log(htmlNodes[index]);
    }
}
