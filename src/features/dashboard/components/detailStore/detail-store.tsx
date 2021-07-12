import { UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Row } from 'antd';
import { find, get } from 'lodash';
import React, { FC } from 'react';
import { Loading } from '../../../../components';
import constants from '../../../../constants';
import { businessTypes } from '../../../../models/businessTypes';
import { IStore } from '../../../../models/store';
import { formatDate } from '../../../../utils/format';
import './detail-store.less';

interface Props {
    store: IStore;
}

const DetailStore: FC<Props> = ({ store }) => {

    if (!store) {
        return <Loading full />;
    }

    const leftSpan = 10;
    const rightSpan = 24 - leftSpan;

    const renderAvatar = (src: string) => {
        if (src) {
            return (
                <Avatar src={src} size={24} style={{ marginRight: 10 }} icon={<UserOutlined />}/>
            )
        }
        return;
    }

    const convertAddress = () => {
        return `${store.address} - ${store.wardName} - ${store.districtName} - ${store.provinceName}`;
    };

    return (
        <div className="detail__store">
            <Row gutter={20}>
                <Col span={leftSpan}>Tên cửa hàng :</Col>
                <Col span={rightSpan}>
                    {renderAvatar(`${constants.URL_IMG}${store.logoUrl}`)}
                    {store.name}
                </Col>
            </Row>
            {get(store, 'owner') &&
                <Row gutter={20}>
                    <Col span={leftSpan}>Chủ cửa hàng :</Col>
                    <Col span={rightSpan}>
                        {renderAvatar(get(store, 'owner.picture'))}
                        {get(store, 'owner.name', '')}
                    </Col>
                </Row>}
            <Row gutter={20}>
                <Col span={leftSpan}>Ngày tạo :</Col>
                <Col span={rightSpan}>{formatDate(store.createdAt)}</Col>
            </Row>
            <Row gutter={20}>
                <Col span={leftSpan}>Số điện thoại :</Col>
                <Col span={rightSpan}>{store.phoneNo}</Col>
            </Row>
            {get(store, 'businessType') &&
                <Row gutter={20}>
                    <Col span={leftSpan}>Loại hình doanh nghiệp :</Col>
                    <Col span={rightSpan}>
                        {get(find(businessTypes, { value: store.businessType }), 'title')}
                    </Col>
                </Row>
            }
            <Row gutter={20}>
                <Col span={leftSpan}>Địa chỉ :</Col>
                <Col span={rightSpan}>{convertAddress()}</Col>
            </Row>
        </div>
    );
};

export default DetailStore;
