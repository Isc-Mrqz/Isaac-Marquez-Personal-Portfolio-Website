// This selects all of the button inside the class named "Card-Component-Buttons"
const buttons = document.querySelectorAll(".Card-Component-Buttons button");

// This selects all of the sections inside the class named Card-Component-Sections
const sections = document.querySelectorAll(".Card-Component-Sections");

// This selects the Card Component 
const card = document.querySelector(".Card-Component");



// This loops through each button to add a click event listener
buttons.forEach(btn => {
  btn.addEventListener("click", ({ target }) => {

    // This retrieves the data-section attribute value from the clicked button
    const section = target.getAttribute("data-section");

    // This either adds or removes the "is-active" class on the card (it is considered active if it is not "#AboutSection")
    card.classList.toggle("is-active", section !== "#AboutSection");

    // This sets the "data-state" attribute of the card to match the section
    card.setAttribute("data-state", section);

    // This either adds or removes the "is-active" class on each section (it is considered active if both the ID matches)
    sections.forEach(s => s.classList.toggle("is-active", s.id === section.slice(1)));

    // This either adds or removes "is-active" class (it is considered active if it is the clicked button)
    buttons.forEach(b => b.classList.toggle("is-active", b === target));
  });
});
