import React, { FC } from 'react';
import { AliasPackage, ColorPackage } from '../../../../constants';
import { IBilling } from '../../../../models/billing';
import { getNumOfDaysUntilExpired } from '../../../../utils/get-time';

interface Props {
    item: IBilling;
}

const limitToWarningExpired = 10;

const Package: FC<Props> = ({ item }) => {
    const { packageType, expiredAt } = item;
    const days = getNumOfDaysUntilExpired(expiredAt);
    const willExpired = days < limitToWarningExpired;

    return (
        <div>
            <span className="detail__package" style={{ color: ColorPackage[packageType] }}>
                {AliasPackage[packageType]}
            </span>
            <span style={{ fontWeight: 400, marginLeft: 16 }}>
                Còn lại
                <span style={{ fontWeight: 'bold', ...willExpired && { color: '#bf2424' } }}>
                    {" "}{days}{" "}
                </span>
                <span style={{ color: '#0199fc' }}>
                    ngày
                </span>
            </span>
        </div>
    )
}

export default Package;