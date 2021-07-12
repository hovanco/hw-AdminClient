import axios from './axios-client';

async function loadReport({
    type,
    startTime,
    endTime,
}: {
    type: 'new-orders' | 'new-stores' | 'new-users'| 'finance';
    startTime: string;
    endTime: string;
}): Promise<any> {
    const url = `/administrator/v1/report/${type}`;

    const params = {
        startTime,
        endTime,
    };

    const response = await axios({
        method: 'GET',
        url,
        params,
        headers: {
            'Cache-Control': 'no-cache',
        }
    });

    return response;
}

export default {
    loadReport,
};
