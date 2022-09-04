export default function toggleClassActiveButton(cls: string, id: string): void {
    const levelsCards = document.querySelectorAll(`.${cls}`);
    levelsCards.forEach((button) => {
        if (button.id === id) {
            button.classList.toggle('active', true);
        } else {
            button.classList.toggle('active', false);
        }
    });
}
