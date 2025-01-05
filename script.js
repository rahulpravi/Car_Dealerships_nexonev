// Select the toggle button and nav links
const toggleButton = document.getElementById("toggleButton");
const navLinks = document.getElementById("navLinks");

// Add click event to toggle the active class
toggleButton.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// For features carousel functionality (optional advanced scrolling)
const carousel = document.querySelector('.features-carousel');

// Optional: Add scroll animation or interaction if needed
carousel.addEventListener('scroll', () => {
  console.log('Scrolled!');
});

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const modelCards = document.querySelectorAll('.model-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');

    modelCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });

    // Highlight active filter button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

// Tab Navigation
const tabs = document.querySelectorAll('.tab');
const tabPanes = document.querySelectorAll('.tab-pane');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs
    tabs.forEach(t => t.classList.remove('active'));

    // Hide all tab panes
    tabPanes.forEach(pane => pane.classList.remove('active'));

    // Add active class to clicked tab and corresponding pane
    tab.classList.add('active');
    const tabId = tab.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});

// Animate tech cards on scroll
const techCards = document.querySelectorAll('.tech-card');

const handleScroll = () => {
  techCards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (cardTop < windowHeight - 50) {
      card.classList.add('show');
    }
  });
};

window.addEventListener('scroll', handleScroll);

// Initialize Map Sample dealership data
const dealerships = [
  { name: "Tata EV Mumbai", lat: 19.076, lng: 72.8777, services: ["Sales", "Service", "Test Drive"] },
  { name: "Tata EV Delhi", lat: 28.6139, lng: 77.209, services: ["Sales", "Service"] },
  { name: "Tata EV Bangalore", lat: 12.9716, lng: 77.5946, services: ["Service", "Test Drive"] },
  { name: "Tata EV Chennai", lat: 13.0827, lng: 80.2707, services: ["Sales", "Test Drive"] },
];

let map;
let markers = [];

// Initialize Google Map
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 20.5937, lng: 78.9629 }, // Centered on India
    zoom: 5,
  });

  displayDealerships(dealerships);
}

// Display dealerships on the map
function displayDealerships(dealerList) {
  // Clear existing markers
  markers.forEach(marker => marker.setMap(null));
  markers = [];

  // Add new markers
  dealerList.forEach(dealer => {
    const marker = new google.maps.Marker({
      position: { lat: dealer.lat, lng: dealer.lng },
      map: map,
      title: dealer.name,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `<h4>${dealer.name}</h4><p>Services: ${dealer.services.join(", ")}</p>`,
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });

    markers.push(marker);
  });
}

// Filter functionality
document.getElementById("apply-filters").addEventListener("click", () => {
  const location = document.getElementById("filter-location").value;
  const service = document.getElementById("filter-services").value;

  const filteredDealerships = dealerships.filter(dealer => {
    const matchesLocation = location ? dealer.name.includes(location) : true;
    const matchesService = service ? dealer.services.includes(service) : true;
    return matchesLocation && matchesService;
  });

  displayDealerships(filteredDealerships);
});


// Chat Functionality
const chatWindow = document.querySelector('.chat-window');
const chatInputField = document.getElementById('chat-input-field');
const chatSendBtn = document.getElementById('chat-send-btn');

chatSendBtn.addEventListener('click', () => {
  const userMessage = chatInputField.value.trim();
  if (userMessage) {
    // Append user message
    const userMessageElement = document.createElement('div');
    userMessageElement.classList.add('chat-message', 'user');
    userMessageElement.textContent = userMessage;
    chatWindow.appendChild(userMessageElement);

    // Simulate support response
    const supportMessageElement = document.createElement('div');
    supportMessageElement.classList.add('chat-message', 'support');
    supportMessageElement.textContent = "We'll get back to you shortly!";
    chatWindow.appendChild(supportMessageElement);

    // Clear input field and scroll to bottom
    chatInputField.value = '';
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
});

// FAQ Functionality
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;

    // Toggle visibility of the answer
    if (answer.style.display === 'block') {
      answer.style.display = 'none';
    } else {
      answer.style.display = 'block';
    }
  });
});
// Add scroll animations to timeline items
const timelineItems = document.querySelectorAll('.timeline-item');

const handleScrollAnimation = () => {
  timelineItems.forEach(item => {
    const itemTop = item.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (itemTop < windowHeight - 50) {
      item.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', handleScrollAnimation);

// Add CSS for animation
const style = document.createElement('style');
style.innerHTML = `
  .timeline-item {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.5s ease;
  }

  .timeline-item.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

// Get the scroll button
let mybutton = document.getElementById("scrollToTopBtn");

// Show the button when the user scrolls down 20px from the top
window.onscroll = function() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
};

// Smoothly scroll to the top of the document when the button is clicked
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}