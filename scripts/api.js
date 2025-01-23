async function fetchData() {
    const response = await fetch('https://raw.githubusercontent.com/elvieira/js-developer-portfolio/refs/heads/main/data/info.json');
    if (!response.ok) throw new Error('Erro ao buscar dados');
    return response.json();
};

async function fetchPortfolio(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Erro ao buscar portfólio');
    return response.json();
};