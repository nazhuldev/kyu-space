import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const container = document.getElementById("space");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
);

camera.position.set(0, 18, 48);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance"
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 1.5)
);

renderer.outputColorSpace =
    THREE.SRGBColorSpace;

renderer.toneMapping =
    THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure = 1.2;

container.appendChild(renderer.domElement);

const controls = new OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;
controls.dampingFactor = 0.06;

controls.enablePan = true;
controls.screenSpacePanning = true;

controls.minDistance = 2.5;
controls.maxDistance = 180;

controls.rotateSpeed = 0.65;
controls.panSpeed = 0.8;
controls.zoomSpeed = 0.8;

controls.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.PAN
};

renderer.domElement.addEventListener(
    "contextmenu",
    event => event.preventDefault()
);

scene.add(
    new THREE.AmbientLight(
        0xffffff,
        0.025
    )
);

const stars = createStars(
    3500,
    250,
    0.55,
    0.7
);

const distantStars = createStars(
    700,
    120,
    0.8,
    0.5
);

scene.add(
    stars,
    distantStars
);

const sun = new THREE.Mesh(
    new THREE.SphereGeometry(
        3,
        32,
        32
    ),
    new THREE.MeshBasicMaterial({
        color: 0xffc45c
    })
);

scene.add(sun);

const sunLight = new THREE.PointLight(
    0xffdda0,
    550,
    500
);

sun.add(sunLight);

const sunGlow = [
    createSunGlow(3.8, 0.14),
    createSunGlow(4.6, 0.06),
    createSunGlow(5.5, 0.025)
];

const planetData = [
    {
        name: "Mercury",
        radius: 0.45,
        distance: 6,
        color: 0x8c8c8c,
        orbitSpeed: 0.018,
        info: {
            type: "TERRESTRIAL PLANET",
            distance: "57.9 million km",
            diameter: "4,879 km",
            temperature: "167°C",
            moons: "0",
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
            type: "TERRESTRIAL PLANET",
            distance: "108.2 million km",
            diameter: "12,104 km",
            temperature: "464°C",
            moons: "0",
            description:
                "Sao Kim là hành tinh nóng nhất trong Hệ Mặt Trời, với bầu khí quyển CO₂ rất dày."
        }
    },

    {
        name: "Earth",
        radius: 0.85,
        distance: 13,
        color: 0x367fc8,
        orbitSpeed: 0.01,
        info: {
            type: "TERRESTRIAL PLANET",
            distance: "149.6 million km",
            diameter: "12,742 km",
            temperature: "15°C",
            moons: "1",
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
            type: "TERRESTRIAL PLANET",
            distance: "227.9 million km",
            diameter: "6,779 km",
            temperature: "-63°C",
            moons: "2",
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
            type: "GAS GIANT",
            distance: "778.5 million km",
            diameter: "139,820 km",
            temperature: "-110°C",
            moons: "101",
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
            type: "GAS GIANT",
            distance: "1.43 billion km",
            diameter: "116,460 km",
            temperature: "-140°C",
            moons: "274",
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
            type: "ICE GIANT",
            distance: "2.87 billion km",
            diameter: "50,724 km",
            temperature: "-195°C",
            moons: "28",
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
            type: "ICE GIANT",
            distance: "4.50 billion km",
            diameter: "49,244 km",
            temperature: "-200°C",
            moons: "16",
            description:
                "Sao Hải Vương là hành tinh lớn nằm xa Mặt Trời nhất trong Hệ Mặt Trời."
        }
    }
];

const planets = planetData.map(
    createPlanet
);

const earth = planets.find(
    planet => planet.data.name === "Earth"
);

createMoon(earth);

const asteroidBelt =
    createAsteroidBelt();

scene.add(asteroidBelt);

const selectionRing = new THREE.Mesh(
    new THREE.RingGeometry(
        1,
        1.08,
        48
    ),
    new THREE.MeshBasicMaterial({
        color: 0x73ffad,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
    })
);

selectionRing.rotation.x =
    Math.PI / 2;

selectionRing.visible = false;

scene.add(selectionRing);

const raycaster =
    new THREE.Raycaster();

const mouse =
    new THREE.Vector2();

const clock =
    new THREE.Clock();

let hoveredPlanet = null;
let selectedPlanet = null;
let followingPlanet = null;

let followPosition = new THREE.Vector3();

let paused = false;
let timeScale = 1;

const panel =
    document.getElementById(
        "planetPanel"
    );

const hoverName =
    document.getElementById(
        "hoverName"
    );

const pauseButton =
    document.getElementById(
        "pauseButton"
    );

const speedSlider =
    document.getElementById(
        "speedSlider"
    );

const speedValue =
    document.getElementById(
        "speedValue"
    );

renderer.domElement.addEventListener(
    "pointermove",
    handlePointerMove
);

renderer.domElement.addEventListener(
    "click",
    handleClick
);

document
    .getElementById("closePanel")
    .addEventListener(
        "click",
        closePlanetPanel
    );

document
    .getElementById("resetView")
    .addEventListener(
        "click",
        resetView
    );

pauseButton.addEventListener(
    "click",
    togglePause
);

speedSlider.addEventListener(
    "input",
    () => {
        timeScale =
            Number(
                speedSlider.value
            );

        speedValue.textContent =
            `${timeScale.toFixed(1)}x`;
    }
);

window.addEventListener(
    "keydown",
    event => {
        if (event.code === "Space") {
            event.preventDefault();
            togglePause();
        }

        if (
            event.key.toLowerCase()
            === "r"
        ) {
            resetView();
        }
    }
);

window.addEventListener(
    "resize",
    handleResize
);

animate();

requestAnimationFrame(
    () => {
        document
            .getElementById(
                "loading"
            )
            .classList.add(
                "hidden"
            );
    }
);

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
        const distance =
            radius +
            Math.random() * 450;

        const theta =
            Math.random() *
            Math.PI * 2;

        const phi =
            Math.acos(
                2 * Math.random() - 1
            );

        positions[i * 3] =
            distance *
            Math.sin(phi) *
            Math.cos(theta);

        positions[i * 3 + 1] =
            distance *
            Math.cos(phi);

        positions[i * 3 + 2] =
            distance *
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

function createSunGlow(
    radius,
    opacity
) {
    const glow =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                radius,
                24,
                24
            ),
            new THREE.MeshBasicMaterial({
                color: 0xff9c2e,
                transparent: true,
                opacity,
                side: THREE.BackSide,
                depthWrite: false
            })
        );

    sun.add(glow);

    return glow;
}

function createOrbit(
    radius
) {
    const geometry =
        new THREE.RingGeometry(
            radius - 0.012,
            radius + 0.012,
            96
        );

    const material =
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.085,
            side: THREE.DoubleSide
        });

    const orbit =
        new THREE.Mesh(
            geometry,
            material
        );

    orbit.rotation.x =
        Math.PI / 2;

    scene.add(orbit);
}

function createPlanet(
    data
) {
    createOrbit(
        data.distance
    );

    const mesh =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                data.radius,
                32,
                32
            ),
            new THREE.MeshStandardMaterial({
                color: data.color,
                roughness: 0.85
            })
        );

    mesh.position.x =
        data.distance;

    mesh.userData = {
        name: data.name,
        info: data.info,
        radius: data.radius
    };

    scene.add(mesh);

    if (data.name === "Earth") {
        const atmosphere =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    data.radius * 1.12,
                    32,
                    32
                ),
                new THREE.MeshBasicMaterial({
                    color: 0x4da6ff,
                    transparent: true,
                    opacity: 0.2,
                    side: THREE.BackSide,
                    depthWrite: false
                })
            );

        mesh.add(
            atmosphere
        );
    }

    if (data.name === "Saturn") {
        const rings =
            new THREE.Mesh(
                new THREE.RingGeometry(
                    1.9,
                    3,
                    64
                ),
                new THREE.MeshBasicMaterial({
                    color: 0xc9b88e,
                    transparent: true,
                    opacity: 0.72,
                    side: THREE.DoubleSide
                })
            );

        rings.rotation.x =
            Math.PI / 2.3;

        mesh.add(
            rings
        );
    }

    return {
        mesh,
        data,
        angle:
            Math.random() *
            Math.PI * 2,
        moon: null
    };
}

function createMoon(
    parent
) {
    const moon =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.22,
                20,
                20
            ),
            new THREE.MeshStandardMaterial({
                color: 0xaaaaaa,
                roughness: 1
            })
        );

    moon.position.x =
        1.5;

    parent.mesh.add(
        moon
    );

    parent.moon =
        moon;
}

function createAsteroidBelt() {
    const count = 450;

    const geometry =
        new THREE.IcosahedronGeometry(
            0.035,
            0
        );

    const material =
        new THREE.MeshBasicMaterial({
            color: 0x777168
        });

    const mesh =
        new THREE.InstancedMesh(
            geometry,
            material,
            count
        );

    const dummy =
        new THREE.Object3D();

    for (
        let i = 0;
        i < count;
        i++
    ) {
        const angle =
            Math.random() *
            Math.PI * 2;

        const radius =
            19.5 +
            Math.random() * 2.8;

        dummy.position.set(
            Math.cos(angle) *
            radius,
            (Math.random() - 0.5) *
            0.35,
            Math.sin(angle) *
            radius
        );

        dummy.scale.setScalar(
            0.5 +
            Math.random() * 2
        );

        dummy.rotation.set(
            Math.random(),
            Math.random(),
            Math.random()
        );

        dummy.updateMatrix();

        mesh.setMatrixAt(
            i,
            dummy.matrix
        );
    }

    mesh.instanceMatrix.needsUpdate =
        true;

    return mesh;
}

function handlePointerMove(
    event
) {
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

    const intersections =
        raycaster.intersectObjects(
            planets.map(
                planet =>
                    planet.mesh
            )
        );

    if (
        intersections.length
    ) {
        hoveredPlanet =
            intersections[0].object;

        renderer.domElement.style.cursor =
            "pointer";

        hoverName.textContent =
            hoveredPlanet
                .userData
                .name
                .toUpperCase();

        hoverName.style.left =
            `${event.clientX + 14}px`;

        hoverName.style.top =
            `${event.clientY + 14}px`;

        hoverName.style.opacity =
            "1";

        return;
    }

    hoveredPlanet = null;

    renderer.domElement.style.cursor =
        "grab";

    hoverName.style.opacity =
        "0";
}

function handleClick() {
    if (!hoveredPlanet) {
        return;
    }

    selectPlanet(
        hoveredPlanet
    );
}

function selectPlanet(
    planet
) {
    selectedPlanet =
        planet;

    followingPlanet =
        planet;

    selectionRing.visible =
        true;

    selectionRing.scale.setScalar(
        planet.userData.radius *
        1.6
    );

    updatePlanetPanel(
        planet.userData
    );

    const position =
        getWorldPosition(
            planet
        );

    const direction =
        camera.position
            .clone()
            .sub(position);

    if (
        direction.lengthSq() <
        0.01
    ) {
        direction.set(
            0,
            0.3,
            1
        );
    }

    direction.normalize();

    const distance =
        Math.max(
            planet.userData.radius *
            6,
            5
        );

    const destination =
        position.clone().add(
            direction.multiplyScalar(
                distance
            )
        );

    camera.position.copy(
        destination
    );

    controls.target.copy(
        position
    );

    followPosition.copy(
        position
    );
}

function updatePlanetPanel(
    planet
) {
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

    document.getElementById(
        "followingName"
    ).textContent =
        planet.name.toUpperCase();

    panel.classList.add(
        "active"
    );
}

function closePlanetPanel() {
    followingPlanet = null;
    selectedPlanet = null;

    selectionRing.visible =
        false;

    panel.classList.remove(
        "active"
    );
}

function resetView() {
    followingPlanet = null;
    selectedPlanet = null;

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

    panel.classList.remove(
        "active"
    );
}

function togglePause() {
    paused =
        !paused;

    pauseButton.textContent =
        paused
            ? "PLAY"
            : "PAUSE";
}

function getWorldPosition(
    object
) {
    const position =
        new THREE.Vector3();

    object.getWorldPosition(
        position
    );

    return position;
}

function updatePlanets(
    delta,
    elapsed
) {
    if (paused) {
        return;
    }

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

            if (planet.moon) {
                const moonAngle =
                    elapsed *
                    1.8 *
                    timeScale;

                planet.moon.position.x =
                    Math.cos(
                        moonAngle
                    ) * 1.5;

                planet.moon.position.z =
                    Math.sin(
                        moonAngle
                    ) * 1.5;

                planet.moon.rotation.y +=
                    delta *
                    0.4 *
                    timeScale;
            }
        }
    );
}

function updateCameraFollow() {
    if (!followingPlanet) {
        return;
    }

    const currentPosition =
        getWorldPosition(
            followingPlanet
        );

    const movement =
        currentPosition
            .clone()
            .sub(followPosition);

    if (
        movement.lengthSq() >
        0
    ) {
        camera.position.add(
            movement
        );

        controls.target.add(
            movement
        );
    }

    followPosition.copy(
        currentPosition
    );

    selectionRing.position.copy(
        currentPosition
    );
}

function animate() {
    requestAnimationFrame(
        animate
    );

    const delta =
        clock.getDelta();

    const elapsed =
        clock.elapsedTime;

    stars.rotation.y +=
        delta * 0.001;

    distantStars.rotation.y +=
        delta * 0.002;

    sun.rotation.y +=
        delta * 0.12;

    sunGlow[0].scale.setScalar(
        1 +
        Math.sin(
            elapsed * 2
        ) * 0.025
    );

    sunGlow[1].scale.setScalar(
        1 +
        Math.sin(
            elapsed * 1.4
        ) * 0.035
    );

    sunGlow[2].scale.setScalar(
        1 +
        Math.sin(
            elapsed * 0.8
        ) * 0.025
    );

    asteroidBelt.rotation.y +=
        delta * 0.0008;

    updatePlanets(
        delta,
        elapsed
    );

    updateCameraFollow();

    selectionRing.rotation.z +=
        delta * 0.8;

    controls.update();

    renderer.render(
        scene,
        camera
    );
}

function handleResize() {
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
            1.5
        )
    );
}