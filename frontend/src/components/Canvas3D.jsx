import React, { useEffect, useRef, useState } from "react";
import { Engine, Scene } from "@babylonjs/core";
import "./Canvas3D.css";

import {onSceneReady} from './SceneManager.js';
import store from "../reduxstore";
import { boardisnotReady } from "../apiSlices/chessSlice";

// The scene appears all at once: its models and node materials arrive one by
// one (the chess pieces first, the tree and board later), so the canvas stays
// hidden behind a loader until every asset is in and every shader compiled.
export default function Canvas3D() {
    const reactCanvas = useRef(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let sceneresult={};
        let disposed=false;
        const { current: canvas } = reactCanvas;

        if (!canvas) return;

        const engine = new Engine(canvas,true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false });
        const scene = new Scene(engine);

        async function build(scene) {
            sceneresult.chess=onSceneReady(scene);
            await sceneresult.chess;
            // Every material compiled, then two frames drawn, before the reveal.
            await scene.whenReadyAsync();
            await new Promise((resolve)=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
            if (!disposed) setReady(true);
        }

        if (scene.isReady()) {
            build(scene);
        } else {
            scene.onReadyObservable.addOnce((scene) => {build(scene)});
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
            disposed=true;
            sceneresult.chess?.then((result)=>{
                result.chess.endgamebound();
                result.chess.removeallpiecesbound(false);
                result.anim.resetallanimationsbound();
            });
            scene.getEngine().dispose();
            resizeObserver.disconnect();

            store.dispatch(boardisnotReady());
        };
    }, []);

    return (
        <div className="renderCanvasHolder">
            <canvas className={"renderCanvas" + (ready ? " ready" : "")} ref={reactCanvas} />
            {!ready && (
                <div className="sceneloader" role="status" aria-live="polite">
                    <span className="sceneloaderring" aria-hidden="true"></span>
                    <span>Loading the scene…</span>
                </div>
            )}
        </div>
    );
};
