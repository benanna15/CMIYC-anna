import * as View from "./view.js";
import * as Model from "./model.js"

var t = 300
var level = 1
var vitesseRotation = 200
var angleRotation = 360
var count = 0
var timer = 60
var indexMissedClicks=0
var score=0
var newPoint=10
var timeOut=null
var usersHS=[]
var lsUSERS =localStorage.usersHS;
var timing=null


var v=View.init()

export function init(){
  
  lStorage()

    v.titleBtn.innerText=  "CATCH ME IF YOU CAN!"  
    v.titleBtn.addEventListener("mouseenter", function () {v.titleBtn.innerText = "Click to Start !"})
    v.titleBtn.addEventListener("mouseleave", function () {v.titleBtn.innerText = "CATCH ME IF YOU CAN!"}); 
    v.titleBtn.addEventListener("click",startGame)
}

export function lStorage(){

  if(lsUSERS) {
    usersHS = JSON.parse(lsUSERS)
    usersHS.sort((a, b) => b.score - a.score);
    usersHS.length <= 5
    usersHS.forEach(user => {
        View.createHS(user);
      });
    }
    else{
     lsUSERS = localStorage.setItem("usersHS", JSON.stringify(usersHS))
    }
}

export function onMouse(event){
  event.stopPropagation() 
  v.div.style.cursor = "crosshair";  
  timeOut=
  setTimeout(() => { 
   Model.random(View.size(),v.div) 
}, t)
}

export function startGame(){

  if (confirm("Ready to start ? ") == true) {

    v.titleBtn.removeEventListener("click",startGame)
    t=300
    newPoint=10
    timer=60
    level=1
    count=0
    indexMissedClicks=0
    score=0
    Model.Game.level=1
    time()

    v.div.style.pointerEvents = "auto"
    v.div.addEventListener("mouseenter", onMouse)
    v.div.addEventListener("mousedown",onClick) 
    v.div.style.animation = `rotation 2s infinite linear`;
    v.div.style.transform = `rotate(360deg)`;
    v.gameDiv.addEventListener("mousedown",gameDivClicks)

    View.update(score, newPoint, level, indexMissedClicks, timer);
    }
}

export function time(){

   timing = setInterval(function () {
    timer--;
    View.update(score, newPoint, level, indexMissedClicks, timer);

    if (timer === 0) {
      stopGame(timing)
    }}, 1000)
  }

export function stopGame(){
  
   clearTimeout(timeOut)
   clearInterval(timing)
  
   v.div.removeEventListener("mouseenter",onMouse)
   v.div.removeEventListener("mousedown" ,onClick)
   v.gameDiv.removeEventListener("mousedown",gameDivClicks)
   
   v.div.style.animation = " none ";
   v.div.style.animationPlayState = "paused"
   v.div.style.pointerEvents = 'none'
   v.div.style.position = "absolute";
   v.div.style.top = "50%";
   v.div.style.left = "50%";
   v.div.style.transform = "translate(-50%, -50%)";
 
  setTimeout(() => {   
   if (Model.newHS(usersHS, score)) {
     newLocaleStorage(View.nameNewHS(score),score)
    }
    else
    alert("Game over!"+"\n"+`Your score is : ${score}`)
      }, 50)

    v.titleBtn.addEventListener("click",startGame)
} 
  
export function onClick(event){

  event.stopPropagation()

  v.audio.src="././assets/audio/22264.mp3"
  v.audio.load();
  v.audio.play();
 
  if (event.currentTarget === v.div) {
    count++
    score= Model.addPoints(score)  
    }
     
  if (count % 10 == 0) {
    var newLevel = Model.addLevel()
    count=0
    newPoint = 10
    }       
    else{
      newPoint= 10 - count
    }     
        
       
  if (newLevel > level) {
    timer += 10;
    level = newLevel     
    t-=50

    vitesseRotation = 2 - (level - 1) * 0.25;
    angleRotation += 360 + (level - 1) * 90;   

    v.div.style.animation = `rotation ${vitesseRotation}s infinite linear`;
    v.div.style.transform = `rotate(${angleRotation}deg)`;

      if (level > 5){
        level=5
        newPoint=0
        stopGame();
      } 
    }
        View.update(score, newPoint, level, indexMissedClicks, timer);
   }
    
  

  export function gameDivClicks(event){
    event.stopPropagation()
    indexMissedClicks++
    score= Model.subPoints(score)
  }


export function newLocaleStorage(name, score) {

    const user = { name:name, score:score.toString() ,date:new Date().toLocaleDateString("fr") };
    usersHS.push(user);
    usersHS.sort((a, b) => b.score - a.score);
    
      if(usersHS.length>5)usersHS.pop();
    
    View.clearHS()
    usersHS.forEach((user) => {
    View.createHS(user)}); 
    lsUSERS = localStorage.setItem("usersHS", JSON.stringify(usersHS));   
}
          
    