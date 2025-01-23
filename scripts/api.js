async function buscarDados() {
    const response = await fetch('https://raw.githubusercontent.com/elvieira/js-developer-portfolio/refs/heads/main/data/info.json');
    const data = await response.json();
    return data;
};