types={
    projectile:[
        {name:'',speed:0},
        {name:'Bumper',speed:0},

    ],body:[
        {
            name:'Duck',
            life:12,
        },
    ],unit:[
        {
            name:'Unarmed',
            life:1,
            speed:3,
            reload:30,
            damage:2,
            projectileType:'Bumper',
            range:20,
            size:12,
            region:15,
        },{
            name:'Infantry',
            life:1,
            speed:2,
            reload:60,
            damage:3,
            projectileType:'Bullet',
            range:200,
            size:12,
            region:15,
        },{
            name:'Light Machine Gun',
            life:1,
            speed:1,
            size:12,
            region:15,
        },{
            name:'Light Artillery',
            life:1,
            speed:1,
            size:12,
            region:15,
        },{
            name:'Medium Artillery',
            life:1,
            speed:1,
            size:12,
            region:15,
        },{
            name:'Police',
            life:1,
            speed:1,
            size:12,
            region:15,
        },{
            name:'Engineer',
            life:1,
            speed:1,
            size:12,
            region:15,
        },{
            name:'Light Antiair',
            life:1,
            speed:1,
            size:12,
            region:15,
        },{
            name:'Light Antitank',
            life:1,
            speed:1,
            size:12,
            region:15,
        },{
            name:'Light Mortar',
            life:1,
            speed:1,
            size:12,
            region:15,
        },
    ],template:[
        {
            name:'Separate Infantry Battalion',
            sub:[
                {variant:1,amount:8,body:'Duck',type:'Infantry'},
            ],
        },{
            name:'Separate Infantry Regiment',
            sub:[
                {variant:0,name:'I Infantry Battalion',sub:[
                    {variant:1,amount:8,body:'Duck',type:'Infantry'},
                ]},{variant:0,name:'II Infantry Battalion',sub:[
                    {variant:1,amount:8,body:'Duck',type:'Infantry'},
                ]},{variant:0,name:'III Infantry Battalion',sub:[
                    {variant:1,amount:8,body:'Duck',type:'Infantry'},
                ]},{variant:0,name:'Machine Gun Company',sub:[
                    {variant:1,amount:2,body:'Duck',type:'Light Machine Gun'},
                ]},
            ],
        },{
            name:'Light Division',
            sub:[
                {variant:0,name:'I Light Regiment',sub:[
                    {variant:0,name:'I Light Battalion',sub:[
                        {variant:1,amount:6,body:'Duck',type:'Infantry'},
                    ]},{variant:0,name:'II Light Battalion',sub:[
                        {variant:1,amount:6,body:'Duck',type:'Infantry'},
                    ]},{variant:0,name:'III Light Battalion',sub:[
                        {variant:1,amount:6,body:'Duck',type:'Infantry'},
                    ]},
                ]},{variant:0,name:'II Light Regiment',sub:[
                    {variant:0,name:'I Light Battalion',sub:[
                        {variant:1,amount:6,body:'Duck',type:'Infantry'},
                    ]},{variant:0,name:'II Light Battalion',sub:[
                        {variant:1,amount:6,body:'Duck',type:'Infantry'},
                    ]},{variant:0,name:'III Light Battalion',sub:[
                        {variant:1,amount:6,body:'Duck',type:'Infantry'},
                    ]},
                ]},{variant:0,name:'Artillery Battalion',sub:[
                        {variant:1,amount:1,body:'Duck',type:'Light Artillery'},
                ]},{variant:0,name:'Police Battalion',sub:[
                    {variant:1,amount:6,body:'Duck',type:'Police'},
                ]},{variant:0,name:'Engineer Company',sub:[
                    {variant:1,amount:2,body:'Duck',type:'Engineer'},
                ]},
            ],
        },{
            name:'Infantry Division',
            sub:[
                {variant:0,name:'I Infantry Regiment',sub:[
                    {variant:0,name:'I Infantry Battalion',sub:[
                        {variant:1,amount:8,body:'Duck',type:'Infantry'},
                    ]},{variant:0,name:'II Infantry Battalion',sub:[
                        {variant:1,amount:8,body:'Duck',type:'Infantry'},
                    ]},{variant:0,name:'III Infantry Battalion',sub:[
                        {variant:1,amount:8,body:'Duck',type:'Infantry'},
                    ]},{variant:0,name:'Machine Gun Company',sub:[
                        {variant:1,amount:2,body:'Duck',type:'Light Machine Gun'},
                    ]},
                ]},{variant:0,name:'II Infantry Regiment',sub:[
                    {variant:0,name:'I Infantry Battalion',sub:[
                        {variant:1,amount:8,body:'Duck',type:'Infantry'},
                    ]},{variant:0,name:'II Infantry Battalion',sub:[
                        {variant:1,amount:8,body:'Duck',type:'Infantry'},
                    ]},{variant:0,name:'III Infantry Battalion',sub:[
                        {variant:1,amount:8,body:'Duck',type:'Infantry'},
                    ]},{variant:0,name:'Machine Gun Company',sub:[
                        {variant:1,amount:2,body:'Duck',type:'Light Machine Gun'},
                    ]},
                ]},{variant:0,name:'Artillery Regiment',sub:[
                    {variant:0,name:'I Artillery Battalion',sub:[
                        {variant:1,amount:1,body:'Duck',type:'Light Artillery'},
                    ]},{variant:0,name:'II Artillery Battalion',sub:[
                        {variant:1,amount:1,body:'Duck',type:'Light Artillery'},
                    ]},{variant:0,name:'III Artillery Battalion',sub:[
                        {variant:1,amount:1,body:'Duck',type:'Medium Artillery'},
                    ]},{variant:0,name:'Antiair Battalion',sub:[
                        {variant:1,amount:1,body:'Duck',type:'Light Antiair'},
                    ]},
                ]},{variant:0,name:'I Police Regiment',sub:[
                    {variant:0,name:'I Police Battalion',sub:[
                        {variant:1,amount:6,body:'Duck',type:'Police'},
                    ]},{variant:0,name:'II Police Battalion',sub:[
                        {variant:1,amount:6,body:'Duck',type:'Police'},
                    ]},
                ]},{variant:0,name:'Mortar Battalion',sub:[
                    {variant:1,amount:1,body:'Duck',type:'Light Mortar'},
                ]},{variant:0,name:'Antitank Battalion',sub:[
                    {variant:1,amount:1,body:'Duck',type:'Light Antitank'},
                ]},{variant:0,name:'Engineer Battalion',sub:[
                    {variant:1,amount:6,body:'Duck',type:'Engineer'},
                ]},
            ],
        },{
            name:'Armored Division',
            sub:[
                {variant:0,name:'Tank Regiment',sub:[
                    {variant:0,name:'I Tank Battalion',sub:[
                        {variant:1,amount:2,body:'Duck',type:'Light Tank'},
                    ]},{variant:0,name:'II Tank Battalion',sub:[
                        {variant:1,amount:2,body:'Duck',type:'Light Tank'},
                    ]},
                ]},{variant:0,name:'Rapid Regiment',sub:[
                    {variant:0,name:'I Rapid Battalion',sub:[
                        {variant:1,amount:8,body:'Duck',type:'Rapid Infantry'},
                    ]},{variant:0,name:'II Rapid Battalion',sub:[
                        {variant:1,amount:8,body:'Duck',type:'Rapid Infantry'},
                    ]},{variant:0,name:'III Rapid Battalion',sub:[
                        {variant:1,amount:8,body:'Duck',type:'Rapid Infantry'},
                    ]},
                ]},{variant:0,name:'Artillery Regiment',sub:[
                    {variant:0,name:'I Artillery Battalion',sub:[
                        {variant:1,amount:1,body:'Duck',type:'Light Artillery'},
                    ]},{variant:0,name:'II Artillery Battalion',sub:[
                        {variant:1,amount:1,body:'Duck',type:'Light Artillery'},
                    ]},{variant:0,name:'Antiair Battalion',sub:[
                        {variant:1,amount:1,body:'Duck',type:'Light Antiair'},
                    ]},
                ]},{variant:0,name:'Engineer Company',sub:[
                    {variant:1,amount:2,body:'Duck',type:'Engineer'},
                ]},
            ],
        }
    ],
}
stage={scene:'battle',focus:{x:0,y:0,scale:1},scale:0}
game={speed:1,id:{formation:0},playerTeam:0}
inputs={key:[[false,false,false,false],[false,false,false,false]],mouse:{x:0,y:0},screen:{x:0,y:0},rel:{x:0,y:0}}
entities={factions:[],formations:[],units:[],projectiles:[],walls:[],scan:[]}
run={fore:[],life:[]}
graphics={main:null}
constants={trig:[[],[]]}
transition={trigger:false,anim:0,scene:stage.scene}