class faction{
    constructor(layer,team){
        this.layer=layer
        this.team=team
        this.templates=[]
        this.subs=[]
        for(let a=0,la=types.faction[this.team].template.length;a<la;a++){
            this.templates.push(types.faction[team].template[a])
        }
        this.subs.push(new formation(this.layer,0,0,0,this.templates[0].sub,this.templates[0].name))
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