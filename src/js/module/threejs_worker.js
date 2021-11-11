
import * as THREE from './three.module';
import { GLTFLoader } from './GLTFLoader';


function isMobile() {
    return /Android|mobile|iPad|iPhone/i.test(navigator.userAgent);
}

var interpolationFactor = 24;

var trackedMatrix = {
    // for interpolation
    delta: [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0
    ],
    interpolated: [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0
    ]
}

const markers = {
    "cc": {
        width: 28,
        height: 28,
        dpi: 6.72,
        url: "./img/cc",
    },
};

var setMatrix = function (matrix, value) {
    var array = [];
    for (var key in value) {
        array[key] = value[key];
    }
    if (typeof matrix.elements.set === "function") {
        matrix.elements.set(array);
    } else {
        matrix.elements = [].slice.call(array);
    }
};

const start = (container, marker, video, input_width, input_height, canvas_draw, render_update, track_update, greyCover) => {
    var vw, vh;
    var sw, sh;
    var pscale, sscale;
    var w, h;
    var pw, ph;
    var ox, oy;
    var worker;
    var camera_para = '../img/camera_para-iPhone 5 rear 640x480 1.0m.dat';
    let clock, mixer, actions = {}, model;

    var canvas_process = document.createElement('canvas');
    var context_process = canvas_process.getContext('2d');

    var renderer = new THREE.WebGLRenderer({
        canvas: canvas_draw,
        alpha: true,
        antialias: true,
        logarithmicDepthBuffer: true,
        preserveDrawingBuffer: true,
        precision: "highp", //precision:highp/mediump/lowp着色精度选择
        premultipliedAlpha: false, //?
        stencil: false
    });
    //document.querySelector("#app").appendChild(renderer.domElement);
    renderer.setSize(input_width, input_height);
    renderer.setPixelRatio(window.devicePixelRatio);

    clock = new THREE.Clock();
    var scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xffffff));
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(0, 20, 10);
    scene.add(dirLight);

    var camera = new THREE.PerspectiveCamera(90, input_width / input_height, 10, 2000);
    camera.matrixAutoUpdate = false;

    scene.add(camera);

    var root = new THREE.Object3D();
    root.matrixAutoUpdate = false;
    scene.add(root);

    const loader = new GLTFLoader();
    loader.load('../img/RobotExpressive.glb', function (gltf) {

        model = gltf.scene;
        model.visible = false;
        model.scale.set(50, 50, 50);
        model.position.z = 0;
        model.position.x = 50;
        model.position.y = 0;
        root.add(model);
        mixer = new THREE.AnimationMixer(gltf.scene);

        for (let i = 0; i < gltf.animations.length; i++) {

            const clip = gltf.animations[i];
            console.log(clip);
            const action = mixer.clipAction(clip);
            actions[clip.name] = action;
            action.clampWhenFinished = true;
            action.loop = THREE.LoopRepeat;
        }
        actions['Dance'].play();
    }, undefined, function (e) {
        console.error(e);
    });
    var sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 8, 8),
        new THREE.MeshBasicMaterial({
            transparent: false,
            depthWrite: false,
            depthTest: false
        })
    );

    sphere.visible = false;
    sphere.material.flatShading;
    sphere.position.z = 0;
    sphere.position.x = 100;
    sphere.position.y = 100;
    sphere.scale.set(100, 100, 100);

    //root.add(sphere);

    var load = function () {
        vw = input_width;
        vh = input_height;

        pscale = 320 * 3 / Math.max(vw, vh / 3 * 4);
        sscale = isMobile() ? window.outerWidth / input_width : 1;

        sw = vw * sscale;
        sh = vh * sscale;
        video.style.width = sw + "px";
        video.style.height = sh + "px";
        container.style.width = sw + "px";
        container.style.height = sh + "px";
        canvas_draw.style.width = sw + "px";
        canvas_draw.style.height = sh + "px";
        canvas_draw.width = sw;
        canvas_draw.height = sh;
        w = vw * pscale;
        h = vh * pscale;
        pw = Math.max(w, h / 3 * 4);
        ph = Math.max(h, w / 4 * 3);
        ox = (pw - w) / 2;
        oy = (ph - h) / 2;
        canvas_process.style.clientWidth = pw + "px";
        canvas_process.style.clientHeight = ph + "px";
        canvas_process.width = pw;
        canvas_process.height = ph;

        renderer.setSize(sw, sh);

        worker = new Worker('../lib/artoolkit.worker.js');

        worker.postMessage({ type: "load", pw: pw, ph: ph, camera_para: camera_para, marker: '../' + marker.url });

        worker.onmessage = function (ev) {
            var msg = ev.data;
            switch (msg.type) {
                case "loaded": {
                    var proj = JSON.parse(msg.proj);
                    var ratioW = pw / w;
                    var ratioH = ph / h;
                    proj[0] *= ratioW;
                    proj[4] *= ratioW;
                    proj[8] *= ratioW;
                    proj[12] *= ratioW;
                    proj[1] *= ratioH;
                    proj[5] *= ratioH;
                    proj[9] *= ratioH;
                    proj[13] *= ratioH;
                    setMatrix(camera.projectionMatrix, proj);
                    break;
                }
                case "endLoading": {
                    if (msg.end == true)
                        console.log("endLoading")
                    break;
                }
                case "found": {
                    found(msg);
                    document.querySelector('#stats1').innerText = "found"
                    console.log('found');
                    break;
                }
                case "not found": {
                    found(null);
                    document.querySelector('#stats1').innerText = "not found"
                    console.log('not found');
                    break;
                }
            }
            track_update();
            process();
        };
    };

    var world = null;

    var found = function (msg) {
        if (!msg) {
            world = null;
        } else {
            world = JSON.parse(msg.matrixGL_RH);
        }
    };

    var lasttime = Date.now();
    var time = 0;
    var draw = function () {
        render_update();
        var now = Date.now();
        var dt = now - lasttime;
        time += dt;
        lasttime = now;
        if (!model) {
            return;
        }
        if (!world) {
            sphere.visible = false;
            model.visible = false;
            /* if (sphere.visible === true) {
                sphere.position.add(new THREE.Vector3(0, 0, -5))
            } */
        } else {
            //if (sphere.visible !== true) {
            sphere.visible = true;
            model.visible = true;
            // interpolate matrix
            for (var i = 0; i < 16; i++) {
                trackedMatrix.delta[i] = world[i] - trackedMatrix.interpolated[i];
                trackedMatrix.interpolated[i] =
                    trackedMatrix.interpolated[i] +
                    trackedMatrix.delta[i] / interpolationFactor;
            }

            // set matrix of 'root' by detected 'world' matrix
            setMatrix(root.matrix, trackedMatrix.interpolated);
            //}
        }
        renderer.render(scene, camera);
    };

    function process() {
        context_process.fillStyle = "black";
        context_process.fillRect(0, 0, pw, ph);
        context_process.drawImage(video, 0, 0, vw, vh, ox, oy, w, h);

        var imageData = context_process.getImageData(0, 0, pw, ph);
        worker.postMessage({ type: "process", imagedata: imageData }, [imageData.data.buffer]);
    }
    var tick = function () {
        /* console.log('sphere.position', sphere.position)
        console.log('camera.position', camera.position)
        console.log('root.position', root.position)
        console.log('scene.position', scene.position) */
        const dt = clock.getDelta();

        if (mixer) mixer.update(dt);
        draw();
        requestAnimationFrame(tick);
    };

    load();
    tick();
    process();
}

export {
    markers,
    start
}