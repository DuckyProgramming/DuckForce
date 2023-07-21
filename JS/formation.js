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
        this.total=0
        this.bottomLevel=true
        this.empty=false
        this.justSelected=false
        this.retreat=false
        this.target=-1
        this.fade=1
        this.id=game.id.formation;game.id.formation++
        this.goto={x:0,y:0}
        this.subs=[]
        this.offsets=[]
        for(let a=0,la=this.template.length;a<la;a++){
            let offset=[(this.stack*50)*lsin(this.direction),(this.stack*50)*lcos(this.direction)]
            if(this.template[a].variant==0){
                this.bottomLevel=false
                this.subs.push(new formation(this.layer,this.team,this,this.position.x+offset[0],this.position.y+offset[1],this.direction,this.template[a].sub,this.template[a].name,this.level+1,this.stack))
                this.total+=this.subs[a].total
                this.stack+=this.subs[a].total
            }else if(this.template[a].variant==1){
                for(let b=0,lb=this.template[a].amount;b<lb;b++){
                    let unitOffset=[0,0]
                    switch(lb){
                        case 2:
                            unitOffset=[-18+b*36,0]
                        break
                        case 3:
                            unitOffset=[-36+b*36,0]
                        break
                        case 4:
                            unitOffset=[-18+b%2*36,-18+floor(b/2)*36]
                        break
                        case 6:
                            unitOffset=[-36+b%3*36,-18+floor(b/3)*36]
                        break
                        case 8:
                            unitOffset=[-54+b%4*36,-18+floor(b/4)*36]
                        break
                    }
                    this.subs.push(new unit(this.layer,this.team,this,this.position.x+offset[0]+unitOffset[0]*lcos(this.direction)+unitOffset[1]*lsin(this.direction),this.position.y+offset[1]+unitOffset[0]*lsin(this.direction)-unitOffset[1]*lcos(this.direction),this.direction,findName(this.template[a].body,types.body),findName(this.template[a].type,types.unit),unitOffset))
                }
                this.total++
                this.stack++
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
        let total=[0,0,0]
        for(let a=0,la=this.subs.length;a<la;a++){
            if(!this.subs[a].empty){
                total[0]++
                total[1]+=this.subs[a].position.x
                total[2]+=this.subs[a].position.y
            }
        }
        if(total[0]>0){
            this.position.x=total[1]/total[0]
            this.position.y=total[2]/total[0]
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
                    this.parent.targetDown(a,entities.formations[a].position.x,entities.formations[a].position.y,this.id)
                }
            }
        }
    }
    targetDown(index,x,y,id){
        this.parent.targetDown(index,y,id)
        for(let a=0,la=this.subs.length;a<la;a++){
            if(this.subs[a].id!=id&&this.subs[a].target==-1&&!this.subs[a].empty&&dist(this.subs[a].position.x,this.subs[a].position.y,x,y)<900){
                this.subs[a].target=index
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
    display(){
        this.layer.push()
        this.layer.translate(this.reality.position.x,this.reality.position.y)
        this.layer.fill(100,this.fade*0.5)
        this.layer.stroke(50,this.fade*0.5)
        this.layer.strokeWeight(2)
        this.layer.quad(-5,0,0,-5,5,0,0,5)
        this.layer.pop()
        for(let a=0,la=this.subs.length;a<la;a++){
            this.subs[a].display()
        }
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
        this.reality.position.y=this.position.y*0.1+this.reality.position.y*0.9
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
                            this.parent.targetDown(a,entities.formations[a].position.x,entities.formations[a].position.y,this.id)
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