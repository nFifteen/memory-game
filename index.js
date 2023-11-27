const myArray = ["Apple", "Banana",  "Grape", "Cherry", "Kiwi", "Peach", "Pineapple", "Mango", "Orange"];
let newArray = myArray.concat(myArray);
let shuffleArray = [];
let cardContainer = document.getElementById('card-container');
let count = 0;
let attempts = document.getElementsByClassName("counts")[0];
let point = 0;
let count_point = document.getElementById("points");
let fail = document.getElementById("failCount")
let failCount = 0;
let reset = document.getElementById("reset");

function resetGame (){
  cardContainer.innerHTML = ''
  count = 0;
  point = 0;
  failCount = 0;
  count_point.textContent = 0;
  attempts.textContent=0;
  fail.textContent=0;

  init()
}
reset.addEventListener('click', resetGame);

const shuffle = (array) => {
  console.log(array)
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
}; 

let item1 = null;
let item2 = null;

function compare(item1, item2) {
  let content1 = item1.children[1].innerText;
  let content2 = item2.children[1].innerText;
  count += 1;
  attempts.innerText = count;

  if(content1 !== content2) {
    failCount++;
    fail.textContent= failCount;

    // console.log(count)
      setTimeout(function() {
        item1.children[0].style.display = "block";
        item2.children[0].style.display = "block";

        if(failCount === 5) {
          alert('You lost! =)')
          resetGame()
        }
      }, 1000);
    } else {  
        point+= 10;
        count_point.innerText = point;
    }


}

function init() {
  shuffleArray = shuffle(newArray);
  for (i=0; i < newArray.length; i++){
  let newCard = document.createElement('div');
  newCard.className = 'card';
  newCard.id = 'card'+i;

  let newHiddencard = document.createElement('div');
  newHiddencard.className = 'hidden-card';

  let newText = document.createElement('p');
  newText.className = 'content';
  newText.innerText = newArray[i];
  
  newCard.appendChild(newHiddencard);
  newCard.appendChild(newText);
  
  newCard.addEventListener('click', function() {
    let hiddenCard = this.children[0] ;
    hiddenCard.style.display = 'none';

    if(item1 && item2){
      return;
    }
    if(item1 === null) {
      item1 = this;
    }else {
      if(item2 === null) {
        item2 = this;
      }
    }

    if(item1 && item2) {
      compare(item1, item2);
      console.log('count', count)
      item1 = null;
      item2 = null;
    }

  }); 
  cardContainer.appendChild(newCard);
  }
}

init()
