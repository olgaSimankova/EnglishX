export default function removeClassElement(target: string, classToRemove: string): void {
    const targets = document.querySelectorAll(`.${target}`);
    targets.forEach((element) => element.classList.remove(classToRemove));
}
