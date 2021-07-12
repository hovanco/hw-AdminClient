import { FacebookOutlined, LinkOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { get } from 'lodash';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import fanpageApi from '../../../../api/fanpage-api';
import { CStatus, IFanPage } from '../../../../models/fanpage';
import InsaTable from '../../components/table-insa';
import './fanpages.less';

const limit = 5;
interface Props {
    storeId: string;
}

const FanPages: FC<Props> = ({ storeId }) => {
    const [page, setPage] = useState<number>(1);
    const [pages, setPages] = useState<IFanPage[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        async function getFanPages() {
            try {
                setLoading(true);

                const data = await fanpageApi.getFanPagesByStoreId({
                    limit,
                    page,
                    storeId,
                });

                setPages(get(data, 'pages', []));
                setTotal(get(data, 'total', 0));
            } catch (err) {

            } finally {
                setLoading(false);
            }
        }

        getFanPages();
    }, [storeId, page]);

    const onChangPagination = (page: number) => {
        setPage(page);
    };

    const renderStatus = (active: boolean) => {
        const key = active ? 'active' : 'inactive';
        const color = active ? 'processing' : 'default';
        return (
            <Tag color={color}>{CStatus[key].label}</Tag>
        )
    }

    const renderLink = (link: string) => {
        return (
            <a href={link} target="_blank" rel="noreferrer">
                Đi tới trang <LinkOutlined />
            </a>
        )
    }

    const columns: ColumnsType<[]> = [
        {
            title: 'Avatar',
            dataIndex: 'picture',
            key: 'picture',
            align: 'center',
            width: '10%',
            render: () => <FacebookOutlined size={24} />
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Link',
            dataIndex: 'link',
            key: 'link',
            width: '20%',
            render: renderLink,
        },
        {
            title: 'Tình trạng',
            dataIndex: 'active',
            key: 'active',
            width: '20%',
            render: renderStatus,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt: any) => moment(createdAt).format('DD/MM/YYYY'),
            width: '10%',
        },
    ];

    return (
        <InsaTable
            loading={loading}
            columns={columns}
            dataSource={pages}
            className='order-tbl hover'
            rowKey='_id'
            pagination={{
                pageSize: limit,
                current: page,
                total: total,
                onChange: onChangPagination,
            }}
            isShowTotal
        />
    );
};

export default FanPages;
