class LottoGenerator extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'lotto-card');

        const title = document.createElement('h1');
        title.textContent = 'Lotto Number Generator';

        const numberDisplay = document.createElement('div');
        numberDisplay.setAttribute('class', 'number-display');

        const button = document.createElement('button');
        button.textContent = 'Generate Numbers';

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
            .number-display {
                display: flex;
                justify-content: center;
                gap: 10px;
                margin: 2rem 0;
            }
            .number-display span {
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
        wrapper.appendChild(numberDisplay);
        wrapper.appendChild(button);
        wrapper.appendChild(historyContainer);

        button.addEventListener('click', () => {
            const numbers = this.generateNumbers();
            this.displayNumbers(numbers);
            this.updateHistory(numbers);
        });
    }

    generateNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }

    displayNumbers(numbers) {
        const numberDisplay = this.shadowRoot.querySelector('.number-display');
        numberDisplay.innerHTML = '';
        for (const number of numbers) {
            const span = document.createElement('span');
            span.textContent = number;
            numberDisplay.appendChild(span);
        }
    }

    updateHistory(numbers) {
        const historyContainer = this.shadowRoot.querySelector('.history');
        const historyItem = document.createElement('div');
        historyItem.setAttribute('class', 'history-item');
        historyItem.textContent = numbers.join(', ');
        historyContainer.appendChild(historyItem);
    }
}

customElements.define('lotto-generator', LottoGenerator);
