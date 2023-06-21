const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bar = document.querySelectorAll(".skills svg circle");

const ml_section = document.querySelector(".milestones")
const ml_counters = document.querySelectorAll(".number span")

const prt_section = document.querySelector(".it");
const zoom_icons = document.querySelectorAll(".zoom-icon");
const modal_overlay = document.querySelector(".modal-overlay");
const images = document.querySelectorAll(".images img"); 
const prev_btn = document.querySelector(".prev-btn");
const next_btn = document.querySelector(".next-btn");

const links = document.querySelectorAll(".nav-links");
const header = document.querySelector("header");

const toggle_btn = document.querySelector(".toggle-btn");




/* --------------- Sticky Navbar --------------- */
function stickyNavbar() {
  const header = document.querySelector("header");
  header.classList.toggle("scrolled", window.pageYOffset > 0);
}

stickyNavbar();

window.addEventListener("scroll", stickyNavbar);


/* --------------- Reveal Animation --------------- */

let sr = ScrollReveal({
  duration: 2500,
  distance: "60px",
});

sr.reveal(".showcase-info", {delay: 600});
sr.reveal(".showcase-image", {origin: "top", delay: 700});


/* --------------- Skills Progress Bar Animation --------------- */



window.addEventListener("scroll" ,() => {
  activeLink();
  if (!skillsPlayed) skillsCounter();
  if(!mlPlayed) mlCounter();
});

function updateCount (num, maxNum) {
  let currentNumber = +num.innerText;

  if(currentNumber < maxNum) {
    num.innerText = currentNumber + 1;
    setTimeout(() => {
      updateCount(num, maxNum);
    }, 12);
  }
}

function hasReached(el) {
  let topPosition = el.getBoundingClientRect().top;

  if(window.innerHeight >= topPosition + el.offsetHeight) return true; return false;
}


let skillsPlayed = false;

function skillsCounter() {
  if (!hasReached(first_skill)) return;

  skillsPlayed = true;

  sk_counters.forEach((counter, i) => {
    let target = +counter.dataset.target;
    let strokeValue = 427 - 427 * (target / 100);

    progress_bar[i].style.setProperty("--target", strokeValue)

    setTimeout(() => {
      updateCount(counter, target);
    }, 600)
  })

  progress_bar.forEach(p => p.style.animation = "progress 2s ease-in-out forwards")
}

/* --------------- Services Counter Animation --------------- */

let mlPlayed = false;

function mlCounter() {
  if (!hasReached(ml_section)) return;
  mlPlayed = true;
  ml_counters.forEach (ctr => {
    let target = +ctr.dataset.target;
    setTimeout(() => {
      updateCount(ctr, target);
    }, 400);
  });
}


/* --------------- Portfolio Filter Animation --------------- */


let mixer = mixitup('.it-gallery', {
  selectors: {
      target: '.prt-card'
  },
  animation: {
      duration: 500
  }
});



/* --------------- Modal Pop Up Animation --------------- */

let currentIndex = 0;

zoom_icons.forEach((icn, i) => icn.addEventListener("click", () => {
  prt_section.classList.add("open");
  document.body.classList.add("stopScrolling");
  currentIndex = i;
  changeImage(currentIndex)
})
);

modal_overlay.addEventListener("click", () => {
  prt_section.classList.remove("open")
  document.body.classList.remove("stopScrolling");
});

prev_btn.addEventListener("click", () => {
  if(currentIndex === 0) {
    currentIndex = 5
  } else {
  currentIndex--;
  }
  changeImage(currentIndex);
});

next_btn.addEventListener("click", () => {
  if(currentIndex === 5) {
    currentIndex = 0
  } else {
  currentIndex++;
  }
  changeImage(currentIndex);
});

function changeImage(index) {
  images.forEach(img => img.classList.remove("showImage"));
  images[index].classList.add("showImage");
}


/* --------------- F.A.Q --------------- */



var faqList = document.getElementById('faq-list');
var questions = faqList.getElementsByClassName('question');

for (var i = 0; i < questions.length; i++) {
  questions[i].addEventListener('click', function() {
    this.parentNode.classList.toggle('active');

    var answer = this.nextElementSibling;
    if (answer.style.display === 'block') {
      answer.style.display = 'none';
    } else {
      answer.style.display = 'block';
    }
  });
}


/* --------------- Form --------------- */


var form = document.getElementById('myForm');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  var nameInput = document.getElementById('name');
  var emailInput = document.getElementById('email');
  var messageInput = document.getElementById('message');

  var name = nameInput.value.trim();
  var email = emailInput.value.trim();
  var message = messageInput.value.trim();

  // Validate the form fields
  if (name === '' || email === '' || message === '') {
    alert('Please fill in all fields.');
    return;
  }

  if (!validateEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Display a confirmation dialog box
  var confirmation = confirm('Please confirm:\n\n' +
    'Name: ' + name + '\n' +
    'Email: ' + email + '\n' +
    'Message: ' + message + '\n\n' +
    'Is the entered info correct?');



  // Submit the form if confirmed, otherwise do nothing
  if (!confirmation) {
    // form.dispatchEvent(new Event('submit'));
    return false;
  }

  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('message').value = '';
});

// Email validation function
function validateEmail(email) {
  var re = /^\S+@\S+\.\S+$/;
  return re.test(email);
}



/* --------------- Change Active Link On Scroll --------------- */


function activeLink() {
  let sections = document.querySelectorAll("section[id]");
let passedSections = Array.from(sections).map((sct, i) => {
  return {
     y: sct.getBoundingClientRect().top - header.offsetHeight,
     id: i,
  };
})
.filter((sct) => sct.y <= 0);
  let currSectionID = passedSections.at(-1).id;

  links.forEach((l) => l.classList.remove("active"));
  links[currSectionID].classList.add("active");
}

activeLink()

activeLink(header);



/* --------------- Change Page Theme --------------- */

let firstTheme = localStorage.getItem("dark");

changeTheme(+firstTheme);

function changeTheme(isDark) {
  if(isDark) {
    document.body.classList.add("dark");
    toggle_btn.classList.replace("uil-moon", "uil-sun");
    localStorage.setItem("dark", 1);
  } else {
    document.body.classList.remove("dark");
    toggle_btn.classList.replace("uil-sun", "uil-moon");
    localStorage.setItem("dark", 0);
  }
}

toggle_btn.addEventListener("click", () => {
  changeTheme(!document.body.classList.contains("dark"));
});



/* --------------- Open & Close Navbar Menu --------------- */
