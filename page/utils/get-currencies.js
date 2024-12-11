import { ForexClient } from '../../src';
import formatDate from './format-date';

async function getCurrencies() {
    try {
        const date = new Date();
        const localData = localStorage.getItem('currencies');
        if (localData) {
            const { time, data } = JSON.parse(localData);
            if (formatDate(date) === time) return data;
        }

        const client = new ForexClient();
        const response = await client.getCurrencies();
        const result = (response.data || [])
            .filter((item) => Boolean(item.code))
            .sort((a, b) => {
                const letterA = (a.name || a.code).split(' ')[0].toLowerCase();
                const letterB = (b.name || b.code).split(' ')[0].toLowerCase();
                return letterA.localeCompare(letterB);
            });
        localStorage.setItem(
            'currencies',
            JSON.stringify({ time: formatDate(date), data: result }),
        );

        return result;
    } catch (error) {
        console.error('Error fetching options:', error);
    }
}

export default getCurrencies;
