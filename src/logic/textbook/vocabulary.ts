export const listenTextbookTitleContainer = () => {
    const headingContainer = document.querySelector('.heading_section') as HTMLElement;
    headingContainer.addEventListener('click', (event: Event) => {
        const categoryContainer = document.querySelector('.word_categories_container') as HTMLElement;
        const textbookBtn = headingContainer.querySelector('#textbook') as HTMLElement;
        const vocabularyBtn = headingContainer.querySelector('#vocabulary') as HTMLElement;
        let flag;
        if (event.target === textbookBtn) {
            flag = true;
        } else if ((event.target as HTMLElement).id === 'vocabulary') {
            flag = false;
        }
        if (!Object.is(flag, undefined)) {
            vocabularyBtn.classList.toggle('active', !flag);
            textbookBtn.classList.toggle('active', flag);
            categoryContainer.classList.toggle('active', !flag);
        }
    });
};

export const func = () => {
    console.log('нафиг иди');
};
