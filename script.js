// Demo asset arrays
const assets = {
  orange: [
    "./images/iphone-gold.png",
    "./images/orange1.png",
    "./images/orange2.png"
  ],
  black: [
    "./images/iphone-black.png",
    "./images/blue1.png",
    "./images/blue2.png"
  ],
  white: [
    "./images/iphone-blue.png",
    "./images/white1.png",
    "./images/white2.png"
  ],
};
const sharedVideo = {
  src: "./images/Apple iPhone 17 pro.mp4",
  poster: "https://dummyimage.com/320x320/fa8231/222?text=iPhone+17"
};

const colorNames = {
  orange: "Cosmic Orange",
  black: "Deep Blue",
  white: "Silver"
};

let selectedColor = 'orange', selectedStorage = 512, selectedRam = 6;
let carouselIndex = 0;

function buildCarousel() {
  const area = document.getElementById('mediaCarousel');
  area.innerHTML = ''; 
  // Images
  assets[selectedColor].forEach((url, i) => {
    const img = document.createElement('img');
    img.src = url;
   img.alt = `${colorNames[selectedColor]} ${i + 1}`;

    img.className = "carousel-item";
    if (i === 0) img.classList.add('show');
    area.appendChild(img);
  });
  // Video

const vid = document.createElement('video');
vid.className = "carousel-item";
vid.autoplay = true;    
vid.muted = true;       
vid.loop = true;       
vid.playsInline = true; 
vid.controls = true;  

const src = document.createElement('source');
src.src = sharedVideo.src;
src.type = "video/mp4";
vid.appendChild(src);



area.appendChild(vid);

  // Controls
  const controls = document.createElement('div');
  controls.className = "media-controls";
  controls.innerHTML = `<button onclick="prevMedia()">&#8592;</button>
    <span id="carouselIndicator">1/4</span>
    <button onclick="nextMedia()">&#8594;</button>`;
  area.appendChild(controls);
  carouselIndex = 0;
  updateCarousel();
}

function updateCarousel() {
  const items = document.querySelectorAll('.carousel-item');
  items.forEach((itm, i) => {
    itm.classList.toggle('show', i === carouselIndex);

    if (itm.tagName === "VIDEO") {
      if (i === carouselIndex) {
        itm.play().catch(err => console.log("Autoplay blocked:", err));
      } else {
        itm.pause();
      }
    }
  });
  document.getElementById('carouselIndicator').textContent =
    `${carouselIndex + 1}/${items.length}`;
}

// Carousel controls must be global
window.prevMedia = function() {
  const total = document.querySelectorAll('.carousel-item').length;
  carouselIndex = (carouselIndex - 1 + total) % total;
  updateCarousel();
};
window.nextMedia = function() {
  const total = document.querySelectorAll('.carousel-item').length;
  carouselIndex = (carouselIndex + 1) % total;
  updateCarousel();
};

function capitalize(str){ return str.charAt(0).toUpperCase() + str.slice(1); }
window.selectColor = function(color) {
  selectedColor = color;
  document.querySelectorAll('.color-btn').forEach(btn =>
    btn.classList.toggle('active', btn.classList.contains(color))
  );
  buildCarousel();
  updatePrice();
};
window.selectStorage = function(gb) {
  selectedStorage = gb;
  document.querySelectorAll('.storage-btn').forEach(btn =>
    btn.classList.toggle('active', btn.textContent.startsWith(gb + " "))
  );
  updatePrice();
};
window.selectRAM = function(gb) {
  selectedRam = gb;
  document.querySelectorAll('.ram-btn').forEach(btn =>
    btn.classList.toggle('active', btn.textContent.startsWith(gb + " "))
  );
  updatePrice();
};
// Demo price logic 
function updatePrice() {
  let price = 200000;
  if (selectedColor === 'orange') price += 12000;
  if (selectedColor === 'black')  price += 6000;
  if (selectedColor === 'white')  price += 0;
  if (selectedStorage === 1024) price += 16000;
  if (selectedStorage === 2048) price += 34000;
  if (selectedRam === 8) price += 5000;
  if (selectedRam === 12) price += 10000;

  document.getElementById('priceDisplay').textContent = `₹${price.toLocaleString()}`;
  document.getElementById('modelColor').querySelector('span').textContent = colorNames[selectedColor];
}

// Initialize
buildCarousel();
updatePrice();
selectStorage(512);
selectRAM(6);
