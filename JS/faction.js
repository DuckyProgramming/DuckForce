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
                spawn=0
                this.subs.push(new formation(this.layer,this.team,this,0,this.team*600,0,this.templates[spawn].sub,this.templates[spawn].name,0,0))
            break
            default:
                spawn=0
                this.subs.push(new formation(this.layer,this.team,this,0,this.team*600,0,this.templates[spawn].sub,this.templates[spawn].name,0,0))
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
    targetDown(index,x,y,id){
        for(let a=0,la=this.subs.length;a<la;a++){
            if(this.subs[a].bottomLevel&&this.subs[a].id!=id&&this.subs[a].target==-1&&!this.subs[a].empty&&dist(this.subs[a].position.x,this.subs[a].position.y,x,y)<900){
                this.subs[a].instantTarget(index)
            }
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