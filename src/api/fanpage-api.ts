import axios from './axios-client';

async function loadFanpage({
    limit = 10,
    page = 1,
    name,
    sort = 'createdAt',
    direction = 'asc',
}: {
    limit?: number;
    page?: number;
    name?: number;
    sort?: string;
    direction?: string;
}): Promise<any> {
    const url = `/administrator/v1/fbpages`;

    const params = {
        limit,
        page,
        name,
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

async function updateFanpageRequest({
    expiredAt,
    fanpageId,
}: {
    expiredAt: string;
    fanpageId: string;
}): Promise<any> {
    const url = `/administrator/v1/fbpages/${fanpageId}`;

    const data = {
        expiredAt,
    };

    const response = await axios({
        method: 'PUT',
        url,
        data,
    });
    return response;
}

async function getFanPagesByStoreId({
    storeId,
    limit = 10,
    page = 1,
    sort = 'createdAt',
    direction = 'desc',
}: {
    storeId: string;
    limit: number;
    page: number;
    sort?: string;
    direction?: string;
}): Promise<any> {
    const url = `/administrator/v1/fbpages`;

    const params = {
        storeId,
        limit,
        page,
        sort,
        direction,
    };

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
    loadFanpage,
    updateFanpageRequest,
    getFanPagesByStoreId,
};
