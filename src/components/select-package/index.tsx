import { CaretDownFilled } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { map } from 'lodash';
import React, { FC, useEffect, useState } from 'react';
import constants, { AliasPackage, ColorPackage, EBillingPackageType } from '../../constants';

interface Props {
    onSelectType: (type: number) => void;
    type: string;
}

const SelectPackage: FC<Props> = ({ type, onSelectType }) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [key, setKey] = useState<string>(constants.ROOT);
    const { Omni, Pos, Facebook } = EBillingPackageType;
    const packages = [Omni, Pos, Facebook];

    useEffect(() => {
        setKey(type);
    }, [type]);

    const onClickSelectPackage = ({ key }: any): void => {
        setKey(key);
        onSelectType(key);
        setVisible(false);
    }

    const overlay = (
        <Menu onClick={onClickSelectPackage} selectedKeys={[`${key}`]}>
            <Menu.Item key={constants.ROOT} >Tất cả</Menu.Item>
            {map(packages, (item) =>
                <Menu.Item key={item}>
                    <span style={{ color: ColorPackage[item] }}>
                        {AliasPackage[item]}
                    </span>
                </Menu.Item>
            )}
        </Menu>
    );

    return (
        <Dropdown
            overlay={overlay}
            trigger={['click']}
            visible={visible}
            onVisibleChange={(value) => {
                setVisible(value);
            }}
        >
            <Button>
                <span style={{ color: ColorPackage[+key] }}>
                    {AliasPackage[+key] || 'Tất cả'}
                </span>
                <CaretDownFilled style={{ fontSize: 12 }} />
            </Button>
        </Dropdown>
    )
};

SelectPackage.defaultProps = {
    type: constants.ROOT,
    onSelectType: () => { },
}

export default SelectPackage;