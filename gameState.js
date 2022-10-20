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


export {fg as fg};