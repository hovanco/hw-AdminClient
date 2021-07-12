import { Empty } from 'antd';
import { isEmpty, map } from 'lodash';
import React, { FC } from 'react';
import { IBilling } from '../../../../models/billing';
import { convertPackages } from '../../../../utils/convert';
import Package from './package';

interface Props {
    packages: IBilling[]
}

const Packages: FC<Props> = ({ packages }) => {
    const data = convertPackages(packages);

    if (isEmpty(data)) {
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    }

    return (
        <>
            {map(data, (item: IBilling) =>
                <Package item={item} key={`${item._id}${item.packageType}`}/>
            )}
        </>
    )
}

export default Packages;