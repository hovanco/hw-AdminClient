import { createSlice } from '@reduxjs/toolkit';
import { pick } from 'lodash';
import storeApi from '../../../api/store-api';
import constants from '../../../constants';

const billingSlide = createSlice({
    name: 'billing',
    initialState: {
        loading: true,
        billings: {},
        page: 1,
        limit: 10,
        search: '',
        sort: 'createdAt',
        direction: 'desc',
        reset: false,
        type: constants.ROOT,
    },
    reducers: {
        loadBillingsStart(state) {
            state.loading = true;
        },
        loadBillingsSuccess(state, action) {
            state.billings = action.payload;
            state.loading = false;
        },
        loadBillingsFailed(state) {
            state.loading = false;
        },
        updateSort(state, action) {
            state.page = action.payload.page;
            state.limit = action.payload.limit;
            state.sort = action.payload.sort;
            state.direction = action.payload.direction;
        },
        updateType(state, action) {
            state.type = action.payload;
            state.page = 1;
        },
        searchBilling(state, action) {
            state.search = action.payload;
            state.page = 1;
        },
        resetBlillings(state, action) {
            state.page = 1;
            state.search = '';
            state.type = constants.ROOT;
            state.reset = !state.reset;
        }
    },
});

const { actions, reducer } = billingSlide;

export const {
    loadBillingsStart,
    loadBillingsSuccess,
    loadBillingsFailed,
    updateSort,
    searchBilling,
    resetBlillings,
    updateType
} = actions;

export const loadBillings = () => async (dispatch: any, getState: any) => {
    try {
        const state = getState();
        const data = pick(state.billing, ['page', 'limit', 'search', 'sort', 'direction', 'type', ]);
        dispatch(loadBillingsStart());
        const response = await storeApi.loadNewBillings(data);

        dispatch(loadBillingsSuccess(response));
    } catch (err) {
        dispatch(loadBillingsFailed());
    }
};

export default reducer;
