class faction{
    constructor(layer,team){
        this.layer=layer
        this.team=team
        this.templates=[]
        this.subs=[]
        for(let a=0,la=types.template.length;a<la;a++){
            this.templates.push(types.template[a])
        }
        let spawn
        switch(this.team){
            case 0: case 1:
                spawn=2
                this.subs.push(new formation(this.layer,this.team,this,0,this.team*720,0,this.templates[spawn].sub,this.templates[spawn].name,0,0))
            break
            default:
                spawn=0
                this.subs.push(new formation(this.layer,this.team,this,0,this.team*720,0,this.templates[spawn].sub,this.templates[spawn].name,0,0))
            break
        }
    }
    deSelect(){
        for(let a=0,la=this.subs.length;a<la;a++){
            this.subs[a].deSelect()
        }
    }
    anyOn(){
        this.any=true
    }
    targetDown(index,x,y,x2,y2,id){
        for(let a=0,la=this.subs.length;a<la;a++){
            if(this.subs[a].bottomLevel&&this.subs[a].id!=id&&this.subs[a].target==-1&&!this.subs[a].empty&&(dist(this.subs[a].position.x,this.subs[a].position.y,x,y)<900||dist(this.subs[a].position.x,this.subs[a].position.y,x2,y2)<300)){
                this.subs[a].target=index
            }else{
                this.subs[a].targetDownLevel(index,x,2,x2,y2,id)
            }
        }
    }
    buff(type,effect){
        for(let a=0,la=this.subs.length;a<la;a++){
            this.subs[a].buff(type,effect)
        }
    }
    checkEmptiness(){}
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
        this.any=false
        for(let a=0,la=this.subs.length;a<la;a++){
            this.subs[a].onClick()
        }
        if(!this.any){
            for(let a=0,la=this.subs.length;a<la;a++){
                this.subs[a].onClickNone()
            }
        }
    }
    onKey(key,code){
        for(let a=0,la=this.subs.length;a<la;a++){
            this.subs[a].onKey(key,code)
        }
    }
}