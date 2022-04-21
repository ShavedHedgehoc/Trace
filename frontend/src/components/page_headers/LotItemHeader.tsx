import React from 'react';
import {ILotItemHeader} from "../../types/lotItem";

interface LotItemHeaderProps {
    header: ILotItemHeader;
}

const LotItemHeader: React.FC<LotItemHeaderProps> = (props): JSX.Element => {
    const {
        lot_name,
        manufacturer_lot_name,
        manufacturer_lot_id,
        trademark_name,
        trademark_id,
        product_name,
        product_id
    } = {...props.header};

    return (
        <div>
            {lot_name}
            {product_name}
            {trademark_name}
        </div>
    );
};

export default LotItemHeader;