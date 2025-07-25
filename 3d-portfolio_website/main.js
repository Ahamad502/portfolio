// main.js

// Variables for THREE.js scene
let scene, camera, renderer, particles;
let mouseX = 0, mouseY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function init() {
    // Create the main scene
    scene = new THREE.Scene();

    // Set up the camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;

    // Set up the renderer
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    createParticles();
    createFloatingGeometries();

    create3DElements();

    // Event listeners
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);

    animate();
}

function createParticles() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];

    for (let i = 0; i < 5000; i++) {
        vertices.push(THREE.MathUtils.randFloatSpread(2000));
        vertices.push(THREE.MathUtils.randFloatSpread(2000));
        vertices.push(THREE.MathUtils.randFloatSpread(2000));

        colors.push(Math.random());
        colors.push(Math.random() * 0.5 + 0.5);
        colors.push(1);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({ 
        size: 2, 
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.8
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

function createFloatingGeometries() {
    const geometries = [
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.SphereGeometry(0.7, 32, 32),
        new THREE.ConeGeometry(0.7, 1.5, 8),
        new THREE.TorusGeometry(0.7, 0.3, 16, 100)
    ];

    for (let i = 0; i < 20; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5),
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = (Math.random() - 0.5) * 100;
        mesh.position.y = (Math.random() - 0.5) * 100;
        mesh.position.z = (Math.random() - 0.5) * 100;
        mesh.rotation.x = Math.random() * 2 * Math.PI;
        mesh.rotation.y = Math.random() * 2 * Math.PI;

        scene.add(mesh);
    }
}

function create3DElements() {
    createAbout3D();

    createProject3D('project-3d-1', 1);
    createProject3D('project-3d-2', 2);
    createProject3D('project-3d-3', 3);

    createCertificate3D('cert-3d-1', 1);
    createCertificate3D('cert-3d-2', 2);
    createCertificate3D('cert-3d-3', 3);
    createCertificate3D('cert-3d-4', 4);
    createCertificate3D('cert-3d-5', 5);
    createCertificate3D('cert-3d-6', 6);
}

function createAbout3D() {
    const aboutContainer = document.getElementById('about-3d');
    if (!aboutContainer) return;

    const aboutScene = new THREE.Scene();
    const aboutCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const aboutRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    aboutRenderer.setSize(400, 400);
    aboutRenderer.setClearColor(0x000000, 0);
    aboutContainer.appendChild(aboutRenderer.domElement);

    const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
    const cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        wireframe: true,
        transparent: true,
        opacity: 0.8
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    aboutScene.add(cube);

    aboutCamera.position.z = 5;

    function animateAbout() {
        requestAnimationFrame(animateAbout);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        aboutRenderer.render(aboutScene, aboutCamera);
    }
    animateAbout();
}

function createProject3D(containerId, projectType) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const projectScene = new THREE.Scene();
    const projectCamera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const projectRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    projectRenderer.setSize(container.offsetWidth, container.offsetHeight);
    projectRenderer.setClearColor(0x1a1a2e, 1);
    container.appendChild(projectRenderer.domElement);

    let mesh;
    switch(projectType) {
        case 1:
            const torusGeometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
            const torusMaterial = new THREE.MeshBasicMaterial({
                color: 0xff00ff,
                wireframe: true
            });
            mesh = new THREE.Mesh(torusGeometry, torusMaterial);
            break;
        case 2:
            const octGeometry = new THREE.OctahedronGeometry(1.5);
            const octMaterial = new THREE.MeshBasicMaterial({
                color: 0x00ffff,
                wireframe: true
            });
            mesh = new THREE.Mesh(octGeometry, octMaterial);
            break;
        case 3:
            const icoGeometry = new THREE.IcosahedronGeometry(1.5);
            const icoMaterial = new THREE.MeshBasicMaterial({
                color: 0xffff00,
                wireframe: true
            });
            mesh = new THREE.Mesh(icoGeometry, icoMaterial);
            break;
    }

    projectScene.add(mesh);
    projectCamera.position.z = 4;

    function animateProject() {
        requestAnimationFrame(animateProject);
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.01;
        projectRenderer.render(projectScene, projectCamera);
    }
    animateProject();
}

function createCertificate3D(containerId, certType) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const certScene = new THREE.Scene();
    const certCamera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const certRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    certRenderer.setSize(container.offsetWidth, container.offsetHeight);
    certRenderer.setClearColor(0x1a1a2e, 1);
    container.appendChild(certRenderer.domElement);

    let mesh;
    const goldMaterial = new THREE.MeshBasicMaterial({
        color: 0xffd700,
        wireframe: true,
        transparent: true,
        opacity: 0.8
    });

    switch(certType) {
        case 1:
            const starGeometry = new THREE.ConeGeometry(1, 2, 5);
            mesh = new THREE.Mesh(starGeometry, goldMaterial);
            break;
        case 2:
            const dodecaGeometry = new THREE.DodecahedronGeometry(1.2);
            mesh = new THREE.Mesh(dodecaGeometry, goldMaterial);
            break;
        case 3:
            const torusKnotGeometry = new THREE.TorusKnotGeometry(0.8, 0.3, 100, 16);
            mesh = new THREE.Mesh(torusKnotGeometry, goldMaterial);
            break;
        case 4:
            const octGeometry = new THREE.OctahedronGeometry(1.3);
            mesh = new THREE.Mesh(octGeometry, goldMaterial);
            break;
        case 5:
            const tetraGeometry = new THREE.TetrahedronGeometry(1.5);
            mesh = new THREE.Mesh(tetraGeometry, goldMaterial);
            break;
        case 6:
            const icoGeometry = new THREE.IcosahedronGeometry(1.3);
            mesh = new THREE.Mesh(icoGeometry, goldMaterial);
            break;
    }

    certScene.add(mesh);
    certCamera.position.z = 4;

    function animateCert() {
        requestAnimationFrame(animateCert);
        mesh.rotation.x += 0.008;
        mesh.rotation.y += 0.012;
        certRenderer.render(certScene, certCamera);
    }
    animateCert();
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.0005;
    mouseY = (event.clientY - windowHalfY) * 0.0005;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate particles
    if (particles) {
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.001;
    }

    // Adjust camera position slightly based on mouse
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

// Initialize scene when DOM is ready
document.addEventListener('DOMContentLoaded', init);
