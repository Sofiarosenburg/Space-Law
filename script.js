// script.js


const yearSlider = document.getElementById('year-slider');
const yearValue = document.getElementById('year-value');
const satelliteCount = document.getElementById('satellite-count');
const debrisCount = document.getElementById('debris-count');

const treatyButtons = document.querySelectorAll('.treaty-buttons button');
const treatyContents = document.querySelectorAll('.treaty-content');

const cards = document.querySelectorAll('.card');

function getSatelliteCount(year) {
  
  if (year < 1990) {
    
    return Math.floor(10 + (year - 1960) * 5);
  } else if (year < 2010) {
    
    return Math.floor(160 + (year - 1990) * 200);
  } else if (year <= 2025) {
    
    return Math.floor(4160 + (year - 2010) * 600);
  } else {
   
    return 15000;
  }
}

function getDebrisCount(year) {
  if (year < 1990) {
    return Math.floor((year - 1960) * 0.1); 
  } else if (year < 2010) {
    return Math.floor(3 + (year - 1990) * 2); 
  } else if (year <= 2025) {
    
    let yearsAfter2010 = year - 2010;
    return Math.floor(43 * Math.pow(1.2, yearsAfter2010)); 
  } else {
    return 130; 
  }
}

yearSlider.addEventListener('input', () => {
  const year = +yearSlider.value;
  yearValue.textContent = year;

  satelliteCount.textContent = getSatelliteCount(year);
  debrisCount.textContent = getDebrisCount(year);

  updateGlobe(year);
});

function toggleTreaty(treatyId) {
  treatyContents.forEach(content => {
    if(content.id === treatyId) {
      content.classList.toggle('hidden');
    } else {
      content.classList.add('hidden');
    }
  });
}

cards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});


let scene, camera, renderer;
let globe;
let animationId;

function initGlobe() {
  const canvas = document.getElementById('globe-canvas');

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 3;

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 3, 5);
  scene.add(directionalLight);

  const geometry = new THREE.SphereGeometry(1, 64, 64);
  const textureLoader = new THREE.TextureLoader();

  const earthTexture = textureLoader.load('https://cdn.jsdelivr.net/gh/jeromeetienne/threex.planets@master/images/earthmap1k.jpg');
  const earthMaterial = new THREE.MeshPhongMaterial({ map: earthTexture });

  globe = new THREE.Mesh(geometry, earthMaterial);
  scene.add(globe);

  animate();
}

function animate() {
  animationId = requestAnimationFrame(animate);

  globe.rotation.y += 0.0015;

  renderer.render(scene, camera);
}

function updateGlobe(year) {
  
  const scale = 1 + (getSatelliteCount(year) / 500);
  globe.scale.set(scale, scale, scale);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

document.addEventListener('DOMContentLoaded', () => {
  yearValue.textContent = yearSlider.value;
  satelliteCount.textContent = getSatelliteCount(+yearSlider.value);
  debrisCount.textContent = getDebrisCount(+yearSlider.value);

  initGlobe();

  treatyButtons.forEach(button => {
    button.addEventListener('click', () => toggleTreaty(button.getAttribute('onclick').match(/'([^']+)'/)[1]));
  });
});
