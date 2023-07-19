class formation extends entity{
    constructor(layer,parent,x,y,direction,template,name,level,stack){
        super(layer,x,y)
        this.parent=parent
        this.direction=direction
        this.template=template
        this.name=name
        this.level=level
        this.stack=stack
        this.total=0
        this.bottomLevel=true
        this.id=game.id.formation;game.id.formation++
        this.goto={x:0,y:0}
        this.subs=[]
        this.offsets=[]
        for(let a=0,la=this.template.length;a<la;a++){
            let offset=[(this.stack*50)*lsin(this.direction),(this.stack*50)*lcos(this.direction)]
            if(this.template[a].variant==0){
                this.bottomLevel=false
                this.subs.push(new formation(this.layer,this,this.position.x+offset[0],this.position.y+offset[1],this.direction,this.template[a].sub,this.template[a].name,this.level+1,this.stack))
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
                    this.subs.push(new unit(this.layer,this,this.position.x+offset[0]+unitOffset[0]*lcos(this.direction)+unitOffset[1]*lsin(this.direction),this.position.y+offset[1]+unitOffset[0]*lsin(this.direction)-unitOffset[1]*lcos(this.direction),this.direction,findName(this.template[a].body,types.body),findName(this.template[a].type,types.unit),unitOffset))
                }
                this.total++
                this.stack++
            }
        }
        if(this.bottomLevel){
            this.selected=false
        }
        entities.formations.push(this)
    }
    select(){
        this.selected=true
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
    display(){
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
        for(let a=0,la=this.subs.length;a<la;a++){
            this.subs[a].update()
            if(this.subs[a].remove){
                this.subs.splice(a,1)
                a--
                la--
            }
        }
    }
    onClick(){
        for(let a=0,la=this.subs.length;a<la;a++){
            this.subs[a].onClick()
        }
    }
    onClickNone(){
        if(this.bottomLevel&&this.selected){
            let total=[0,0]
            for(let a=0,la=this.subs.length;a<la;a++){
                total[0]+=this.subs[a].position.x
                total[1]+=this.subs[a].position.y
            }
            this.position.x=total[0]/this.subs.length
            this.position.y=total[1]/this.subs.length
            this.direction=atan2(inputs.rel.x-this.position.x,this.position.y-inputs.rel.y)
            this.goto=inputs.rel
            let totalArea=0
            for(let a=0,la=entities.formations.length;a<la;a++){
                if(dist(this.goto.x,this.goto.y,entities.formations[a].goto.x,entities.formations[a].goto.y)<50&&this.id!=entities.formations[a].id){
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
}