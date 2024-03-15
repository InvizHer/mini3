/*=============== FILTERS TABS ===============*/
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tc) => {
      //tc = tabcontent
      tc.classList.remove("filters__active");
    });
    target.classList.add("filters__active");

    tabs.forEach((t) => {
      //t = tab
      t.classList.remove("filter-tab-active");
    });
    tab.classList.add("filter-tab-active");
  });
});

/*=============== DARK LIGHT THEME ===============*/
/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-line";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "ri-moon-line" : "ri-sun-line";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "ri-moon-line" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

        // Get all view-details buttons
const viewButtons = document.querySelectorAll('.view-details');

// Get the popup modal
const popupModal = document.createElement('div');
popupModal.classList.add('popup-modal');

// Function to create the popup modal content with loading message
function createLoadingPopupContent() {
    const loadingContent = document.createElement('div');
    loadingContent.classList.add('popup-content');

    loadingContent.innerHTML = `
        <p>Loading video...</p>
    `;

    return loadingContent;
}

// Function to create the popup modal content
function createPopupContent(title, description, link, preview) {
    const popupContent = document.createElement('div');
    popupContent.classList.add('popup-content');

    popupContent.innerHTML = `
        <span class="close-btn">&times;</span>
        <h3>${title}</h3>
        <p>${description}</p>
        <a href="${preview}" class="projects__button button button__small" target="_blank">Preview <i class="ri-eye-line"></i></a>
        <a href="${link}" class="projects__button button button__small" target="_blank">Visit Project <i class="ri-arrow-right-circle-line"></i></a>
    `;

    return popupContent;
}

// Function to open the popup modal with loading message
function openLoadingPopup() {
    const loadingContent = createLoadingPopupContent();
    popupModal.innerHTML = '';
    popupModal.appendChild(loadingContent);
    document.body.appendChild(popupModal);
    popupModal.style.display = 'flex';
}

// Attach event listener to each view-details button
viewButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        const title = this.parentElement.querySelector('.projects__title').textContent;
        const description = this.parentElement.querySelector('.project__description').textContent;
        const videoLink = this.closest('.projects__card').dataset.video;
        const link = this.closest('.projects__card').dataset.link;
        const preview = this.closest('.projects__card').dataset.preview;
        openLoadingPopup();

        // Load video asynchronously
        const videoFrame = document.createElement('iframe');
        videoFrame.src = videoLink;
        videoFrame.width = '100%';
        videoFrame.height = '100%';
        videoFrame.allowFullscreen = true;

        // Replace loading content with video once it's loaded
        videoFrame.onload = function() {
            const popupContent = createPopupContent(title, description, link, preview);
            popupModal.innerHTML = '';
            popupModal.appendChild(popupContent);
            popupModal.appendChild(videoFrame);
        };

        // Close modal when clicking outside the content area
        window.addEventListener('click', (e) => {
            if (e.target === popupModal) {
                const iframe = popupModal.querySelector('iframe');
                popupModal.style.display = 'none';
              iframe.src = iframe.src; // Stop the video by resetting
            }
        });
    });
});

// Show scroll reminder for desktop users
if (window.innerWidth >= 768) {
    const scrollReminder = document.createElement('div');
    scrollReminder.classList.add('scroll-reminder');
    scrollReminder.innerText = 'Scroll to see full content';

    // Append scroll reminder to the popup modal
    popupModal.appendChild(scrollReminder);
}

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
});

sr.reveal(".profile__border");
sr.reveal(".profile__name", { delay: 500 });
sr.reveal(".profile__profession", { delay: 600 });
sr.reveal(".profile__social", { delay: 700 });
sr.reveal(".profile__info-group", { interval: 100, delay: 700 });
sr.reveal(".profile__buttons", { delay: 800 });
sr.reveal(".filters__content", { delay: 900 });
sr.reveal(".filters", { delay: 1000 });
