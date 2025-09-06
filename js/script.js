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

// Modal logic for login and signup
const loginBtn = document.querySelector('.login-btn');
const loginModal = document.getElementById('login-modal');
const closeLogin = document.getElementById('close-login');
const signupBtn = document.getElementById('signup-btn');
const signupModal = document.getElementById('signup-modal');
const closeSignup = document.getElementById('close-signup');

if (loginBtn && loginModal && closeLogin) {
  loginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    loginModal.style.display = 'flex';
  });
  closeLogin.addEventListener('click', function() {
    loginModal.style.display = 'none';
  });
  window.addEventListener('click', function(e) {
    if (e.target === loginModal) {
      loginModal.style.display = 'none';
    }
    if (e.target === signupModal) {
      signupModal.style.display = 'none';
    }
  });
}
if (signupBtn && signupModal && closeSignup) {
  signupBtn.addEventListener('click', function(e) {
    e.preventDefault();
    loginModal.style.display = 'none';
    signupModal.style.display = 'flex';
  });
  closeSignup.addEventListener('click', function() {
    signupModal.style.display = 'none';
  });
}

// Popup logic
const popupModal = document.getElementById('popup-modal');
const popupMessage = document.getElementById('popup-message');

function showPopup(message) {
  if (popupModal && popupMessage) {
    popupMessage.textContent = message;
    popupModal.style.display = 'flex';
    setTimeout(() => {
      popupModal.style.display = 'none';
    }, 2000);
  }
}

const userIcon = document.getElementById('user-icon');

function showUserIcon() {
  if (loginBtn) loginBtn.style.display = 'none';
  if (userIcon) userIcon.style.display = 'inline-flex';
}

// Profile link logic
const profileLink = document.getElementById('profile-link');

function saveUserDetails(details) {
  localStorage.setItem('userDetails', JSON.stringify(details));
}

if (profileLink) {
  profileLink.addEventListener('click', function(e) {
    e.preventDefault();
    window.open('profile.html', '_blank');
  });
}

// Login form success popup
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    loginModal.style.display = 'none';
    showPopup('Login successful!');
    showUserIcon();
    // Save dummy user details for demo
    saveUserDetails({
      name: '',
      username: loginForm.querySelector('input[type="text"]').value,
      mobile: '',
      email: '',
    });
  });
}

// Signup form password match validation and success popup
const signupForm = document.getElementById('signup-form');
const signupError = document.getElementById('signup-error');
if (signupForm) {
  signupForm.addEventListener('submit', function(e) {
    const password = signupForm.querySelector('input[name="password"]').value;
    const confirmPassword = signupForm.querySelector('input[name="confirmPassword"]').value;
    const passwordError =
      password.length < 8
      ? "Password must be at least 8 characters."
      : !/[A-Z]/.test(password)
      ? "Password must contain at least one uppercase letter."
      : "";
    if (passwordError) {
      e.preventDefault();
      signupError.style.display = 'block';
      signupError.textContent = passwordError;
    } else if (password !== confirmPassword) {
      e.preventDefault();
      signupError.style.display = 'block';
      signupError.textContent = "Passwords do not match.";
    } else {
      signupError.style.display = 'none';
      e.preventDefault();
      signupModal.style.display = 'none';
      showPopup('Thank you for signing up!');
      showUserIcon();
      // Save user details
      saveUserDetails({
        name: signupForm.querySelector('input[name="name"]').value,
        username: signupForm.querySelector('input[name="username"]').value,
        mobile: signupForm.querySelector('input[name="mobile"]').value,
        email: signupForm.querySelector('input[name="email"]').value,
        address: signupForm.querySelector('input[name="address"]')?.value || '',
      });
    }
  });
}

const userDropdown = document.getElementById('user-dropdown');

if (userIcon && userDropdown) {
  userIcon.addEventListener('click', function(e) {
    e.preventDefault();
    userDropdown.style.display = userDropdown.style.display === 'flex' ? 'none' : 'flex';
  });
  // Hide dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!userIcon.contains(e.target)) {
      userDropdown.style.display = 'none';
    }
  });
}