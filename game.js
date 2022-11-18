

const cvs = document.getElementById("ghost");

const ctx = cvs.getContext("2d");

const actx = new AudioContext()

//SOUND FX STEPS

const stepsfx = new Audio();
stepsfx.src = "./audio/steps.wav";


//SOUND FX JUMPS

        async function getFile(){
            const response = await fetch("./audio/jump2.wav");
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await actx.decodeAudioData(arrayBuffer)
            return audioBuffer;
        }


        async function playSample() {
            const sound = await getFile()
            const sampleSource = actx.createBufferSource();
            sampleSource.buffer = sound;
            sampleSource.connect(actx.destination);
            sampleSource.start();
            return sampleSource;
        }

    window.addEventListener("load", getFile())
    window.addEventListener("load", stepsfx)







// GAME VARS AND CONSTS

let frames = 0;

// LOAD SPRITE IMG

const sprite = new Image();
sprite.src = "img/sprite2 - Copy.png";

//GAME STATE

const state = {
    current: 0,
    getReady: 0,
    intro: 1,
    game: 2,
    over: 3,
}

// CONTROL THE GAME

cvs.addEventListener("click", function(evt){
    switch(state.current){
        case state.getReady:
            state.current = state.intro;
            break;
        case state.intro:
            state.current == state.intro;
            break;
        case state.game:
            ghostFall2.flap();
            playSample();
            ghostFall2.chute();
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
    dy: 2,

    draw : function(){
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.dW, this.dH)
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y + this.dH, this.dW, this.dH)
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y + this.dH + this.dH, this.dW, this.dH)
    },

    update : function(){
        if(state.current == state.game){
           this.y = (this.y - this.dy) % this.dH;
        }

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
    dx : 2,
    draw : function(){
    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.dW, this.dH)},

    update: function (){
        if(state.current == state.game){
        if (ghostFall.y > 115){
        this.y -= frames % 1 == 0 ? 2:0;
       }}
    }
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
        if(state.current == state.intro){
        if (this.x == 510) return;
        let ghostIntro = this.animation[this.frame];
        ctx.drawImage(sprite, ghostIntro.sX, ghostIntro.sY, this.w, this.h, this.x, this.y, this.w, this.h)}
    },
    intro: function() {
        
        if(state.current == state.intro){
        if(this.x < 500){stepsfx.play()};
        this.frame += frames % 9 == 0 ? 1:0;
        this.frame = this.frame % this.animation.length;
        this.x += frames % 1 == 0 ? 4:0;
        if(this.x >= 510) {this.x = 510};
        }

    }
}

// GHOST OBJ JUMP

const ghostJump = {
    animation : [ 
        {sX:1546, sY:0},
        {sX:1546, sY:0},
        {sX:1546, sY:0},
        {sX:1738, sY:0},
        {sX:1925, sY:0},
        {sX:2114, sY:0},
        {sX:1166, sY:203},
        {sX:1354, sY:203},
        {sX:1562, sY:203},
        {sX:1562, sY:203}
    ],
    x : 510,
    y : 12,
    w : 195,
    h : 196,

    frame : 0,


    draw: function() {
        if(ghostIntro.x == 510){
        let ghostJump = this.animation[this.frame];
        if(this.frame < 3) 
         {ctx.drawImage(sprite, ghostJump.sX, ghostJump.sY, this.w, this.h, this.x , this.y, this.w, this.h)}
        if (this.frame == 3)
        {ctx.drawImage(sprite, ghostJump.sX, ghostJump.sY, this.w, this.h, this.x++ , this.y--, this.w, this.h)
        }
        if (this.frame == 4)
        {ctx.drawImage(sprite, ghostJump.sX, ghostJump.sY, this.w, this.h, this.x++ , this.y--, this.w, this.h)
        }
        if (this.frame == 5)
        {ctx.drawImage(sprite, ghostJump.sX, ghostJump.sY, this.w, this.h, this.x++ , this.y--, this.w, this.h)
        }
        if (this.frame == 6)
        {ctx.drawImage(sprite, ghostJump.sX, ghostJump.sY, this.w, this.h, this.x++ , this.y--, this.w, this.h)
        }
        if (this.frame == 7)
        {ctx.drawImage(sprite, ghostJump.sX, ghostJump.sY, this.w, this.h, this.x++ , this.y++, this.w, this.h)
        }
        if (this.frame == 8)
        {ctx.drawImage(sprite, ghostJump.sX, ghostJump.sY, this.w, this.h, this.x++ , this.y++, this.w, this.h)
        }
        if (this.frame == 9)
        {ctx.drawImage(sprite, ghostJump.sX, ghostJump.sY, this.w, this.h, this.x++ , this.y++, this.w, this.h)
            }
        
        }
    }
    
    ,
    intro: function() {
        if(ghostIntro.x == 510){
        if (this.x ==511)playSample();
            if(this.frame < 9){
                this.frame += frames % 12 == 0 ? 1:0;
                this.frame = this.frame;
};
        if (this.frame == 9)  { 
            this.frame = 9
        }         
        }}
        }




//GHOSTFALL OBJ

const ghostFall = {
    animation: [ 
        {sX:1941, sY:202},
        {sX:1753, sY:202},
    ],

    x : 624,
    y : 45,
    w: 185,
    h : 194,

    frame: 0,

    draw: function() {
        
            if(ghostJump.y == 30){
            ghostJump.draw =  function(){};

            let ghostFall = this.animation[this.frame];
            ctx.drawImage(sprite, ghostFall.sX, ghostFall.sY, this.w, this.h, this.x, this.y, this.w, this.h)
    }},

    update: function(){
        if(ghostJump.y == 30){
        ghostJump.draw =  function(){};
        this.frame += frames% 5 == 0 ?1:0;
        this.frame = this.frame % this.animation.length
        this.y += frames% 1 == 0 ?2:0;
        this.y = this.y;
        if(this.y > 245){this.y = 245}}},
    
    

}

const ghostFall2 = {
    

    flap : function (){
        this.speed = -this.jump;
      } ,



    animation2: [ 
        {sX:2141, sY:195}
    ],

    animation: [ 
        {sX:1941, sY:202},
        {sX:1753, sY:202},
    ],

    cW : 226,
    cH : 180,

    x : 624,
    y : 245,
    w: 185,
    h : 194,

    frame: 0,
    speed : 0,
    gravity : 0.25,
    jump : 6,

    draw: function() {
            if(ghostFall.y == 245){
            state.current = state.game
            let ghostFall2 = this.animation[this.frame];
            ctx.drawImage(sprite, ghostFall2.sX, ghostFall2.sY, this.w, this.h, this.x, this.y, this.w, this.h)
    }},

    update: function(){
        if(state.current == state.game){
        ghostFall.draw =  function(){}
        this.frame += frames% 5 == 0 ?1:0;
        this.frame = this.frame % this.animation.length
        this.speed += this.gravity;
        this.y += this.speed;
        if(this.y > 245) {this.y = 245};
        if(this.y < -100) {this.y = -100}
}},

    

    chute: async function(){
        if(this.speed < 0) {
        this.animation = this.animation2;
        this.w = this.cW;
        this.h = this.cH;
        setTimeout(()=>{
        this.animation =  [ 
            {sX:1941, sY:202},
            {sX:1753, sY:202},
        ];
        this.w = 185;
        this.h = 194;
        }, 500 )

    }
    }


}

//PARACHUTE OBJ

// const ghostChute = {
//     sX : 2141,
//     sY : 195,
//     w : 226,
//     h : 180,
//     x : ghostFall2.x,
//     y : ghostFall2.y,
    


//     chute: function(){ 
//             ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h)    
        
        

//     }

// }

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
    position: [],
    animation: [ 
        {sX:18, sY:1069},
        {sX:291, sY:1069},
        {sX:565, sY:1069},
        {sX:291, sY:1069},
    ],

    animation2: [ 
        {sX:837, sY:1069},
        {sX:1117, sY:1069},
        {sX:1415, sY:1069}
    ],

    w: 267,
    h : 121,
    x : 550,
    dY: 2,
    frame: 0,

    draw: function() {
        for(let i  = 0; i < this.position.length; i++){
        let p = this.position[i];
        let eat1 = this.animation[this.frame];
        ctx.drawImage(sprite, eat1.sX, eat1.sY, this.w, this.h, this.x, p.y, this.w, this.h)
    }},


    eyesOpen: function() {
        let meta = Math.random();
        if (meta > 0.6){
        
        if(state.current == state.game){
        this.frame += frames % 15 == 0 ? 1:0;
        this.frame = this.frame % this.animation.length;
        }}

    },


    update: function(){

   
        if(!(fg.y < 65)) return;
        
        if(frames%500 == 0){
            this.position.push({
                y : cvs.height,
            });
        }
        for(let i = 0; i < this.position.length; i++){
            let p = this.position[i];

            if( this.h + p.y > ghostFall2.y && 
                this.h + p.y < ghostFall2.y + ghostFall2.h &&
                this.frame == 2) 
                {
                    this.animation = this.animation2;
                    p.y = p.y;
                    ghostFall2.draw = function (){};} else {p.y -= this.dY};
                    
            // MOVE THE CREATURE UP

            
            
            
            //MAKE THE OLD CREATURE DISSAPPEAR
            if(p.y + this.h <= 0){
                this.position.shift();
            }
            

        }
        }
    }




// EAT2 OBJ


// const eat2 = {


//     x : 550,
//     y : 520,
//     w: 295    ,
//     h : 181    ,

//     frame: 0,

//     draw: function() {
//         let eat2 = this.animation[this.frame];
//         ctx.drawImage(sprite, eat2.sX, eat2.sY, this.w, this.h, this.x, this.y, this.w, this.h)
//     }
// }

//


function draw(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cvs.clientWidth, cvs.height);
    bg.draw();
    fg.draw();
    ghostIntro.draw();
    ghostJump.draw();
    ghostFall.draw();
    eat1.draw();
    ghostFall2.draw();
    gameStart.draw();
    gameOver.draw();
    // gamePannel.draw();

    // eat2.draw();
}

function intro(){
    ghostIntro.intro();
    ghostJump.intro();

}

// UPDATE 
function update(){
    ghostFall.update();
    ghostFall2.update();
    fg.update();
    eat1.update();
    bg.update();
    eat1.eyesOpen();
}

//LOOP
function loop(){
    intro();
    update();
    draw();
    frames++;


    requestAnimationFrame(loop)
}

loop();




