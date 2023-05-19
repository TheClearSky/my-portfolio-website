import {Color3,Color4,Vector3,Tools,EngineInstrumentation,ArcRotateCamera,HemisphericLight,SceneLoader,NodeMaterial,GlowLayer,MeshBuilder,PointerEventTypes} from '@babylonjs/core';
import "@babylonjs/loaders";
import {setoffsetx,setoffsety} from './DrawStars.js';
import { ChessPieceManager } from './ChessPieceManager.js';
import { gameStartAnimations } from './GameStartAnimation.js';

function setnight(lights)
{
    lights.forEach(light=>
    {
        light.diffuse=new Color3(14/255,28/255,97/255);
        light.groundColor = new Color3(5/255,15/255,41/255);
        light.intensity=1.5;
    })
    
}
function setday(lights)
{
    lights.forEach(light=>
    {
        light.diffuse=new Color3(26/255,26/255,19/255);
        light.groundColor = new Color3(240/255,226/255,199/255);
    })
}
export function clearcameraconstraints(camera)
{
    camera.lowerRadiusLimit=null;
    camera.upperRadiusLimit=null;
    camera.lowerBetaLimit = null;
    camera.upperBetaLimit = null;
    camera.lowerAlphaLimit = null;
    camera.upperAlphaLimit = null;
}
export function setchesscameraconstraints(camera)
{
    camera.lowerRadiusLimit = 10;
    camera.upperRadiusLimit = 25;
    camera.upperBetaLimit = Tools.ToRadians(135);
}
export function setdefaultcameraconstraints(camera)
{
    camera.lowerRadiusLimit = 28;
    camera.upperRadiusLimit = 50;
    camera.upperBetaLimit = Tools.ToRadians(105);
}
function showperformance(scene)
{
    scene.debugLayer.show();
    // Instrumentation
    let instrumentation = new EngineInstrumentation(engine);
    instrumentation.captureGPUFrameTime = true;
    instrumentation.captureShaderCompilationTime = true;
    
    // GUI
    let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    let stackPanel = new BABYLON.GUI.StackPanel();
    stackPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;   
    stackPanel.isVertical = true;
    advancedTexture.addControl(stackPanel);     

    let text1 = new BABYLON.GUI.TextBlock();
    text1.text = "";
    text1.color = "white";
    text1.fontSize = 16;
    text1.height = "30px";
    stackPanel.addControl(text1);       

    let text2 = new BABYLON.GUI.TextBlock();
    text2.text = "";
    text2.color = "white";
    text2.fontSize = 16;
    text2.height = "30px";
    stackPanel.addControl(text2);       

    let text3 = new BABYLON.GUI.TextBlock();
    text3.text = "";
    text3.color = "white";
    text3.fontSize = 16;
    text3.height = "30px";
    stackPanel.addControl(text3);       

    let text4 = new BABYLON.GUI.TextBlock();
    text4.text = "";
    text4.color = "white";
    text4.fontSize = 16;
    text4.height = "30px";
    stackPanel.addControl(text4);        

    let text5 = new BABYLON.GUI.TextBlock();
    text5.text = "";
    text5.color = "white";
    text5.fontSize = 16;
    text5.height = "30px";
    stackPanel.addControl(text5);       

    let i = 0;
    scene.registerBeforeRender(function () {
        // colorGrading.level = Math.sin(i++ / 120) * 0.5 + 0.5; 

        text1.text = "current frame time (GPU): " + (instrumentation.gpuFrameTimeCounter.current * 0.000001).toFixed(2) + "ms";
        text2.text = "average frame time (GPU): " + (instrumentation.gpuFrameTimeCounter.average * 0.000001).toFixed(2) + "ms";
        text3.text = "total shader compilation time: " + (instrumentation.shaderCompilationTimeCounter.total).toFixed(2) + "ms";
        text4.text = "average shader compilation time: " + (instrumentation.shaderCompilationTimeCounter.average).toFixed(2) + "ms";
        text5.text = "compiler shaders count: " + instrumentation.shaderCompilationTimeCounter.count;
    });
}
function setscene(scene)
{

    // let camera = new ArcRotateCamera("camera", 
    // Tools.ToRadians(-90), Tools.ToRadians(135),
    // 10,Vector3.Zero(), scene);
    let camera = new ArcRotateCamera("Camera", Tools.ToRadians(0), Tools.ToRadians(80), 30,
        new Vector3(0,0,0), scene);
    
    //enable this for black
    // camera.alpha=Tools.ToRadians(90);
    
    setdefaultcameraconstraints(camera);
    camera.attachControl(null, true);


    let light = new HemisphericLight("light", new Vector3(7, 4, -10), scene);
    let light2 = new HemisphericLight("light2", new Vector3(7, 4, 10), scene);
    
    setnight([light,light2]);
    

    scene.clearColor = new Color4(0, 0, 0, 0);
    camera.panningSensibility = 0;

    return {scene,light,light2,camera};
}
function setbackgroundmovement(scene,camera)
{
    
    scene.registerBeforeRender(function()
    {
        setoffsetx(camera.alpha*1000);
        setoffsety(camera.beta*1000);
    })
}
async function setchesspiecesandtreeandmaterials(scene)
{
    let [blackmat,treemodels,chessmodels,blackpiecesmat]=await Promise.all([
        NodeMaterial.ParseFromSnippetAsync("ESKVBI#7", scene),
        SceneLoader.ImportMeshAsync("", "./models/", "treeandtrunk.glb", scene),
        SceneLoader.ImportMeshAsync("", "./models/", "chesspieces.glb", scene),
        NodeMaterial.ParseFromSnippetAsync("396KDF#9", scene),
    ])
    

    let canopy=treemodels.meshes[1];
    let trunk =treemodels.meshes[2];
    /*
    1->queen
    2->pawn
    3->bishop
    4->rook
    5->king
    6->knight
    */
    let whitepiecesmat=blackpiecesmat.clone();
    //clone black piece material
    whitepiecesmat.getBlockByName("IsWhite").value=1;
    //set white flag to true to make it white piece material

    let whitemat=blackmat.clone();
    //clone black material
    whitemat.getBlockByName("isWhite").value=1;
    //set white flag to true to make it white material

    let blackselectedmat=blackmat.clone();
    let whiteselectedmat=whitemat.clone();
    //clone black and white mats
    blackselectedmat.getBlockByName("isSelected").value=1;
    whiteselectedmat.getBlockByName("isSelected").value=1;
    //turn on selected flags to make it selected materials

    let glowMaskwhite = whitepiecesmat.getBlockByName("glowMask");
    let glowMaskblack = blackpiecesmat.getBlockByName("glowMask");

    const gl = new GlowLayer("glow", scene,{mainTextureRatio:0.5});
    gl.intensity=1.5;
    let blackpieces=[],whitepieces=[];
    for(let i=1;i<chessmodels.meshes.length;++i)
    {
        let mesh=chessmodels.meshes[i];
        mesh.material=whitepiecesmat;
        gl.referenceMeshToUseItsOwnMaterial(mesh);
        whitepieces.push(mesh);
        mesh.scaling=new Vector3(0.3,0.3,0.3);

        let blackcounterpart=mesh.clone();
        blackcounterpart.position.x=-blackcounterpart.position.x;
        blackcounterpart.material=blackpiecesmat;
        gl.referenceMeshToUseItsOwnMaterial(blackcounterpart);
        blackpieces.push(blackcounterpart);
    }

    gl.onBeforeRenderMeshToEffect.add(() => {
        glowMaskwhite.value = 0.0;
        glowMaskblack.value = 0.0;
    });
    gl.onAfterRenderMeshToEffect.add(() => {
        glowMaskwhite.value = 1.0;
        glowMaskblack.value = 1.0;
    });
    
    let piecetypes={
        queen:0,
        pawn:1,
        bishop:2,
        rook:3,
        king:4,
        knight:5
    }
    whitepieces[0].name="whitequeen";
    whitepieces[1].name="whitepawn";
    whitepieces[2].name="whitebishop";
    whitepieces[3].name="whiterook";
    whitepieces[4].name="whiteking";
    whitepieces[5].name="whiteknight";

    //rotate white knights to face black
    whitepieces[5].rotate(new Vector3(1,0,0),3.14);

    blackpieces[0].name="blackqueen";
    blackpieces[1].name="blackpawn";
    blackpieces[2].name="blackbishop";
    blackpieces[3].name="blackrook";
    blackpieces[4].name="blackking";
    blackpieces[5].name="blackknight";
    return {whitepieces,blackpieces,piecetypes,trunk,canopy,whitemat,blackmat,whiteselectedmat,blackselectedmat};
}

function setinitialtransformsoftree(canopy,trunk)
{
    let offsetvector = new Vector3(1,-5,2);
    canopy.position.addInPlace(offsetvector);
    trunk.position.addInPlace(offsetvector);
}

function makechesspiecesinvisible(whitepieces,blackpieces)
{
    whitepieces.forEach(mesh=>mesh.isVisible=false);
    blackpieces.forEach(mesh=>mesh.isVisible=false);
}

function makechessboard(whitemat,blackmat,whiteselectedmat,blackselectedmat,scene)
{
    let blackbox = MeshBuilder.CreateBox("blackbox", {width:1,depth:1,height:0.2}, scene);
    let whitebox = MeshBuilder.CreateBox("whitebox", {width:1,depth:1,height:0.2}, scene);
    let blackselectedbox = MeshBuilder.CreateBox("blackselectedbox", {width:1,depth:1,height:0.2}, scene);
    let whiteselectedbox = MeshBuilder.CreateBox("whiteselectedbox", {width:1,depth:1,height:0.2}, scene);

    whitebox.material=whitemat;
    blackbox.material=blackmat;
    whiteselectedbox.material=whiteselectedmat;
    blackselectedbox.material=blackselectedmat;

    whitebox.isVisible=false;
    blackbox.isVisible=false;
    whiteselectedbox.isVisible=false;
    blackselectedbox.isVisible=false;

    let instances=[];
    for(let i=-3.5;i<4;++i)
    {
        for(let j=-3.5;j<4;++j)
        {
            let instance,distance;
            if((i+j)%2==0)
            {
                instance = whitebox.createInstance("whitebox"+i.toString()+j.toString());
            }
            // else if((i<-3)||(j<-3))
            // {
            //     instance = whitebox.createInstance("blackbox"+i.toString()+j.toString());
            // }
            else
            {
                instance = blackbox.createInstance("blackbox"+i.toString()+j.toString());
                
            }
            distance=(i*i+j*j);
            instance.position.addInPlaceFromFloats(i,0,j);
            instance.setPivotPoint(new Vector3(-i,0,-j));
            // instance.position.addInPlaceFromFloats(i,-0,j);
            instances.push({i,j,instance,distance});
        }
    }
    return {instances,whitebox,blackbox,whiteselectedbox,blackselectedbox};
}

function setinitialtransformsofchessboard(instances)
{
    instances.forEach(ins=>{
        let {instance}=ins;
        instance.position.addInPlaceFromFloats(0,-7,3.1);
        instance.rotation.y=Tools.ToRadians(30);
        instance.rotation.x=Tools.ToRadians(50);
        instance.rotation.z=Tools.ToRadians(-10);
        
        instance.scaling=new Vector3(0.8,0.8,0.8)
    });
}



export async function onSceneReady(scene) {
    
    let {light,light2,camera}=setscene(scene);
    setbackgroundmovement(scene,camera);
    
    let {whitepieces,blackpieces,piecetypes,trunk,canopy,whitemat,blackmat,whiteselectedmat,blackselectedmat}=await setchesspiecesandtreeandmaterials(scene);


    setinitialtransformsoftree(canopy,trunk);
    makechesspiecesinvisible(whitepieces,blackpieces);

    let {instances,whitebox,blackbox,whiteselectedbox,blackselectedbox}=makechessboard(whitemat,blackmat,whiteselectedmat,blackselectedmat,scene);

    setinitialtransformsofchessboard(instances);

    
    let chess=new ChessPieceManager(whitepieces,blackpieces,instances,piecetypes,whitebox,blackbox,whiteselectedbox,blackselectedbox,scene);
    
    
    let anim=new gameStartAnimations(trunk,canopy,instances,camera,chess,scene);
    
    
    let gamestartclickobserver= scene.onPointerObservable.add(detechchessboardclick);
    function detechchessboardclick(pointerInfo)
    {      		
        if ((pointerInfo.type==PointerEventTypes.POINTERDOWN)&&(pointerInfo.pickInfo.hit)) {
            let picked=pointerInfo.pickInfo.pickedMesh;
            instances.forEach(ins=>{
                if(ins.instance==picked)
                {
                    scene.onPointerObservable.remove(gamestartclickobserver);
                    anim.playnextstage();
                }
            })
        }
    }
    // turnonchessmode();
    // console.log("done")
    // startchessgameanimation(instances,camera,scene);
    // function prt()
    // {
    //     console.log(camera.radius);
    //     console.log(camera.alpha);
    //     console.log(camera.beta);
    // }
    // scene.registerBeforeRender(prt);


    // showperformance(scene);
    

    return scene;
};