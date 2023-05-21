class Scroll {
    constructor(obj) {
        if (typeof (obj.element) == 'string') {
            this.el = document.querySelector(obj.element);
        } else if (obj.element instanceof HTMLElement) {
            this.el = obj.element;
        };
        this.el.style.position = 'fixed';
        this.top = obj.top;
        this.unit = obj.unit;
        window.addEventListener('scroll', () => { this.scroll() });
        window.addEventListener('resize', () => { this.scroll() });
    };
    scroll() {
        this.menuTop = this.scrollNumber();
        if (this.menuTop - window.pageYOffset > 0) {
            this.el.style.top = this.menuTop - window.pageYOffset + 'px';
        } else {
            this.el.style.top = 0
        };
    };
    scrollNumber() {
        if (this.unit == 'px') {
            return this.top >= 0 ? this.top : 0;
        } else if (this.unit == '%' || this.unit == undefined) { 
            return window.innerHeight / 100 * this.top - this.el.clientHeight;
        };
    };
};

const x = new Scroll({
    element: '.header__nav',
    top: '100',
});

class Running {
    constructor(opt) {
        this.content = document.querySelector(opt.content);
        this.h1 = this.content.querySelector('h1');
        this.text = this.h1.innerHTML;
        this.h1.innerHTML = ''; 
        this.add(); 
    }
    add(i = 0) {
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

const y = new Running({ content: '.header__content' });
console.log(y);

// Ниже Д/З

class Animation {
    constructor(obj) {
        this.content = document.querySelector(obj.content);
        this.content.addEventListener('mouseover', () => { this.transferText() });
    };
    transferText() {
        console.log('over');
        this.marginTopValue = Math.floor(Math.random() * ((window.innerHeight - 53) - 35) - 35);
        this.marginRightnValue = Math.floor(Math.random() * ((window.innerWidth - 22) - 132) - 132);
        this.content.style.marginTop = `${this.marginTopValue < 1 ? this.marginTopValue * (-1) : this.marginTopValue}px`;
        this.content.style.marginRight = `${this.marginRightnValue < 1 ? this.marginRightnValue * (-1) : this.marginRightnValue}px`;
    };
};

const j = new Animation({ content: '.header__content' });
console.log(j);