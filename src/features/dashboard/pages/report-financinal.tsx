import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Col, message, Row, Space, Table, Typography, Upload } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DashboardApi from '../../../api/dashboard-api';
import iconProduct from '../../../assets/images/ic-layout-left-menu.svg';
import icReport from '../../../assets/images/ic-report.svg';
import PageTopWrapper from '../../../components/page-top-wrapper';
import { EFilterType } from '../../../constants';
import formatMoney from '../../../utils/format-money';
import TimeFilter from '../components/time-filter';
import './dashboard-home.less';

interface Props {}
interface IDashboardReport {
    date: string;
    revenue: number;
}

const ReportFinancial: FC<Props> = () => {
    const [finance, setFinance] = useState<IDashboardReport[]>([]);
    const page = useSelector((state: any) => state.store.page);

    /**
     * filter by week or month
     * select the start of week/month and end of week/month to send to server
     * api has supported
     */
    const [filterType, setFilterType] = useState<EFilterType>(EFilterType.WEEK);

    const options = (
        data: Array<{ date: string; revenue: number }>,
        name: string,
        color: string,
    ): Highcharts.Options => ({
        title: { text: '' },
        subtitle: { text: '' },
        xAxis: {
            categories:
                filterType === EFilterType.WEEK
                    ? ['M', 'T', 'W', 'T', 'F', 'S', 'S']
                    : data.map((e) => e.date.split('/')[0]),
        },
        yAxis: { title: { text: '' } },
        series: [
            {
                name,
                type: 'column',
                data: data.map((e) => e.revenue),
            },
        ],
        chart: {
            height: 250,
        },
        colors: [color],
        plotOptions: {
            column: {
                borderRadius: 5,
                pointWidth: filterType === EFilterType.WEEK ? 20 : undefined,
            },
        },
    });
    const requestOrder = async () => {
        const startTime = moment().startOf(filterType).valueOf().toString();
        const endTime = moment().endOf(filterType).valueOf().toString();

        Promise.all([
            DashboardApi.loadReport({
                type: 'finance',
                startTime,
                endTime,
            }).then((resFinance) => setFinance(resFinance)),
        ]).catch((e) => message.error(e.message || 'Something went wrong'));
    };
    const dataSource = (finance || []).map((store: any, index: number) => ({
        ...store,
        index: (page - 1) * 10 + index + 1,
    }));

    const columns: ColumnsType<[]> = [
        { title: 'STT', dataIndex: 'index', key: 'index', align: 'center' },
        {
            title: 'Ngày',
            dataIndex: 'date',
            key: 'date',
        },

        {
            title: 'Doanh thu',
            dataIndex: 'revenue',
            key: 'revenue',
            render: (revenue: number) => formatMoney(revenue),
        },
    ];

    useEffect(() => {
        requestOrder();
    }, [filterType]);

    return (
        <div>
            <PageTopWrapper
                leftContent={<Typography.Title level={3}>Báo cáo tài chính</Typography.Title>}
                rightContent={
                    <>
                        <TimeFilter filterType={filterType} setFilterType={setFilterType} />
                        <Upload>
                            <Button style={{ marginLeft: '5px' }}>
                                <UploadOutlined />
                                Nhập file
                            </Button>
                        </Upload>
                    </>
                }
            />
            <Row gutter={[30, 22]} style={{ padding: 20 }}>
                <Col span={24}>
                    <Card
                        className='dashboard-card-chart'
                        title={
                            <Space>
                                <img src={icReport} alt='' />
                                <Typography.Text>Thống kê bằng biểu đồ</Typography.Text>
                            </Space>
                        }
                    >
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options(finance, 'Doanh thu', '#41a2ff')}
                        />
                    </Card>
                </Col>
                <Col span={24}>
                    <Card
                        className='dashboard-card-chart'
                        title={
                            <Space>
                                <img src={iconProduct} alt='' />
                                <Typography.Text>Thống kê bằng bảng số liệu</Typography.Text>
                            </Space>
                        }
                    >
                        <Table dataSource={dataSource} columns={columns} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ReportFinancial;
