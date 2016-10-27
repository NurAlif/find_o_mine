/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var devWidth = document.documentElement.clientWidth;
var devHeight = document.documentElement.clientHeight;

var layWidth,layHeight,startWidth,startHeight;

var img = new Image();
img.src = "js/game/box.png";

var imgScare = new Image();
var imgJackpot = new Image();

imgScare.src = "js/game/scr.png";
imgJackpot.src = "js/game/a.png";

var content = new Array();

content[0] = null;
content[1] = imgScare;
content[2] = imgJackpot;

var globalMove = function(){
    var randVar1,randVar2;
    randVar1 = Math.floor(Math.random() * count);
    do{
        randVar2 = Math.floor((Math.random() * 100) + 1);
    }while(randVar2 === randVar1);
    boxes[randVar1].move(randVar2);
    

};
var boxes = new Array();

var globalDisplay = function(){
    for(i = 0; i < count; i++){
            boxes[i].display();
        }
};

function startgame() {
    master.start();
    gameInit();
    build();
    globalDisplay();
    master.move();
}
var layout = new Array();


function gameInit(){
    count = 6;
    layWidth = devWidth * (82/100);
    startWidth = (devWidth - layWidth) / 2;
    layHeight = devHeight * (25/100);
    startHeight = (devHeight - layHeight) / 2;
};


function base(dirx){
    this.x = dirx;
    this.size_X = layWidth * (1 / count);
    this.size_Y = (((layWidth / count) * img.height) / img.width);
    this.update = function(){
        
    };
};


function build(){
    for(i = 0; i < count; i++){
        layout[boxes.length] = new base(startWidth + (( layWidth / count ) * boxes.length));
        boxes[boxes.length] = new box(layout[boxes.length].x, layout[boxes.length].size_X, layout[boxes.length].size_Y, boxes.length );
    }
};

var count;

var master = {
    canvas : document.getElementById("master"),
    start : function() {
        this.canvas.width = devWidth;
        this.canvas.height = devHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    move : function(){
        genMove();
        this.moving = setInterval(timeMove, speed);
        console.log("move function complete");
    }
};

var deltaMove;
var runtimeMove;


var box = function(dirx, width_O, height_O,base) {
    this.base = base;
    this.y = startHeight;
    this.x = dirx;
    this.width = width_O;
    this.height = height_O;
    this.c = master.canvas;
    this.ctx = master.canvas.getContext("2d");
    this.display = function(){
        this.ctx.drawImage(img, this.x, this.y, this.width,this.height);
    };
    this.reveal = function(valAscend){
        this.ctx.drawImage(img, this.x, valAscend, this.width, this.height);
    };
    this.dereveal = function(valDescend){
        this.ctx.drawImage(img,this.x, valDescend, this.width, this.height);
    };
};

var firtsTar,secondTar,firtsFix,SecondFix;
var deltaMove,deltaTime,deltaWidth;

var dump;

function genMove(){
    speed = 16;
    exactDir();
    
    deltaTime = 20;
    deltaMove = null;
    deltaWidth = null;
    firtsTar = null;
    secondTar = null;
    firtsFix = null;
    secondFix = null;
    midWidth = null;
    
    firtsTar = Math.floor(Math.random() * boxes.length);
    do{
        secondTar = Math.floor(Math.random() * boxes.length);
    }while(firtsTar === secondTar);
    console.log("created : firts n second tar "+firtsTar+" n " +secondTar);
    
    if(boxes[firtsTar].base < boxes[secondTar].base){
        firtsFix = firtsTar;
        secondFix = secondTar;
        deltaWidth = boxes[firtsFix].x - boxes[secondFix].x;
    }else{
        dump = secondTar;
        secondFix = firtsTar;
        firtsFix = dump;
        deltaWidth = boxes[secondFix].x - boxes[firtsFix].x;
    }
    console.log("created beffore fixtar : "+firtsFix+" n "+secondFix);
    dump = boxes[firtsFix].base;
    boxes[firtsFix].base = boxes[secondFix].base;
    boxes[secondFix].base = dump;
    console.log("created fixtar : "+firtsFix+" n "+secondFix);
    deltaMove = deltaWidth/deltaTime;
}

var speed = 200;
var isTimeMove;

var midWidth;

function timeMove(){
    master.clear();
    if(boxes[firtsFix].x >= layout[(boxes[firtsFix].base)].x){
        boxes[firtsFix].y = startHeight;
        boxes[secondFix].y = startHeight;
        genMove();
        console.log("time move is done");
    }else{
        boxes[firtsFix].x += devWidth/120;
        boxes[secondFix].x -= devWidth/120;
        if(boxes[firtsFix].x <=  (boxes[firtsFix].x + ((boxes[secondFix].x - boxes[firtsFix].x)/2))){
            boxes[firtsFix].y += devHeight*(0.8/100);
            boxes[secondFix].y -= devHeight*(0.8/100);
        }else{
            boxes[firtsFix].y -= devHeight*(0.8/100);
            boxes[secondFix].y += devHeight*(0.8/100);
        }
    }
    console.log(boxes[firtsFix].y + " n "+ boxes[secondFix].y+ " midn: "+midWidth);
    for(i = 0; i <= boxes.length; i++ ){
        boxes[i].display();
    }
}


function exactDir(){
    for(i = 0; i < boxes.length; i++){
        boxes[i].x = layout[boxes[i].base].x;
    }
}