class formation extends entity{
    constructor(layer,x,y,direction,template,name){
        super(layer,x,y)
        this.direction=direction
        this.template=template
        this.name=name
        this.subs=[]
        for(let a=0,la=this.template.length;a<la;a++){
            if(this.template[a].variant==0){
                this.subs.push(new formation(this.layer,this.position.x,this.position.y,this.direction,this.template[a].sub,this.template[a].name))
            }else if(this.template[a].variant==1){
                for(let b=0,lb=this.template[a].amount;b<lb;b++){
                    switch(lb){
                        case 1:
                            this.subs.push(new unit(this.layer,this.position.x,this.position.y,this.direction,findName(this.template[a].body,types.body),findName(this.template[a].type,types.unit)))
                        break
                    }
                }
            }
        }
    }
    display(){
        for(let a=0,la=this.subs.length;a<la;a++){
            this.subs[a].display()
        }
    }
    update(){
        for(let a=0,la=this.subs.length;a<la;a++){
            this.subs[a].update()
            if(this.subs[a].remove){
                this.subs.splice(a,1)
                a--
                la--
            }
        }
    }
}