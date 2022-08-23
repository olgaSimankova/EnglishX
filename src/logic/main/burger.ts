const menuClose = (): void => {
    const navBody = document.querySelector('.header__nav') as HTMLElement;
    document.documentElement.classList.remove('menu-open');
    navBody.classList.remove('header__nav_active');
};

const linksListener = (event: Event): void => {
    const target = event.target as HTMLElement;

    if (target.tagName === 'A') menuClose();
};

const checkNavLinks = (): void => {
    const navBody = document.querySelector('.header__nav_active') as HTMLElement;
    if (document.documentElement.classList.contains('menu-open')) {
        navBody.addEventListener('click', linksListener);
    }
};

export default function burger(): void {
    const burgerIcon = document.querySelector('.icon-menu') as HTMLElement;
    const navBody = document.querySelector('.header__nav') as HTMLElement;

    burgerIcon.addEventListener('click', () => {
        document.documentElement.classList.toggle('menu-open');
        navBody.classList.toggle('header__nav_active');
        document.body.classList.toggle('lock');
        checkNavLinks();
    });
}
