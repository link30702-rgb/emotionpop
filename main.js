class LottoGenerator extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'lotto-card');

        const title = document.createElement('h1');
        title.textContent = '오늘 저녁 뭐 먹지?';

        const menuDisplay = document.createElement('div');
        menuDisplay.setAttribute('class', 'menu-display');

        const button = document.createElement('button');
        button.textContent = '메뉴 추천받기';

        const historyContainer = document.createElement('div');
        historyContainer.setAttribute('class', 'history');
        const historyTitle = document.createElement('h2');
        historyTitle.textContent = 'History';
        historyContainer.appendChild(historyTitle);

        const style = document.createElement('style');
        style.textContent = `
            .lotto-card {
                text-align: center;
            }
            h1 {
                color: var(--primary-color);
                margin-top: 0;
            }
            .menu-display {
                display: flex;
                justify-content: center;
                gap: 10px;
                margin: 2rem 0;
            }
            .menu-display span {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-color: var(--secondary-color);
                color: var(--white);
                font-size: 1.2rem;
                font-weight: bold;
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
            .history {
                margin-top: 2rem;
            }
            .history-item {
                margin-bottom: 0.5rem;
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        wrapper.appendChild(title);
        wrapper.appendChild(menuDisplay);
        wrapper.appendChild(button);
        wrapper.appendChild(historyContainer);

        button.addEventListener('click', () => {
            const menu = this.recommendMenu();
            this.displayMenu(menu);
            this.updateMenuHistory(menu);
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
        const menuDisplay = this.shadowRoot.querySelector('.menu-display');
        menuDisplay.innerHTML = '';
        const span = document.createElement('span');
        span.textContent = menu;
        menuDisplay.appendChild(span);
    }

    updateMenuHistory(menu) {
        const historyContainer = this.shadowRoot.querySelector('.history');
        const historyItem = document.createElement('div');
        historyItem.setAttribute('class', 'history-item');
        historyItem.textContent = menu;
        historyContainer.appendChild(historyItem);
    }
}

customElements.define('lotto-generator', LottoGenerator);

// Theme switching logic
function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
}

function toggleTheme() {
    if (document.body.classList.contains('dark-mode')) {
        setTheme('light');
    } else {
        setTheme('dark');
    }
}

// Apply theme on page load and attach event listener
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    const themeToggleButton = document.getElementById('theme-toggle');
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    }
});
