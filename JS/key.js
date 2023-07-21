function keyPressed(){
    switch(key){
        case 'a':
            inputs.key[0][0]=true
        break
        case 'd':
            inputs.key[0][1]=true
        break
        case 'w':
            inputs.key[0][2]=true
        break
        case 's':
            inputs.key[0][3]=true
        break
        case 'ArrowLeft':
			inputs.key[1][0]=true
		break
		case 'ArrowRight':
			inputs.key[1][1]=true
		break
		case 'ArrowUp':
			inputs.key[1][2]=true
		break
		case 'ArrowDown':
			inputs.key[1][3]=true
		break
    }
    switch(stage.scene){
        case 'battle':
            for(let a=0,la=entities.factions.length;a<la;a++){
                entities.factions[a].onKey(key,keyCode)
            }
        break
    }
}
function keyReleased(){
    switch(key){
        case 'a':
            inputs.key[0][0]=false
        break
        case 'd':
            inputs.key[0][1]=false
        break
        case 'w':
            inputs.key[0][2]=false
        break
        case 's':
            inputs.key[0][3]=false
        break
        case 'ArrowLeft':
			inputs.key[1][0]=false
		break
		case 'ArrowRight':
			inputs.key[1][1]=false
		break
		case 'ArrowUp':
			inputs.key[1][2]=false
		break
		case 'ArrowDown':
			inputs.key[1][3]=false
		break
    }
}