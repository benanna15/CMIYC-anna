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

var usersHS=[]
var lsUSERS =localStorage.usersHS;
var timing=null


var v=View.init()

export function init(){
    
console.log(View.size())
  
  lStorage()


    v.titleBtn.innerText=  "CATCH ME IF YOU CAN!"  
    v.titleBtn.addEventListener("mouseenter", function () {v.titleBtn.innerText = "Click to Start !"})
    v.titleBtn.addEventListener("mouseleave", function () {v.titleBtn.innerText = "CATCH ME IF YOU CAN!"}); 
    v.titleBtn.addEventListener("click",startGame)

}

export function lStorage(){
      if(lsUSERS) {
      usersHS = JSON.parse(lsUSERS)
      console.log(usersHS);
      usersHS.sort((a, b) => b.score - a.score);
 
      console.log(usersHS);
      usersHS.length <= 5
    
      usersHS.forEach(user => {
        View.createHS(user);
      });
    }else{
        lsUSERS = 
        localStorage.setItem("usersHS", JSON.stringify(usersHS))
    }
}

export function startGame(){

    if (confirm("Ready to start ? ") == true) {
       v.titleBtn.removeEventListener("click",startGame)
console.log("iciii");
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
    clearInterval(timing)
    v.div.removeEventListener("mouseenter",onMouse)
    v.div.removeEventListener("mousedown" ,onClick)
    v.gameDiv.removeEventListener("mousedown",gameDivClicks)
  //  v.div.classList.remove("active");
    console.log("a")
    v.div.classList.remove('active', 'before');
    v.div.style.animation = " none ";
    v.div.style.animationPlayState = "paused"
    v.div.style.pointerEvents = 'none'
    v.div.style.position = "absolute";
    v.div.style.top = "50%";
    v.div.style.left = "50%";
    v.div.style.transform = "translate(-50%, -50%)";
    console.log("b")
    setTimeout(() => {
      console.log("c")
        checkScore();
      }, 50);
    v.titleBtn.addEventListener("click",startGame)
    console.log("d")
} 





export function checkScore(){
    
    if (Model.newHS(usersHS, score)) {
    
        newLocaleStorage(View.nameNewHS(score),score)
        console.log("e")
        return
        /* v.div.style.animation = " none ";
        v.div.style.animationPlayState = "paused"
        v.div.style.pointerEvents = 'none'
        v.div.style.position = "absolute";
        v.div.style.top = "50%";
        v.div.style.left = "50%";
        v.div.style.transform = "translate(-50%, -50%)";
         */
      
   
    }else
        alert("Game over!"+"\n"+`Your score is : ${score}`)
        console.log("f")
        return
    }


      

export function onMouse(){
   // event.stopPropagation() 
   
 v.div.style.cursor = "crosshair";  
 
  //var timeOut=
  setTimeout(() => { 
    Model.random(View.size(),v.div) 

}, t)  
console.log(t);
}
    
export function onClick(event){

 //event.stopPropagation()

   
    v.audio.src="././assets/audio/22264.mp3"
    v.audio.load();
v.audio.play();

    if (event.currentTarget === v.div) {
    console.log("ici");
     count++
     console.log(count);
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
         console.log(t);
          vitesseRotation = 2 - (level - 1) * 0.25;
          angleRotation += 360 + (level - 1) * 90;
  
          v.div.style.animation = `rotation ${vitesseRotation}s infinite linear`;
          v.div.style.transform = `rotate(${angleRotation}deg)`;
          console.log(vitesseRotation);
          console.log(angleRotation);
       
        if (level > 3){
       
      level=5
      newPoint=0
      clearInterval(timer)
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
        console.log("c")
          checkScore();
        }, 50);
console.log("niveau 5");

           
        
            
        
            
        } 
        }
       View.update(score, newPoint, level, indexMissedClicks, timer);
    
  }

  export function gameDivClicks(event){
    event.stopPropagation()
    console.log("la");
    indexMissedClicks++
   score= Model.subPoints(score)
   console.log("clicks manqués"+ indexMissedClicks);}


export function newLocaleStorage(name, score) {
    const user = { name:name, score:score.toString() ,date:new Date().toLocaleDateString("fr") };
  
    
      usersHS.push(user);
      console.log(usersHS);
      usersHS.sort((a, b) => b.score - a.score);
      console.log( usersHS);
      if(usersHS.length>5){usersHS.pop();}
      console.log( usersHS);
      View.clearHS()
      usersHS.forEach((user) => {
        View.createHS(user)}); 
        lsUSERS = 
        localStorage.setItem("usersHS", JSON.stringify(usersHS));
       
     
}
          
    