(() => {

  //variables
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");

  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");
  const materialCon = document.querySelector("#material-con");

  const errorBox = document.querySelector("#error-box");
  const errorMessage = document.querySelector('#error-msg');
  const theError = document.querySelector('#the-error');

  let spinner = `<svg width="512" height="512" viewBox="0 0 512 512" style="color:#E4AB00" xmlns="http://www.w3.org/2000/svg" class="h-full w-full"><rect width="512" height="512" x="0" y="0" rx="30" fill="transparent" stroke="transparent" stroke-width="0" stroke-opacity="100%" paint-order="stroke"></rect><svg width="256px" height="256px" viewBox="0 0 24 24" fill="#E4AB00" x="128" y="128" role="img" style="display:inline-block;vertical-align:middle" xmlns="http://www.w3.org/2000/svg"><g fill="#E4AB00"><path fill="currentColor" d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></g></svg></svg>`;

  //functions
  function modelLoaded() {
    hotspots.forEach(hotspot => {
      hotspot.style.display = "block";
    })
  }

  function loadInfoBoxes() {
    //make AJAX call here
    fetch("https://swiftpixel.com/earbud/api/infoboxes")
    .then(response => response.json())
    .then(infoBox => {
      console.log(infoBox);

      infoBox.forEach((infoBox, index) => {
        let selected = document.querySelector(`#hotspot-${index+1}`);
        
        const titleElement = document.createElement('h2');
        titleElement.textContent = infoBox.heading;

        const textElement = document.createElement('p');
        textElement.textContent = infoBox.description;

        const img = document.createElement("img");
        img.src = `images/${infoBox.thumbnail}`;

        selected.appendChild(img);
        selected.appendChild(titleElement);
        selected.appendChild(textElement);
      })
    })
    .catch(error => console.error(error));
  }
  
  // MARCO IM SO PROUD OF MYSELF I LITERALLY FIGURED THIS OUT ALL BY MYSELF, JUST LOOKED AT MDN AND FOUND OUT ABOUT TRY AND THROW !!!! 
  try {
  loadInfoBoxes();
  throw new TypeError("HEY LOOK, AN ERROR MESSAGE!"); // COMMENT THIS OUT TO REMOVE THE ERROR
  }
  catch (error) {
    errorBox.style.display = "flex";
    errorMessage.textContent = "So sorry, there was an error: ";
    theError.textContent = error;
  }

  function loadMaterialInfo() {

    materialCon.innerHTML = spinner;

    // make AJAX call here 
    fetch("https://swiftpixel.com/earbud/api/materials")
    .then(response => response.json())
    .then(materials => {
      console.log(materials);
    // this will go inside a promise/ .then()
      materials.forEach(material => {
      // make a copy of the template 
      const clone = materialTemplate.content.cloneNode(true);

      // fill the template
      const materialHeading = clone.querySelector(".material-heading");
      materialHeading.textContent = material.heading;

      const materialDescription = clone.querySelector(".material-description");
      materialDescription.textContent = material.description;

      // append the populated template to the ul
      materialList.appendChild(clone);
    })
    materialCon.innerHTML = "";
    materialCon.appendChild(materialList);
  })
  .catch(error => console.error(error));
  }

  loadMaterialInfo();

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners
  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

})();

