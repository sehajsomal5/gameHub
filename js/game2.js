// random test logs
console.log("memory js loaded maybe");

const board = document.getElementById("gameBoard");
const stat = document.getElementById("status");
const movesLeftTxt = document.getElementById("movesLeft");
let moves = 20; // change anytime lol

let cards = ["🐱","🐶","🐹","🐸","🦊","🐼","🐵","🐷"];
cards = [...cards, ...cards]; // double

// shuffle idk found formula once
cards.sort(()=>Math.random() - 0.3);

let opened = [];
let matched = 0;
movesLeftTxt.innerText = "Moves left: " + moves;

function makeBoard(){
  board.innerHTML = "";
  cards.forEach((sym,i)=>{
    let c = document.createElement("div");
    c.className = "card";
    c.setAttribute("idx", i);
    c.addEventListener("click", flip);
    board.appendChild(c);
  });
}
makeBoard();

function flip(){
  if(moves <= 0) return;
  if(this.classList.contains("open") || this.classList.contains("matched")) return;

  this.classList.add("open");
  let idx = this.getAttribute("idx");
  this.textContent = cards[idx];
  opened.push(this);

  if(opened.length === 2){
    moves--;
    movesLeftTxt.innerText = "Moves left: " + moves;
    console.log("moves left=",moves);

    if(cards[ opened[0].getAttribute("idx") ] === cards[ opened[1].getAttribute("idx") ]){
      opened[0].classList.add("matched");
      opened[1].classList.add("matched");
      matched += 2;
      stat.innerText = "nice!";
      opened = [];
    }else{
      stat.innerText = "nope try again";
      setTimeout(()=>{
        opened.forEach(c=>{
          c.classList.remove("open");
          c.textContent = "";
        });
        opened=[];
      },600);
    }
  }

  if(matched === cards.length){
    stat.innerText = "YOU WON good job 🎉";
    saveScoreMemory(moves);
  }

  if(moves === 0 && matched !== cards.length){
    stat.innerText = "out of moves 😭";
    saveScoreMemory(0);
  }
}

// store score
function saveScoreMemory(score){
  try{
    let all = JSON.parse(localStorage.getItem("scores"))||[];
    all.push({ name:"Memory Game", score });
    localStorage.setItem("scores",JSON.stringify(all));
    console.log("saved score", score);
  }catch(e){console.log("eh error",e);}
}

document.getElementById("restartBtn").onclick = ()=>{
  location.reload();
};
