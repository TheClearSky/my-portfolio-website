
import { Vector3,Tools } from "@babylonjs/core";
import {clearcameraconstraints,setchesscameraconstraints } from './SceneManager.js';

// Todo
// Make this animations work for black too

//Todo
//Reset values when an animation ends in the else part, so it is reusable

//Todo
//Make the pieces pan in during the camerapan animation
export class gameStartAnimations
{
    constructor(trunk,canopy,instances,camera,chesspiecemanager,scene)
    {
        this.trunk=trunk;
        this.canopy=canopy;
        this.instances=instances;
        this.camera=camera;
        this.chesspiecemanager=chesspiecemanager;
        this.scene=scene;

        this.animationstage=0;

        //tree and chessboardfall
        this.voidy=-100
        this.fallstep=0;
        this.fallandrotatestep=0;

        //board rotation
        this.total=0;
        this.step=0.002;
        this.radiusincrease=15;
        this.initialoffset=5;
        this.boardrotationflag=false;
        this.movedowncamerastep=0
        this.cameramovedowntotal=0;

        //camera pan animation
        this.startx=-2.2;
        this.endx=4;
        this.y=1.2;
        this.z=-2.6;
        this.alpha=-4;
        this.beta=1.56;
        this.radius=4;
        this.currentanimation=0;
        this.movementspeed=0.02;

        //zoomout
        this.runonce=false;
        this.zoomintoz=2.4;
        this.radiusstart=2.7;
        this.radiusend=12;

        this.treefallbound=this.treefall.bind(this);
        this.chessboardfallbound=this.chessboardfall.bind(this);
        this.boardrotationbound=this.boardrotation.bind(this);
        this.camerapananimationbound=this.camerapananimation.bind(this);
        this.zoomoutbound=this.zoomout.bind(this);
    }
    playnextstage()
    {
        switch(this.animationstage)
        {
            case 0:
                this.scene.registerBeforeRender(this.treefallbound);
                this.scene.registerBeforeRender(this.chessboardfallbound);
                ++this.animationstage;
                break;
            case 1:
                this.canopy.isVisible=false;
                this.trunk.isVisible=false;
                this.scene.unregisterBeforeRender(this.treefallbound);
                this.scene.unregisterBeforeRender(this.chessboardfallbound);
                clearcameraconstraints(this.camera);

                this.setcameraforchessboardanimation();
                this.scene.registerBeforeRender(this.boardrotationbound);
                this.chesspiecemanager.updatechessboardlocation();
                this.chesspiecemanager.putpiece(4,4,this.chesspiecemanager.piecetypes.king,true);
                this.chesspiecemanager.putpiece(3,3,this.chesspiecemanager.piecetypes.king,false);
                ++this.animationstage;
                break;
            case 2:
                this.scene.unregisterBeforeRender(this.boardrotationbound);
                this.chesspiecemanager.updatechessboardlocation();
                this.chesspiecemanager.setupdefaultboardbound();
                this.scene.registerBeforeRender(this.camerapananimationbound);
                ++this.animationstage;
                break;
            case 3:
                this.scene.unregisterBeforeRender(this.camerapananimationbound);
                this.scene.registerBeforeRender(this.zoomoutbound);
                ++this.animationstage;
                break;
            case 4:
                this.scene.unregisterBeforeRender(this.zoomoutbound);
                setchesscameraconstraints(this.camera);
                this.camera.attachControl(null);
                this.chesspiecemanager.updatechessboardlocation();
                
                this.chesspiecemanager.startlistening(this.scene);
                ++this.animationstage;
                break;
        }
    }

    
    treefall()
    {
        if(this.canopy.position.y>this.voidy)
        {
            this.canopy.position.y-=this.fallstep;
            this.trunk.position.y-=this.fallstep;
            this.fallstep+=0.015;
        }
        else
        {
            this.canopy.isVisible=false;
            this.trunk.isVisible=false;
        }
    }


    chessboardfall()
    {
        if(this.instances[0].instance.position.y>this.voidy)
        {
            this.instances.forEach(ins=>{
                let {instance}=ins;
                instance.position.y-=this.fallandrotatestep;
                instance.position.z+=0.015;
                instance.rotation.x-=0.02;
            });
            this.fallandrotatestep+=0.014;
        }
        else
        {
            this.playnextstage();
        }
    }


    setcameraforchessboardanimation()
    {
        this.camera.detachControl();
        this.camera.alpha=Tools.ToRadians(-90);
        this.camera.beta=Tools.ToRadians(135);
        this.camera.radius=10;
        this.camera.target=Vector3.Zero();

        this.instances.forEach(ins=>{
            let {instance}=ins;
            
            instance.rotation.y=Tools.ToRadians(0);
            instance.rotation.x=Tools.ToRadians(0);
            instance.rotation.z=Tools.ToRadians(0);
            
            instance.scaling=new Vector3(1,1,1);
        });
        
        this.instances.forEach(ins=>{
            let {instance,distance,i,j}=ins;
            instance.position=new Vector3(i,-distance,j);
        });
    }

 
    boardrotation() {
        if(this.boardrotationflag===false)
        {
            this.camera.target.y+=this.initialoffset;
            this.boardrotationflag=true;
        }
        if(this.cameramovedowntotal<this.initialoffset)
        {
            this.cameramovedowntotal+=this.movedowncamerastep;
            this.camera.target.y-=this.movedowncamerastep;
            this.movedowncamerastep+=0.01;
        }
        if(this.total<1)
        {
            this.instances.forEach(ins=>{
                let {instance,distance}=ins;
                instance.position.addInPlaceFromFloats(0,this.step*distance,0);
            })
            this.chesspiecemanager.updatesinglecelllocationwithpiecebound(3,3);
            this.chesspiecemanager.updatesinglecelllocationwithpiecebound(4,4);
            this.camera.alpha+=this.step*Tools.ToRadians(360);
            //for black
            // camera.alpha-=step*Tools.ToRadians(360);
            this.camera.beta-=this.step*Tools.ToRadians(80);
            if(this.total<0.5)
            {
                this.camera.radius+=this.step*this.radiusincrease;
            }
            else
            {
                this.camera.radius-=this.step*this.radiusincrease;
            }
            this.total+=this.step;
            this.step*=0.9983;
        }
        else
        {
            this.playnextstage();
        }
    }

    
    camerapananimation()
    {
        if(this.currentanimation==0)
        {
            //flip z and alpha for black
            // {
            //     z=-z;
            //     alpha=-alpha;
            // }
            this.camera.target=new Vector3(this.startx,this.y,this.z);
            this.camera.alpha=this.alpha;
            this.camera.beta=this.beta;
            this.camera.radius=this.radius;
            ++this.currentanimation;
        }
        else if(this.currentanimation==1)
        {
            if(this.camera.target.x<this.endx)
            {
                this.camera.target.x+=this.movementspeed;
            }
            else
            {
                this.camera.target= new Vector3(this.startx,this.y,-this.z);
                this.camera.alpha=-this.alpha;
                ++this.currentanimation;
            }
        }
        else if(this.currentanimation==2)
        {
            if(this.camera.target.x<this.endx)
            {
                this.camera.target.x+=this.movementspeed;
            }
            else
            {
                this.playnextstage();
            }
        }
    }

    
    zoomout()
    {
        if(!this.runonce)
        {
            this.runonce=true;
            //for black
            //zoomintoz=-zoomintoz
            this.camera.target=new Vector3(0,0,this.zoomintoz);
            //for black
            //camera.alpha=Tools.ToRadians(90);
            this.camera.alpha=Tools.ToRadians(-90);
            this.camera.beta=1.2;
            this.camera.radius=this.radiusstart;
        }
        else if(this.camera.radius<this.radiusend)
        {
            this.camera.radius+=0.02;
        }
        else
        {
            this.playnextstage();
        }
    }
}