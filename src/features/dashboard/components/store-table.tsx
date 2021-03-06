import { ReloadOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Input, Row } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IStore } from '../../../models/billing';
import InsaTable from '../components/table-insa';
import { loadStores, searchStore, updateSort } from '../state/storeSlide';
import './index.less';
import Action from './stores/action';

const { Search } = Input;

const StoreTable = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const loading = useSelector((state: any) => state.store.loading);
    const stores = useSelector((state: any) => state.store.stores);
    const page = useSelector((state: any) => state.store.page);
    const limit = useSelector((state: any) => state.store.limit);
    const sort = useSelector((state: any) => state.store.sort);
    const direction = useSelector((state: any) => state.store.direction);
    const search = useSelector((state: any) => state.store.search);

    const [text, setText] = useState('');

    const onSearch = (value: string) => {
        dispatch(searchStore(value));
    };

    const onChangeText = (e: any) => {
        setText(e.target.value);
    };

    const resetSearch = () => {
        dispatch(searchStore(null));
        setText('');
    };
    useEffect(() => {
        dispatch(loadStores());
    }, [dispatch, page, limit, sort, direction, search]);

    const handleTableChange = (pagination: any, filters: any, sorter: any) => {
        const typeSortOrder = typeof sorter.order;
        const data = {
            page: pagination.current,
            limit: pagination.pageSize,
            sort: sorter.column ? sorter.field : 'undefined',
            direction:
                typeSortOrder === 'string'
                    ? sorter.order === 'ascend'
                        ? 'asc'
                        : 'desc'
                    : 'undefined',
        };
        dispatch(updateSort(data));
    };

    const dataSource = (stores.data || []).map((store: any, index: number) => ({
        ...store,
        index: (page - 1) * 10 + index + 1,
    }));

    const columns: ColumnsType<[]> = [
        { title: 'STT', dataIndex: 'index', key: 'index', align: 'center' },
        {
            title: 'T??n shop',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ch??? shop',
            dataIndex: 'owner',
            align: 'center',
            key: 'owner',
            render: (owner: any) => {
                if (owner) {
                    return (
                        <>
                            <Avatar src={owner.picture} icon={<UserOutlined />} alt={owner.name}>
                                {owner.name}
                            </Avatar>
                            <div style={{ marginTop: 5 }}>{owner.name}</div>
                        </>
                    );
                }

                return <span>"</span>;
            },
        },
        {
            title: 'S??T',
            dataIndex: 'phoneNo',
            key: 'phoneNo',
        },
        {
            title: '?????a ch???',
            dataIndex: 'address',
            key: 'address',
            render: (address: any, record: any) => {
                return `${address} - ${record.wardName} - ${record.districtName} - ${record.provinceName}`;
            },
        },
        {
            title: 'Ng??y t???o',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: true,
            render: (createdAt: any) => moment(createdAt).format('DD/MM/YYYY'),
        },
        {
            title: 'Chi Ti???t',
            key: 'createdAt',
            render: (record: any) => <Action record={record} />,
        },
    ];

    return (
        <>
            <InsaTable
                loading={loading}
                columns={columns}
                dataSource={dataSource}
                bordered
                isShowTotal
                onChange={handleTableChange}
                pagination={{
                    total: stores.total || 0,
                    showSizeChanger: false,
                }}
                name='Danh s??ch c???a h??ng'
                className='order-tbl hover'
                hasDefaultColumn={false}
                rowKey='_id'
                headerExtend={
                    <Row gutter={15} style={{ marginBottom: 15 }} align='middle'>
                        <Col>T??m ki???m</Col>
                        <Col>
                            <Search
                                value={text}
                                onChange={onChangeText}
                                onSearch={onSearch}
                                placeholder='T??m ki???m'
                            />
                        </Col>

                        <Col>
                            <Button icon={<ReloadOutlined />} onClick={resetSearch}></Button>
                        </Col>
                    </Row>
                }
                onRow={(item: IStore) => {
                    return {
                        onClick: () => history.push(`/dashboard/shops/${item._id}`),
                    };
                }}
            />
        </>
    );
};

export default StoreTable;
