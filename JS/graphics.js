function setupLayer(layer){
	layer.noStroke()
    layer.angleMode(DEGREES)
	layer.textAlign(CENTER,CENTER)
	layer.rectMode(CENTER)
	layer.colorMode(RGB,255,255,255,1)
}
function setupGraphics(){
    createCanvas(windowWidth-40,windowHeight-40)
    noStroke()
    angleMode(DEGREES)
	textAlign(CENTER,CENTER)
	rectMode(CENTER)
	colorMode(RGB,255,255,255,1)
    graphics.main=createGraphics(900,600)
    setupLayer(graphics.main)
}
function setupTrig(){
	for(let a=0,la=180;a<la;a++){
		constants.trig[0].push(sin(a))
		constants.trig[1].push(cos(a))
	}
	for(let a=0,la=180;a<la;a++){
		constants.trig[0].push(-constants.trig[0][a])
		constants.trig[1].push(constants.trig[1][179-a])
	}
}
function lsin(direction){
	return constants.trig[0][floor((direction%360+360)%360)]
}
function lcos(direction){
	return constants.trig[1][floor((direction%360+360)%360)]
}