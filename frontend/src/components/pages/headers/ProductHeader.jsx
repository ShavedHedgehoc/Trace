import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const ProductHeader = (props) => {

    const [productData, setProductData] = useState([]);

    const fetchData = async () => {
        const apiUrl = `/api/v1/products/product_data/${props.productId}`;
        try{
        const response = await axios.get(apiUrl);
        setProductData(response.data.product_data);
        } catch (err){
            setProductData(prevState => ({
                ...prevState,
                'id':props.productId,
                'name':'Нет данных',
                
            }));

        } finally {}

    };

    const initRender = useRef(false);

    useEffect(() => {
        if (initRender.current) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.productId]);

    useEffect(() => {
        fetchData();
        initRender.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (

        <Box
                sx={{
                    backgroundColor: '#4db6ac',
                    padding: "10px",
                    borderRadius: "5px"
                }}>
                    <Typography 
                    variant="h5" 
                    component="div"
                    sx={{padding:"10px"}}
                    >
                        Информация по сырью
                    </Typography>                
                <Box
                    sx={{
                        backgroundColor: '#b2dfdb',
                        padding: "10px",
                        borderRadius: "5px"
                    }}
                >
                    <Typography variant="body1" component="div">
                    Код 1С: {productData['id']}
                    </Typography>
                    <Typography variant="body1" component="div">
                    Наименование: {productData['name']}
                    </Typography>
                </Box>
            </Box>

    )
};
export default ProductHeader;