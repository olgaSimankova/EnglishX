export default function toggleWordActions(): void {
    const wordActionButtons = document.querySelectorAll('.word__actions_btn') as NodeListOf<HTMLElement>;

    wordActionButtons.forEach((button) => button.classList.toggle('hidden'));
}
