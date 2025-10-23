const inputCep = document.querySelector(".cep");
const btn = document.querySelector(".btn");
const containerCard = document.querySelector(".container-card");
const loading = document.querySelector(".loading");
const ceps = [];

async function fetchApi() {
  const cep = inputCep.value.replace(/\D/g, "").trim();

  if (cep.length !== 8) {
    alert("Digite um CEP com no máximo 8 números!");
    return;
  }

  if (ceps.includes(cep)) {
    alert("CEP já existe!");
    return;
  }

  loading.style.display = "block";

  try {
    const req = await fetch(`https://viacep.com.br/ws/${cep}/json`);
    const response = await req.json();

    if (response.erro) {
      alert("CEP não encontrado!");
      return;
    }

    ceps.push(cep);

    const card = document.createElement("div");
    card.classList.add("card");
    containerCard.append(card);

    card.innerHTML += `
      <p><strong>CEP:</strong> ${response.cep}</p>
      <p><strong>Logradouro:</strong> ${response.logradouro}</p>
      <p><strong>Estado:</strong> ${response.estado}</p>
      <p><strong>Localidade:</strong> ${response.localidade}</p>
      <p><strong>UF:</strong> ${response.uf}</p>
    `;
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
  } finally {
    loading.style.display = "none";
  }
}

btn.addEventListener("click", fetchApi);
