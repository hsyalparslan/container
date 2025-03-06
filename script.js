document.addEventListener("DOMContentLoaded", () => {
  const ejectButton = document.getElementById("eject-button");
  const containerWrapper = document.querySelector(".container-wrapper");
  const peopleContainer = document.querySelector(".people-container");
  const statusMessage = document.getElementById("status-message");

  // Create audio elements
  const ejectionSound = new Audio();
  ejectionSound.src =
    "https://freesound.org/data/previews/587/587596_4525739-lq.mp3"; // Whoosh sound

  const flyingAwaySound = new Audio();
  flyingAwaySound.src =
    "https://freesound.org/data/previews/188/188041_1979597-lq.mp3"; // Funny flying away sound

  const screamSounds = [
    "https://freesound.org/data/previews/342/342156_5260872-lq.mp3",
    "https://freesound.org/data/previews/277/277403_4918131-lq.mp3",
    "https://freesound.org/data/previews/412/412068_7867797-lq.mp3",
  ];

  // Create a single people image element
  const peopleImage = document.createElement("img");
  peopleImage.src = "people.png";
  peopleImage.classList.add("people-image");
  peopleImage.style.opacity = "0"; // Initially hidden

  // Position the people image at the left side of the container
  peopleImage.style.position = "absolute";
  peopleImage.style.left = "20%"; // Position at the left side where the door would be
  peopleImage.style.top = "50%";
  peopleImage.style.transform = "translateY(-50%)";
  peopleImage.style.height = "70%"; // Match container height
  peopleImage.style.zIndex = "5";

  // Add the people image to the container
  peopleContainer.appendChild(peopleImage);

  // Handle eject button click
  ejectButton.addEventListener("click", () => {
    // Disable button during animation
    ejectButton.disabled = true;

    // Show people image
    peopleImage.style.opacity = "1";

    // Play ejection sound
    ejectionSound.currentTime = 0;
    ejectionSound.play();

    // Play random scream sound
    const screamSound = new Audio();
    screamSound.src =
      screamSounds[Math.floor(Math.random() * screamSounds.length)];
    screamSound.volume = 0.5;
    screamSound.play();

    // Animate people being ejected
    peopleImage.style.animation =
      "eject-people 3s cubic-bezier(0.215, 0.610, 0.355, 1.000) forwards";

    // Play flying away sound after a short delay
    setTimeout(() => {
      flyingAwaySound.currentTime = 0;
      flyingAwaySound.volume = 0.7;
      flyingAwaySound.play();
    }, 800);

    // Show "System secured" message after animation completes
    setTimeout(() => {
      statusMessage.classList.add("show");
    }, 3000);

    // Reset after animation completes
    setTimeout(() => {
      // Reset people image
      peopleImage.style.animation = "";
      peopleImage.style.opacity = "0";

      // Hide status message
      statusMessage.classList.remove("show");

      // Re-enable button
      ejectButton.disabled = false;
    }, 6000);
  });

  // Add some visual feedback when hovering over the button
  ejectButton.addEventListener("mouseover", () => {
    ejectButton.innerHTML = "EJECT ALL!";
  });

  ejectButton.addEventListener("mouseout", () => {
    ejectButton.innerHTML = "EJECT ALL";
  });
});
