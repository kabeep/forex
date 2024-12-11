import './components/icon';
import './components/input';
import './components/select';
import debounce from './utils/debounce';
import getRates from './utils/get-rates';

(() => {
    const store = {
        baseCurrency: '',
        destCurrency: '',
        baseAmount: 0,
        destAmount: 0,
        exchangeRate: 1,
    };

    const baseCurrencyEl = document.querySelector('#base-currency');
    const destCurrencyEl = document.querySelector('#dest-currency');
    const baseAmountEl = document.querySelector('#base-amount');
    const destAmountEl = document.querySelector('#dest-amount');
    const switchButtonEl = document.querySelector('.form-button');

    const onBaseAmountChange = () => {
        const value = store.baseAmount * store.exchangeRate;
        store.destAmount = value;
        destAmountEl.setValue(value.toFixed(2), false);
    };

    const onDestAmountChange = () => {
        const value = store.destAmount / store.exchangeRate;
        store.baseAmount = value;
        baseAmountEl.setValue(value.toFixed(2), false);
    };

    const onRateChange = (rate = 1) => {
        store.exchangeRate = rate;
        onBaseAmountChange();
    };

    const onCurrenciesChange = debounce(async () => {
        if (!store.baseCurrency || !store.destCurrency) return;

        const rates = await getRates(store.baseCurrency);
        onRateChange(
            rates.find((item) => item.code === store.destCurrency.toLowerCase())
                ?.rate,
        );
    }, 80);

    /* region DOM Listener */
    baseCurrencyEl.addEventListener('change', (event) => {
        store.baseCurrency = event.detail.value;
        onCurrenciesChange();
    });

    destCurrencyEl.addEventListener('change', (event) => {
        store.destCurrency = event.detail.value;
        onCurrenciesChange();
    });

    baseAmountEl.addEventListener('change', (event) => {
        store.baseAmount = Number(event.detail.value);
        onBaseAmountChange();
    });

    destAmountEl.addEventListener('change', (event) => {
        store.destAmount = Number(event.detail.value);
        onDestAmountChange();
    });

    switchButtonEl.addEventListener('click', () => {
        [store.baseCurrency, store.destCurrency] = [
            store.destCurrency,
            store.baseCurrency,
        ];
        baseCurrencyEl.setValue(store.baseCurrency);
        destCurrencyEl.setValue(store.destCurrency);
    });
    /* endregion */
})();
