const buttonSearch = document.getElementById("button_search");
const baseURL = "https://rickandmortyapi.com/api/character/";
const container = document.querySelector("container");

//carrega os dados da api na página home
async function queryApi() {
  const loader = document.querySelector(".loader");
  const cardWrapper = document.querySelector(".card_wrapper");
  const numbersPerson = [1, 2, 3, 4, 5, 7, 8, 9, 10];

  loader.style.display = "block";

  const res = await fetch(`${baseURL}${numbersPerson}`);
  const data = await res.json();
  loader.style.display = "none";
  if (data) {
    data.map((item) => {
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
  const res = await fetch(`${baseURL}?name=${name}`);
  const data = await res.json();

  return data;
}

//manda o nome e recebe uma resposta
const searchPerson = async () => {
  const input = document.querySelector(".input");
  const value = input.value;

  const result = await filerCharacter(value);
  console.log(result.results);
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
