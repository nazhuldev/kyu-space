import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const space = document.getElementById("space");

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

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

space.appendChild(renderer.domElement);

const controls = new OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;
controls.dampingFactor = 0.07;

controls.enablePan = true;
controls.screenSpacePanning = true;

controls.minDistance = 2.5;
controls.maxDistance = 180;

controls.rotateSpeed = 0.65;
controls.zoomSpeed = 0.8;
controls.panSpeed = 1;

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

scene.add(stars, distantStars);

const sun = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
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

const sunGlows = [
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
        period: 87.969,
        eccentricity: 0.20563,
        meanLongitude: 252.25084,
        perihelion: 77.45779,
        rotationPeriod: 58.646,
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
        period: 224.701,
        eccentricity: 0.00677,
        meanLongitude: 181.97973,
        perihelion: 131.60261,
        rotationPeriod: -243.025,
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
        period: 365.256,
        eccentricity: 0.01671,
        meanLongitude: 100.46435,
        perihelion: 102.94719,
        rotationPeriod: 1,
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
        period: 686.98,
        eccentricity: 0.0934,
        meanLongitude: 355.45332,
        perihelion: 336.04084,
        rotationPeriod: 1.02596,
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
        period: 4332.589,
        eccentricity: 0.04849,
        meanLongitude: 34.40438,
        perihelion: 14.75385,
        rotationPeriod: 0.41354,
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
        period: 10759.22,
        eccentricity: 0.05551,
        meanLongitude: 49.94432,
        perihelion: 92.43194,
        rotationPeriod: 0.44401,
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
        period: 30685.4,
        eccentricity: 0.04686,
        meanLongitude: 313.23218,
        perihelion: 170.96424,
        rotationPeriod: -0.71833,
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
        period: 60189,
        eccentricity: 0.00895,
        meanLongitude: 304.88003,
        perihelion: 44.97135,
        rotationPeriod: 0.6713,
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

const planets = planetData.map(createPlanet);

const earth = planets.find(
    planet => planet.data.name === "Earth"
);

if (earth) {
    createMoon(earth);
}

const asteroidBelt = createAsteroidBelt();
scene.add(asteroidBelt);

const selectionRing = new THREE.Mesh(
    new THREE.RingGeometry(1, 1.08, 48),
    new THREE.MeshBasicMaterial({
        color: 0x73ffad,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
    })
);

selectionRing.rotation.x = Math.PI / 2;
selectionRing.visible = false;

scene.add(selectionRing);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const clock = new THREE.Clock();

const panel = document.getElementById("planetPanel");
const hoverName = document.getElementById("hoverName");
const pauseButton = document.getElementById("pauseButton");
const speedSlider = document.getElementById("speedSlider");
const speedValue = document.getElementById("speedValue");
const resetSpeedButton = document.getElementById("resetSpeed");

let hoveredPlanet = null;
let selectedPlanet = null;
let followingPlanet = null;

let lastFollowPosition = new THREE.Vector3();

let paused = false;

// timeScale = 1 nghĩa là chạy đúng tốc độ thời gian thực
// (1 giây ngoài đời = 1 giây mô phỏng). Lớn hơn 1 = tua nhanh hơn thời gian thực.
let timeScale = 1;

// Mốc thiên văn chuẩn J2000.0 (01/01/2000, 12:00 UTC) - dùng để tính
// vị trí thật của các hành tinh tại thời điểm hiện tại.
const J2000_MS = Date.UTC(2000, 0, 1, 12, 0, 0);

// 1 ngày = 86400 giây - dùng để quy đổi giây thật sang ngày mô phỏng.
const SECONDS_PER_DAY = 86400;

// Khởi tạo bằng đúng số ngày từ J2000 đến hiện tại -> hành tinh xuất
// hiện ở vị trí thật của chúng ngay khi tải trang.
let simulatedDays = (Date.now() - J2000_MS) / 86400000;

const simDateEl = document.getElementById("simDate");
let simDateAccumulator = 0;

let pointerDown = false;
let pointerButton = -1;
let movedDuringPointer = false;

renderer.domElement.addEventListener(
    "pointerdown",
    event => {
        pointerDown = true;
        pointerButton = event.button;
        movedDuringPointer = false;
    }
);

renderer.domElement.addEventListener(
    "pointermove",
    event => {
        if (
            pointerDown &&
            Math.abs(event.movementX) +
            Math.abs(event.movementY) >
            1
        ) {
            movedDuringPointer = true;
        }

        updateHover(event);
    }
);

renderer.domElement.addEventListener(
    "pointerup",
    event => {
        pointerDown = false;

        if (
            event.button === 0 &&
            !movedDuringPointer &&
            hoveredPlanet
        ) {
            selectPlanet(hoveredPlanet);
        }

        pointerButton = -1;
    }
);

renderer.domElement.addEventListener(
    "pointerleave",
    () => {
        hoverName.style.opacity = "0";
        hoveredPlanet = null;
    }
);

renderer.domElement.addEventListener(
    "contextmenu",
    event => {
        event.preventDefault();
    }
);

document
    .getElementById("closePanel")
    .addEventListener(
        "click",
        closePlanet
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
        timeScale = Number(
            speedSlider.value
        );

        speedValue.textContent =
            `${timeScale.toFixed(1)}x`;
    }
);

resetSpeedButton.addEventListener(
    "click",
    () => {
        timeScale = 1;
        speedSlider.value = "1";

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
            event.key.toLowerCase() === "r"
        ) {
            resetView();
        }
    }
);

window.addEventListener(
    "resize",
    resize
);

requestAnimationFrame(() => {
    document
        .getElementById("loading")
        .classList.add("hidden");
});

updateSimDateDisplay();
animate();

function createStars(
    count,
    radius,
    size,
    opacity
) {
    const positions =
        new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
        const distance =
            radius +
            Math.random() * 450;

        const theta =
            Math.random() * Math.PI * 2;

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
    const glow = new THREE.Mesh(
        new THREE.SphereGeometry(
            radius,
            20,
            20
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

function createOrbitPath(
    semiMajorAxis,
    eccentricity,
    perihelionDeg
) {
    const segments = 128;
    const points = [];
    const perihelionRad =
        THREE.MathUtils.degToRad(
            perihelionDeg
        );

    for (let i = 0; i <= segments; i++) {
        const trueAnomaly =
            (i / segments) * Math.PI * 2;

        // Bán kính tại 1 điểm bất kỳ trên elip (công thức quỹ đạo dạng cực, gốc tại tiêu điểm = Mặt Trời)
        const r =
            (semiMajorAxis *
                (1 - eccentricity * eccentricity)) /
            (1 + eccentricity * Math.cos(trueAnomaly));

        const angle =
            trueAnomaly + perihelionRad;

        points.push(
            new THREE.Vector3(
                Math.cos(angle) * r,
                0,
                Math.sin(angle) * r
            )
        );
    }

    const geometry =
        new THREE.BufferGeometry()
            .setFromPoints(points);

    const material =
        new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.085
        });

    const orbit =
        new THREE.LineLoop(
            geometry,
            material
        );

    scene.add(orbit);
}

// Giải phương trình Kepler M = E - e·sin(E) bằng Newton-Raphson
// để tìm dị thường lệch tâm (eccentric anomaly) E từ dị thường trung bình M.
function solveKeplerEquation(
    meanAnomaly,
    eccentricity
) {
    let E = meanAnomaly;

    for (let i = 0; i < 6; i++) {
        E -=
            (E -
                eccentricity * Math.sin(E) -
                meanAnomaly) /
            (1 - eccentricity * Math.cos(E));
    }

    return E;
}

// Tính vị trí (x, z) thật của hành tinh tại thời điểm "days" (số ngày
// tính từ mốc J2000), dựa trên các phần tử quỹ đạo Kepler thật của nó.
function computeOrbitPosition(
    data,
    days
) {
    const meanMotion =
        360 / data.period; // độ/ngày

    const meanLongitudeNow =
        data.meanLongitude +
        meanMotion * days;

    let meanAnomalyDeg =
        (meanLongitudeNow - data.perihelion) % 360;

    if (meanAnomalyDeg < 0) {
        meanAnomalyDeg += 360;
    }

    const meanAnomaly =
        THREE.MathUtils.degToRad(
            meanAnomalyDeg
        );

    const E =
        solveKeplerEquation(
            meanAnomaly,
            data.eccentricity
        );

    const trueAnomaly =
        2 *
        Math.atan2(
            Math.sqrt(1 + data.eccentricity) *
            Math.sin(E / 2),
            Math.sqrt(1 - data.eccentricity) *
            Math.cos(E / 2)
        );

    const r =
        data.distance *
        (1 - data.eccentricity * Math.cos(E));

    const angle =
        trueAnomaly +
        THREE.MathUtils.degToRad(
            data.perihelion
        );

    return {
        x: Math.cos(angle) * r,
        z: Math.sin(angle) * r
    };
}

function createPlanet(
    data
) {
    createOrbitPath(
        data.distance,
        data.eccentricity,
        data.perihelion
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
                    24,
                    24
                ),
                new THREE.MeshBasicMaterial({
                    color: 0x4da6ff,
                    transparent: true,
                    opacity: 0.18,
                    side: THREE.BackSide,
                    depthWrite: false
                })
            );

        mesh.add(atmosphere);
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

        mesh.add(rings);
    }

    return {
        mesh,
        data,
        moon: null
    };
}

function createMoon(
    planet
) {
    const moon =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.22,
                16,
                16
            ),
            new THREE.MeshStandardMaterial({
                color: 0xaaaaaa,
                roughness: 1
            })
        );

    moon.position.x = 1.5;

    planet.mesh.add(moon);

    planet.moon = moon;
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

    const helper =
        new THREE.Object3D();

    for (let i = 0; i < count; i++) {
        const angle =
            Math.random() *
            Math.PI * 2;

        const radius =
            19.5 +
            Math.random() * 2.8;

        helper.position.set(
            Math.cos(angle) * radius,
            (Math.random() - 0.5) * 0.35,
            Math.sin(angle) * radius
        );

        helper.scale.setScalar(
            0.5 + Math.random() * 2
        );

        helper.rotation.set(
            Math.random(),
            Math.random(),
            Math.random()
        );

        helper.updateMatrix();

        mesh.setMatrixAt(
            i,
            helper.matrix
        );
    }

    mesh.instanceMatrix.needsUpdate = true;

    return mesh;
}

function updateHover(event) {
    mouse.x =
        (event.clientX / window.innerWidth) * 2 - 1;

    mouse.y =
        -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(
        mouse,
        camera
    );

    const hits =
        raycaster.intersectObjects(
            planets.map(
                planet => planet.mesh
            )
        );

    if (!hits.length) {
        hoveredPlanet = null;
        hoverName.style.opacity = "0";
        return;
    }

    hoveredPlanet = hits[0].object;

    hoverName.textContent =
        hoveredPlanet.userData.name.toUpperCase();

    hoverName.style.left =
        `${event.clientX + 14}px`;

    hoverName.style.top =
        `${event.clientY + 14}px`;

    hoverName.style.opacity = "1";
}

function selectPlanet(
    planet
) {
    selectedPlanet = planet;
    followingPlanet = planet;

    selectionRing.visible = true;

    selectionRing.scale.setScalar(
        planet.userData.radius * 1.6
    );

    updatePlanetPanel(
        planet.userData
    );

    const target =
        getWorldPosition(
            planet
        );

    const direction =
        new THREE.Vector3(
            0,
            0.3,
            1
        );

    if (camera.position.lengthSq() > 0) {
        direction
            .subVectors(
                camera.position,
                target
            )
            .normalize();
    }

    const distance =
        Math.max(
            planet.userData.radius * 6,
            5
        );

    camera.position.copy(
        target.clone().add(
            direction.multiplyScalar(
                distance
            )
        )
    );

    controls.target.copy(target);

    lastFollowPosition.copy(target);
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

function closePlanet() {
    followingPlanet = null;
    selectedPlanet = null;

    selectionRing.visible = false;

    panel.classList.remove(
        "active"
    );
}

function resetView() {
    followingPlanet = null;
    selectedPlanet = null;

    selectionRing.visible = false;

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

    // Đưa thời gian mô phỏng quay về đúng thời điểm thực tế hiện tại
    simulatedDays =
        (Date.now() - J2000_MS) /
        86400000;

    timeScale = 1;
    speedSlider.value = "1";

    speedValue.textContent =
        `${timeScale.toFixed(1)}x`;

    updateSimDateDisplay();
}

function togglePause() {
    paused = !paused;

    pauseButton.textContent =
        paused
            ? "PLAY"
            : "PAUSE";
}

function updatePlanets(
    delta
) {
    if (paused) {
        return;
    }

    const simDaysThisFrame =
        (delta / SECONDS_PER_DAY) *
        timeScale;

    simulatedDays +=
        simDaysThisFrame;

    planets.forEach(
        planet => {
            const position =
                computeOrbitPosition(
                    planet.data,
                    simulatedDays
                );

            planet.mesh.position.x =
                position.x;

            planet.mesh.position.z =
                position.z;

            // Mỗi hành tinh tự quay theo đúng chu kỳ thật của nó
            // (chu kỳ âm = quay ngược, như Sao Kim và Sao Thiên Vương ngoài đời).
            const rotationPeriod =
                planet.data.rotationPeriod;

            const rotationSpeed =
                (Math.PI * 2 / Math.abs(rotationPeriod)) *
                Math.sign(rotationPeriod);

            planet.mesh.rotation.y +=
                rotationSpeed *
                simDaysThisFrame;

            if (planet.moon) {
                // Mặt Trăng quay quanh Trái Đất với chu kỳ thật ~27.322 ngày
                const moonAngle =
                    (simulatedDays / 27.322) *
                    Math.PI * 2;

                planet.moon.position.x =
                    Math.cos(
                        moonAngle
                    ) * 1.5;

                planet.moon.position.z =
                    Math.sin(
                        moonAngle
                    ) * 1.5;
            }
        }
    );

    simDateAccumulator +=
        simDaysThisFrame > 0
            ? delta
            : 0;

    if (simDateAccumulator > 0.4) {
        updateSimDateDisplay();
        simDateAccumulator = 0;
    }
}

function updateSimDateDisplay() {
    if (!simDateEl) {
        return;
    }

    const date =
        new Date(
            J2000_MS +
            simulatedDays * 86400000
        );

    simDateEl.textContent =
        `MÔ PHỎNG: ${date.toLocaleString(
            "vi-VN",
            {
                dateStyle: "medium",
                timeStyle: "short"
            }
        )}`;
}

function updateFollow() {
    if (!followingPlanet) {
        return;
    }

    const currentPosition =
        getWorldPosition(
            followingPlanet
        );

    const delta =
        currentPosition
            .clone()
            .sub(lastFollowPosition);

    if (delta.lengthSq() > 0) {
        camera.position.add(delta);
        controls.target.add(delta);
    }

    lastFollowPosition.copy(
        currentPosition
    );

    selectionRing.position.copy(
        currentPosition
    );
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

    sunGlows[0].scale.setScalar(
        1 +
        Math.sin(elapsed * 2) *
        0.025
    );

    sunGlows[1].scale.setScalar(
        1 +
        Math.sin(elapsed * 1.4) *
        0.035
    );

    sunGlows[2].scale.setScalar(
        1 +
        Math.sin(elapsed * 0.8) *
        0.025
    );

    asteroidBelt.rotation.y +=
        delta * 0.0008;

    updatePlanets(
        delta
    );

    updateFollow();

    selectionRing.rotation.z +=
        delta * 0.8;

    controls.update();

    renderer.render(
        scene,
        camera
    );
}

function resize() {
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