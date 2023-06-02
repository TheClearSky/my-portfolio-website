import React, { useEffect, useRef } from "react";
import { Engine, Scene } from "@babylonjs/core";
import "./Canvas3D.css";

import {onSceneReady} from './SceneManager.js';
import store from "../reduxstore";
import { boardisnotReady } from "../apiSlices/chessSlice";

export default function Canvas3D() {
    const reactCanvas = useRef(null);

    useEffect(() => {
        let sceneresult={};
        const { current: canvas } = reactCanvas;

        if (!canvas) return;

        const engine = new Engine(canvas,true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false });
        const scene = new Scene(engine);
        
        if (scene.isReady()) {
            sceneresult.chess=onSceneReady(scene);
        } else {
            scene.onReadyObservable.addOnce((scene) => {sceneresult.chess=onSceneReady(scene)});
        }
        
        engine.runRenderLoop(() => {
            scene.render();
        });

        const resize = () => {
            scene.getEngine().resize();
        };

        const resizeObserver= new ResizeObserver(resize);
        resizeObserver.observe(canvas);
     
        return () => {
            console.log(sceneresult);
            sceneresult.chess.then((result)=>{
                console.log(result);
                result.chess.endgamebound();
                result.chess.removeallpiecesbound(false);
                result.anim.resetallanimationsbound();
            });
            scene.getEngine().dispose();
            resizeObserver.disconnect();
            
            store.dispatch(boardisnotReady());
        };
    }, []);

    return <canvas className="renderCanvas" ref={reactCanvas} />;
};