function toggleFact(card) {
  card.classList.toggle('flipped');
}

function toggleTreaty(treatyId) {
  const allTreaties = ['outerspace', 'rescue', 'liability', 'registration', 'moon'];
  allTreaties.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });
  const selected = document.getElementById(treatyId);
  if (selected) selected.classList.remove('hidden');
}

const yearSlider = document.getElementById('year-slider');
const yearValue = document.getElementById('year-value');
const satelliteCount = document.getElementById('satellite-count');
const debrisCount = document.getElementById('debris-count');

let scene, camera, renderer, earth, debrisGroup;

init();
animate();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('globe-canvas'),
    alpha: true,
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0x0077be, wireframe: true });
  earth = new THREE.Mesh(geometry, material);
  scene.add(earth);

  debrisGroup = new THREE.Group();
  scene.add(debrisGroup);

  yearSlider.addEventListener('input', onYearChange);
  onYearChange();

  // Move timeline after introduction
  const intro = document.getElementById('intro');
  const timeline = document.getElementById('timeline-container');
  if (intro && timeline) {
    intro.parentNode.insertBefore(timeline, intro.nextSibling);
  }
}

function onYearChange() {
  const year = parseInt(yearSlider.value);
  yearValue.textContent = year;

  const satellites = Math.floor((year - 1960) * 5);
  const debris = year - 1950;

  satelliteCount.textContent = satellites;
  debrisCount.textContent = debris;

  while (debrisGroup.children.length > 0) {
    const obj = debrisGroup.children[0];
    debrisGroup.remove(obj);
    obj.geometry.dispose();
    obj.material.dispose();
  }

  for (let i = 0; i < debris; i++) {
    const geometry = new THREE.SphereGeometry(0.02, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const mesh = new THREE.Mesh(geometry, material);

    const radius = Math.random() * 2 + 1.2;
    const phi = Math.random() * Math.PI;
    const theta = Math.random() * 2 * Math.PI;

    mesh.position.x = radius * Math.sin(phi) * Math.cos(theta);
    mesh.position.y = radius * Math.sin(phi) * Math.sin(theta);
    mesh.position.z = radius * Math.cos(phi);

    debrisGroup.add(mesh);
  }
}

function animate() {
  requestAnimationFrame(animate);
  earth.rotation.y += 0.001;
  renderer.render(scene, camera);
}