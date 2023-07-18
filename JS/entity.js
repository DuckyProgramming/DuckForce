class entity{
    constructor(layer,x,y){
        this.layer=layer
        this.position={x:x,y:y}
        this.time=0
        this.remove=false
    }
    update(){
        this.time++
    }
}