class LottoGenerator extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'lotto-card');

        const title = document.createElement('h1');
        title.textContent = '오늘 저녁 뭐 먹지?';

        const button = document.createElement('button');
        button.textContent = '메뉴 추천받기';

        const historyContainer = document.createElement('div');
        historyContainer.setAttribute('class', 'history');

        const style = document.createElement('style');
        style.textContent = `
            .lotto-card {
                text-align: center;
            }
            h1 {
                color: var(--primary-color);
                margin-top: 0;
            }
            button {
                background-color: var(--primary-color);
                color: var(--white);
                border: none;
                padding: 10px 20px;
                border-radius: var(--border-radius);
                font-size: 1rem;
                cursor: pointer;
                transition: background-color 0.3s;
            }
            button:hover {
                background-color: #3a7bc8;
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        wrapper.appendChild(title);
        wrapper.appendChild(button);

        button.addEventListener('click', () => {
            const menu = this.recommendMenu();
            this.displayMenu(menu);
        });
    }

    recommendMenu() {
        const menuItems = [
            "피자", "치킨", "햄버거", "파스타", "초밥", "스테이크",
            "떡볶이", "김치찌개", "된장찌개", "비빔밥", "불고기", "삼겹살",
            "짜장면", "짬뽕", "탕수육", "카레", "돈까스", "샐러드"
        ];
        const randomIndex = Math.floor(Math.random() * menuItems.length);
        return menuItems[randomIndex];
    }

    displayMenu(menu) {
        this.shadowRoot.querySelector('h1').textContent = menu;
    }
}

customElements.define('lotto-generator', LottoGenerator);


