function toggleContent(section) {
    const content = document.querySelector(`section.${section}`);
    if (content.classList.contains('open')) {
        content.classList.remove('open');
    } else {
        content.classList.add('open');
    }
}

function loadProfile(profileData) {
    document.querySelector('header img').src = profileData.profile.photo;
    document.querySelector('.profile-info h1').innerHTML = `Olá,<br>eu sou<br>${profileData.profile.name}`;
    document.querySelector('li.perfil').innerHTML = profileData.profile.role;
    document.querySelector('li.location').innerHTML = profileData.profile.location;
    document.querySelector('li.phone').innerHTML = profileData.profile.phone;
    document.querySelector('li.email').innerHTML = profileData.profile.email;

    profileData.professional.forEach((i) => {
        const professionalSkills = profileData.professional.map(i => `<img src="./assets/icons/${i}.svg">`).join('');
        document.querySelector('.skill-images').innerHTML = professionalSkills;
    });
    profileData.personal.forEach((i) => {
        const personalSkills = profileData.personal.map(i => `<li>${i}</li>`).join('');
        document.querySelector('.personal ul').innerHTML = personalSkills;
    });

    profileData.languages.forEach((i) => {
        const languages = profileData.languages.map(i => `<li>${i}</li>`).join('');
        document.querySelector('.languages ul').innerHTML = languages;
    });

    profileData.education.dio.forEach((i) => {
        const dio = profileData.education.dio.map(i => `<li><img src="${i}"></li>`).join('');
        document.querySelector('.education ul.dio-achievements').innerHTML = dio;
    });
    profileData.education.others.forEach((i) => {
        const others = profileData.education.others.map(i => `<li><h4>${i.title}</h4><p>${i.description}</p></li>`).join('');
        document.querySelector('.education ul.others').innerHTML = others;
    });

    profileData.experience.forEach((i) => {
        const experience = profileData.experience.map(i => `<li><h4>${i.title}</h4><p class="data">${i.date}</p><p>${i.description}</p></li>`).join('');
        document.querySelector('.experience ul').innerHTML = experience;
    });
    
    (() => {
        fetch(profileData.portfolio)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const portfolioData = data;
                portfolioData.forEach((i) => {
                    const portfolio = portfolioData.map(i => `<li><h4>${i.name}</h4><a href="${i.url}">${i.url}</a></li>`).join('');
                    document.querySelector('.portfolio ul').innerHTML = portfolio;
                })
            })
    })();
};

(async () => {
    const profileData = await buscarDados();
    loadProfile(profileData);
})();