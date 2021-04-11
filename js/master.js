// Check if there is color in local storage

let mainColor = localStorage.getItem("color_option");

if (mainColor !== null) {
  document.documentElement.style.setProperty("--main--color", mainColor);

  // remove active class

  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    // add active class with data-color === local storage item

    if (element.dataset.color === mainColor) {
      // add active class with data-color === local storage item
      element.classList.add("active");
    }
  });
}

//  random background option

let backgroundOption = true;

// variable to control the interval

let BgInterval;

// check if there is local storage randombackground item
let backgroundlocal = localStorage.getItem("background_option");

// check if random background local storage is not empty

if (backgroundlocal !== null) {
  if (backgroundlocal === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  // remove active class from all spans

  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });

  if (backgroundlocal === "true") {
    document.querySelector(" .random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(" .random-backgrounds .no").classList.add("active");
  }
}

// toggle spin class on icon

document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  //toggle class fa-spin
  this.classList.toggle("fa-spin");

  //toggle class on main class

  document.querySelector(".settings-box").classList.toggle("open");
};

// switch colors

const colorsList = document.querySelectorAll(".colors-list li ");

colorsList.forEach((li) => {
  li.addEventListener("click", (e) => {
    // Set Color on root

    document.documentElement.style.setProperty(
      "--main--color",
      e.target.dataset.color
    );

    // Set color on local storage

    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);
  });
});

// random background options

const randomBackground = document.querySelectorAll(".random-backgrounds span ");

// loop on all spans
randomBackground.forEach((span) => {
  // click on every span

  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;

      randomizeImgs();

      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;

      clearInterval(BgInterval);

      localStorage.setItem("background_option", false);
    }
  });
});

// select landing page element

let landingPage = document.querySelector(".landing-page");

// get array of imgs

let imgsArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];

// function to randomize imgs

function randomizeImgs() {
  if (backgroundOption === true) {
    BgInterval = setInterval(() => {
      // get random number
      let randomnumber = Math.floor(Math.random() * imgsArray.length);

      //change background img url
      landingPage.style.backgroundImage =
        'url("images/' + imgsArray[randomnumber] + '")';
    }, 4000);
  }
}

randomizeImgs();

// select skills selector

// let ourskills = document.querySelector(".skills");

// window.onscroll = function () {
//   // Skills offset top

//   let skillsOffsetTop = ourskills.offsetTop;u

//   // Outer height

//   let skillsOutterHeigth = ourskills.offsetHeight;

//   // window height

//   let windowheight = this.innerHeight;

//   // window scrolltop

//   let windowscrollTop = this.pageYOffset;

//   if (windowscrollTop > skillsOffsetTop + skillsOutterHeigth - windowheight) {
//     let allskills = document.querySelectorAll(
//       ".skill-box .skill-progress span"
//     );

//     allskills.forEach((skill) => {
//       skill.style.width = skill.dataset.progress;
//     });
//   }
// };

// create popup

let gallery = document.querySelectorAll(".gallery img");

gallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create overlay element

    let overlay = document.createElement("div");

    // add class to overlay

    overlay.className = "popup-overlay";

    // append overlay to the body

    document.body.appendChild(overlay);

    // create the popup

    let popupbox = document.createElement("div");

    // add class to the popup

    popupbox.className = "popup-box";

    if (img.alt !== null) {
      // create heading

      let imgHeading = document.createElement("h3");

      // create text for heading

      let headingText = document.createTextNode(img.alt);

      // append the text to the heading

      imgHeading.appendChild(headingText);

      // append the heading to the popup box

      popupbox.appendChild(imgHeading);
    }

    // create the image

    let popupimage = document.createElement("img");

    // set image source

    popupimage.src = img.src;

    // add image to the popup box

    popupbox.appendChild(popupimage);

    // append the popup box to the body

    document.body.appendChild(popupbox);

    // create the close span

    let closeBtn = document.createElement("span");

    // create the close button text

    let closeTxt = document.createTextNode("X");

    // append text to the close button

    closeBtn.appendChild(closeTxt);

    // add class to close button

    closeBtn.className = "close-button";

    // add close button to the popup box

    popupbox.appendChild(closeBtn);
  });
});

// close popup

document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    // close the current popup

    e.target.parentNode.remove();

    // remove overlay

    document.querySelector(".popup-overlay").remove();
  }
});

window.addEventListener("scroll", reveal);

function reveal() {
  var reveals = document.querySelectorAll(".reveal , .f-reveal ,.t-reavel");

  for (var i = 0; i < reveals.length; i++) {
    var windowheight = window.innerHeight;
    var revealtop = reveals[i].getBoundingClientRect().top;
    var revealpoint = 150;

    if (revealtop < windowheight - revealpoint) {
      reveals[i].classList.add("active");
    }
    // else{
    //   reveals[i].classList.remove('active');
    // }
  }
}

// Select all bullets

const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select all links

const allLinks = document.querySelectorAll(".links a");

function scrollToSomeWhere(elemnts) {
  elemnts.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSomeWhere(allBullets);
scrollToSomeWhere(allLinks);

// Handle active state

function handleActive(ev) {
  // Remove active class from all childrens
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // Add active class on target

  ev.target.classList.add("active");
}

// Toggle Menu

let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  // stop propagation

  e.stopPropagation();

  // Toggle class on button
  this.classList.toggle("menu-active");

  // Toggle class on links

  tLinks.classList.toggle("open");
};

// Click outside menu and toggle button

document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    // check if menu is opened !

    if (tLinks.classList.contains("open")) {
      // Toggle class on button
      toggleBtn.classList.toggle("menu-active");

      // Toggle class on links

      tLinks.classList.toggle("open");
    }
  }
});

// stop propagation on menu

tLinks.onclick = function (e) {
  e.stopPropagation();
};
