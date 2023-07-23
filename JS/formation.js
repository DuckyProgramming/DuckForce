class formation extends entity{
    constructor(layer,team,parent,x,y,direction,template,name,level,stack){
        super(layer,x,y)
        this.team=team
        this.parent=parent
        this.direction=direction
        this.template=template
        this.name=name
        this.level=level
        this.stack=stack
        this.bottomLevel=true
        this.empty=false
        this.justSelected=false
        this.retreat=false
        this.target=-1
        this.fade=1
        this.id=game.id.formation;game.id.formation++
        this.goto={x:0,y:0}
        this.total=[0,0,0]
        this.subs=[]
        this.offsets=[]
        this.regiments=0
        this.regimentCounter=0
        this.holdStack=0
        let allspawns=[]
        let offset=[this.stack*game.stepDist*lsin(this.direction),this.stack*game.stepDist*lcos(this.direction)]
        for(let a=0,la=this.template.length;a<la;a++){
            if(this.template[a].variant==0&&this.template[a].name.includes('Regiment')&&!this.template[a].name.includes('Headquarters')){
                this.regiments++
            }
        }
        for(let a=0,la=this.template.length;a<la;a++){
            if(this.template[a].variant==0){
                this.bottomLevel=false
                if(this.template[a].name.includes('Regiment')&&!this.template[a].name.includes('Headquarters')){
                    this.subs.push(new formation(this.layer,this.team,this,this.position.x+(-this.regiments/2+1/2+this.regimentCounter)*200*lcos(this.direction),this.position.y-(-this.regiments/2+1/2+this.regimentCounter)*200*lsin(this.direction),this.direction,this.template[a].sub,this.template[a].name,this.level+1,this.stack))
                    this.regimentCounter++
                }else{
                    this.subs.push(new formation(this.layer,this.team,this,this.position.x,this.position.y,this.direction,this.template[a].sub,this.template[a].name,this.level+1,this.stack))
                }
                if(!(this.template[a].name.includes('Regiment')&&!this.template[a].name.includes('Headquarters')&&this.regiments>this.regimentCounter)){
                    this.stack=max(this.holdStack,this.subs[this.subs.length-1].stack)
                    this.holdStack=0
                }else{
                    this.holdStack=max(this.holdStack,this.subs[this.subs.length-1].stack)
                }
            }else if(this.template[a].variant==1){
                for(let b=0,lb=this.template[a].amount;b<lb;b++){
                    allspawns.push([this.template[a].body,this.template[a].type])
                }
            }
        }
        if(allspawns.length>0){
            let length=1
            switch(allspawns.length){
                case 4:
                    length=2
                break
                case 6:
                    length=2
                break
                case 8:
                    length=2
                break
            }
            this.stack+=length+0.5
            for(let a=0,la=allspawns.length;a<la;a++){
                let unitOffset=[0,0]
                switch(la){
                    case 2:
                        unitOffset=[-18+a*36,0]
                    break
                    case 3:
                        unitOffset=[-36+a*36,0]
                    break
                    case 4:
                        unitOffset=[-18+a%2*36,-18+floor(a/2)*36]
                    break
                    case 6:
                        unitOffset=[-36+a%3*36,-18+floor(a/3)*36]
                    break
                    case 8:
                        unitOffset=[-54+a%4*36,-18+floor(a/4)*36]
                    break
                }
                this.subs.push(new unit(this.layer,this.team,this,this.position.x+offset[0]+unitOffset[0]*lcos(this.direction)+unitOffset[1]*lsin(this.direction)-(length-2)*game.stepDist/2*lsin(this.direction),this.position.y+offset[1]+unitOffset[0]*lsin(this.direction)+unitOffset[1]*lcos(this.direction)+(length-2)*game.stepDist/2*lcos(this.direction),this.direction,findName(allspawns[a][0],types.body),findName(allspawns[a][1],types.unit),unitOffset))
            }
        }
        if(this.bottomLevel){
            this.selected=false
        }
        this.setPosition()
        this.reality={position:{x:this.position.x,y:this.position.y}}
        entities.formations.push(this)
    }
    setPosition(){
        this.total=[0,0,0]
        for(let a=0,la=this.subs.length;a<la;a++){
            if(!this.subs[a].empty){
                this.total[0]++
                this.total[1]+=this.subs[a].reality.position.x
                this.total[2]+=this.subs[a].reality.position.y
            }
        }
        if(this.total[0]>0){
            this.position.x=this.total[1]/this.total[0]
            this.position.y=this.total[2]/this.total[0]
        }
    }
    select(){
        this.selected=true
        this.justSelected=true
        for(let a=0,la=this.subs.length;a<la;a++){
            this.subs[a].selected=true
        }
    }
    deSelect(){
        this.selected=false
        for(let a=0,la=this.subs.length;a<la;a++){
            this.subs[a].deSelect()
        }
    }
    anyOn(){
        this.parent.anyOn()
    }
    getRandomSub(){
        let list=[]
        for(let a=0,la=this.subs.length;a<la;a++){
            if(this.subs[a].life>0){
                list.push(a)
            }
        }
        if(list.length==0){
            return -1
        }
        return list[floor(random(0,list.length))]
    }
    broadcastDeath(formation,index){
        for(let a=0,la=this.subs.length;a<la;a++){
            if(this.subs[a].target.index[0]==formation&&this.subs[a].target.index[1]==index){
                this.subs[a].target.index[1]=entities.formations[formation].getRandomSub()
            }else if(this.subs[a].target.index[0]==formation&&this.subs[a].target.index[1]>index){
                this.subs[a].target.index[1]--
            }
        }
    }
    broadcastComplete(formation,team){
        for(let a=0,la=this.subs.length;a<la;a++){
            if(this.subs[a].target.index[0]==formation){
                this.subs[a].target.index[0]=-1
                this.subs[a].cancelTargetMove()
                this.subs[a].firing=false
            }
        }
        if(this.target==formation){
            this.target=-1
            for(let a=0,la=entities.formations.length;a<la;a++){
                if(dist(this.position.x,this.position.y,entities.formations[a].position.x,entities.formations[a].position.y)<600&&entities.formations[a].team==team&&entities.formations[a].bottomLevel&&!entities.formations[a].empty){
                    this.target=a
                    this.parent.targetDown(a,entities.formations[a].position.x,entities.formations[a].position.y,this.position.x,this.position.y,this.id)
                }
            }
        }
    }
    targetDown(index,x,y,x2,y2,id){
        this.parent.targetDown(index,x,y,x2,y2,id)
        for(let a=0,la=this.subs.length;a<la;a++){
            if(this.subs[a].id!=id&&this.subs[a].target==-1&&!this.subs[a].empty&&(dist(this.subs[a].position.x,this.subs[a].position.y,x,y)<900||dist(this.subs[a].position.x,this.subs[a].position.y,x2,y2)<300)){
                this.subs[a].target=index
            }
        }
    }
    targetDownLevel(index,x,y,x2,y2,id){
        if(!this.bottomLevel){
            for(let a=0,la=this.subs.length;a<la;a++){
                if(this.subs[a].bottomLevel&&this.subs[a].id!=id&&this.subs[a].target==-1&&!this.subs[a].empty&&(dist(this.subs[a].position.x,this.subs[a].position.y,x,y)<900||dist(this.subs[a].position.x,this.subs[a].position.y,x2,y2)<300)){
                    this.subs[a].target=index
                }else{
                    this.subs[a].targetDownLevel(index,x,2,x2,y2,id)
                }
            }
        }
    }
    checkEmptiness(){
        let total=0
        for(let a=0,la=this.subs.length;a<la;a++){
            if(this.subs[a].empty){
                total++
            }
        }
        if(total>=this.subs.length){
            this.empty=true
            this.parent.checkEmptiness()
        }
    }
    assignNewTarget(index){
        if(this.target<0||entities.formations[this.target].empty){
            this.subs[index].firing=false
        }else{
            this.subs[index].target.index[0]=this.target
            this.subs[index].target.index[1]=entities.formations[this.target].getRandomSub()
        }
    }
    buff(type,effect){
        for(let a=0,la=this.subs.length;a<la;a++){
            this.subs[a].buff(type,effect)
        }
    }
    display(){
        for(let a=0,la=this.subs.length;a<la;a++){
            this.subs[a].display()
        }
        this.layer.push()
        this.layer.translate(this.reality.position.x,this.reality.position.y)
        this.layer.fill(100,this.fade*0.5)
        this.layer.stroke(50,this.fade*0.5)
        this.layer.strokeWeight(2)
        this.layer.quad(-5,0,0,-5,5,0,0,5)
        this.layer.noStroke()
        this.layer.fill(0,this.fade*0.75)
        this.layer.textSize(8)
        this.layer.text(this.name,0,10)
        this.layer.pop()
    }
    displayLife(){
        for(let a=0,la=this.subs.length;a<la;a++){
            this.subs[a].displayLife()
        }
    }
    update(){
        super.update()
        this.fade=smoothAnim(this.fade,!this.empty,0,1,5)
        for(let a=0,la=this.subs.length;a<la;a++){
            this.subs[a].update()
            if(this.subs[a].remove){
                for(let b=0,lb=entities.formations.length;b<lb;b++){
                    if(entities.formations[b].bottomLevel){
                        if(this.subs.length==1){
                            entities.formations[b].broadcastComplete(entities.formations.indexOf(this),this.team)
                            this.empty=true
                            this.parent.checkEmptiness()
                        }else{
                            entities.formations[b].broadcastDeath(entities.formations.indexOf(this),a)
                        }
                    }
                }
                this.subs.splice(a,1)
                a--
                la--
            }
        }
        this.setPosition()
        this.reality.position.x=this.position.x*0.1+this.reality.position.x*0.9
        this.reality.position.y=(this.position.y+(this.subs.length%2==1||this.total[0]%2==1?25:0))*0.1+this.reality.position.y*0.9
        if(this.bottomLevel){
            if(this.target>=0){
                for(let a=0,la=this.subs.length;a<la;a++){
                    if(this.subs[a].target.index[0]<0){
                        this.subs[a].target.index=[this.target,entities.formations[this.target].getRandomSub()]
                        if(!this.subs[a].firing){
                            this.subs[a].firing=true
                            this.subs[a].setReload()
                        }
                    }
                }
                if(dist(this.position.x,this.position.y,entities.formations[this.target].position.x,entities.formations[this.target].position.y)>450){
                    this.target=-1
                    for(let a=0,la=this.subs.length;a<la;a++){
                        if(this.subs[a].firing){
                            this.subs[a].target.index[0]=-1
                            this.subs[a].firing=false
                        }
                    }
                }
            }
            else{
                if(this.time%5==0&&!this.retreat){
                    for(let a=0,la=entities.formations.length;a<la;a++){
                        if(dist(this.position.x,this.position.y,entities.formations[a].position.x,entities.formations[a].position.y)<300&&entities.formations[a].team!=this.team&&entities.formations[a].bottomLevel&&!entities.formations[a].empty){
                            this.target=a
                            this.parent.targetDown(a,entities.formations[a].position.x,entities.formations[a].position.y,this.position.x,this.position.y,this.id)
                        }
                    }
                }
            }
        }
    }
    onClick(){
        for(let a=0,la=this.subs.length;a<la;a++){
            this.subs[a].onClick()
        }
        this.justSelected=false
    }
    onClickNone(){
        if(this.bottomLevel&&this.selected&&!this.empty){
            if(this.target>=0){
                this.target=-1
                this.retreat=true
                for(let a=0,la=this.subs.length;a<la;a++){
                    if(this.subs[a].firing){
                        this.subs[a].target.index[0]=-1
                        this.subs[a].firing=false
                    }
                }
            }
            this.direction=atan2(inputs.rel.x-this.position.x,this.position.y-inputs.rel.y)
            this.goto=inputs.rel
            let totalArea=0
            for(let a=0,la=entities.formations.length;a<la;a++){
                if(dist(this.goto.x,this.goto.y,entities.formations[a].goto.x,entities.formations[a].goto.y)<50&&this.id!=entities.formations[a].id&&entities.formations[a].selected&&entities.formations[a].bottomLevel){
                    totalArea++
                }
            }
            if(totalArea>0){
                let direction=random(0,360)
                this.goto.x+=lsin(direction)*sqrt(totalArea)*50
                this.goto.y+=lsin(direction)*sqrt(totalArea)*50
            }
            let distance=dist(this.position.x,this.position.y,this.goto.x,this.goto.y)
            this.position.x=this.goto.x
            this.position.y=this.goto.y
            for(let a=0,la=this.subs.length;a<la;a++){
                if(lcos(this.direction)<0){
                    this.subs[a].target.position.x=-lcos(this.direction)*this.subs[a].offset[0]-lsin(this.direction)*this.subs[a].offset[1]+this.position.x
                    this.subs[a].target.position.y=-lsin(this.direction)*this.subs[a].offset[0]+lcos(this.direction)*this.subs[a].offset[1]+this.position.y
                }else{
                    this.subs[a].target.position.x=lcos(this.direction)*this.subs[a].offset[0]+lsin(this.direction)*this.subs[a].offset[1]+this.position.x
                    this.subs[a].target.position.y=lsin(this.direction)*this.subs[a].offset[0]-lcos(this.direction)*this.subs[a].offset[1]+this.position.y
                }
                this.subs[a].calculateSpeed(distance)
            }
        }else if(!this.bottomLevel){
            for(let a=0,la=this.subs.length;a<la;a++){
                this.subs[a].onClickNone()
            }
        }
    }
    onKey(key,code){
        for(let a=0,la=this.subs.length;a<la;a++){
            this.subs[a].onKey(key,code)
        }
        if(code==BACKSPACE&&this.bottomLevel&&this.selected){
            this.selected=false
            for(let a=0,la=this.subs.length;a<la;a++){
                this.subs[a].selected=false
            }
        }
    }
}