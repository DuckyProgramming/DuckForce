class unit extends entity{
    constructor(layer,team,parent,x,y,direction,body,type,offset){
        super(layer,x,y)
        this.team=team
        this.parent=parent
        this.direction=direction
        this.body=body
        this.offset=offset
        this.bodyStats={
            name:types.body[this.body].name,
            life:types.body[this.body].life,
        }
        this.type=type
        this.typeStats={
            name:types.unit[this.type].name,
            life:types.unit[this.type].life,
            speed:types.unit[this.type].speed,
            reload:types.unit[this.type].reload,
            damage:types.unit[this.type].damage,
            projectileType:types.unit[this.type].projectileType,
            accuracy:types.unit[this.type].accuracy,
            range:types.unit[this.type].range,
            size:types.unit[this.type].size,
            region:types.unit[this.type].region,
        }
        this.life=this.bodyStats.life*this.typeStats.life
        this.selected=false
        this.empty=false
        this.fade=0
        this.target={index:[-1,-1],position:{x:this.position.x,y:this.position.y}}
        this.anim={selected:0,weapon:{}}
        this.goal={direction:direction}
        this.base={life:this.life}
        this.collect={life:this.life}
        this.total={damage:0}
        this.effect={speed:0}
        this.timers={hit:0,heal:0,reload:this.typeStats.reload}
        this.firing=false
        switch(this.typeStats.name){
            case 'Infantry': case 'Light Machine Gun':
                this.anim.weapon={up:0,uptick:0}
            break
        }
        this.size=this.typeStats.size
        entities.units.push(this)
    }
    deSelect(){
        this.selected=false
    }
    calculateSpeed(distance){
        this.effect.speed=this.typeStats.speed*min(1.25,dist(this.position.x,this.position.y,this.target.position.x,this.target.position.y)/distance)
    }
    cancelTargetMove(){
        this.target.position.x=this.position.x
        this.target.position.y=this.position.y
    }
    setReload(){
        this.timers.reload=random(0,this.typeStats.reload)
        if(this.firing&&this.target.index[0]<entities.formations.length&&this.target.index[1]>=0&&this.target.index[1]<entities.formations[this.target.index[0]].subs.length&&entities.formations[this.target.index[0]].bottomLevel){
            this.target.position.x=entities.formations[this.target.index[0]].subs[this.target.index[1]].position.x
            this.target.position.y=entities.formations[this.target.index[0]].subs[this.target.index[1]].position.y
            this.goal.direction=atan2(this.target.position.x-this.position.x,this.position.y-this.target.position.y)
            this.timers.reload+=min(min(abs(this.direction-this.goal.direction),abs(this.direction-this.goal.direction-360)),abs(this.direction-this.goal.direction+360))/this.typeStats.speed
        }
    }
    hit(damage){
        this.life-=damage
        this.total.damage+=damage
        this.timers.heal=300
    }
    display(){
        this.layer.push()
        this.layer.translate(this.position.x,this.position.y)
        this.layer.rotate(this.direction)
        switch(this.team){
            case 0:
                this.layer.fill(100,150+this.anim.selected*105,255-this.anim.selected*155,this.fade*0.5)
            break
            case 1:
                this.layer.fill(255,100,100,this.fade*0.5)
            break
            case 2:
                this.layer.fill(255,255,100,this.fade*0.5)
            break
            case 3:
                this.layer.fill(255,100,255,this.fade*0.5)
            break
        }
        this.layer.ellipse(0,0,this.typeStats.region*2)
        switch(this.typeStats.name){
            case 'Infantry':
                this.layer.fill(50,this.fade)
                this.layer.rect(-8,-11+this.anim.weapon.up,3,9)
            break
            case 'Light Machine Gun':
                this.layer.fill(50,this.fade)
                this.layer.rect(-9,-11+this.anim.weapon.up,1,9)
                this.layer.rect(-7,-11+this.anim.weapon.up,1,9)
                this.layer.rect(-8,-9+this.anim.weapon.up,4,5)
            break
        }
        switch(this.bodyStats.name){
            case 'Duck':
                this.layer.fill(255,125,0,this.fade)
                this.layer.ellipse(0,-10,15,12)
                this.layer.fill(255,235,0,this.fade)
                switch(this.typeStats.name){
                    case 'Unarmed':
                    break
                }
                this.layer.ellipse(0,0,24,24)
                this.layer.fill(0,this.fade)
                this.layer.ellipse(-4,-7,3,3)
                this.layer.ellipse(4,-7,3,3)
                this.layer.rect(-3,-13.5,1,2)
                this.layer.rect(3,-13.5,1,2)
            break
        }
        this.layer.pop()
    }
    displayLife(){
        this.layer.push()
        this.layer.translate(this.position.x,this.position.y+this.typeStats.region+4)
        this.layer.fill(150,this.fade)
        this.layer.rect(0,0,20,4,3)
        if(this.collect.life>=this.life){
            this.layer.fill(240,0,0,this.fade)
            this.layer.rect((max(0,this.collect.life)/this.base.life)*10-10,0,(max(0,this.collect.life)/this.base.life)*20,1+min((max(0,this.collect.life)/this.base.life)*60,3),3)
            this.layer.fill(min(255,510-max(0,this.life)/this.base.life*510)-max(0,5-max(0,this.life)/this.base.life*30)*25,max(0,this.life)/this.base.life*510,0,this.fade)
            this.layer.rect((max(0,this.life)/this.base.life)*10-10,0,(max(0,this.life)/this.base.life)*20,1+min((max(0,this.life)/this.base.life)*60,3),3)
        }else if(this.collect.life<this.life){
            this.layer.fill(240,0,0,this.fade)
            this.layer.rect((max(0,this.life)/this.base.life)*10-10,0,(max(0,this.life)/this.base.life)*20,1+min((max(0,this.life)/this.base.life)*60,3),3)
            this.layer.fill(min(255,510-max(0,this.collect.life)/this.base.life*510)-max(0,5-max(0,this.collect.life)/this.base.life*30)*25,max(0,this.collect.life)/this.base.life*510,0,this.fade)
            this.layer.rect((max(0,this.collect.life)/this.base.life)*10-10,0,(max(0,this.collect.life)/this.base.life)*20,1+min((max(0,this.collect.life)/this.base.life)*60,3),3)
        }
        this.layer.pop()
    }
    update(){
        super.update()
        this.fade=smoothAnim(this.fade,this.life>0,0,1,5)
        this.collect.life=this.collect.life*0.9+this.life*0.1
        this.anim.selected=smoothAnim(this.anim.selected,this.selected,0,1,5)
        let value=directionValue(this.direction,this.goal.direction,this.typeStats.speed)
        switch(value){
            case 0:
                this.direction=this.goal.direction
            break
            case 1:
                this.direction+=this.typeStats.speed
            break
            case 2:
                this.direction-=this.typeStats.speed
            break
        }
        switch(this.typeStats.name){
            case 'Infantry':
                if(this.anim.weapon.upTick>0){
                    this.anim.weapon.upTick--
                    this.anim.weapon.up++
                }else if(this.anim.weapon.up>0){
                    this.anim.weapon.up-=0.2
                }
            break
            case 'Light Machine Gun':
                if(this.anim.weapon.upTick>0){
                    this.anim.weapon.upTick--
                    this.anim.weapon.up++
                }else if(this.anim.weapon.up>0){
                    this.anim.weapon.up-=0.5
                }
            break
        }
        if(this.timers.reload>0){
            this.timers.reload--
        }
        if(this.timers.hit>0){
            this.timers.hit--
        }
        if(this.timers.heal>0){
            this.timers.heal--
        }else if(this.life<this.base.life-this.total.damage/2){
            this.life=min(this.life+this.base.life/1800,this.base.life-this.total.damage/2)
        }
        if(this.firing){
            if(this.target.index[0]>=0){
                if(this.target.index[0]<entities.formations.length&&this.target.index[1]>=0&&this.target.index[1]<entities.formations[this.target.index[0]].subs.length&&entities.formations[this.target.index[0]].bottomLevel){
                    this.target.position.x=entities.formations[this.target.index[0]].subs[this.target.index[1]].position.x
                    this.target.position.y=entities.formations[this.target.index[0]].subs[this.target.index[1]].position.y
                    this.goal.direction=atan2(this.target.position.x-this.position.x,this.position.y-this.target.position.y)
                    if(this.timers.reload<=0){
                        switch(this.typeStats.name){
                            case 'Infantry': case 'Light Machine Gun':
                                this.anim.weapon.upTick=4
                                entities.projectiles.push(new projectile(this.layer,this.position.x+lcos(this.direction)*-8+lsin(this.direction)*6,this.position.y+lsin(this.direction)*-8-lcos(this.direction)*6,findName(this.typeStats.projectileType,types.projectile),this.typeStats.damage,this.direction+random(-this.typeStats.accuracy,this.typeStats.accuracy),this.team))
                            break
                        }
                        this.timers.reload=this.typeStats.reload
                    }
                    if(dist(this.position.x,this.position.y,this.target.position.x,this.target.position.y)>this.typeStats.range){
                        if(this.timers.hit>0){
                            this.position.x+=sin(this.goal.direction)*this.typeStats.speed*(this.typeStats.range<50?0.4:0)
                            this.position.y-=cos(this.goal.direction)*this.typeStats.speed*(this.typeStats.range<50?0.4:0)
                        }else{
                            this.position.x+=sin(this.goal.direction)*this.typeStats.speed*(this.typeStats.range<50?1:0.2)
                            this.position.y-=cos(this.goal.direction)*this.typeStats.speed*(this.typeStats.range<50?1:0.2)
                        }
                    }
                }else{
                    this.parent.assignNewTarget(this.parent.subs.indexOf(this))
                }
            }
        }else{
            if(dist(this.position.x,this.position.y,this.target.position.x,this.target.position.y)>this.typeStats.speed){
                this.goal.direction=atan2(this.target.position.x-this.position.x,this.position.y-this.target.position.y)
                this.position.x+=sin(this.goal.direction)*this.effect.speed
                this.position.y-=cos(this.goal.direction)*this.effect.speed
            }else if(this.parent.retreat){
                this.parent.retreat=false
            }
        }
        if(this.fade<=0&&this.life<=0){
            this.remove=true
        }
    }
    onClick(){
        if(dist(inputs.rel.x,inputs.rel.y,this.position.x,this.position.y)<=this.typeStats.region&&this.team==game.playerTeam){
            if(this.selected&&!this.parent.justSelected){
                this.parent.deSelect()
            }else{
                this.parent.select()
            }
            this.parent.anyOn()
        }
    }
    onClickNone(){}
    onKey(){}
}