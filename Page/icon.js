function setup(){
    createCanvas(600,600)
    graphic=createGraphics(600,600)
    graphic.rectMode(CENTER)
    graphic.noStroke()
    for(let a=0,la=graphic.height;a<la;a++){
        graphic.fill(200*a/la,50+205*a/la,100+155*a/la)
        graphic.rect(graphic.width/2,0.5+a,graphic.width,2)
    }
    image(graphic,0,0,width,height)
    graphic=createGraphics(600,600)
    graphic.rectMode(CENTER)
    graphic.angleMode(DEGREES)
    graphic.noStroke()
    for(let a=0,la=graphic.height;a<la;a++){
        graphic.fill(100+100*a/la,200,150)
        graphic.rect(graphic.width/2,0.5+a,graphic.width,2)
    }
    graphic.translate(300,300)
    graphic.fill(120,120,80)
    graphic.rect(0,0,600,600)
    let list=[]
    for(let a=0,la=576;a<la;a++){
        let b=a%24-12
        let c=floor(a/24)-12
        let d=floor(random(0,25))
        list.push([b,c,d])
    }
    for(let a=0,la=list.length;a<la;a++){
        let b=list[a][0]
        let c=list[a][1]
        let d=list[a][2]
        graphic.fill(160,160,120)
        graphic.noStroke()
        switch(d){
            case 0:
                graphic.rect(b*30,c*30,20,20,4)
            break
            case 1:
                graphic.rect(b*30,c*30+15*(floor(random(0,2))*2-1),20,50,4)
            break
            case 2:
                graphic.rect(b*30+15*(floor(random(0,2))*2-1),c*30,50,20,4)
            break
            case 3:
                graphic.rect(b*30,c*30+30*(floor(random(0,2))*2-1),20,80,4)
            break
            case 4:
                graphic.rect(b*30+30*(floor(random(0,2))*2-1),c*30,80,20,4)
            break
            case 5:
                graphic.rect(b*30,c*30,10,10,2)
            break
            case 6:
                graphic.rect(b*30,c*30+15*(floor(random(0,2))*2-1),10,40,4)
            break
            case 7:
                graphic.rect(b*30+15*(floor(random(0,2))*2-1),c*30,40,10,4)
            break
            case 8:
                graphic.rect(b*30,c*30+30*(floor(random(0,2))*2-1),10,70,4)
            break
            case 9:
                graphic.rect(b*30+30*(floor(random(0,2))*2-1),c*30,70,10,4)
            break
            case 13:
                graphic.rect(b*30,c*30,24,8,4)
                graphic.rect(b*30,c*30,8,24,4)
            break
            case 15:
                graphic.rect(b*30,c*30,25,25,4)
            break
            case 16:
                graphic.rect(b*30-6,c*30,8,20,4)
                graphic.rect(b*30+6,c*30,8,20,4)
            break
            case 17:
                graphic.rect(b*30,c*30-6,20,8,4)
                graphic.rect(b*30,c*30+6,20,8,4)
            break
            case 18:
                graphic.quad(b*30-12,c*30,b*30,c*30-12,b*30+12,c*30,b*30,c*30+12)
            break
            case 19:
                graphic.rect(b*30,c*30-9,22,4,4)
                graphic.rect(b*30,c*30+9,22,4,4)
                graphic.rect(b*30-9,c*30,4,22,4)
                graphic.rect(b*30+9,c*30,4,22,4)
            break
            case 20:
                graphic.rect(b*30,c*30,15,15,4)
                graphic.fill(255,0,0)
                graphic.rect(b*30,c*30,7.5,7.5,2)
            break
            case 21:
                graphic.rect(b*30,c*30,15,15,4)
                graphic.fill(0,0,255)
                graphic.rect(b*30,c*30,7.5,7.5,2)
            break
            case 22:
                graphic.rect(b*30,c*30,15,15,4)
                graphic.fill(0,255,0)
                graphic.rect(b*30,c*30,7.5,7.5,2)
            break
            case 23:
                graphic.noFill()
                graphic.stroke(160,160,120)
                graphic.strokeWeight(5)
                graphic.arc(b*30,c*30,15,15,0,180)
            break
            case 24:
                graphic.noFill()
                graphic.stroke(160,160,120)
                graphic.strokeWeight(5)
                graphic.arc(b*30,c*30,15,15,-180,0)
            break
        }
    }
    graphic.noStroke()
    graphic.fill()
    for(let a=0,la=list.length;a<la;a++){
        let b=list[a][0]
        let c=list[a][1]
        let d=list[a][2]
        switch(d){
            case 10:
                graphic.erase()
                graphic.rect(b*30,c*30,25,25,4)
                graphic.noErase()
            break
            case 11:
                graphic.erase()
                graphic.rect(b*30,c*30+15*(floor(random(0,2))*2-1),25,55,4)
                graphic.noErase()
            break
            case 12:
                graphic.erase()
                graphic.rect(b*30+15*(floor(random(0,2))*2-1),c*30,55,25,4)
                graphic.noErase()
            break
            case 14:
                graphic.erase()
                graphic.rect(b*30,c*30,40,40,4)
                graphic.noErase()
            break
        }
    }
    image(graphic,0,0,width,height)
    graphic=createGraphics(600,600)
    graphic.translate(300,300)
    graphic.noStroke()
    for(let a=0,la=10;a<la;a++){
        graphic.fill(255,130+a*5,0)
        graphic.ellipse(0,360,240-a*10,480-a*10)
    }
    for(let a=0,la=10;a<la;a++){
        graphic.fill(255,190+a*5,0)
        graphic.ellipse(0,0,400-a*10,400-a*10)
    }
    for(let a=0,la=10;a<la;a++){
        graphic.fill(255,100+a*5,0)
        graphic.ellipse(100,75,250-a*10,150-a*10)
    }
    for(let a=0,la=10;a<la;a++){
        graphic.fill(45-a*5)
        graphic.ellipse(25,-50,50-a*5,50-a*5)
        graphic.ellipse(150,-50,50-a*5,50-a*5)
    }
    for(let a=0,la=10;a<la;a++){
        graphic.stroke(45-a*5)
        graphic.strokeWeight(10-a)
        graphic.line(-20-a/2,75,220+a/2,75)
        graphic.line(80,30-a/2,80,50+a/2)
        graphic.line(160,30-a/2,160,50+a/2)
    }
    image(graphic,0,0,width,height)
}
function keyPressed(){
    if(key=='q'){
        saveCanvas()
    }
}