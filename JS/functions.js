function displayTransition(layer,transition){
	layer.noStroke()
	layer.fill(0)
	layer.rect(transition.anim*layer.width/4,layer.height/2,transition.anim*layer.width/2,layer.height)
	layer.rect(layer.width-transition.anim*layer.width/4,layer.height/2,transition.anim*layer.width/2,layer.height)
	layer.rect(layer.width/2,transition.anim*layer.height/4,layer.width,transition.anim*layer.height/2)
	layer.rect(layer.width/2,layer.height-transition.anim*layer.height/4,layer.width,transition.anim*layer.height/2)
	if(transition.trigger){
		transition.anim=round(transition.anim*10+1)/10
		if(transition.anim>=1.1){
			transition.trigger = false
			stage.scene=transition.scene
		}
	}
	else if(transition.anim>0){
		transition.anim=round(transition.anim*10-1)/10
	}
}
function findList(entry,list){
	for(let a=0,la=list.length;a<la;a++){
		if(list[a]==entry){
			return a
		}
	}
	return 0
}
function findName(name,list){
	for(let a=0,la=list.length;a<la;a++){
		if(list[a].name==name){
			return a
		}
	}
	return 0
}
function pointInsideBox(point,box){
	if(point.position.x>box.position.x-box.width/2&&point.position.x<box.position.x+box.width/2&&point.position.y>box.position.y-box.height/2&&point.position.y<box.position.y+box.height/2){
		return true
	}
	else{
		return false
	}
}
function rotatePoint(point,direction,origin){
	return {x:dist(point.x-origin.x,point.y-origin.y,0,0)*lsin(atan2(point.x-origin.x,point.y-origin.y)+direction),y:dist(point.x-origin.x,point.y-origin.y,0,0)*lcos(atan2(point.x-origin.x,point.y-origin.y)+direction)}
}
function pushPoint(point,origin,size){
	if(dist(point.x,point.y,origin.x,origin.y)>size){
		return {x:point.x,y:point.y}
	}
	else{
		return {x:origin.x+lsin(atan2(point.x-origin.x,point.y-origin.y))*size,y:origin.y+lcos(atan2(point.x-origin.x,point.y-origin.y))*size}
	}
}
function directionValue(start,target,bound){
	if(abs(target-start)<bound||abs(target-start-360)<bound||abs(target-start+360)<bound||abs(target-start-720)<bound||abs(target-start+720)<bound){
		return 0
	}else if(start>target-180&&start<target||start>target-540&&start<target-360||start>target+180&&start<target+360||start>target-900&&start<target-720||start>target+540&&start<target+720){
		return 1
	}else if(start>target&&start<target+180||start>target-360&&start<target-180||start>target+360&&start<target+540||start>target-720&&start<target-540||start>target+720&&start<target+900){
		return 2
	}
}
function circleInsideBox(box,circle){
	if(dist(circle.position.x,circle.position.y,constrain(circle.position.x,box.position.x-box.width/2,box.position.x+box.width/2),constrain(circle.position.y,box.position.y-box.height/2,box.position.y+box.height/2))<circle.size){
		return true
	}
	else{
		return false
	}
}
function circleCollideBox(box,circle){
	return pushPoint(circle.position,{x:constrain(circle.position.x,box.position.x-box.width/2,box.position.x+box.width/2),y:constrain(circle.position.y,box.position.y-box.height/2,box.position.y+box.height/2)},circle.size+1)
}
function boxInsideBox(box1,box2){
	if(box1.position.x>box2.position.x-box1.width/2-box2.width/2&&box1.position.x<box2.position.x+box1.width/2+box2.width/2&&box1.position.y>box2.position.y-box1.height/2-box2.height/2&&box1.position.y<box2.position.y+box1.height/2+box2.height/2){
		return true
	}
	else{
		return false
	}
}
function boxCollideBox(static,mobile){
	if(mobile.position.x==mobile.previous.position.x||mobile.position.x<static.position.x&&mobile.position.x<mobile.previous.position.x||mobile.position.x>static.position.x&&mobile.position.x>mobile.previous.position.x||mobile.position.x>static.position.x-static.width/2-mobile.width/2&&mobile.previous.position.x>static.position.x-static.width/2-mobile.width/2&&mobile.position.x<static.position.x+static.width/2+mobile.width/2&&mobile.previous.position.x<static.position.x+static.width/2+mobile.width/2){
		collision.incident.x=1
	}
	else if(mobile.position.x<static.position.x){
		collision.incident.x=(static.position.x-static.width/2-mobile.width/2-mobile.previous.position.x)/(mobile.position.x-mobile.previous.position.x)
	}
	else{
		collision.incident.x=(static.position.x+static.width/2+mobile.width/2-mobile.previous.position.x)/(mobile.position.x-mobile.previous.position.x)
	}
	if(mobile.position.y==mobile.previous.position.y||mobile.position.y<static.position.y&&mobile.position.y<mobile.previous.position.y||mobile.position.y>static.position.y&&mobile.position.y>mobile.previous.position.y||mobile.position.y>static.position.y-static.height/2-mobile.height/2&&mobile.previous.position.y>static.position.y-static.height/2-mobile.height/2&&mobile.position.y<static.position.y+static.height/2+mobile.height/2&&mobile.previous.position.y<static.position.y+static.height/2+mobile.height/2){
		collision.incident.y=1
	}
	else if(mobile.position.y<static.position.y){
		collision.incident.y=(static.position.y-static.height/2-mobile.height/2-mobile.previous.position.y)/(mobile.position.y-mobile.previous.position.y)
	}
	else{
		collision.incident.y=(static.position.y+static.height/2+mobile.height/2-mobile.previous.position.y)/(mobile.position.y-mobile.previous.position.y)
	}
	if(collision.incident.x<collision.incident.y){
		if(mobile.position.x<static.position.x){
			collision.calculate.x=static.position.x-static.width/2-mobile.width/2
		}
		else{
			collision.calculate.x=static.position.x+static.width/2+mobile.width/2
		}
		collision.calculate.y=mobile.previous.position.y*(1-collision.incident.y)+mobile.position.y*collision.incident.y
	}
	else{
		if(mobile.position.y<static.position.y){
			collision.calculate.y=static.position.y-static.height/2-mobile.height/2
		}
		else{
			collision.calculate.y=static.position.y+static.height/2+mobile.height/2
		}
		collision.calculate.x=mobile.previous.position.x*(1-collision.incident.x)+mobile.position.x*collision.incident.x
	}
	if(atan2(collision.calculate.x-static.position.x,collision.calculate.y-static.position.y)>atan2(-static.width/2-mobile.width/2,static.height/2+mobile.height/2)&&atan2(collision.calculate.x-static.position.x,collision.calculate.y-static.position.y)<atan2(static.width/2+mobile.width/2,static.height/2+mobile.height/2)){
		return 0
	}
	else if(atan2(collision.calculate.x-static.position.x,collision.calculate.y-static.position.y)<atan2(-static.width/2-mobile.width/2,-static.height/2-mobile.height/2)||atan2(collision.calculate.x-static.position.x,collision.calculate.y-static.position.y)>atan2(static.width/2+mobile.width/2,-static.height/2-mobile.height/2)){
		return 1
	}
	else if(atan2(collision.calculate.x-static.position.x,collision.calculate.y-static.position.y)<atan2(static.width/2+mobile.width/2,-static.height/2-mobile.height/2)&&atan2(collision.calculate.x-static.position.x,collision.calculate.y-static.position.y)>atan2(static.width/2+mobile.width/2,static.height/2+mobile.height/2)){
		return 2
	}
	else if(atan2(collision.calculate.x-static.position.x,collision.calculate.y-static.position.y)<atan2(-static.width/2-mobile.width/2,static.height/2+mobile.height/2)&&atan2(collision.calculate.x-static.position.x,collision.calculate.y-static.position.y)>atan2(-static.width/2-mobile.width/2,-static.height/2-mobile.height/2)){
		return 3
	}
	else{
		return -1
	}
}
function updateMouse(layer){
	inputs.mouse.x=mouseX
	inputs.mouse.y=mouseY
	inputs.screen.x=(inputs.mouse.x-width/2)/stage.scale+layer.width/2
	inputs.screen.y=(inputs.mouse.y-height/2)/stage.scale+layer.height/2
	inputs.rel.x=(inputs.screen.x-layer.width/2)/stage.focus.scale+stage.focus.x
	inputs.rel.y=(inputs.screen.y-layer.height/2)/stage.focus.scale+stage.focus.y
}
function runKey(key){
	if(key[0][0]||key[1][0]){
		stage.focus.x-=15
	}
	if(key[0][1]||key[1][1]){
		stage.focus.x+=15
	}
	if(key[0][2]||key[1][2]){
		stage.focus.y-=15
	}
	if(key[0][3]||key[1][3]){
		stage.focus.y+=15
	}
}
function smoothAnim(anim,trigger,minPoint,maxPoint,speed){
	if(trigger&&anim<maxPoint){
		return min(round(anim*speed+1)/speed,maxPoint)
	}
	if(!trigger&&anim>minPoint){
		return max(round(anim*speed-1)/speed,minPoint)
	}
	return anim
}