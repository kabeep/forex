class NumberInput extends HTMLElement {
    static styles = new CSSStyleSheet();
    static {
        NumberInput.styles.replaceSync(`
            .field-input-container {
                display: flex;
                flex-direction: column;
                gap: 8px;
                position: relative;
            }

            label {
                font-size: 16px;
                color: #333;
                margin-bottom: 4px;
            }

            input {
                box-sizing: border-box;
                padding: 8.5px 14px;
                font-size: 16px;
                border: 2px solid var(--input-border-color);
                border-radius: 6px;
                width: 100%;
                outline: none;
                transition: var(--transition-duration) var(--transition-bezier);
            }

            input:hover {
                border-color: var(--input-hover-border-color);
            }
            
            input:focus {
                border-color: var(--input-focus-border-color);
            }

            .error-message {
                color: var(--input-invalid-border-color);
                font-size: 12px;
                visibility: hidden;
                position: absolute;
                top: 100%;
            }

            input:invalid {
                border-color: var(--input-invalid-border-color);
            }

            input:invalid + .error-message {
                visibility: visible;
            }
        `);
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.adoptedStyleSheets = [NumberInput.styles];

        const container = this.createContainerElement();

        if (this.getAttribute('label')) {
            const label = this.createLabelElement();
            container.appendChild(label);
        }

        this.input = this.createInputElement();
        container.appendChild(this.input);

        const errorMessage = this.createErrorMessageElement();
        container.appendChild(errorMessage);

        shadowRoot.appendChild(container);
    }

    connectedCallback() {
        this.setValue('0.00');
    }

    createContainerElement() {
        const container = document.createElement('div');
        container.setAttribute('class', 'field-input-container');
        return container;
    }

    createLabelElement() {
        const label = document.createElement('label');
        label.setAttribute('class', 'field-input-label');
        label.setAttribute('for', 'input');
        label.textContent = this.getAttribute('label') || 'Field Label';
        return label;
    }

    createInputElement() {
        const input = document.createElement('input');
        input.setAttribute('class', 'field-input-inner');
        input.setAttribute('type', 'text');
        input.setAttribute('placeholder', this.getAttribute('placeholder') || 'Enter text');
        input.addEventListener('input', () => this.handleInput());
        return input
    }

    createErrorMessageElement() {
        const errorMessage = document.createElement('div');
        errorMessage.setAttribute('class', 'error-message');
        errorMessage.textContent = 'Please enter Arabic numerals';
        return errorMessage;
    }

    handleInput() {
        const isValid = this.validateInput(this.input);
        this.input.setCustomValidity(isValid ? '' : 'Please enter a valid input');

        const event = new CustomEvent('change', {
            detail: { value: this.input.value },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }

    validateInput(input) {
        return !Number.isNaN(Number(input.value));
    }

    setValue(value, trigger = true) {
        this.input.value = value;
        trigger && this.handleInput(value);
    }
}

customElements.define('number-input', NumberInput);
