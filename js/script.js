"use strict";

// add tabs

window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabsContent(){
        tabsContent.forEach(item => {
            /* item.style.display = 'none'; */
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
 
    hideTabsContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabsContent();
                    showTabContent(i);
                }
            });
        }
    });

    // add timer

    const deadline = '2020-10-1';

    function changeDeadline(end) {
        const date = document.querySelector('.promotion__end');
        date.innerHTML =`Акция закончится ${end}`;
    }
    
     function getTimeRemaning(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / (1000 * 60) % 60)),
              seconds = Math.floor((t /1000) % 60);

        return {
            'total': t,
            'days': days,  
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };    
     }
     
     function getZero(num) {
         if(num >= 0 && num < 10){
             return `0${num}`;
         } else {
             return num;
         }
     }

     function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
            
        updateClock();    

        function updateClock() {
            const t = getTimeRemaning(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
     }
     changeDeadline(deadline);
     setClock('.timer', deadline);

     //add modal

    const openModal = document.querySelectorAll('[data-modal]');
    const closeModal = document.querySelector('[data-close]');
    const modal = document.querySelector('.modal');

    openModal.forEach(item => {
        item.addEventListener('click', () => {
            modal.classList.toggle('show');
            document.body.style.overflow = "hidden";
        });
    });

    function closeModalWindow() {
        modal.classList.toggle('show');
        document.body.style.overflow = "";
    }
    
    closeModal.addEventListener('click', closeModalWindow);

    modal.addEventListener('click', (event) => {
        if(event.target === modal) {
            closeModalWindow();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === "Escape" && modal.classList.contains('show')) {
            closeModalWindow();
        }
    });
});
