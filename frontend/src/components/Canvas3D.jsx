import React, { useEffect, useRef } from "react";
import { Engine, Scene } from "@babylonjs/core";
import "./Canvas3D.css";

import {onSceneReady} from './SceneManager.js';

export default function Canvas3D() {
    const reactCanvas = useRef(null);

    useEffect(() => {
        const { current: canvas } = reactCanvas;

        if (!canvas) return;

        const engine = new Engine(canvas,true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false });
        const scene = new Scene(engine);
        if (scene.isReady()) {
            onSceneReady(scene);
        } else {
            scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
        }

        engine.runRenderLoop(() => {
            scene.render();
        });

        const resize = () => {
            scene.getEngine().resize();
        };

        if (window) {
            window.addEventListener("resize", resize);
        }

        return () => {
            scene.getEngine().dispose();

            if (window) {
                window.removeEventListener("resize", resize);
            }
        };
    }, []);

    return <canvas className="renderCanvas" ref={reactCanvas} />;
};