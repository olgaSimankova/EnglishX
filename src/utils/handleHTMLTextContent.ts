export function getHTMLElementContent(target: string): string {
    const element = document.querySelector(`.${target}`);
    return element?.textContent || '';
}

export function setHTMLElementContent(target: string, text: string): void {
    const element = document.querySelector(`.${target}`);
    if (element) {
        element.textContent = text;
    }
}
