// ok homepage js whatever

console.log("main js starting ig");

let user = document.cookie.split("=")[1] || "Guest";
let unameEl = document.getElementById("userNameHere");

if (unameEl) {
  unameEl.innerText = user;
} else {
  console.log("username span missing lol");
}

// just show a log when clicking game card
let a = document.querySelectorAll(".game-card a");
a.forEach(x=>{
  x.addEventListener("click",()=>{
    console.log("going to game: " + x.textContent);
  })
});

// saving score func since why not
function saveScore(game,score){
  try {
    let s = JSON.parse(localStorage.getItem("scores")) || [];
    s.push({name:game,score:score});
    localStorage.setItem("scores", JSON.stringify(s));
  } catch(e){
    console.log("uh storage broke",e);
  }
}

// lol nothing else rn
