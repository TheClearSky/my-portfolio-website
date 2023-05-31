import { Vector3 } from "@babylonjs/core";
import {PointerEventTypes} from '@babylonjs/core';
import { Chess } from 'chess.js';

//Todo 
//Create animations of enpassent, queenside castle and kingside castle
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
                localj=(8-value1)-1;
                break;
            case this.notationtypes.chessjsfen:
                let temp=this.convertnotationbound(this.notationtypes.chessjscoordinates,this.notationtypes.local,value1.charCodeAt(1)-"1".charCodeAt(0),value1.charCodeAt(0)-"a".charCodeAt(0));
                locali=temp[0];
                localj=(8-temp[1])-1;
                break;
        }
        switch(totype)
        {
            case this.notationtypes.local:
                return [locali,localj];
                break;
            case this.notationtypes.chessjscoordinates:
                return [(8-localj)-1,locali];
                break;
            case this.notationtypes.chessjsfen:
                let temp=this.convertnotationbound(this.notationtypes.local,this.notationtypes.chessjscoordinates,locali,localj);
                return String.fromCharCode(temp[1]+"a".charCodeAt(0),(8-temp[0])+"0".charCodeAt(0));
                break;
        }
        

    }
    setfromboard(game,animated=true)
    {
        this.chessgame=game;
        let board=game.board();
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
                            this.putpiecebound(locali,localj,this.piecetypes.pawn,(color=='w'),animated);
                            break;
                        case 'r':
                            this.putpiecebound(locali,localj,this.piecetypes.rook,(color=='w'),animated);
                            break;
                        case 'n':
                            this.putpiecebound(locali,localj,this.piecetypes.knight,(color=='w'),animated);
                            break;
                        case 'b':
                            this.putpiecebound(locali,localj,this.piecetypes.bishop,(color=='w'),animated);
                            break;
                        case 'q':
                            this.putpiecebound(locali,localj,this.piecetypes.queen,(color=='w'),animated);
                            break;
                        case 'k':
                            this.putpiecebound(locali,localj,this.piecetypes.king,(color=='w'),animated);
                            break;
                    }
                }
                else
                {
                    this.removepiecebound(locali,localj,animated);
                }
            }
        }
        this.turn=game.turn();
    }
    setupdefaultboard(animated=true)
    {
        this.setfromboardbound(new Chess(),animated);
    }
    constructor(originalwhitepieces,originalblackpieces,chessboardinstances,piecetypes,whitebox,blackbox,whiteselectedbox,blackselectedbox,scene)
    {

        this.originalwhitepieces=originalwhitepieces;
        this.originalblackpieces=originalblackpieces;
        this.chessboardinstances=chessboardinstances;
        this.piecetypes=piecetypes;
        this.whitebox=whitebox;
        this.blackbox=blackbox;
        this.whiteselectedbox=whiteselectedbox;
        this.blackselectedbox=blackselectedbox;
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
                    piececolor:null,
                    higlighted:false,
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
        this.turn="w";
        this.highlightedcells=[];

        this.convertnotationbound=this.convertnotation.bind(this);
        this.setfromboardbound=this.setfromboard.bind(this);
        this.setupdefaultboardbound=this.setupdefaultboard.bind(this);
        this.updatechessboardlocationbound=this.updatechessboardlocation.bind(this);
        this.updatesinglecelllocationwithpiecebound=this.updatesinglecelllocationwithpiece.bind(this);
        this.piecefallanimationanddisposebound=this.piecefallanimationanddispose.bind(this);
        this.removepiecebound=this.removepiece.bind(this);
        this.removeallpiecesbound=this.removeallpieces.bind(this);
        this.putpiecebound=this.putpiece.bind(this);
        this.startlisteningbound=this.startlistening.bind(this);
        this.movepiecebound=this.movepiece.bind(this);
        this.handletileclickbound=this.handletileclick.bind(this);
        this.handlepiececlickbound=this.handlepiececlick.bind(this);
        this.highlightcellbound=this.highlightcell.bind(this);
        this.unhighlightcellbound=this.unhighlightcell.bind(this);
        this.updateboardselectionturnandstatusbound=this.updateboardselectionturnandstatus.bind(this);
    }
    updatechessboardlocation()
    {
        for(let i=0;i<8;++i)
        {
            for(let j=0;j<8;++j)
            {
                this.updatesinglecelllocationwithpiecebound(i,j);
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
            this.cells[i][j].piececolor=null;
        }
    }
    removeallpieces(animate=true)
    {
        for(let i=0;i<8;++i)
        {
            for(let j=0;j<8;++j)
            { 
                this.removepiecebound(i,j,animate);
            }
        }
    }
    putpiece(i,j,type,iswhite,animated=true)
    {
        let currentcell=this.cells[i][j];
        this.removepiecebound(i,j,animated);
        if(iswhite)
        {
            this.cells[i][j].piece=this.originalwhitepieces[type].createInstance();
            this.cells[i][j].piececolor="w";
        }
        else
        {
            this.cells[i][j].piece=this.originalblackpieces[type].createInstance();
            this.cells[i][j].piececolor="b";
        }
        let currlocation=currentcell.location;
        this.cells[i][j].piece.position=new Vector3(currlocation.x,currlocation.y,currlocation.z);
    }
    movepiece(fromi,fromj,toi,toj,animated=true,speed=0.03)
    {
        if((fromi==toi)&&(fromj==toj)) return;
        if(this.cells[fromi][fromj]==null) return;

        try
        {
            //validation of move
            let move = this.chessgame.move(
            {
                from: this.convertnotationbound(this.notationtypes.local,this.notationtypes.chessjsfen,fromi,fromj), 
                to: this.convertnotationbound(this.notationtypes.local,this.notationtypes.chessjsfen,toi,toj) 
            })
            
            if((move.flags=="e")||(move.flags=="q")||(move.flags=="k"))
            {
                this.setfromboardbound(this.chessgame,false);
                return;
            }
        }
        catch(err)
        {
            return;
        }

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
    stoplistening(scene)
    {
        scene.onPointerObservable.remove(this.clickobserver);
    }
    handletileclick(i,j)
    {
        if(this.selectedcelli!=null)
        {
            this.movepiecebound(this.selectedcelli,this.selectedcellj,i,j);
            this.selectedcelli=null;
            this.selectedcellj=null;
        }
        this.updateboardselectionturnandstatusbound();
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
        this.updateboardselectionturnandstatusbound();
    }
    highlightcell(i,j)
    {
        //if already highlighted, do nothing
        if(this.cells[i][j].higlighted) return;

        //set highlight flag to true
        this.cells[i][j].higlighted=true;

        //get current instance
        let currentinstance=this.chessboardinstances[i*8+j].instance;

        //make new instance
        let newinstance;
        if((i+j)%2==1)
        {
            newinstance=this.whiteselectedbox.createInstance("whiteselectedbox"+i.toString()+j.toString());
        }
        else
        {
            newinstance=this.blackselectedbox.createInstance("blackselectedbox"+i.toString()+j.toString());
        }

        //copy position and pivot point data from old instance to new instance
        newinstance.position.x=currentinstance.position.x;
        newinstance.position.y=currentinstance.position.y;
        newinstance.position.z=currentinstance.position.z;
        newinstance.setPivotPoint(currentinstance.getPivotPoint());

        //delete old instance and replace it with new instance
        currentinstance.dispose();
        this.chessboardinstances[i*8+j].instance=newinstance;

        //push this cell into list of highlighted cells
        this.highlightedcells.push([i,j]);
        
    }
    unhighlightcell(i,j)
    {
        //if already not highlighted, do nothing
        if(!(this.cells[i][j].higlighted)) return;

        //set highlight flag to false
        this.cells[i][j].higlighted=false;

        //get current instance
        let currentinstance=this.chessboardinstances[i*8+j].instance;

        //make new instance
        let newinstance;
        if((i+j)%2==1)
        {
            newinstance=this.whitebox.createInstance("whitebox"+i.toString()+j.toString());
        }
        else
        {
            newinstance=this.blackbox.createInstance("blackbox"+i.toString()+j.toString());
        }

        //copy position and pivot point data from old instance to new instance
        newinstance.position.x=currentinstance.position.x;
        newinstance.position.y=currentinstance.position.y;
        newinstance.position.z=currentinstance.position.z;
        newinstance.setPivotPoint(currentinstance.getPivotPoint());

        //delete old instance and replace it with new instance
        currentinstance.dispose();
        this.chessboardinstances[i*8+j].instance=newinstance;

        //delete this cell from the list of highlighted cells
        let indexofhighlightedcell=-1;
        this.highlightedcells.forEach(([loopi,loopj],index)=>{if((loopi==i)&&(loopj==j)){indexofhighlightedcell=index}});
        if(indexofhighlightedcell!=-1)
        {
            this.highlightedcells.splice(indexofhighlightedcell,1);
        }
    }
    updateboardselectionturnandstatus()
    {
        let highlightedcellstempcopy=[...this.highlightedcells];
        //creating a copy because the delete function itself modifies the array in forEach
        highlightedcellstempcopy.forEach(([i,j])=>this.unhighlightcellbound(i,j));
        if(this.selectedcelli!=null)
        {
            let possiblemoves=this.chessgame.moves(
                {
                    square: this.convertnotationbound(this.notationtypes.local,this.notationtypes.chessjsfen,this.selectedcelli,this.selectedcellj),
                    verbose:true 
                });
            this.highlightcellbound(this.selectedcelli,this.selectedcellj);
            possiblemoves.forEach(({to})=>{
                let [toi,toj]=this.convertnotationbound(this.notationtypes.chessjsfen,this.notationtypes.local,to);
                this.highlightcellbound(toi,toj);
            });
        }
    }
} 