class faction{
    constructor(layer,team){
        this.layer=layer
        this.team=team
        this.templates=[]
        this.subs=[]
        for(let a=0,la=types.faction[this.team].template.length;a<la;a++){
            this.templates.push(types.faction[team].template[a])
        }
        let spawn=0
        this.subs.push(new formation(this.layer,this,0,0,0,this.templates[spawn].sub,this.templates[spawn].name,0,0))
    }
    deSelect(){
        for(let a=0,la=this.subs.length;a<la;a++){
            this.subs[a].deSelect()
        }
    }
    anyOn(){
        this.any=true
    }
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
}