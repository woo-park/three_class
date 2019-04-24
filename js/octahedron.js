let camera, scene, renderer, controls;
let geometry, material, mesh;

const container = document.getElementById('container');

init();

function init() {
    scene = new THREE.Scene();
    let width = window.innerWidth;
    let height = window.innerHeight;

    //field of view, spect ratio, new clipping plane, far clipping plane
    camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 25000); //field of view 45deg, aspect ratio(dont want it squished), near frustumm, far clipping plane,
    camera.position.z = 700;        //indicates that we want to back out a bit on the z-axis 
    camera.position.y = 100;        //indicates that we want to back out a bit on the z-axis 
    scene.add(camera);

    let light = new THREE.DirectionalLight(0xffffff, 1);    //intensitiy floating number between 0 and one
    light.position.set(1, 1, 1); //location x , y , and z axis //its not pixel position based        //using set method this timem
    scene.add(light);

    let pointLight = new THREE.PointLight(0xff00ff, 1, 1000);   //color, intensity, distance
    pointLight.position.set(-400, 400, 400);
    scene.add(pointLight);
    
    // geometry = new THREE.BoxGeometry(200, 200, 200); //width , height , depth
    // geometry = new THREE.OctahedronGeometry(200, 0); //radius, additional verdices
    geometry = new THREE.SphereGeometry(100, 100, 10);  // mmore verdices better sphere
    // material = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe: true} );   //octal hex color
    // material = new THREE.MeshPhongMaterial( {color: 0x808080});   //boring - no depth perception here - mmesh basic material doesn't recieve lights - there are three light sources
    material = new THREE.MeshStandardMaterial( {color: 0x808080}); 
    // material = new THREE.MeshLamsommethingMaterial( {color: 0x808080});     


    //directional light - resemmbles the sun, ammbient ligths, 

    mesh = new THREE.Mesh(geometry, material); //combining geometry with material

    mesh.position.y = 120; //moves up position of mesh
    scene.add(mesh);

    let planeGeometry = new THREE.PlaneGeometry(1000,1000, 10, 10); //width and height 1000, and 
    let planeMaterial = new THREE.MeshBasicMaterial( {color:0xffffff, wireframe:true} );
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = Math.PI /2;
    scene.add(plane);

    renderer = new THREE.WebGLRenderer( {alpha: 1, antialias: true} );  //antialias makes it smoother scene
    renderer.setSize(width, height);
    // container.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    document.body.appendChild(renderer.domElement);

    renderer.render(scene, camera);     //render the scene from camera perspective

}
animate();
function animate() {
    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render(scene, camera);
    controls.update();


}