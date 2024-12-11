class BaseIcon extends HTMLElement {
    static styles = new CSSStyleSheet();
    static {
        BaseIcon.styles.replaceSync(`
            :host {
                display: inline-flex;
                font-size: var(--navbar-icon-font-size, 1rem);
                color: var(--anchor-link-color, currentColor);
                text-decoration: none;
                outline: none;
                cursor: pointer;
            }
            :host(:hover) {
                color: var(--anchor-link-hover-color, currentColor);
            }
            a {
                display: inline-flex;
                align-items: center;
                flex-direction: row;
                color: inherit;
                text-decoration: none;
                outline: none;
                transition: var(--transition-duration) var(--transition-bezier);
            }
            .icon { font-size: var(--navbar-icon-font-size); }
            .icon.icon-npm:hover { color: #cd3f45; }
            .icon.icon-github:hover { color: #000; }
            .icon.icon-switch { font-size: 2rem; }
            .icon.icon-switch:hover { color: #6600eb; }
            .user-selected-none {
                user-select: none;
                -ms-user-select: none;
                -moz-user-select: none;
                -webkit-user-select: none;
            }
        `);
    }

    constructor({ href, classname } = {}) {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.adoptedStyleSheets = [BaseIcon.styles];

        const anchor = this.createAnchorElement(href, classname);

        const slot = this.createSlotElement();
        anchor.appendChild(slot);

        shadowRoot.appendChild(anchor);
    }

    createAnchorElement(href, classname) {
        const anchor = document.createElement('a');
        anchor.setAttribute(
            'class',
            ['icon', ...(classname || this.classList)].join(' '),
        );
        anchor.setAttribute('href', href || this.getAttribute('href') || '#');
        return anchor;
    }

    createSlotElement() {
        return document.createElement('slot');
    }

    createSvgElement({ viewBox, children = [] }) {
        const svg = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'svg',
        );
        svg.setAttribute('viewBox', viewBox);
        svg.setAttribute('width', '1em');
        svg.setAttribute('height', '1em');

        for (const child of children) {
            svg.appendChild(this.createSvgChildElement(child));
        }

        return svg;
    }

    createSvgChildElement({ tag, ...restOptions }) {
        const child = document.createElementNS(
            'http://www.w3.org/2000/svg',
            tag,
        );
        if (!restOptions.fill) restOptions.fill = 'currentColor';
        for (const key in restOptions) {
            child.setAttribute(key, restOptions[key]);
        }
        return child;
    }
}

class GithubIcon extends BaseIcon {
    constructor() {
        super({ classname: ['icon-github'] });
        this.appendChild(this.createSvgElement({
            viewBox: '0 0 24 24',
            children: [
                {
                    tag: 'path',
                    d: 'M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z',
                },
            ],
        }));
    }
}

class NpmIcon extends BaseIcon {
    constructor() {
        super({ classname: ['icon-npm'] });
        this.appendChild(this.createSvgElement({
            viewBox: '0 0 27.23 27.23',
            children: [
                {
                    tag: 'rect',
                    width: '27.23',
                    height: '27.23',
                    rx: '2',
                },
                {
                    tag: 'polygon',
                    fill: '#fff',
                    points: '5.8 21.75 13.66 21.75 13.67 9.98 17.59 9.98 17.58 21.76 21.51 21.76 21.52 6.06 5.82 6.04 5.8 21.75',
                },
            ],
        }));
    }
}

class SwitchIcon extends BaseIcon {
    constructor() {
        super({ classname: ['icon-switch'] });
        this.appendChild(this.createSvgElement({
            viewBox: '0 0 1024 1024',
            children: [
                {
                    tag: 'path',
                    d: 'M677.888 335.872l-176.128 0c-2.048 0-2.048 0-2.048-2.048 0-2.048 0-2.048 0-2.048l43.008-43.008c8.192-8.192 8.192-20.48 0-28.672-8.192-8.192-20.48-8.192-28.672 0l-81.92 81.92c-6.144 6.144-8.192 14.336-4.096 22.528 4.096 8.192 10.24 12.288 18.432 12.288l233.472 0c57.344 0 106.496 47.104 108.544 102.4 2.048 53.248-36.864 100.352-90.112 108.544-10.24 2.048-18.432 10.24-18.432 20.48 0 6.144 2.048 12.288 8.192 16.384 4.096 4.096 8.192 4.096 14.336 4.096 0 0 2.048 0 2.048 0 73.728-10.24 126.976-75.776 124.928-149.504C827.392 401.408 759.808 335.872 677.888 335.872z',
                },
                {
                    tag: 'path',
                    d: 'M598.016 598.016 364.544 598.016c-57.344 0-106.496-47.104-108.544-102.4-2.048-53.248 36.864-100.352 90.112-108.544 10.24-2.048 18.432-10.24 18.432-20.48 0-6.144-2.048-12.288-8.192-16.384-4.096-4.096-10.24-6.144-16.384-4.096-73.728 10.24-126.976 75.776-124.928 149.504 2.048 79.872 69.632 143.36 149.504 143.36l176.128 0c2.048 0 2.048 0 2.048 2.048 0 2.048 0 2.048 0 2.048l-43.008 43.008c-4.096 4.096-6.144 8.192-6.144 14.336 0 6.144 2.048 10.24 6.144 14.336 4.096 4.096 10.24 6.144 14.336 6.144 6.144 0 10.24-2.048 14.336-6.144l81.92-81.92c6.144-6.144 8.192-14.336 4.096-22.528C614.4 602.112 606.208 598.016 598.016 598.016z',
                },
            ],
        }));
    }
}

customElements.define('base-icon', BaseIcon);
customElements.define('github-icon', GithubIcon);
customElements.define('npm-icon', NpmIcon);
customElements.define('switch-icon', SwitchIcon);
