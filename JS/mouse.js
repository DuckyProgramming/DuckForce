function mouseClicked(){
    updateMouse(graphics.main)
    switch(stage.scene){
        case 'battle':
            for(let a=0,la=entities.factions.length;a<la;a++){
                entities.factions[a].onClick()
            }
        break
    }
}