import constants from '../constants';
import axios from './axios-client';

async function loadStores({
    limit = 10,
    page = 1,
    search,
    sort = 'createdAt',
    direction = 'asc',
}: {
    limit?: number;
    page?: number;
    search?: string;
    sort?: string;
    direction?: string;
}): Promise<any> {
    const url = `/administrator/v1/stores`;

    const params = {
        limit,
        page,
        search,
        sort,
        direction,
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

async function loadStore({ storeId }: { storeId: string }): Promise<any> {
    const url = `/administrator/v1/stores/${storeId}`;

    const response = await axios({
        method: 'GET',
        url,
        headers: {
            'Cache-Control': 'no-cache',
        }
    });

    return response;
}

async function loadNewBillings({
    limit = 10,
    page = 1,
    search,
    sort = 'createdAt',
    direction = 'desc',
    type,
}: {
    limit?: number; 
    page?: number;
    search?: string;
    sort?: string;
    direction?: string;
    type?: string;
}): Promise<any> {
    const url = `/administrator/v1/admin/billing-stores`;

    const params: any = {
        limit,
        page,
        ...search && { search },
        sort,
        direction,
        ...type && type !== constants.ROOT && { type },
    }

    const response = await axios({
        method: 'GET',
        url,
        params,
    });

    return response;
}

async function approveBilling({ billingId }: { billingId: string }): Promise<any> {
    const url = `/administrator/v1/admin/billing-stores/${billingId}/approve`;

    const response = await axios({
        method: 'POST',
        url,
        data: {},
    });
    return response;
}

async function getFigures({
    storeId,
    startTime,
    endTime,
}: {
    storeId: string,
    startTime: string,
    endTime: string,
}): Promise<any> {
    const url = `/administrator/v1/report/stores/${storeId}`;

    const params = {
        startTime,
        endTime,
    }

    const data = await axios({
        method: 'GET',
        url,
        params,
        headers: {
            'Cache-Control': 'no-cache',
        }
    });

    return data;
}

export default {
    loadStores,
    loadStore,
    loadNewBillings,
    approveBilling,
    getFigures,
};
