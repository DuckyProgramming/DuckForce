class projectile extends entity{
    constructor(layer,x,y,type){
        super(layer,x,y)
        this.type=type
        this.name=types.projectile[type].name
    }
    display(){
        this.layer.push()
        this.layer.translate(this.position.x,this.position.y)
        switch(this.name){
        }
        this.layer.pop()
    }
    update(){
    }
}