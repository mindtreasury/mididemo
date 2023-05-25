// copied and adapted from https://github.com/letUser/Solar_System_Map/blob/master/src/components/map.vue
import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import { Astronomy } from "./astronomy.js";

let camera = null
let scene = null
let controls = null
let renderer = null
let light = null
let ambLight = null
let sun = null
let merk = null
let ven = null
let earth = null
let mars = null
let upit = null
let sat = null
let ur = null
let nep = null
let plut = null
let currentAngle = 0
let merkXYZ = null
let venXYZ = null
let earthXYZ = null
let marsXYZ = null
let upitXYZ = null
let satXYZ = null
let urXYZ = null
let nepXYZ = null
let plutXYZ = null
let loader = null

function init() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClearColor = false;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.capabilities.getMaxAnisotropy();
    document.body.appendChild(renderer.domElement);
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.0001,
        1000
    );

    scene = new THREE.Scene();
    loader = new THREE.TextureLoader();
    controls = new TrackballControls(
        camera,
        renderer.domElement
    );
    controls.panSpeed = 0.5;
    controls.rotateSpeed = 1.5;
    controls.zoomSpeed = 1;

    camera.position.set(0, 0, 10);
    controls.update();

    scene.background = loader.load("./assets/space.jpg");

    /* МЕШЫ */
    const sunGeometry = new THREE.SphereGeometry(1, 64, 64);
    const sunMaterial = new THREE.MeshBasicMaterial({
        map: loader.load(
            "https://sun9-14.userapi.com/c205628/v205628419/7e86b/uET0t6HqLRU.jpg"
        )
    });
    sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.castShadow = true;
    scene.add(sun);

    const merkGeometry = new THREE.SphereGeometry(0.05, 64, 64);
    const merkMaterial = new THREE.MeshLambertMaterial({
        map: loader.load(
            "https://sun9-16.userapi.com/c857020/v857020302/f482f/ADb7nwZAQdA.jpg"
        )
    });
    merk = new THREE.Mesh(merkGeometry, merkMaterial);
    merk.castShadow = true;
    merk.receiveShadow = true;
    scene.add(merk);
    const venGeometry = new THREE.SphereGeometry(0.15, 64, 64);
    const venMaterial = new THREE.MeshLambertMaterial({
        map: loader.load(
            "https://avatars.mds.yandex.net/get-pdb/1623506/cc2c8ccc-4aa2-46f3-b5d5-3c0e5910af12/s600"
        )
    });
    ven = new THREE.Mesh(venGeometry, venMaterial);
    ven.castShadow = true;
    ven.receiveShadow = true;
    scene.add(ven);

    const earthGeometry = new THREE.SphereGeometry(0.15, 64, 64);
    const earthMaterial = new THREE.MeshLambertMaterial({
        map: loader.load(
            "https://img1.goodfon.ru/wallpaper/big/3/bb/planeta-zemlya-kosmos-triple.jpg"
        )
    });
    earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.castShadow = true;
    earth.receiveShadow = true;
    scene.add(earth);
    const marsGeometry = new THREE.SphereGeometry(0.09, 64, 64);
    const marsMaterial = new THREE.MeshLambertMaterial({
        map: loader.load(
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRnVWK2LKWCSD8Ix8L8NfzJevTVH3RkJYIAbElxkCYktkolUVlu"
        )
    });
    mars = new THREE.Mesh(marsGeometry, marsMaterial);
    mars.castShadow = true;
    mars.receiveShadow = true;
    scene.add(mars);
    const upitGeometry = new THREE.SphereGeometry(0.28, 64, 64);
    const upitMaterial = new THREE.MeshLambertMaterial(0xff0000);
    upit = new THREE.Mesh(upitGeometry, upitMaterial);
    upit.castShadow = true;
    upit.receiveShadow = true;
    scene.add(upit);
    const satGeometry = new THREE.SphereGeometry(0.25, 64, 64);
    const satMaterial = new THREE.MeshLambertMaterial(0xff0000);
    sat = new THREE.Mesh(satGeometry, satMaterial);
    sat.castShadow = true;
    sat.receiveShadow = true;
    scene.add(sat);
    const urGeometry = new THREE.SphereGeometry(0.15, 64, 64);
    const urMaterial = new THREE.MeshLambertMaterial(0xff0000);
    ur = new THREE.Mesh(urGeometry, urMaterial);
    ur.castShadow = true;
    ur.receiveShadow = true;
    scene.add(ur);
    const nepGeometry = new THREE.SphereGeometry(0.15, 64, 64);
    const nepMaterial = new THREE.MeshLambertMaterial({
        map: loader.load(
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSAuw8_sIRYuTuGpT4xNBkLwjMW722ASTOYJearSo58OYtrXyRz"
        )
    });
    nep = new THREE.Mesh(nepGeometry, nepMaterial);
    nep.castShadow = true;
    nep.receiveShadow = true;
    scene.add(nep);

    const plutGeometry = new THREE.SphereGeometry(0.15, 64, 64);
    const plutMaterial = new THREE.MeshLambertMaterial({
        alpha: true,
        color: 0x000000
    });
    plut = new THREE.Mesh(plutGeometry, plutMaterial);
    plut.castShadow = true;
    plut.receiveShadow = true;
    scene.add(plut);

    ambLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambLight);

    light = new THREE.PointLight(0xffffff, 1.8);
    light.position.set(0, 0, 0);
    renderer.physicallyCorrectLights = true;

    light.power = 25;
    light.decay = 2;
    light.distance = 1000;
    scene.add(light);

    light.shadow.mapSize.width = 512;
    light.shadow.mapSize.height = 512;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 10000;

    const ctLoader = new THREE.CubeTextureLoader();
    const texture = ctLoader.load([
        "https://sun9-30.userapi.com/c850608/v850608287/cfaad/0nK6n9jameQ.jpg",
        "https://sun9-31.userapi.com/c204828/v204828287/817ed/RlTe2zejDe8.jpg",
        "https://sun9-7.userapi.com/c205716/v205716287/82143/YcQBbbEjsJk.jpg",
        "https://sun9-2.userapi.com/c205128/v205128287/7fd29/VIULun-SDlo.jpg",
        "https://sun9-51.userapi.com/c857332/v857332287/832af/5nq9oRiR9r0.jpg",
        "https://sun9-63.userapi.com/c206824/v206824287/83f19/CLPSpstY-0w.jpg"
    ]);

    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    scene.background = texture;

    // let radius = 20;
    // let radials = 16;
    // let circles = 8;
    // let divisions = 64;

    // let helper2 = new THREE.PolarGridHelper(
    //   radius,
    //   radials,
    //   circles,
    //   divisions
    // );
    // scene.add(helper2);
}


function calcGEO() {
    merkXYZ = Astronomy.Body[1].EclipticCartesianCoordinates(
        Astronomy.DayValue(new Date())
    );
    venXYZ = Astronomy.Body[2].EclipticCartesianCoordinates(
        Astronomy.DayValue(new Date())
    );
    earthXYZ = Astronomy.Body[3].EclipticCartesianCoordinates(
        Astronomy.DayValue(new Date())
    );
    marsXYZ = Astronomy.Body[5].EclipticCartesianCoordinates(
        Astronomy.DayValue(new Date())
    );
    upitXYZ = Astronomy.Body[16].EclipticCartesianCoordinates(
        Astronomy.DayValue(new Date())
    );
    satXYZ = Astronomy.Body[17].EclipticCartesianCoordinates(
        Astronomy.DayValue(new Date())
    );
    urXYZ = Astronomy.Body[18].EclipticCartesianCoordinates(
        Astronomy.DayValue(new Date())
    );
    nepXYZ = Astronomy.Body[19].EclipticCartesianCoordinates(
        Astronomy.DayValue(new Date())
    );
    plutXYZ = Astronomy.Body[20].EclipticCartesianCoordinates(
        Astronomy.DayValue(new Date())
    );

    setTimeout(() => calcGEO(), 600000); //обновляем данные каждые 10мин
}
function loop() {
    merk.position.x = merkXYZ.x * 10;
    merk.position.y = merkXYZ.y * 10;
    merk.position.z = merkXYZ.z * 10;

    ven.position.x = venXYZ.x * 10;
    ven.position.y = venXYZ.y * 10;
    ven.position.z = venXYZ.z * 10;

    earth.position.x = earthXYZ.x * 10;
    earth.position.y = earthXYZ.y * 10;
    earth.position.z = earthXYZ.z * 10;

    mars.position.x = marsXYZ.x * 10;
    mars.position.y = marsXYZ.y * 10;
    mars.position.z = marsXYZ.z * 10;

    upit.position.x = upitXYZ.x * 10;
    upit.position.y = upitXYZ.y * 10;
    upit.position.z = upitXYZ.z * 10;

    sat.position.x = satXYZ.x * 10;
    sat.position.y = satXYZ.y * 10;
    sat.position.z = satXYZ.z * 10;

    ur.position.x = urXYZ.x * 10;
    ur.position.y = urXYZ.y * 10;
    ur.position.z = urXYZ.z * 10;

    nep.position.x = nepXYZ.x * 10;
    nep.position.y = nepXYZ.y * 10;
    nep.position.z = nepXYZ.z * 10;

    plut.position.x = plutXYZ.x * 10;
    plut.position.y = plutXYZ.y * 10;
    plut.position.z = plutXYZ.z * 10;

    renderer.render(scene, camera);

    currentAngle += 0.01;

    requestAnimationFrame(loop);
}
function animate() {
    requestAnimationFrame(animate);

    merk.rotation.y += 0.00000005;
    ven.rotation.y += 0.000000001;
    earth.rotation.y += 0.000086;
    mars.rotation.y += 0.000086;
    upit.rotation.y += 0.000034;
    sat.rotation.y += 0.000036;
    ur.rotation.y += 0.000061;
    nep.rotation.y += 0.000057;
    plut.rotation.y += 0.0000000005;

    controls.update();

    renderer.render(scene, camera); //рендерим
}
function resizeRendererToDisplaySize() {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}
function render() {
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

export function displayMap() {
    init();
    calcGEO();
    loop();
    resizeRendererToDisplaySize();
    render();
    animate();
}

