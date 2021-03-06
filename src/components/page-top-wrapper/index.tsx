import React, { FC, ReactElement, memo } from 'react';
import { Row, Col } from 'antd';
import { isNil } from 'lodash';
import './style.less';

interface IProps {
    leftContent?: ReactElement;
    rightContent?: ReactElement;
}
const PageTopWrapper: FC<IProps> = ({ leftContent, rightContent }) => (
    <>
        <Row justify='space-between' align='middle' className='page-top-wrapper'>
            <Col span={12}>{!isNil(leftContent) && leftContent}</Col>
            <Col span={12}>
                <Row justify='end'>{!isNil(rightContent) && rightContent}</Row>
            </Col>
        </Row>
    </>
);
export default memo(PageTopWrapper);
