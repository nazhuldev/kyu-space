import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";


/* =========================================================
   BASIC SETUP
========================================================= */

const container =
    document.getElementById("space");

const scene =
    new THREE.Scene();


const camera =
    new THREE.PerspectiveCamera(
        55,
        window.innerWidth /
        window.innerHeight,
        0.1,
        2000
    );


camera.position.set(
    0,
    18,
    48
);


const renderer =
    new THREE.WebGLRenderer({
        antialias: true,
        powerPreference:
            "high-performance"
    });


renderer.setSize(
    window.innerWidth,
    window.innerHeight
);


renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);


renderer.outputColorSpace =
    THREE.SRGBColorSpace;


renderer.toneMapping =
    THREE.ACESFilmicToneMapping;


renderer.toneMappingExposure = 1.25;


container.appendChild(
    renderer.domElement
);


/* =========================================================
   CAMERA CONTROLS
========================================================= */

const controls =
    new OrbitControls(
        camera,
        renderer.domElement
    );


controls.enableDamping = true;

controls.dampingFactor = 0.05;

controls.enablePan = false;

controls.minDistance = 3;

controls.maxDistance = 180;


/* =========================================================
   LIGHT
========================================================= */

scene.add(
    new THREE.AmbientLight(
        0xffffff,
        0.025
    )
);


/* =========================================================
   STARS
========================================================= */

function createStars(
    count,
    radius,
    size,
    opacity
) {

    const positions =
        new Float32Array(
            count * 3
        );


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const r =
            radius +
            Math.random() * 450;


        const theta =
            Math.random() *
            Math.PI * 2;


        const phi =
            Math.acos(
                2 *
                Math.random() -
                1
            );


        positions[i * 3] =
            r *
            Math.sin(phi) *
            Math.cos(theta);


        positions[i * 3 + 1] =
            r *
            Math.cos(phi);


        positions[i * 3 + 2] =
            r *
            Math.sin(phi) *
            Math.sin(theta);

    }


    const geometry =
        new THREE.BufferGeometry();


    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            positions,
            3
        )
    );


    const material =
        new THREE.PointsMaterial({

            color: 0xffffff,

            size,

            transparent: true,

            opacity,

            depthWrite: false

        });


    return new THREE.Points(
        geometry,
        material
    );

}


const stars =
    createStars(
        6500,
        250,
        0.6,
        0.75
    );


const starsSmall =
    createStars(
        1800,
        120,
        1,
        0.65
    );


scene.add(stars);

scene.add(starsSmall);


/* =========================================================
   SUN
========================================================= */

const sun =
    new THREE.Mesh(

        new THREE.SphereGeometry(
            3,
            64,
            64
        ),

        new THREE.MeshBasicMaterial({
            color: 0xffc45c
        })

    );


scene.add(sun);


/* SUN LIGHT */

const sunLight =
    new THREE.PointLight(
        0xffdda0,
        600,
        500
    );


sun.add(
    sunLight
);


/* =========================================================
   SUN GLOW
========================================================= */

function addSunGlow(
    radius,
    opacity
) {

    const glow =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                radius,
                64,
                64
            ),

            new THREE.MeshBasicMaterial({

                color: 0xff9c2e,

                transparent: true,

                opacity,

                side:
                    THREE.BackSide,

                depthWrite: false

            })

        );


    sun.add(
        glow
    );


    return glow;
}


const glow1 =
    addSunGlow(
        3.8,
        0.14
    );


const glow2 =
    addSunGlow(
        4.6,
        0.06
    );


const glow3 =
    addSunGlow(
        5.7,
        0.025
    );


/* =========================================================
   PLANET DATA
========================================================= */

const planetData = [

    {
        name: "Mercury",

        radius: 0.45,

        distance: 6,

        color: 0x8c8c8c,

        orbitSpeed: 0.018,

        info: {

            type:
                "TERRESTRIAL PLANET",

            distance:
                "57.9 million km",

            diameter:
                "4,879 km",

            temperature:
                "167°C",

            moons:
                "0",

            description:
                "Sao Thủy là hành tinh nhỏ nhất và gần Mặt Trời nhất trong Hệ Mặt Trời."

        }
    },


    {
        name: "Venus",

        radius: 0.75,

        distance: 9,

        color: 0xd6a85c,

        orbitSpeed: 0.014,

        info: {

            type:
                "TERRESTRIAL PLANET",

            distance:
                "108.2 million km",

            diameter:
                "12,104 km",

            temperature:
                "464°C",

            moons:
                "0",

            description:
                "Sao Kim là hành tinh nóng nhất trong Hệ Mặt Trời, với bầu khí quyển CO₂ rất dày."

        }
    },


    {
        name: "Earth",

        radius: 0.85,

        distance: 13,

        color: 0x367fc8,

        orbitSpeed: 0.010,

        info: {

            type:
                "TERRESTRIAL PLANET",

            distance:
                "149.6 million km",

            diameter:
                "12,742 km",

            temperature:
                "15°C",

            moons:
                "1",

            description:
                "Trái Đất là hành tinh thứ ba tính từ Mặt Trời và là nơi duy nhất được biết đến có sự sống."

        }
    },


    {
        name: "Mars",

        radius: 0.65,

        distance: 17,

        color: 0xb94a36,

        orbitSpeed: 0.008,

        info: {

            type:
                "TERRESTRIAL PLANET",

            distance:
                "227.9 million km",

            diameter:
                "6,779 km",

            temperature:
                "-63°C",

            moons:
                "2",

            description:
                "Sao Hỏa là một thế giới lạnh và khô, nổi bật với bề mặt giàu oxit sắt có màu đỏ."

        }
    },


    {
        name: "Jupiter",

        radius: 1.8,

        distance: 24,

        color: 0xc69c72,

        orbitSpeed: 0.004,

        info: {

            type:
                "GAS GIANT",

            distance:
                "778.5 million km",

            diameter:
                "139,820 km",

            temperature:
                "-110°C",

            moons:
                "101",

            description:
                "Sao Mộc là hành tinh lớn nhất trong Hệ Mặt Trời và là một hành tinh khí khổng lồ."

        }
    },


    {
        name: "Saturn",

        radius: 1.5,

        distance: 33,

        color: 0xd8bf91,

        orbitSpeed: 0.003,

        info: {

            type:
                "GAS GIANT",

            distance:
                "1.43 billion km",

            diameter:
                "116,460 km",

            temperature:
                "-140°C",

            moons:
                "274",

            description:
                "Sao Thổ là hành tinh khí khổng lồ nổi tiếng với hệ thống vành đai rộng lớn."

        }
    },


    {
        name: "Uranus",

        radius: 1.05,

        distance: 41,

        color: 0x75d0d6,

        orbitSpeed: 0.002,

        info: {

            type:
                "ICE GIANT",

            distance:
                "2.87 billion km",

            diameter:
                "50,724 km",

            temperature:
                "-195°C",

            moons:
                "28",

            description:
                "Sao Thiên Vương là một hành tinh băng khổng lồ có trục quay nghiêng gần 98 độ."

        }
    },


    {
        name: "Neptune",

        radius: 1,

        distance: 49,

        color: 0x4169d8,

        orbitSpeed: 0.0015,

        info: {

            type:
                "ICE GIANT",

            distance:
                "4.50 billion km",

            diameter:
                "49,244 km",

            temperature:
                "-200°C",

            moons:
                "16",

            description:
                "Sao Hải Vương là hành tinh lớn nằm xa Mặt Trời nhất trong Hệ Mặt Trời."

        }
    }

];


/* =========================================================
   ORBIT RINGS
========================================================= */

function createOrbit(
    radius
) {

    const geometry =
        new THREE.RingGeometry(
            radius - 0.012,
            radius + 0.012,
            160
        );


    const material =
        new THREE.MeshBasicMaterial({

            color: 0xffffff,

            transparent: true,

            opacity: 0.085,

            side:
                THREE.DoubleSide

        });


    const orbit =
        new THREE.Mesh(
            geometry,
            material
        );


    orbit.rotation.x =
        Math.PI / 2;


    scene.add(
        orbit
    );

}


/* =========================================================
   PLANETS
========================================================= */

const planets = [];


planetData.forEach(
    data => {

        createOrbit(
            data.distance
        );


        const planet =
            new THREE.Mesh(

                new THREE.SphereGeometry(
                    data.radius,
                    64,
                    64
                ),

                new THREE.MeshStandardMaterial({

                    color:
                        data.color,

                    roughness:
                        0.85,

                    metalness:
                        0

                })

            );


        planet.position.set(
            data.distance,
            0,
            0
        );


        planet.userData = {

            name:
                data.name,

            info:
                data.info,

            radius:
                data.radius

        };


        scene.add(
            planet
        );


        planets.push({

            mesh:
                planet,

            data:
                data,

            angle:
                Math.random() *
                Math.PI * 2

        });


        /* EARTH ATMOSPHERE */

        if (
            data.name ===
            "Earth"
        ) {

            const atmosphere =
                new THREE.Mesh(

                    new THREE.SphereGeometry(
                        data.radius * 1.12,
                        64,
                        64
                    ),

                    new THREE.MeshBasicMaterial({

                        color:
                            0x4da6ff,

                        transparent:
                            true,

                        opacity:
                            0.2,

                        side:
                            THREE.BackSide,

                        depthWrite:
                            false

                    })

                );


            planet.add(
                atmosphere
            );

        }


        /* SATURN RINGS */

        if (
            data.name ===
            "Saturn"
        ) {

            const ring =
                new THREE.Mesh(

                    new THREE.RingGeometry(
                        1.9,
                        3.0,
                        96
                    ),

                    new THREE.MeshBasicMaterial({

                        color:
                            0xc9b88e,

                        transparent:
                            true,

                        opacity:
                            0.72,

                        side:
                            THREE.DoubleSide

                    })

                );


            ring.rotation.x =
                Math.PI / 2.3;


            planet.add(
                ring
            );

        }

    }
);


/* =========================================================
   EARTH MOON
========================================================= */

const earth =
    planets.find(
        planet =>
            planet.data.name ===
            "Earth"
    );


const moon =
    new THREE.Mesh(

        new THREE.SphereGeometry(
            0.22,
            32,
            32
        ),

        new THREE.MeshStandardMaterial({

            color:
                0xaaaaaa,

            roughness:
                1

        })

    );


moon.position.x =
    1.5;


earth.mesh.add(
    moon
);


/* =========================================================
   ASTEROID BELT
========================================================= */

const asteroidGroup =
    new THREE.Group();


const asteroidGeometry =
    new THREE.SphereGeometry(
        0.035,
        6,
        6
    );


const asteroidMaterial =
    new THREE.MeshBasicMaterial({
        color: 0x777168
    });


for (
    let i = 0;
    i < 650;
    i++
) {

    const asteroid =
        new THREE.Mesh(
            asteroidGeometry,
            asteroidMaterial
        );


    const angle =
        Math.random() *
        Math.PI * 2;


    const radius =
        19.5 +
        Math.random() * 2.8;


    asteroid.position.set(

        Math.cos(angle) *
        radius,

        (
            Math.random() -
            0.5
        ) * 0.35,

        Math.sin(angle) *
        radius

    );


    asteroid.scale.setScalar(
        0.5 +
        Math.random() * 2
    );


    asteroidGroup.add(
        asteroid
    );

}


scene.add(
    asteroidGroup
);


/* =========================================================
   SELECTION RING
========================================================= */

const selectionRing =
    new THREE.Mesh(

        new THREE.RingGeometry(
            1,
            1.08,
            64
        ),

        new THREE.MeshBasicMaterial({

            color:
                0x73ffad,

            transparent:
                true,

            opacity:
                0.8,

            side:
                THREE.DoubleSide

        })

    );


selectionRing.rotation.x =
    Math.PI / 2;


selectionRing.visible =
    false;


scene.add(
    selectionRing
);


/* =========================================================
   RAYCASTER
========================================================= */

const raycaster =
    new THREE.Raycaster();


const mouse =
    new THREE.Vector2();


let hoveredPlanet =
    null;


let selectedPlanet =
    null;


/* =========================================================
   HOVER
========================================================= */

renderer.domElement.addEventListener(
    "pointermove",
    event => {

        mouse.x =
            (
                event.clientX /
                window.innerWidth
            ) * 2 - 1;


        mouse.y =
            -(
                event.clientY /
                window.innerHeight
            ) * 2 + 1;


        raycaster.setFromCamera(
            mouse,
            camera
        );


        const hits =
            raycaster.intersectObjects(
                planets.map(
                    p => p.mesh
                )
            );


        const hover =
            document.getElementById(
                "hoverName"
            );


        if (
            hits.length > 0
        ) {

            hoveredPlanet =
                hits[0].object;


            renderer.domElement.style.cursor =
                "pointer";


            hover.textContent =
                hoveredPlanet
                    .userData
                    .name
                    .toUpperCase();


            hover.style.left =
                (
                    event.clientX +
                    14
                ) + "px";


            hover.style.top =
                (
                    event.clientY +
                    14
                ) + "px";


            hover.style.opacity =
                "1";

        } else {

            hoveredPlanet =
                null;


            renderer.domElement.style.cursor =
                "grab";


            hover.style.opacity =
                "0";

        }

    }
);


/* =========================================================
   CLICK
========================================================= */

renderer.domElement.addEventListener(
    "click",
    () => {

        if (
            hoveredPlanet
        ) {

            selectPlanet(
                hoveredPlanet
            );

        }

    }
);


/* =========================================================
   CAMERA FOLLOW STATE
========================================================= */

let following =
    null;


let followDistance =
    7;


let cameraFollowOffset =
    new THREE.Vector3(
        0,
        2.5,
        7
    );


/* =========================================================
   SELECT PLANET
========================================================= */

function selectPlanet(
    planet
) {

    selectedPlanet =
        planet;


    following =
        planet;


    selectionRing.visible =
        true;


    selectionRing.scale.setScalar(
        planet.userData.radius *
        1.6
    );


    showPlanetInfo(
        planet.userData
    );


    document.getElementById(
        "followingName"
    ).textContent =
        planet.userData.name
            .toUpperCase();


    /*
       Đưa camera đến gần hành tinh
    */

    const worldPosition =
        new THREE.Vector3();


    planet.getWorldPosition(
        worldPosition
    );


    const direction =
        new THREE.Vector3()
            .subVectors(
                camera.position,
                worldPosition
            )
            .normalize();


    if (
        direction.length() <
        0.1
    ) {

        direction.set(
            0,
            0.3,
            1
        );

    }


    const desired =
        worldPosition.clone()
            .add(
                direction.multiplyScalar(
                    Math.max(
                        planet.userData.radius *
                        5,
                        5
                    )
                )
            );


    camera.position.lerp(
        desired,
        0.35
    );


    controls.target.lerp(
        worldPosition,
        0.35
    );

}


/* =========================================================
   PLANET INFO
========================================================= */

function showPlanetInfo(
    planet
) {

    const panel =
        document.getElementById(
            "planetPanel"
        );


    document.getElementById(
        "planetType"
    ).textContent =
        planet.info.type;


    document.getElementById(
        "planetName"
    ).textContent =
        planet.name;


    document.getElementById(
        "planetDescription"
    ).textContent =
        planet.info.description;


    document.getElementById(
        "planetDistance"
    ).textContent =
        planet.info.distance;


    document.getElementById(
        "planetDiameter"
    ).textContent =
        planet.info.diameter;


    document.getElementById(
        "planetTemperature"
    ).textContent =
        planet.info.temperature;


    document.getElementById(
        "planetMoons"
    ).textContent =
        planet.info.moons;


    panel.classList.add(
        "active"
    );

}


/* =========================================================
   CLOSE PANEL
========================================================= */
document.getElementById(
    "closePanel"
).addEventListener(
    "click",
    () => {

        // Đóng bảng thông tin
        document
            .getElementById(
                "planetPanel"
            )
            .classList.remove(
                "active"
            );

        following = null;

        selectedPlanet = null;

        // Tắt vòng highlight
        selectionRing.visible = false;

    }
);


/* =========================================================
   RESET
========================================================= */

function resetView() {

    following =
        null;

    selectedPlanet =
        null;


    selectionRing.visible =
        false;


    camera.position.set(
        0,
        18,
        48
    );


    controls.target.set(
        0,
        0,
        0
    );


    document
        .getElementById(
            "planetPanel"
        )
        .classList.remove(
            "active"
        );

}


document.getElementById(
    "resetView"
).addEventListener(
    "click",
    resetView
);


/* =========================================================
   PAUSE
========================================================= */

let paused =
    false;


const pauseButton =
    document.getElementById(
        "pauseButton"
    );


pauseButton.addEventListener(
    "click",
    () => {

        paused =
            !paused;


        pauseButton.textContent =
            paused
                ? "PLAY"
                : "PAUSE";

    }
);


/* SPACE KEY */

window.addEventListener(
    "keydown",
    event => {

        if (
            event.code ===
            "Space"
        ) {

            event.preventDefault();

            pauseButton.click();

        }


        if (
            event.key.toLowerCase()
            === "r"
        ) {

            resetView();

        }

    }
);


/* =========================================================
   SPEED
========================================================= */

let timeScale =
    1;


const speedSlider =
    document.getElementById(
        "speedSlider"
    );


const speedValue =
    document.getElementById(
        "speedValue"
    );


speedSlider.addEventListener(
    "input",
    () => {

        timeScale =
            Number(
                speedSlider.value
            );


        speedValue.textContent =
            timeScale.toFixed(1) +
            "x";

    }
);


/* =========================================================
   CLOCK
========================================================= */

const clock =
    new THREE.Clock();


/* =========================================================
   ANIMATION
========================================================= */

function animate() {

    requestAnimationFrame(
        animate
    );


    const delta =
        clock.getDelta();


    const elapsed =
        clock.elapsedTime;


    /* STARS */

    stars.rotation.y +=
        delta * 0.001;


    starsSmall.rotation.y +=
        delta * 0.002;


    /* SUN */

    sun.rotation.y +=
        delta * 0.12;


    glow1.scale.setScalar(
        1 +
        Math.sin(
            elapsed * 2
        ) * 0.025
    );


    glow2.scale.setScalar(
        1 +
        Math.sin(
            elapsed * 1.4
        ) * 0.035
    );


    glow3.scale.setScalar(
        1 +
        Math.sin(
            elapsed * 0.8
        ) * 0.025
    );


    /* ASTEROIDS */

    asteroidGroup.rotation.y +=
        delta * 0.0008;


    /* PLANETS */

    if (!paused) {

        planets.forEach(
            planet => {

                planet.angle +=
                    planet.data.orbitSpeed *
                    timeScale;


                planet.mesh.position.x =
                    Math.cos(
                        planet.angle
                    ) *
                    planet.data.distance;


                planet.mesh.position.z =
                    Math.sin(
                        planet.angle
                    ) *
                    planet.data.distance;


                planet.mesh.rotation.y +=
                    delta *
                    0.45 *
                    timeScale;

            }
        );


        /* MOON */

        const moonAngle =
            elapsed *
            1.8 *
            timeScale;


        moon.position.x =
            Math.cos(
                moonAngle
            ) * 1.5;


        moon.position.z =
            Math.sin(
                moonAngle
            ) * 1.5;

    }


    /* =====================================================
       REAL CAMERA FOLLOW
    ===================================================== */

    if (
        following
    ) {

        const planetPosition =
            new THREE.Vector3();


        following.getWorldPosition(
            planetPosition
        );


        /*
           Camera target luôn đi theo
           vị trí hiện tại của hành tinh.
        */

        controls.target.lerp(
            planetPosition,
            0.12
        );


        /*
           Tính hướng camera hiện tại
           rồi giữ khoảng cách tương đối.
        */

        const cameraDirection =
            new THREE.Vector3()
                .subVectors(
                    camera.position,
                    controls.target
                )
                .normalize();


        const desiredCameraPosition =
            planetPosition.clone()
                .add(
                    cameraDirection
                        .multiplyScalar(
                            Math.max(
                                following
                                    .userData
                                    .radius *
                                6,
                                5
                            )
                        )
                );


        camera.position.lerp(
            desiredCameraPosition,
            0.08
        );


        /*
           Vòng chọn cũng chạy theo
           hành tinh.
        */

        selectionRing.position.copy(
            planetPosition
        );


        selectionRing.rotation.z +=
            delta * 0.8;

    }


    controls.update();


    renderer.render(
        scene,
        camera
    );

}


animate();


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;


        camera.updateProjectionMatrix();


        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );


        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio,
                2
            )
        );

    }
);


/* =========================================================
   LOADING
========================================================= */

setTimeout(
    () => {

        document
            .getElementById(
                "loading"
            )
            .classList.add(
                "hidden"
            );

    },
    900
);