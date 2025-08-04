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
    return Math.floor(50 + (year - 1960) * 15);
  } else if (year < 2010) {
    return Math.floor(500 + (year - 1990) * 175);
  } else if (year <= 2025) {
    return Math.floor(4000 + (year - 2010) * 600);
  } else {
    return Math.floor(13100 + (year - 2025) * 1000);
  }
}

function getDebrisCount(year) {
  if (year < 1990) {
    return Math.floor(100 + (year - 1960) * 30);
  } else if (year < 2010) {
    return Math.floor(1000 + (year - 1990) * 500);
  } else if (year <= 2025) {
    let yearsAfter2010 = year - 2010;
    return Math.floor(11000 * Math.pow(1.08, yearsAfter2010));
  } else {
    let yearsAfter2025 = year - 2025;
    return Math.floor(36000 + yearsAfter2025 * 500);
  }
}

yearSlider.addEventListener('input', () => {
  const year = +yearSlider.value;
  yearValue.textContent = year;
  satelliteCount.textContent = getSatelliteCount(year);
  debrisCount.textContent = getDebrisCount(year);
});

function toggleTreaty(treatyId) {
  treatyContents.forEach(content => {
    if (content.id === treatyId) {
      content.classList.toggle('hidden');
    } else {
      content.classList.add('hidden');
    }
  });
}

treatyButtons.forEach(button => {
  button.addEventListener('click', () => {
    const treatyId = button.getAttribute('data-treaty');
    toggleTreaty(treatyId);
  });
});

// Habilita o flip das cartas
cards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const year = +yearSlider.value;
  yearValue.textContent = year;
  satelliteCount.textContent = getSatelliteCount(year);
  debrisCount.textContent = getDebrisCount(year);
});
