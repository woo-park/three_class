let camera, scene, renderer, controls;

init();
animate();

function init() {
    //scence, light, camera, shapes - render on to shader code
    scene = new THREE.Scene();
    let width = window.innerWidth;
    let height = window.innerHeight;

    camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 25000);        //aspect ratio - rendering same ratio as the window
    camera.position.z = 700; //back out a bit
    camera.position.y = 200; //back out a bit
    scene.add(camera);

    let light = new THREE.DirectionalLight(0xffffff,1);
    light.position.set(1,1,1);
    scene.add(light);

    let spotlight = new THREE.SpotLight(0xffffff, 0.8, 2000);   //color intensity of light and distance of the object
    spotlight.position.set(500,500,500);
    spotlight.castShadow = true;

    //shadow mamp texture width in pixels
    spotlight.shadow.mapSize.width = 4096;
    //shadow mamp texture height in pixels
    spotlight.shadow.mapSize.height = 4096;

    //perspective shadow camera frustum near parameter 
    spotlight.shadow.camera.near = 500;
    //perspective shadow camera frustum far parameter 
    spotlight.shadow.camera.far = 2000;
    //perspective shadow camera frustum near parameter 
    spotlight.shadow.camera.fov = 45;
    
    scene.add(spotlight);

    let helper = new THREE.CameraHelper(spotlight.shadow.camera);
    scene.add(helper);

    let textureLoader = new THREE.TextureLoader();

    textureLoader.load('images/marble.jpg', function(texture){

        let material = new THREE.MeshBasicMaterial({map: texture});   

        let sphereGeometry = new THREE.SphereGeometry(100,50,50);
        let sphere = new THREE.Mesh(sphereGeometry, material);
        sphere.position.y = 100;
        sphere.castShadow = true;
        scene.add(sphere);

        //radius, tube diamm. radial segements, tube segmments
        let octahedronGeometry = new THREE.OctahedronGeometry(100,0);
        let octahedron = new THREE.Mesh(octahedronGeometry, material);
        octahedron.position.y = 100; 
        octahedron.position.x = 250;
        octahedron.castShadow = true;
        scene.add(octahedron);


        //radius, tube diamm. radial segements, tube segmments
        let torusGeometry = new THREE.torusGeometry(75, 25, 25, 100);
        let torus = new THREE.Mesh(torusGeometry, material);
        torus.position.y = 100; 
        torus.position.x = -250;
        torus.castShadow = true;
        scene.add(torus);
    });


    

    textureLoader.load('image/oil.jpg', function(texture) {
        let planeGeometry = new THREE.PlaneGeometry(1000,1000,10,10);
        let planeMaterial = new THREE.MeshStandardMaterial({map: texture, side: THREE.DoubleSide});
        let plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = Math.PI / -2;    // radians
        plane.receiveShadow = true;
        scene.add(plane);
    });


    renderer = new THREE.WebGLRenderer({alpha: 1, antialias: true});
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;

    
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    document.body.appendChild(renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);             //60 frames per seconds
    controls.update();
}
