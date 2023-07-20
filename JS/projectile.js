class projectile extends entity{
    constructor(layer,x,y,type,direction){
        super(layer,x,y)
        this.type=type
        this.direction=direction
        this.name=types.projectile[type].name
        this.speed=types.projectile[type].speed
        this.used=false
        this.fade=0
    }
    hit(type){
        switch(type){
            case 0:
                this.used=true
                this.speed=0
            break
        }
    }
    display(){
        this.layer.push()
        this.layer.translate(this.position.x,this.position.y)
        this.layer.rotate(this.direction)
        switch(this.name){
            case 'Bullet':
                this.layer.fill(40,this.fade)
                this.layer.rect(0,1)
            break
        }
        this.layer.pop()
    }
    update(){
        super.update()
        this.fade=smoothAnim(this.fade,!this.used,0,1,5)
        this.position.x+=lsin(this.direction)*this.speed
        this.position.y-=lcos(this.direction)*this.speed
        if(this.fade<=0&&this.used){
            this.remove=true
        }
    }
}