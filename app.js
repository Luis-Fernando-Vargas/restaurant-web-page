const menu = document.querySelector('.hamburger');
const navigation = document.querySelector('.navigation');
const images = document.querySelectorAll('img');
const btnAll = document.querySelector('.all');
const btnBreakfast = document.querySelector('.breakfast');
const btnLunch = document.querySelector('.lunch');
const btnRegularLunch = document.querySelector('.regular-lunch');
const dishesContainer = document.querySelector('.dishes');


document.addEventListener('DOMContentLoaded', () => {
  events();
  dishes();
});

const events = () => {
  menu.addEventListener('click', openMenu)
}

const openMenu = () => {
  navigation.classList.remove('hide');
  closeButton();
}

const closeButton = () => {
  const btnClose = document.createElement('p');
  const overlay = document.createElement('div');
  overlay.classList.add('full-screen');
  const body = document.querySelector('body');
  if (document.querySelectorAll('full-screen').length > 0) return;
  body.appendChild(overlay);
  btnClose.textContent = 'x';
  btnClose.classList.add('btn-close'); 
  navigation.appendChild(btnClose);
  closeMenu(btnClose, overlay);
}

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const image = entry.target;
      image.src = image.dataset.src;
      observer.unobserve(image);
    }
  });
});

images.forEach(image => {
observer.observe(image);
});

const closeMenu = (button, overlay) => {
  const headerItems = document.querySelector('.logo');
  headerItems.addEventListener('click', () => {    
    navigation.classList.add('hide');
    overlay.remove();
    button.remove(); 
  });
  const fullScreen = document.querySelector('.full-screen');
  fullScreen.addEventListener('click', () => {    
    navigation.classList.add('hide');
    overlay.remove();
    button.remove();         
  });
  navigation.addEventListener('click', (e) => {
    if(e.target.closest('a') || e.target.closest('p')){
    navigation.classList.add('hide');
    overlay.remove();
    button.remove();         
  };
});
};


const dishes = () => {
  let dishesArray = [];
  const dishes = document.querySelectorAll('.dish');
  dishes.forEach(dish => dishesArray = [...dishesArray, dish]);

  const breakfasts = dishesArray.filter(breakfast => breakfast.getAttribute('data-dish') === 'breakfast');
  const lunchs = dishesArray.filter(lunch => lunch.getAttribute('data-dish') === 'lunch');
  const regularLunchs = dishesArray.filter(regularLunch => regularLunch.getAttribute('data-dish') === 'regular-lunch');
  showDishes(breakfasts, lunchs, regularLunchs, dishesArray)
};


const showDishes = (breakfasts, lunchs, regularLunchs, all) => {
  btnBreakfast.addEventListener('click', () => {
    cleanHtml(dishesContainer);
    breakfasts.forEach(breakfast => dishesContainer.appendChild(breakfast))
  });
  btnLunch.addEventListener('click', () => {
    cleanHtml(dishesContainer);
    lunchs.forEach(lunch => dishesContainer.appendChild(lunch))
  });
  btnRegularLunch.addEventListener('click', () => {
    cleanHtml(dishesContainer);
    regularLunchs.forEach(regularLunch => dishesContainer.appendChild(regularLunch))
  });
  btnAll.addEventListener('click', () => {
    cleanHtml(dishesContainer);
    all.forEach(all => dishesContainer.appendChild(all))
  });
};

const cleanHtml = (container) => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  };
};