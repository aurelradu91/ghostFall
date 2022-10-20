

const cvs = document.getElementById("ghost");

const ctx = cvs.getContext("2d");




// GAME VARS AND CONSTS

let frames = 0;

// LOAD SPRITE IMG

const sprite = new Image();
sprite.src = "img/sprite.png";

//GAME STATE

const state = {
    current: 0,
    getReady: 0,
    game: 1,
    over: 2,
}

// CONTROL THE GAME

cvs.addEventListener("click", function(evt){
    switch(state.current){
        case state.getReady:
            state.current = state.game;
            break;
        case state.game:
            // ghostStep();
            // ghostJump()
            // ghostFlapp();
            // ghostBrella();
            break;
        case state.over:
            state.current = state.getReady;
            break;
    }

});

// BACKGROUND OBJ

const bg = {
    sX :1,
    sY :446,
    w : 1920,
    h : 561,
    x : 0,
    y : 0,
    dW : 1344,
    dH : 392,

    draw : function(){
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.dW, this.dH)
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y + this.dH, this.dW, this.dH)
    }
}

// FOREGROUND OBJ

const fg = {
    sX :0,
    sY :0,
    w : 1162,
    h : 303,
    x : -10,
    y : 94,
    dW : 813,
    dH : 274,
    draw : function(){
    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.dW, this.dH)}
}



// GHOST OBJ INTRO

const ghostIntro = {
    animation : [ 
        {sX:1166, sY:24},
        {sX:1358, sY:24},

    ],
    x : -40,
    y : 44,
    w : 177,
    h : 175,
    frame : 0,

    draw: function() {
        if(state.current == state.game){
        if(this.x < 510){let ghostIntro = this.animation[this.frame];
        ctx.drawImage(sprite, ghostIntro.sX, ghostIntro.sY, this.w, this.h, this.x++, this.y, this.w, this.h)}
        else {let ghostIntro = this.animation[this.frame];
            ctx.drawImage(sprite, ghostIntro.sX, ghostIntro.sY, this.w, this.h, this.x, this.y, this.w, this.h)}
    }},
    update: function() {
        this.frame += frames % 9 == 0 ? 1:0;
        this.frame = this.frame % this.animation.length;
    }
}

// GHOST OBJ JUMP

const ghostJump = {
    animation : [ 
        {sX:1546, sY:0},
        {sX:1738, sY:0},
        {sX:1925, sY:0},
        {sX:2114, sY:0},
        {sX:1166, sY:203},
        {sX:1354, sY:203},
        {sX:1562, sY:203},
    ],
    x : 510,
    y : 12,
    w : 184,
    h : 196,

    frame : 0,

    draw: function() {
        if(ghostIntro.x == 510){
        ghostIntro.draw =  function(){};
        let ghostJump = this.animation[this.frame];
        ctx.drawImage(sprite, ghostJump.sX, ghostJump.sY, this.w, this.h, this.x++ , this.y++, this.w, this.h)

        
    }},
    update: function() {
            this.frame = frames % 1 == 0 ? 1:0;
            
            }
        }



//GHOSTFALL OBJ

const ghostFall = {
    animation: [ 
        {sX:1941, sY:202},
        {sX:1753, sY:202},
    ],

    x : 500,
    y : 14,
    w: 185,
    h : 194,

    frame: 0,

    draw: function() {
        let ghostFall = this.animation[this.frame];
        ctx.drawImage(sprite, ghostFall.sX, ghostFall.sY, this.w, this.h, this.x, this.y, this.w, this.h)
    }

}

//PARACHUTE OBJ

const ghostChute = {
    sX : 2141,
    sY : 195,
    w : 226,
    h : 180,
    x : 630,
    y : 250,
    draw: function() {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h)
    }

}

// GAME START OBJ

const gameStart = {
    sX : 1947,
    sY : 453,
    w : 320,
    h : 83,
    x : 525,
    y : 325,
    draw: function() {
        if(state.current == state.getReady){
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h)
    }}

}


// GAME OVER OBJ

const gameOver = {
    sX : 1953,
    sY : 579,
    w : 474,
    h : 71,
    x : 440,
    y : 325,
    draw: function() {
        if(state.current == state.over){
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h)
    }}

}



// // GAME PANNEL OBJ


const gamePannel = {
    sX : 1722,
    sY : 1014,
    w : 772,
    h : 388,
    x : 300,
    y : 180,
    draw: function() {
        if(state.current == state.over){
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h)
    }}

}

// EAT1 OBJ

const eat1 = {
    animation: [ 
        {sX:18, sY:1069},
        {sX:291, sY:1069},
        {sX:565, sY:1069},
        {sX:291, sY:1069},
    ],

    x : 550,
    y : 520,
    w: 267,
    h : 121,

    frame: 0,

    draw: function() {
        let eat1 = this.animation[this.frame];
        ctx.drawImage(sprite, eat1.sX, eat1.sY, this.w, this.h, this.x, this.y, this.w, this.h)
    }

}


// EAT2 OBJ


const eat2 = {
    animation: [ 
        {sX:837, sY:1069},
        {sX:1117, sY:1069},
        {sX:1415, sY:1069},
        {sX:291, sY:1069},
    ],

    x : 550,
    y : 520,
    w: 295    ,
    h : 181    ,

    frame: 0,

    draw: function() {
        let eat2 = this.animation[this.frame];
        ctx.drawImage(sprite, eat2.sX, eat2.sY, this.w, this.h, this.x, this.y, this.w, this.h)
    }
}

//


function draw(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cvs.clientWidth, cvs.height);
    bg.draw();
    fg.draw();
    ghostIntro.draw();
    ghostJump.draw();
    // ghostFall.draw();
    ghostChute.draw();
    gameStart.draw();
    gameOver.draw();
    // gamePannel.draw();
    eat1.draw();
    eat2.draw();
}

// UPDATE 
function update(){
    ghostIntro.update();
    ghostJump.update();

}

//LOOP
function loop(){
    frames++;
    update();
    draw();

    requestAnimationFrame(loop)
}

loop();




