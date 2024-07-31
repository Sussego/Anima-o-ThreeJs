import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Cena
const scene = new THREE.Scene();

// Câmera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controle de órbita
const controls = new OrbitControls(camera, renderer.domElement);

// Geometrias
const geometry1 = new THREE.BoxGeometry();
const geometry2 = new THREE.SphereGeometry();
const geometry3 = new THREE.ConeGeometry();

// Materiais
const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const material2 = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('textures/textura.jpg') });

// Meshes
const cube = new THREE.Mesh(geometry1, material1);
scene.add(cube);

const sphere = new THREE.Mesh(geometry2, material2);
sphere.position.x = -2;
scene.add(sphere);

const cone = new THREE.Mesh(geometry3, material2);
cone.position.x = 2;
scene.add(cone);

// Iluminação
const ambientLight = new THREE.AmbientLight(0x404040); // Luz ambiente
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Carregar modelo externo
const loader = new GLTFLoader();
loader.load('model/modelo.gltf', (gltf) => {
    const model = gltf.scene;
    model.position.y = -1;
    scene.add(model);
});

// Animação
const animate = () => {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

    cone.rotation.x += 0.01;
    cone.rotation.y += 0.01;

    controls.update();
    renderer.render(scene, camera);
};

animate();

// Ajustar o tamanho da janela
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
