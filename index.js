const canvas = document.createElement('canvas');
const height = document.body.scrollHeight;
const width =  document.body.scrollWidth;
canvas.height = height;
canvas.width = width;
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");
let taglines = [
    "Full stack web developer",
    "Scripting addict",
    "UI/UX Designer",
    "API Programmer",
    "Chatbot Developer",
    ":)"
]

function drawCircle(x,y, color){
    let grd = ctx.createRadialGradient(x, y, 0, x, y, 900);
    grd.addColorStop(0, `rgba(${getRandomInt(20,50)},${getRandomInt(20,50)},${getRandomInt(20,50)},0.5)`);
    grd.addColorStop(1, "transparent");

    return grd
}

function getRandomInt(min, max) {
    return Math.floor(min + (Math.random() * Math.floor(max - min)));
}

for(i = 0; i < 40; i++){
    ctx.fillStyle = drawCircle(getRandomInt(0, width),getRandomInt(0, height));
    ctx.fillRect(0, 0, width, height);
}

let imageData = ctx.getImageData(0,0,width,height);


for(i = 0; i < imageData.data.length; i+=4){
    let rand = getRandomInt(-4,4);
    imageData.data[i] -= rand;
    imageData.data[i + 1] -= rand;
    imageData.data[i + 2] -= rand;
    imageData.data[i + 3] = 255;
}

ctx.putImageData(imageData, 0, 0);


function transitionText(element, string, speed=25, direction=1){

    let int = getRandomInt(0,10);
    let currentString;
    let finalString;

    if(direction == 0){
        currentString = string;
        finalString = element.innerHTML;
    }else{
        currentString = element.innerHTML;
        finalString = string;
    }

    let possibleChars = [
        "A", "B", "C", "D", "E", "F", "G",
        "H", "I", "J", "K", "L", "M", "N",
        "O", "P", "Q", "R", "S", "T", "U",
        "V", "W", "X", "Y", "Z", ",", ".",
        "a", "b", "c", "d", "e", "f", "g",
        "h", "i", "j", "k", "l", "m", "n",
        "o", "p", "q", "r", "s", "t", "u",
        "v", "w", "x", "y", "z", "1", "2",
        "3", "4", "5", "6", "7", "8", "9",
        "!", " ", "$", "%", "^", "&", "*",
        "(", ")", "@", "#", "~", "?", "/"]


    if(currentString.length == 0){
        console.log("empty");

        for(x = 0; x < finalString.length; x++){
            console.log(x);

            currentString += "";
        }

    }

    let interval = setInterval(function(){
        tempString = "";
        
        for(i = 0; i < finalString.length; i++){
            if (currentString.substring(i, i+1) == finalString.substring(i, i+1)){
                tempString += currentString.substring(i,i+1);
            }else{
                if(getRandomInt(0,speed) == 1){
                    tempString += finalString.substring(i,i+1);
                    tempString += currentString.substring(i+1)
                    break;
                }else{
                    tempString += possibleChars[getRandomInt(0,possibleChars.length)];
                    tempString += currentString.substring(i+1)
                    break;
                }

            }
        }

        currentString = tempString;

        element.innerHTML = currentString;

        if (tempString == finalString){
            clearInterval(interval);
        }

    },0.1);
}

setInterval(function(){
    transitionText(document.getElementById("tagline"), taglines[getRandomInt(0,taglines.length)],20,1);
},3000)


transitionText(document.getElementById("title"), "${myName}",200,0);

