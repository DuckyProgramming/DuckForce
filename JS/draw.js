function draw(){
    clear()
    background(125)
    graphics.main.push()
    graphics.main.translate(graphics.main.width/2,graphics.main.height/2)
    graphics.main.scale(stage.focus.scale)
    graphics.main.translate(-stage.focus.x,-stage.focus.y)
    switch(stage.scene){
        case 'battle':
            graphics.main.background(50,125,50)
            for(let a=0,la=run.fore.length;a<la;a++){
                for(let b=0,lb=run.fore[a].length;b<lb;b++){
                    for(let c=0,lc=game.speed;c<lc;c++){
                        run.fore[a][b].update()
                        if(run.fore[a][b].remove){
                            run.fore[a].splice(b,1)
                            c=lc
                            b--
                            lb--
                        }
                    }
                    run.fore[a][b].display()
                }
            }
            for(let a=0,la=run.life.length;a<la;a++){
                for(let b=0,lb=run.life[a].length;b<lb;b++){
                    run.fore[a][b].displayLife()
                }
            }
            for(let a=0,la=run.scan.length;a<la;a++){
                for(let b=0,lb=run.scan[a].length;b<lb;b++){
                    if(run.scan[a][b].remove){
                        run.scan[a].splice(b,1)
                        b--
                        lb--
                    }
                }
            }
        break
    }
    graphics.main.pop()
    stage.scale=min(width/graphics.main.width,height/graphics.main.height)
    displayTransition(graphics.main,transition)
    updateMouse(graphics.main)
    image(graphics.main,width/2-stage.scale*graphics.main.width/2,height/2-stage.scale*graphics.main.height/2,stage.scale*graphics.main.width,stage.scale*graphics.main.height)
    game.timer++
}