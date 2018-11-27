// get a reference to all the faculty cards
var cards = document.body.querySelectorAll('.card');

// console.log( cards );
// cards.style.border = "1px solid red";

var facultyFilter = document.body.querySelector('select#filterOptions');

console.log(facultyFilter);

facultyFilter.addEventListener('change', function(e){
   if( this.value ){
        let cards = document.body.getElementsByClassName( this.value );
        console.log( cards );
        hideCards( cards );
   } else {
        let cards = document.body.getElementsByClassName( 'card' );
        showCards( cards );
    }
}); 

function hideCards( htmlNodes ){

    for (let index = 0; index < htmlNodes.length; index++) {
        htmlNodes[index].style.display = "none";
        console.log( htmlNodes[index] );
    }
}

function showCards( htmlNodes ){
    for (let index = 0; index < htmlNodes.length; index++) {
        htmlNodes[index].style.display = "block";
        console.log( htmlNodes[index] );
    }
}

