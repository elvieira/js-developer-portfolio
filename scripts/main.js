function toggleContent(section) {
    const content = document.querySelector(`section.${section}`);
    if (content.classList.contains('open')) {
        content.classList.remove('open');
    } else {
        content.classList.add('open');
    }
}

async function loadProfile(profileData) {
    const insertHTML = (selector, html) => {
        document.querySelector(selector).innerHTML = html;
    };

    document.querySelector('header img').src = profileData.profile.photo;
    document.querySelector('.profile-info h1').innerHTML = `Olá,<br>eu sou<br>${profileData.profile.name}`;
    insertHTML('li.perfil', profileData.profile.role);
    insertHTML('li.location', profileData.profile.location);
    insertHTML('li.phone', profileData.profile.phone);
    insertHTML('li.email', profileData.profile.email);

    const professionalSkills = profileData.professional.map(skill => `<img src="./assets/icons/${skill}.svg">`).join('');
    insertHTML('.skill-images', professionalSkills);

    const personalSkills = profileData.personal.map(skill => `<li>${skill}</li>`).join('');
    insertHTML('.personal ul', personalSkills);

    const languages = profileData.languages.map(language => `<li>${language}</li>`).join('');
    insertHTML('.languages ul', languages);

    const dioAchievements = profileData.education.dio.map(achievement => `<li><img src="${achievement}"></li>`).join('');
    insertHTML('.education ul.dio-achievements', dioAchievements);

    const otherAchievements = profileData.education.others.map(achievement => `
        <li>
            <h4>${achievement.title}</h4>
            <p>${achievement.description}</p>
        </li>
    `).join('');
    insertHTML('.education ul.others', otherAchievements);

    const experiences = profileData.experience.map(exp => `
        <li>
            <h4>${exp.title}</h4>
            <p class="data">${exp.date}</p>
            <p>${exp.description}</p>
        </li>
    `).join('');
    insertHTML('.experience ul', experiences);
    
    try {
        const portfolioData = await fetchPortfolio(profileData.portfolio);
        const portfolioHTML = portfolioData.map(item => `
            <li>
                <h4>${item.name}</h4>
                <a href="${item.url}">${item.url}</a>
            </li>
        `).join('');
        document.querySelector('.portfolio ul').innerHTML = portfolioHTML;
    } catch (error) {
        console.error('Erro ao carregar o portfólio:', error);
    }
};

(async () => {
    const profileData = await fetchData();
    loadProfile(profileData);
})();