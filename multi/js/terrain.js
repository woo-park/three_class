let camera, scene, renderer, controls, mesh;

let image = document.querySelector('.height-map');
init();

if (image) {
  heightMap();
} else {
  image.addEventListener('load', heightMap);
}

function init() {
  scene = new THREE.Scene();

  let width = window.innerWidth;
  let height = window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, width/height, 1, 25000);
  camera.position.set(0, 300, 700);   //back on z axis - up to y
  scene.add(camera);

  let light = new THREE.DirectionalLight(0xfffffff, 1); // color, intensity   //similar to sun
  light.position.set(1, 1, 1); // location x, y, z
  scene.add(light);

  renderer = new THREE.WebGLRenderer({alpha: 1, antialias: true});
  renderer.setSize(width, height);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  document.body.appendChild(renderer.domElement);

  terrain();
}

function heightMap() {
  const canvas = document.getElementById('drawing');
  const context = canvas.getContext('2d');

  canvas.width = 200;
  canvas.height = 200;

  context.drawImage(image, 0, 0, 200, 200);

  let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  // console.log('imgwidth',imageData.width);
  // console.log('imgheight',imageData.height);

  let data = imageData.data; //giving individual pixel data

  return data;       
}


function terrain() {
  // importatnt from here
  data = heightMap();         //wait why do you need this bc it works without this;

  let material = new THREE.MeshLambertMaterial({wireframe: true, color: 0xffffff, side: THREE.DoubleSide});

  // width, height, segments
  let geometry = new THREE.PlaneGeometry(800, 800, 199, 199); //segments of 20 each
  mesh = new THREE.Mesh(geometry, material);

  console.log(mesh.geometry.vertices);
  //generate random heights for each vertex 
  for (let i = 0; i < mesh.geometry.vertices.length; i++){
    mesh.geometry.vertices[i].z = Math.floor(Math.random()*100);   
  }

  mesh.rotation.x = -Math.PI / 2; //rotate flat z- axis towards top

  //neccesary for adding light to the custom vertices
  geometry.computeVertexNormals();  //this assumems that we are working with mesh lambert material

  scene.add(mesh);

  animate();  // we need to animate it bc of orbitcontrol
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  //generate random heights for each vertex 
  //  for (let i = 0; i < mesh.geometry.vertices.length; i++){
  //   mesh.geometry.vertices[i].z = Math.floor(Math.random()*100);   
  // }
  // mesh.geometry.verticesNeedUpdate = true;

  controls.update();
}