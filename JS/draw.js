function draw(){
    switch(stage.scene){
        case 'battle':
            for(let a=0,la=run.fore.length;a<la;a++){
                for(let b=0,lb=run.fore[a].length;b<lb;b++){
                    run.fore[a][b].display()
                    for(let c=0,lc=game.speed;c<lc;c++){
                        run.fore[a][b].update()
                        if(run.fore[a][b].remove){
                            run.fore[a].splice(b,1)
                            c=lc
                            b--
                            lb--
                        }
                    }
                }
            }
        break
    }
}