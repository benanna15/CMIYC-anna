import { MySection } from "../HTMLElements/section.js";
import { MyButton } from "../HTMLElements/button.js";
import CSS from "../app/style.css" assert {type: "css"}
document.adoptedStyleSheets.push(CSS)

var main=document.getElementById("main")
const Home={}

var obj={score:0,points:10,level:1,mClicks:0,timer:60}

export function update (s,p,l,c,t){
 obj.score=s
 obj.points=p
 obj.level=l
 obj.mClicks=c
 obj.timer=t
updateSections()
}

export function init() {

    var homePage = new MySection("", "home-page");
    Home.titleBtn= new MyButton("title", "btn","CATCH ME IF YOU CAN!")
    Home.section=new MySection("section","section")

    Home.gameDiv=new MySection("gdiv","game-div")
   
    Home.div= new MySection("div","div ")
    Home.audio=document.createElement("audio")
    Home.sidebar=new MySection("sbar","side-bar")
 
    Home.scores=new MySection("","scores infos", `Score: ${"\n"+ obj.score}`)
    Home.points=new MySection("","points infos", `Points to next Level: ${"\n"+ obj.points}`)
    Home.level=new MySection("","level infos",`Level:${"\n"+ obj.level}` )
    Home.clicks=new MySection("", "clicks infos",`Missed clicks:${"\n"+ obj.mClicks}`)
    Home.timer=new MySection("","timer infos",`Timer:${"\n"+  obj.timer}`)
    Home.hScores= new MySection("","high-scores ","High Scores:")

    Home.gameDiv.append(Home.div)
    Home.sidebar.append(Home.scores,Home.points,Home.level,Home.clicks,Home.timer,Home.hScores)
    Home.section.append(Home.gameDiv,Home.sidebar)
    homePage.append(Home.titleBtn,Home.section);
 
  main.append(homePage);

  return Home;
}

export function size() {
    var objSize={}
   objSize.widthGD = Home.gameDiv.offsetWidth;
    objSize.heightGD = Home.gameDiv.offsetHeight;
    objSize.widthDiv = Home.div.offsetWidth;
    objSize.heightDiv = Home.div.offsetHeight;
    
console.log(objSize);
    return {objSize};
}

export function updateSections() {
    Home.scores.innerText = `Score:\n${obj.score}`;
    Home.points.innerText = `Points to next Level:\n${obj.points}`;
    Home.level.innerText = `Level:\n${obj.level}`;
    Home.clicks.innerText = `Missed clicks:\n${obj.mClicks}`;
    Home.timer.innerText = `Timer:\n${obj.timer}`; 
  }
    

  export function createHS(user) {
   
    var h1 = document.createElement("h1");
    h1.innerHTML = "No score available";
    h1.className="h1-position"
  
    var h2 =document.createElement("h2");
    h2.innerHTML=user.date
    h2.style.display = "none";
    
    if(user.name && user.score) {
      h1.innerHTML = user.score + " " + user.name;
      h1.addEventListener("mouseover",()=>{
          h2.innerHTML=user.date
          h2.style.display = "block";
          h2.className="date"
      })
  
      h1.addEventListener("mouseout",()=>{
          h2.style.display = "none"; 
        })
    }
    h1.append(h2)
    Home.hScores.append(h1);
  }


  export function nameNewHS(y){
   
    var fName=prompt("Congratulations!"+ "\n"+ "You got a high score! "+ y + "\n "+"Please enter your name:")
    if (fName.length === 0) {
        return ("User" + Math.floor(Math.random()*1000))
      } else {
        return fName
      }
   

  }

  export function clearHS() {
   Home.hScores.innerHTML = "";
    Home.hScores.innerHTML = "<h3>High Scores:</h3>";
        
  }