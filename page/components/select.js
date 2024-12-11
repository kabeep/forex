import { ForexClient } from '../../src';
import getLocale from '../utils/get-locale';
import getCurrencies from '../utils/get-currencies';

class FieldSelect extends HTMLElement {
    static styles = new CSSStyleSheet();

    static {
        FieldSelect.styles.replaceSync(`
            .field-select-container {
                display: flex;
                flex-direction: column;
                gap: 8px;
                min-width: 280px;
            }

            label {
                font-size: 16px;
                color: #333;
                margin-bottom: 4px;
            }

            select {
                box-sizing: border-box;
                padding: 8.5px 14px;
                font-size: 16px;
                border: 2px solid var(--input-border-color);
                border-radius: 6px;
                width: 100%;
                outline: none;
            }

            select:hover {
                border-color: var(--input-hover-border-color);
            }
            
            select:focus {
                border-color: var(--input-focus-border-color);
            }

            select:invalid {
                border-color: var(--input-invalid-border-color);
            }
        `);
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.adoptedStyleSheets = [FieldSelect.styles];

        const container = this.createContainerElement();

        if (this.getAttribute('label')) {
            const label = this.createLabelElement();
            container.appendChild(label);
        }

        this.select = this.createSelectElement();
        container.appendChild(this.select);

        shadowRoot.appendChild(container);
    }

    async connectedCallback() {
        const data = await getCurrencies();

        for (const item of data) {
            if (!item.code) continue;
            const option = document.createElement('option');
            option.value = item.code.toUpperCase();
            option.textContent = item.name || item.code.toUpperCase();
            this.select.appendChild(option);
        }

        const defaultValue = this.getAttribute('value');
        if (defaultValue) {
            this.setValue(defaultValue);
        } else {
            const client = new ForexClient();
            const localeCode = getLocale();
            const currencyCode = client.getCode(localeCode);
            if (currencyCode) this.setValue(currencyCode);
        }
    }

    createContainerElement() {
        const container = document.createElement('div');
        container.setAttribute('class', 'field-select-container');
        return container;
    }

    createLabelElement() {
        const label = document.createElement('label');
        label.setAttribute('class', 'field-select-label');
        label.setAttribute('for', 'select');
        label.textContent = this.getAttribute('label') || 'Select Label';
        return label;
    }

    createSelectElement() {
        const select = document.createElement('select');
        select.setAttribute('class', 'field-select-inner');
        select.setAttribute(
            'name',
            this.getAttribute('name') || 'select-field',
        );

        select.addEventListener('change', (e) => this.handleChange(e.target.value));
        return select;
    }

    handleChange(value) {
        const customEvent = new CustomEvent('change', {
            detail: { value },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(customEvent);
    }

    setValue(value) {
        this.select.value = value;
        this.handleChange(value);
    }
}

customElements.define('field-select', FieldSelect);
