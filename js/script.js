const cars = [
  {
    type: 'SUV',
    description: 'Rugged power and spacious comfort for any terrain.',
    img: 'img/suv.jpg',
    models: ['Toyota Fortuner', 'Ford Endeavour', 'Mahindra XUV700', 'Hyundai Creta']
  },
  {
    type: 'Sedan',
    description: 'Elegance and fuel efficiency in one sleek design.',
    img: 'img/sedan.jpg',
    models: ['Honda City', 'Hyundai Verna', 'Skoda Slavia', 'Maruti Ciaz']
  },
  {
    type: 'Coupe',
    description: 'For those who crave speed and sharp styling.',
    img: 'img/coupe.jpg',
    models: ['BMW 2 Series', 'Audi A5', 'Mercedes C-Class Coupe']
  },
  {
    type: 'Convertible',
    description: 'Open-top freedom with performance to match.',
    img: 'img/convertible.jpg',
    models: ['Mini Cooper Convertible', 'BMW Z4', 'Mercedes E-Class Cabriolet']
  },
  {
    type: 'Truck',
    description: 'Built for heavy-duty tasks and tough conditions.',
    img: 'img/truck.jpg',
    models: ['Ford F-150', 'Toyota Hilux', 'Isuzu D-Max']
  },
  {
    type: 'Electric',
    description: 'Modern technology for a sustainable ride.',
    img: 'img/electric.jpg',
    models: ['Tesla Model 3', 'Tata Nexon EV', 'Hyundai Kona Electric']
  }
];

const container = document.getElementById("car-list");
cars.forEach((car, idx) => {
  const div = document.createElement('div');
  div.className = "car-card";
  div.style.cursor = "pointer";
  div.innerHTML = `
    <img src="${car.img}" alt="${car.type}" class="car-img">
    <h3>${car.type}</h3>
    <p>${car.description}</p>
    <div class="car-models" style="display:none;">
      <h4>Models:</h4>
      <ul>
        ${car.models.map(model => `<li><a href="model.html?model=${encodeURIComponent(model)}" class="model-link">${model}</a></li>`).join('')}
      </ul>
    </div>
  `;
  div.addEventListener('click', function(e) {
    // Prevent toggling when clicking on the models list
    if (e.target.tagName.toLowerCase() === 'li') return;
    const modelsDiv = this.querySelector('.car-models');
    const isVisible = modelsDiv.style.display === 'block';
    // Collapse all other cards
    document.querySelectorAll('.car-models').forEach(el => el.style.display = 'none');
    // Toggle current
    modelsDiv.style.display = isVisible ? 'none' : 'block';
  });
  container.appendChild(div);
});