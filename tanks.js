let tank1 = document.getElementById('tank-1');
let tank2 = document.getElementById('tank-2');
let cannonBall = document.getElementById('object');
let cannonBall2 = document.getElementById('object2');

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
cannonBall2.style.left = tank2End - 27 + "px";

function Reset(){
    redScore = 0;
    blueScore = 0;
    document.getElementById("blue-score").innerHTML = blueScore;
    document.getElementById("red-score").innerHTML = redScore;

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

function blueAction(){

cannonBall.style.display = '';

let x0 = tank1XStart + 25;
let y0 = 20;
let v0 = document.getElementById("blue-power").value;
let g = 9.8;

let time = 0;

let degrees = document.getElementById("blue-angle").value;
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
            window.alert("Final X: " + x + "\r\n" + "HIT!");
            blueScore++;
            document.getElementById("blue-score").innerHTML = blueScore;
        } else{
            window.alert("Final X: " + x + "\r\n" + "MISS!");
        }
    }
    time = time + .01;
    cannonBall.style.bottom = y + "px";
    cannonBall.style.left = x + "px";
}
}

function redAction(){

    cannonBall2.style.display = '';
    
    let x0 = tank2End - 27;
    let y0 = 20;
    let v0 = document.getElementById("red-power").value;
    let g = 9.8;
    
    let time = 0;
    
    let degrees = document.getElementById("red-angle").value;
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
                window.alert("Final X: " + x + "\r\n" + "HIT!");
                redScore++;
                document.getElementById("red-score").innerHTML = redScore;
            } else{
                window.alert("Final X: " + x + "\r\n" + "MISS!");
            }
        }
        time = time + .01;
        cannonBall2.style.bottom = y + "px";
        cannonBall2.style.left = x + "px";
}
}

