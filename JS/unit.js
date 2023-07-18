class unit extends entity{
    constructor(layer,x,y,direction,body,type){
        super(layer,x,y)
        this.direction=direction
        this.body=body
        this.bodyStats={
            name:types.body[this.body].name
        }
        this.type=type
        this.typeStats={
            name:types.unit[this.type].name
        }
        this.anim={}
        switch(this.typeStats.name){
            case 'Unarmed':
                
            break
        }
    }
    display(){
        this.layer.push()
        this.layer.translate(this.position.x,this.position.y)
        this.layer.rotate(this.direction)
        switch(this.typeStats.name){
            case 'Infantry':
            break
        }
        switch(this.bodyStats.name){
            case 'Duck':
                this.layer.fill(255,125,0)
                this.layer.ellipse(0,10,15,12)
                this.layer.fill(255,235,0)
                switch(this.typeStats.name){
                    case 'Unarmed':
                    break
                }
                this.layer.ellipse(0,0,24,24)
                this.layer.fill(0)
                this.layer.ellipse(-4,7,3,3)
                this.layer.ellipse(4,7,3,3)
                this.layer.rect(-3,13.5,1,2)
                this.layer.rect(3,13.5,1,2)
            break
        }
        this.layer.pop()
    }
    update(){
        super.update()
    }
}