class unit extends entity{
    constructor(layer,x,y){
        super(layer,x,y)
    }
    display(){
        this.layer.push()
        this.layer.translate(this.position.x,this.position.y)
        this.layer.pop()
    }
    update(){
        super.update()
    }
}