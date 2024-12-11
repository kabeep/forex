import { ForexClient } from '../../src';
import formatDate from './format-date';

async function getRates(code) {
    try {
        const date = new Date();
        const localData = localStorage.getItem(`${code}-rates`);
        if (localData) {
            const { time, data } = JSON.parse(localData);
            if (formatDate(date) === time) return data;
        }

        const client = new ForexClient();
        const response = await client.getRates(code);
        const result = response.data?.filter((item) => Boolean(item.code));
        localStorage.setItem(
            `${code}-rates`,
            JSON.stringify({ code, time: formatDate(date), data: result }),
        );

        return result;
    } catch (error) {
        console.error('Error fetching options:', error);
    }
}

export default getRates;
