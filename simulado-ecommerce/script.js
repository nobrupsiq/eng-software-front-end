const URL = "https://fakestoreapi.com/products";

const cardContainer = document.querySelector(".cards-container");
const searchInput = document.querySelector(".input-search");
const categorySelect = document.querySelector(".category-container");

let produtos = [];

async function fetchInit() {
  try {
    const response = await fetch(URL);
    produtos = await response.json();

    renderCards(produtos);
    renderCategories(produtos);

    searchInput.addEventListener("keyup", handleSearch);
    categorySelect.addEventListener("change", handleFilter);
  } catch (error) {
    console.error("Erro: ", error);
    cardContainer.innerHTML = `<p>Erro ao carregar produtos!</p>`;
  }
}

function renderCards(data) {
  cardContainer.innerHTML = ""; // Limpa antes

  data.forEach((produto) => {
    const card = document.createElement("div");

    card.classList.add("card");
    card.innerHTML += `
      <div class="card-img">
        <img src="${produto.image}" alt="${produto.title}" >
      </div>
      <div class="cards-info">
        <h3 class="title">${produto.title}</h3>
        <span class="category" style="display:none">${produto.category}</span>
        <p class="description limited">${produto.description}</p>
        <p class="price">R$ ${produto.price.toFixed(2)}</p>
      </div>
    `;
    cardContainer.appendChild(card);
  });
}

function renderCategories(produtos) {
  const categorias = [...new Set(produtos.map((p) => p.category))];

  categorySelect.innerHTML = `
    <option value=''>Todas as categorias</option>
    ${categorias
      .map((cat) => `<option value="${cat}">${cat}</option>`)
      .join("")}
  `;
}

function handleSearch(e) {
  const letras = e.target.value.toLowerCase();
  const categoriaSelecionada = categorySelect.value;

  const filtrados = produtos.filter((p) => {
    const combinaTitulo = p.title.toLowerCase().includes(letras);
    const combinaCategoria = categoriaSelecionada
      ? p.category === categoriaSelecionada
      : true;
    return combinaTitulo && combinaCategoria;
  });

  renderCards(filtrados);
}

function handleFilter() {
  handleSearch({ target: searchInput });
}

fetchInit();
