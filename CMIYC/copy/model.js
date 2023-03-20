export const Game={level:1}

export function random(x,y){
console.log(x.objSize.widthGD);
    var xWidth = x.objSize.widthGD - 25; 
    var xHeight = x.objSize.heightGD - 25;
    
    var yWidth = x.objSize.widthDiv;
    var yHeight = x.objSize.heightDiv;
    
    var width = xWidth - yWidth;
    var height = xHeight - yHeight;
    
    const randomX = Math.floor(Math.random() * width);
    const randomY = Math.floor(Math.random() * height);
    
    y.style.left = randomX + "px"; 
    y.style.top = randomY  + "px"; 
    console.log(randomX, randomY)

    
   return [randomX, randomY]
    
  
  
  }

  export function addPoints(x){
    x+=Game.level*10
    console.log(x);
    return x
    }
    
    export function addLevel(){
     
        Game.level++
        return Game.level
    }
    
    
    
    export function subPoints(x){
        console.log("model");
      x-=Game.level
    return x
    }

    export function newHS(x,y){
        console.log(x) 
        console.log(y) 
        if (x.length < 5) {
            return y;
        }
        for (let i = 0; i < x.length; i++) {
            console.log(x[i]);
            console.log(x[i].score);
            console.log(y);
            if (y>x[i].score){
                console.log(y);
                return y;
            }
        }
        console.log("c null");
        return null;
    }
    
    