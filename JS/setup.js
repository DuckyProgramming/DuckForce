function setup(){
    setupGraphics()

    entities.factions.push(new faction(graphics.main,0))
    entities.factions.push(new faction(graphics.main,1))
    //entities.factions.push(new faction(graphics.main,2))
    //entities.factions.push(new faction(graphics.main,3))
    //entities.walls.push(new wall(graphics.main,0,-100,1,100,100))

    run={fore:[entities.factions,entities.projectiles,entities.walls],life:[entities.factions],scan:[entities.units]}
}
function windowResized(){
    resizeCanvas(windowWidth-50,windowHeight-50)
}