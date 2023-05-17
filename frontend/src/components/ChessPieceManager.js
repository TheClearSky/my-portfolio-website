import { Vector3 } from "@babylonjs/core";
import {PointerEventTypes} from '@babylonjs/core';
import { Chess } from 'chess.js';

export class ChessPieceManager
{
    convertnotation(fromtype,totype,value1,value2optional)
    {
        let locali,localj;
        switch(fromtype)
        {
            case this.notationtypes.local:
                locali=value1;
                localj=value2optional;
                break;
            case this.notationtypes.chessjscoordinates:
                locali=value2optional;
                localj=8-value1-1;
                break;
            case this.notationtypes.chessjsfen:
                let temp=this.convertnotationbound(this.notationtypes.chessjscoordinates,this.notationtypes.local,value1.charCodeAt(1)-"1".charCodeAt(0),value1.charCodeAt(0)-"a".charCodeAt(0));
                locali=temp[0];
                localj=temp[1];
                break;
        }
        switch(totype)
        {
            case this.notationtypes.local:
                return [locali,localj];
                break;
            case this.notationtypes.chessjscoordinates:
                return [8-localj-1,locali];
                break;
            case this.notationtypes.chessjsfen:
                let temp=this.convertnotationbound(this.notationtypes.local,this.notationtypes.chessjscoordinates,locali,localj);
                return String.fromCharCode(temp[1]+"a".charCodeAt(0),temp[0]+"1".charCodeAt(0));
                break;
        }
        

    }
    setfromboard(board)
    {
        for(let i=0;i<8;++i)
        {
            for(let j=0;j<8;++j)
            {
                let [locali,localj]=this.convertnotationbound(this.notationtypes.chessjscoordinates,this.notationtypes.local,i,j);
                if(board[i][j]!=null)
                {
                    let {type,color}=board[i][j];
                    
                    switch(type)
                    {
                        case 'p':
                            this.putpiecebound(locali,localj,this.piecetypes.pawn,(color=='w'));
                            break;
                        case 'r':
                            this.putpiecebound(locali,localj,this.piecetypes.rook,(color=='w'));
                            break;
                        case 'n':
                            this.putpiecebound(locali,localj,this.piecetypes.knight,(color=='w'));
                            break;
                        case 'b':
                            this.putpiecebound(locali,localj,this.piecetypes.bishop,(color=='w'));
                            break;
                        case 'q':
                            this.putpiecebound(locali,localj,this.piecetypes.queen,(color=='w'));
                            break;
                        case 'k':
                            this.putpiecebound(locali,localj,this.piecetypes.king,(color=='w'));
                            break;
                    }
                }
                else
                {
                    this.removepiecebound(locali,localj);
                }
            }
        }
    }
    setupdefaultboard()
    {
        this.chessgame=new Chess();
        this.setfromboardbound(this.chessgame.board());
    }
    constructor(originalwhitepieces,originalblackpieces,chessboardinstances,piecetypes,scene)
    {

        this.originalwhitepieces=originalwhitepieces;
        this.originalblackpieces=originalblackpieces;
        this.chessboardinstances=chessboardinstances;
        this.piecetypes=piecetypes;
        this.scene=scene;
        this.cells=[];
        this.fallvoidy=-50;

        this.selectedcelli=null;
        this.selectedcellj=null;
        for(let i=0;i<8;++i)
        {
            let nextrow=[];
            for(let j=0;j<8;++j)
            {
                let currlocation=chessboardinstances[i*8+j].instance.position;
                
                nextrow.push({
                    piece:null,
                    location:{
                    x:currlocation.x,
                    y:currlocation.y,
                    z:currlocation.z,
                    }
                });
            }
            this.cells.push(nextrow);
        }

        this.notationtypes={
            local:0,
            chessjscoordinates:1,
            chessjsfen:2
        }

        this.convertnotationbound=this.convertnotation.bind(this);
        this.setfromboardbound=this.setfromboard.bind(this);
        this.setupdefaultboardbound=this.setupdefaultboard.bind(this);
        this.updatechessboardlocationbound=this.updatechessboardlocation.bind(this);
        this.updatesinglecelllocationwithpiecebound=this.updatesinglecelllocationwithpiece.bind(this);
        this.piecefallanimationanddisposebound=this.piecefallanimationanddispose.bind(this);
        this.removepiecebound=this.removepiece.bind(this);
        this.putpiecebound=this.putpiece.bind(this);
        this.startlisteningbound=this.startlistening.bind(this);
        this.movepiecebound=this.movepiece.bind(this);
        this.handletileclickbound=this.handletileclick.bind(this);
        this.handlepiececlickbound=this.handlepiececlick.bind(this);
    }
    updatechessboardlocation()
    {
        for(let i=0;i<8;++i)
        {
            for(let j=0;j<8;++j)
            {
                let currlocation=this.chessboardinstances[i*8+j].instance.position;
                
                this.cells[i][j].location.x=currlocation.x;
                this.cells[i][j].location.y=currlocation.y+0.1;
                this.cells[i][j].location.z=currlocation.z;
            }
        }
    }
    updatesinglecelllocationwithpiece(i,j)
    {
        let currlocation=this.chessboardinstances[i*8+j].instance.position;
                
        this.cells[i][j].location.x=currlocation.x;
        this.cells[i][j].location.y=currlocation.y+0.1;
        this.cells[i][j].location.z=currlocation.z;

        let piece=this.cells[i][j].piece;
        if(piece!=null)
        {
            piece.position.x=this.cells[i][j].location.x;
            piece.position.y=this.cells[i][j].location.y;
            piece.position.z=this.cells[i][j].location.z;
        }
    }
    piecefallanimationanddispose(piece,localvar,functiontounregister)
    {
        if(piece.position.y>this.fallvoidy)
        {
            piece.position.y-=localvar.fallstep;
            localvar.fallstep+=0.001;
        }
        else
        {
            this.scene.unregisterBeforeRender(functiontounregister);
            piece.dispose();
        }
    }
    removepiece(i,j,animate=true)
    {
        let previouspiece=this.cells[i][j].piece;
        if(previouspiece!=null)
        {
            if(animate)
            {
                let boundtemp;
                boundtemp=temp.bind(this);
                let localvar={fallstep:0};
                function temp()
                {
                    this.piecefallanimationanddisposebound(previouspiece,localvar,boundtemp);
                }

                this.scene.registerBeforeRender(boundtemp);
            }
            else
            {
                previouspiece.dispose();
            }
            this.cells[i][j].piece=null;
        }
    }
    putpiece(i,j,type,iswhite,animated=true)
    {
        let currentcell=this.cells[i][j];
        this.removepiecebound(i,j,animated);
        if(iswhite)
        {
            this.cells[i][j].piece=this.originalwhitepieces[type].createInstance();
        }
        else
        {
            this.cells[i][j].piece=this.originalblackpieces[type].createInstance();
        }
        let currlocation=currentcell.location;
        this.cells[i][j].piece.position=new Vector3(currlocation.x,currlocation.y,currlocation.z);
    }
    movepiece(fromi,fromj,toi,toj,animated=true,speed=0.03)
    {
        if((fromi==toi)&&(fromj==toj)) return;
        if(this.cells[fromi][fromj]==null) return;
        this.removepiece(toi,toj,animated);
        let toLocation=this.cells[toi][toj].location;
        let fromLocation=this.cells[fromi][fromj].location;
        let pieceToMove=this.cells[fromi][fromj].piece;
        this.cells[fromi][fromj].piece=null;
        this.cells[toi][toj].piece=pieceToMove;
        let distanceistep=(toLocation.x-fromLocation.x)*speed;
        let distancejstep=(toLocation.z-fromLocation.z)*speed;
        let numberofiterationsleft=1/speed;
        let moveanimbound=moveanim.bind(this);
        function moveanim()
        {
            if(numberofiterationsleft>0)
            {
                pieceToMove.position.x+=distanceistep;
                pieceToMove.position.z+=distancejstep;
                --numberofiterationsleft;
            }
            else
            {
                pieceToMove.position.x=toLocation.x;
                pieceToMove.position.z=toLocation.z;
                this.scene.unregisterBeforeRender(moveanimbound);
            }
        }
        this.scene.registerBeforeRender(moveanimbound);
    }
    startlistening(scene)
    {
        this.clickobserver= scene.onPointerObservable.add(detechchessboardclick.bind(this));
        function detechchessboardclick(pointerInfo)
        {      		
            if ((pointerInfo.type==PointerEventTypes.POINTERDOWN)&&(pointerInfo.pickInfo.hit)) {
                let picked=pointerInfo.pickInfo.pickedMesh;
                this.chessboardinstances.forEach((ins,index)=>{
                    let i=(~~(index/8)); //integer division using normal division + bitwise operators
                    let j=index%8;
                    if(ins.instance==picked)
                    {
                        this.handletileclickbound(i,j);
                        return;
                    }
                })
                for(let i=0;i<8;++i)
                {
                    for(let j=0;j<8;++j)
                    {
                        if(this.cells[i][j].piece==picked)
                        {
                            this.handlepiececlickbound(i,j);
                            return;
                        }
                    }
                }
            }
        }
    }
    handletileclick(i,j)
    {
        this.putpiecebound(i,j,0,true);
    }
    handlepiececlick(i,j)
    {
        if(this.selectedcelli==null)
        {
            this.selectedcelli=i;
            this.selectedcellj=j;
        }
        else
        {
            this.movepiecebound(this.selectedcelli,this.selectedcellj,i,j);
            this.selectedcelli=null;
            this.selectedcellj=null;
        }
    }
} 