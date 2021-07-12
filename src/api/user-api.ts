import axios from './axios-client';

async function loadUsers({
    limit = 10,
    page = 1,
    search,
    sort = 'createdAt',
    direction = 'asc',
}: {
    limit?: number;
    page?: number;
    search?: number;
    sort?: string;
    direction?: string;
}): Promise<any> {
    const url = `/administrator/v1/users`;

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

export default {
    loadUsers,
};
