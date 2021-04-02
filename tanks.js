let tank1 = document.getElementById('tank-1');
let tank2 = document.getElementById('tank-2');
let cannonBall = document.getElementById('object');
let cannonBall2 = document.getElementById('object2');

let redMoveCounter = 0;
let blueMoveCounter = 0;
let redScore = 0;
let blueScore = 0;

let windowWidth = 1100;

let tank1XStart = Math.random() * 200;
    tank1.style.left = tank1XStart + "px";

let tank2XStart = Math.random() * 200;
    tank2.style.right = tank2XStart + "px";

let tank1End = tank1XStart + 25;
let tank2End = windowWidth - tank2XStart;
let tank2Start = tank2End - 25;

cannonBall.style.bottom = 20 + "px";
cannonBall.style.left = tank1XStart + 25 + "px";

cannonBall2.style.bottom = 20 + "px";
cannonBall2.style.left = tank2Start + "px";

const Reset = () => {
    redMoveCounter = 0;
    blueMoveCounter = 0;
    redScore = 0;
    blueScore = 0;

    document.getElementById('hit-miss').textContent = "";

    document.getElementById("blue-score").innerHTML = blueScore;
    document.getElementById("red-score").innerHTML = redScore;
    document.getElementById('red-move-counter').textContent = "Move Counter _ _ _";
    document.getElementById('blue-move-counter').textContent = "Move Counter _ _ _";

    document.getElementById('red-forward').disabled = false;
    document.getElementById('red-backward').disabled = false;
    document.getElementById('red-fire').disabled = false;

    document.getElementById('blue-forward').disabled = false;
    document.getElementById('blue-backward').disabled = false;
    document.getElementById('blue-fire').disabled = false;

    cannonBall.style.display = 'none';
    cannonBall2.style.display = 'none';

    tank1XStart = Math.random() * 200;
    tank1.style.left = tank1XStart + "px";

    tank2XStart = Math.random() * 200;
    tank2.style.right = tank2XStart + "px";

    tank2End = windowWidth - tank2XStart;
    tank2Start = tank2End - 25;

    cannonBall.style.bottom = 20 + "px";
    cannonBall.style.left = tank1XStart + 25 + "px";

    cannonBall2.style.bottom = 20 + "px";
    cannonBall2.style.left = tank2End - 27 + "px";
}

const blueAction = () => {
document.getElementById('hit-miss').textContent = "";
cannonBall.style.display = '';

console.log(tank2End);
console.log(tank2Start);

let x0 = tank1XStart + 25;
let y0 = 20;
let v0 = document.getElementById("blue-power").value;

if(v0 < 0){
    document.getElementById("blue-power").value = 0;
    v0 = 0;
}

if(v0 > 100){
    document.getElementById("blue-power").value = 100;
    v0 = 100;
}

let g = 9.8;

let time = 0;

let degrees = document.getElementById("blue-angle").value;

if(degrees < 0){
    document.getElementById("blue-angle").value = 0;
    degrees = 0;
}

if(degrees > 180){
    document.getElementById("blue-angle").value = 180;
    degrees = 180;
}

let theta = degrees * 3.14 / 180;

let vx = v0*Math.cos(theta);
let v0y = v0*Math.sin(theta);
let vy = v0y - g*time;

let id = setInterval(ParticleMotion, 2);

function ParticleMotion(){
    let x = x0 + vx*time;
    let y = y0 + v0y*time - .5*(g*time*time);
    if(y < 0 || x > 1100){
        clearInterval(id);
        document.getElementById("blue-shot").style.display = 'none';
        document.getElementById("red-shot").style.display = "";
        if(x < tank2End && x > tank2Start){
            document.getElementById('hit-miss').textContent = "HIT!";
            blueScore++;
            document.getElementById("blue-score").innerHTML = blueScore;
        } else{
            document.getElementById('hit-miss').textContent = "MISS!";
        }
    }
    time = time + .01;
    cannonBall.style.bottom = y + "px";
    cannonBall.style.left = x + "px";
}
}

const redAction = () => {
    document.getElementById('hit-miss').textContent = "";
    cannonBall2.style.display = '';
    let x0 = tank2Start - 1;
    let y0 = 20;
    let v0 = document.getElementById("red-power").value;

    if(v0 < 0){
        document.getElementById("red-power").value = 0;
        v0 = 0;
    }
    
    if(v0 > 100){
        document.getElementById("red-power").value = 100;
        v0 = 100;
    }

    let g = 9.8;
    
    let time = 0;
    
    let degrees = document.getElementById("red-angle").value;

    if(degrees < 0){
        document.getElementById("red-angle").value = 0;
        degrees = 0;
    }
    
    if(degrees > 180){
        document.getElementById("red-angle").value = 180;
        degrees = 180;
    }

    let theta = degrees * 3.14 / 180;
    
    let vx = -v0*Math.cos(theta);
    let v0y = v0*Math.sin(theta);
    let vy = v0y - g*time;
    
    let id = setInterval(ParticleMotion, 2);
    
    function ParticleMotion(){
        let x = x0 + vx*time;
        let y = y0 + v0y*time - .5*(g*time*time);
        if(y < 0 || x < 0){
            clearInterval(id);
            document.getElementById("blue-shot").style.display = "";
            document.getElementById("red-shot").style.display = "none";
            if(x < tank1End && x > tank1XStart){
                document.getElementById('hit-miss').textContent = "HIT!";
                redScore++;
                document.getElementById("red-score").innerHTML = redScore;
            } else{
                document.getElementById('hit-miss').textContent = "MISS!"
            }
        }
        time = time + .01;
        cannonBall2.style.bottom = y + "px";
        cannonBall2.style.left = x + "px";
}
}

const moveBlueTank = (modifier) => {
    if(blueMoveCounter < 3) {
        document.getElementById('blue-forward').disabled = true;
        document.getElementById('blue-backward').disabled = true;
        document.getElementById('blue-fire').disabled = true;
        let id = setInterval(tankMotion, 100);
        let counter = 0;
        function tankMotion() {
            if(counter === 20){
                clearInterval(id);
                document.getElementById('blue-forward').disabled = false;
                document.getElementById('blue-backward').disabled = false;
                document.getElementById('blue-fire').disabled = false;
            }
            tank1XStart += (modifier)*2;
            tank1End += (modifier)*2;
            tank1.style.left = tank1XStart + "px";
            counter++;
        }  
    }
    blueMoveCounter++;
    updateBlueMoveCounter();
}

const moveRedTank = (modifier) => {
    if(redMoveCounter < 3){
        document.getElementById('red-forward').disabled = true;
        document.getElementById('red-backward').disabled = true;
        document.getElementById('red-fire').disabled = true;
        let id = setInterval(tankMotion, 100);
        let counter = 0;
        function tankMotion() {
            if(counter === 20){
                clearInterval(id);
                document.getElementById('red-forward').disabled = false;
                document.getElementById('red-backward').disabled = false;
                document.getElementById('red-fire').disabled = false;
            }
            tank2Start -= (modifier)*2;
            tank2End -= (modifier)*2;
            tank2.style.left = tank2Start + "px";
            counter++;
        }   
    }
    redMoveCounter++;
    updateRedMoveCounter();
}

const updateRedMoveCounter = () => {
    if(redMoveCounter === 1){
        document.getElementById('red-move-counter').textContent = "Move Counter X _ _";
    } else if (redMoveCounter === 2){
        document.getElementById('red-move-counter').textContent = "Move Counter X X _";
    } else if (redMoveCounter === 3){
        document.getElementById('red-move-counter').textContent = "Move Counter X X X";
    } else if (redMoveCounter > 3){
        document.getElementById('red-move-counter').textContent = "Move Counter X X X [No More Moves Possible]";  
    }
}

const updateBlueMoveCounter = () => {
    if(blueMoveCounter === 1){
        document.getElementById('blue-move-counter').textContent = "Move Counter X _ _";
    } else if (blueMoveCounter === 2){
        document.getElementById('blue-move-counter').textContent = "Move Counter X X _";
    } else if (blueMoveCounter === 3){
        document.getElementById('blue-move-counter').textContent = "Move Counter X X X";
    } else if (blueMoveCounter > 3){
        document.getElementById('blue-move-counter').textContent = "Move Counter X X X [No More Moves Possible]";  
    }
}
