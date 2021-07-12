import { Select } from 'antd';
import React, { FC } from 'react';
import { EFilterType, filterTypeOptions } from '../../../constants';

interface Props {
    filterType: EFilterType;
    setFilterType: (value: EFilterType) => void;
}

const TimeFilter: FC<Props> = ({ filterType, setFilterType }) => {

    return (
        <Select
            value={filterType}
            onChange={(value) => setFilterType(value)}
        >
            {filterTypeOptions.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                    {item.label}
                </Select.Option>
            ))}
        </Select>
    )
}

TimeFilter.defaultProps = {
    filterType: EFilterType.MONTH,
}

export default TimeFilter;