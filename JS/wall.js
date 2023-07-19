class wall extends entity{
    constructor(layer,x,y,type,width,height){
        super(layer,x,y)
        this.type=type
        this.width=width
        this.height=height
        this.fade=1
        this.collide={position:{x:0,y:0},list:[entities.projectiles,entities.units]}
    }
    display(){
        this.layer.push()
        this.layer.translate(this.position.x,this.position.y)
        switch(this.type){
            case 1:
                this.layer.fill(40,this.fade)
                this.layer.rect(0,0,this.width,this.height)
            break
        }
        this.layer.pop()
    }
    update(){
        super.update()
        for(let a=0,la=this.collide.list.length;a<la;a++){
            for(let b=0,lb=this.collide.list[a].length;b<lb;b++){
                if(circleInsideBox(this,this.collide.list[a][b])&&!(a==0&&this.collide.list[a][b].speed==0)){
                    this.collide.position.x=circleCollideBox(this,this.collide.list[a][b]).x
                    this.collide.position.y=circleCollideBox(this,this.collide.list[a][b]).y
                    this.collide.list[a][b].position.x=this.collide.position.x
                    this.collide.list[a][b].position.y=this.collide.position.y
                    if(a==0){
                        this.collide.list[a][b].hit(0)
                    }
                }
            }
        }
    }
}