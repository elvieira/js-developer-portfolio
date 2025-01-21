function toggleContent(section) {
    const content = document.querySelector(`section.${section}`);
    if (content.classList.contains('open')) {
        content.classList.remove('open');
    } else {
        content.classList.add('open');
    }
}