function openModalWindow(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = "hidden";
    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function closeModalWindow(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    const openModal = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);

    openModal.forEach(item => {
        item.addEventListener('click', () => openModalWindow(modalSelector, modalTimerId));
    });
    
    modal.addEventListener('click', (event) => {
        if(event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModalWindow(modalSelector);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === "Escape" && modal.classList.contains('show')) {
            closeModalWindow(modalSelector);
        }
    });

    /* function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModalWindow(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll); */

}

export default modal;
export {openModalWindow, closeModalWindow};