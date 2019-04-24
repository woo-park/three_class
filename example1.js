let camera, scene, renderer;
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

    // geometry = new THREE.BoxGeometry(200, 200, 200); //width , height , depth
    // geometry = new THREE.OctahedronGeometry(200, 0); //radius, additional verdices
    geometry = new THREE.SphereGeometry(100, 10, 10); 
    material = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe: true} );   //octal hex color
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
    document.body.appendChild(renderer.domElement);

    renderer.render(scene, camera);     //render the scene from camera perspective

}
animate();
function animate() {
    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render(scene, camera);


}