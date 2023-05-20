class Scroll {
    constructor(obj){
        if(typeof(obj.element) == 'string'){
            this.el = document.querySelector(obj.element);
        }else if(obj.element instanceof HTMLElement){
            // простыми словами HTMLElement ключевое слово типа данных "тег": (например) <nav class="header__nav">…</nav>
            // Оператор instanceof проверяет, принадлежит ли объект к определённому классу, т.е:
            // (с глазами условного оператора): если obj.element, по типу принадлежит к, типу данных HTMLElement, (т,е тег == тег) то true 
            // (соответственно если нет, то false)  
            this.el = obj.element; 
            // это проверка пройдет, если к классу передано сам тег, то просто будем сохранять
        };
        this.el.style.position = 'fixed'; // для фиксирования тега
        this.top = obj.top; // сохраняем значение из объекта
        this.unit = obj.unit; // сохраняем значение из объекта
        // this.el.style.top = this.top + 'px'; // применяем значение объекта для свойства top
        // закомментированный код нацелен на то что, программист передаст значение в пикселях а не в процентах
        // из-за этого внизу код, для проверки unit на единицу измерения, будь он пиксели или проценты
        this.scroll(); // чтобы изначально тег nav держался в указанном отметке пикселя или процента
        window.addEventListener('scroll', () => {this.scroll()}); // при скроле тег nav будет останавливаться на отметки указанного количества пикселей или процентов
        window.addEventListener('resize', () => {this.scroll()}); // при событий "изменений пользователем видимого окна" тег nav будет перенастраиваться 
    };
    scroll(){
        // console.log(window.pageYOffset); // показывает на сколько пикселов прокрутилось окно/сайт
        // window.pageYOffset (не функция) - возвращает количество пикселей, на которое прокручен документ по вертикали (вниз или вверх)
        this.menuTop = this.scrollNumber(); // для работы и в процентах и в пикселя единиц измерений
        if (this.menuTop - window.pageYOffset > 0) {
            // для того чтобы остановить тег nav при top: 0px
            // this.el.style.top = this.top - window.pageYOffset + 'px'; - так явно указывать значения в пикселях мы не  можем
            // this.top - только работа с пикселями, this.menuTop - для работы с пикселями и процентами
            this.el.style.top = this.menuTop - window.pageYOffset + 'px';
        }else {
            // для того чтобы при резких прокрутки мыши (скроле) верху тега nav не были разрывы 
            this.el.style.top = 0
        };
    };
    // для работы не в пикселях а в процентах
    scrollNumber(){
        // этот метод будет принимать значения в пикселях и возвращать значения в процентах относительно длины экрана
        if(this.unit == 'px'){
            return this.top >= 0 ? this.top : 0;
            // если программист нам передал пиксели то вернем все как было - в пикселях
        }else if(this.unit == '%' || this.unit == undefined){ // проверка на undefined в случаях когда программист нам ничего не передаст
            // если программист нам передал проценты то вернем конвертированные значения в пикселях
            // console.log(window); // у глобального объекта window есть такой ключик которых наз: innerHeight
            // CONSOLE:
            // .....
            // innerHeight: 500
            // innerWidth: 1440
            // .....

            // методы innerHeight и innerWidth содержат значения видимой части окна браузера:
            return window.innerHeight / 100 * this.top - this.el.clientHeight;
        };
    };
};

// для тега nav
const x = new Scroll({
    element: '.header__nav',
    top: '100',
    // unit: '',    
});

// console.log(x);
// CONSOLE:
// Scroll {el: nav.header__nav, top: '100', unit: undefined, menuTop: 319}

// для бегущий строки h1

class Running {
    constructor(opt){
        this.content = document.querySelector(opt.content);
        this.h1 = this.content.querySelector('h1'); // ищем содержимое (а именно: "h1") из div: header__content
        this.text = this.h1.innerHTML; // заранее сохраним содержимое h1
        // console.log(this.text); // HEADER TITLE
        this.h1.innerHTML = ''; // чтобы ничего не было
        this.add(); // метод для анимации текст
    }
    // метод который будет добавлять по одной букве
    add(i = 0){
        if (i < this.text.length) {
            setTimeout(() => {
                this.h1.innerHTML += this.text.charAt(i);
                i++;
                this.add(i);
                console.log(i);
            }, 100);
        }
    };
};

const y = new Running({content: '.header__content'});
console.log(y);

// Ниже Д/З

class Animation {
    constructor(obj){
        this.content = document.querySelector(obj.content);
        this.content.addEventListener('mouseover', ()=>{this.transferText()});
    };
    transferText(){
        console.log('over');
        this.marginTopValue = Math.floor(Math.random() * ((window.innerHeight - 53) - 35) - 35);
        this.marginRightnValue = Math.floor(Math.random() * ((window.innerWidth - 22) - 132) - 132);
        this.content.style.marginTop = `${this.marginTopValue < 1 ? this.marginTopValue * (-1) : this.marginTopValue}px`;
        this.content.style.marginRight = `${this.marginRightnValue < 1 ? this.marginRightnValue * (-1) : this.marginRightnValue}px`;
    };
};

const j = new Animation({content: '.header__content'});
console.log(j);