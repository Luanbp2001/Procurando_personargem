const buttonSearch = document.getElementById("button_search");
const baseURL = "https://rickandmortyapi.com/api/character/";
const container = document.querySelector(".container");
const resultSearch = document.getElementById("result_search");

//carrega os dados da api na página home
async function queryApi() {
  const loader = document.querySelector(".loader");
  const cardWrapper = document.querySelector(".card_wrapper");

  loader.style.display = "block";

  const res = await fetch(`${baseURL}`);
  const data = await res.json();
  const results = data.results;
  loader.style.display = "none";
  if (data) {
    results.map((item) => {
      const card = document.createElement("div");
      card.classList.add("card", "swiper-slide");

      card.innerHTML = `
        <div class="image_content">
          <span class="overlay"></span>
          <div class="card_image">
            <img
              src="${item.image}"
              alt="${item.name}"
              class="card_img"
            />
          </div>
          <div class="card_content">
            <h2 class="name">${item.name}</h2>
            <p class="description">${item.species} - ${item.status}</p>
            <p class="description">${item.gender}</p>
          </div>
        </div>
      `;
      cardWrapper.appendChild(card);
    });
  } else {
    console.log("Erro");
  }
}

//Filtrar personargem por nome
async function filerCharacter(name) {
  let nameValue = name;

  if (nameValue === "") {
    return;
  }
  const res = await fetch(`${baseURL}?name=${nameValue}`);
  const data = await res.json();

  return data;
}

//manda o nome e recebe uma resposta
const searchPerson = async () => {
  const input = document.querySelector(".input");
  const value = input.value;
  const result = await filerCharacter(value);

  const results = result.results;

  if (results === undefined) {
    return;
  }
  if (result !== "") {
    const containerResult = document.createElement("div");
    containerResult.classList.add("container_result");
    container.classList.add("hidden");
    resultSearch.classList.remove("hidden");
    results.map((item) => {
      container.innerHTML = `
        <img src="${item.image}" alt="">
      `;
    });
    resultSearch.appendChild(containerResult);
  }
};

window.addEventListener("load", queryApi);
buttonSearch.addEventListener("click", searchPerson);

//Animação de infinit loop
var swiper = new Swiper(".slide_content", {
  slidesPerView: 3,
  spaceBetween: 25,
  centerSlide: "true",
  fade: "true",
  grabCursor: "true",
  loop: true,
  loopFillGroupWithBlank: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    520: {
      slidesPerView: 2,
    },
    950: {
      slidesPerView: 3,
    },
  },
});
