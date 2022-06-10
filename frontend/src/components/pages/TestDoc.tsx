import React, { useEffect } from 'react';
import classes from '../../styles/Page.module.css';
import { Document, Page, PDFViewer, Text, View, Font, StyleSheet } from '@react-pdf/renderer';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { useParams } from 'react-router-dom';
import { Params } from '../../router';
import LoadingHandler from '../utils/LoadingHandler';

const TestDoc: React.FC = (): JSX.Element => {

    const params = useParams<Params.BOIL_PDF_PARAMS>()
    const boil_id: string | undefined = params.boil_id
    const { data, loading, error } = useTypedSelector(state => state.boilItem)
    const { fetchBoilItem } = useActions()

    useEffect(() => {
        fetchBoilItem(boil_id);
    }, [])

    if (error) {
        return (
            <div className={classes.centeredMessage}>
                Error...
            </div>
        )
    }

    if (loading) {
        return (
            <div className={classes.centeredMessage}>
                <LoadingHandler />
            </div>
        )
    }

    Font.register({
        family: 'Roboto',
        src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf"
    })

    const styles = StyleSheet.create({
        body: {
            fontFamily: 'Roboto',
            paddingTop: '30px',
            paddingBottom: '30px',
            paddingLeft: '10px',
            paddingRight: '10px'
        },
        header: {
            textAlign: 'center',
            fontSize: '16px',
            paddingBottom: '15px'
        },
        subheader: {
            textAlign: 'left',
            fontSize: '12px',
        },
        subheader_center: {
            textAlign: 'center',
            fontSize: '14px',
            paddingBottom: '20px',
            paddingTop: '20px'
        },
        message_center: {
            textAlign: 'center',
            fontSize: '12px',
            paddingBottom: '15px',
            paddingTop: '5px'
        },
        row: {
            flexDirection: "row",
            fontSize: "10px",
            display: "flex",
        },
        table: {
            width: "100%",
            marginTop: "10px"
        },
        table_header: {
            width: "100%",
            backgroundColor: "gray",
            // fontSize: "12px",
            fontSize: "10px",
            display: "flex",
            flexDirection: "row",
            paddingTop: 5,
            paddingBottom: 5,
            borderTop: "1 black solid",
            borderBottom: "1 black solid",
            borderLeft: "1 black solid",
            borderRight: "1 black solid",
        },
        table_header_first_cell: {
            display: "flex",
            alignSelf: "flex-start",
            height: "100%",
            justifyContent: "center"
        },
        table_header_flex_cell: {
            display: "flex",
            flexGrow: 1,
            flexDirection: "row",
            justifyContent: "center",
        },
        table_header_last_cell: {
            display: "flex",
            alignSelf: "flex-end",
            height: "100%",
            justifyContent: "center"
        },
        table_row: {
            width: "100%",
            // fontSize: "12px",
            fontSize: "10px",
            display: "flex",
            flexDirection: "row",
            borderBottom: "1 black solid",
        },
        table_first_cell: {
            display: "flex",
            alignSelf: "flex-start",
            height: "100%",
            justifyContent: "center",
            borderRight: "1 black solid",
            borderLeft: "1 black solid",
        },
        table_left_cell: {
            display: "flex",
            alignSelf: "flex-start",
            height: "100%",
            justifyContent: "center",
            borderRight: "1 black solid",
        },
        table_flex_cell: {
            display: "flex",
            flex: 2,
        },
        table_last_cell: {
            display: "flex",
            alignSelf: "flex-end",
            height: "100%",
            justifyContent: "center",
            borderLeft: "1 black solid",
            borderRight: "1 black solid",
        },
        table_right_cell: {
            display: "flex",
            alignSelf: "flex-end",
            height: "100%",
            justifyContent: "center",
            borderLeft: "1 black solid"
        },
        flex_text: {
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 3,
            paddingBottom: 3
        }
    })

    const viewerHeight = window.innerHeight - 100
    const viewerWidth = window.innerWidth - 4

    return (
        <div>
            <PDFViewer style={{ width: viewerWidth, height: viewerHeight, margin: 0 }}>
                <Document>
                    <Page size="A4" orientation='landscape' style={styles.body}>
                        <Text style={styles.header}>Информация по варке: {data.header.boil_name}</Text>
                        <Text style={styles.subheader}>Артикул: {data.header.marking}</Text>
                        <Text style={styles.subheader}>Дата варки: {data.header.date}</Text>
                        <Text style={styles.subheader}>Площадка: {data.header.plant}</Text>
                        <Text style={styles.subheader_center}>Общая информация</Text>
                        {data.summaryRows.length > 0
                            ?
                            <View style={styles.table} wrap={true}>
                                <View style={styles.table_header} wrap={false}>
                                    <View style={styles.table_header_first_cell}>
                                        <Text style={{ width: 30, textAlign: "center" }}>№</Text>
                                    </View>
                                    <View style={styles.table_header_first_cell}>
                                        <Text style={{ width: 70, textAlign: "center" }}>Код 1С</Text>
                                    </View>
                                    <View style={styles.table_header_flex_cell}>
                                        <Text>Наименование</Text>
                                    </View>
                                    <View style={styles.table_header_last_cell}>
                                        <Text style={{ width: 70, textAlign: "center" }}>План</Text>
                                    </View>
                                    <View style={styles.table_header_last_cell}>
                                        <Text style={{ width: 70, textAlign: "center" }}>Факт</Text>
                                    </View>
                                </View >
                                <View>
                                    {data.summaryRows.map((item, index) =>
                                        <View id={item.product_id} wrap={false} style={styles.table_row}>
                                            <View style={styles.table_first_cell}>
                                                <Text style={{ width: 30, textAlign: "center" }}>{index + 1}</Text>
                                            </View>
                                            <View style={styles.table_left_cell}>
                                                <Text style={{ width: 70, textAlign: "center" }}>{item.product_id}</Text>
                                            </View>
                                            <View style={styles.table_flex_cell}>
                                                <Text style={styles.flex_text}>
                                                    {item.product_name}
                                                </Text>
                                            </View>
                                            <View style={styles.table_right_cell}>
                                                <Text style={{ width: 70, textAlign: "center" }}>
                                                    {item.plan ? `${parseFloat(item.plan)}` : `-`}
                                                </Text>
                                            </View>
                                            <View style={styles.table_last_cell}>
                                                <Text style={{ width: 70, textAlign: "center" }}>
                                                    {item.fact ? `${parseFloat(item.fact)}` : `-`}
                                                </Text>
                                            </View>
                                        </View>
                                    )}
                                </View>
                            </View>
                            :
                            <Text style={styles.message_center}>
                                Информация не найдена...
                            </Text>
                        }
                        <Text style={styles.subheader_center}>
                            Информация по взвешиваниям
                        </Text>
                        {data.weightingRows.length > 0
                            ?
                            <View style={styles.table} wrap={true}>
                                <View style={styles.table_header} wrap={false}>
                                    <View style={styles.table_header_first_cell}>
                                        <Text style={{ width: 30, textAlign: "center" }}>№</Text>
                                    </View>
                                    <View style={styles.table_header_first_cell}>
                                        <Text style={{ width: 70, textAlign: "center", }}>Код 1С</Text>
                                    </View>
                                    <View style={styles.table_header_flex_cell}>
                                        <Text>Наименование</Text>
                                    </View>
                                    <View style={styles.table_header_last_cell}>
                                        <Text style={{ width: 150, textAlign: "center" }}>Квазипартия</Text>
                                    </View>
                                    <View style={styles.table_header_last_cell}>
                                        <Text style={{ width: 150, textAlign: "center" }}>Взвесил</Text>
                                    </View>
                                    <View style={styles.table_header_last_cell}>
                                        <Text style={{ width: 70, textAlign: "center" }}>Количество</Text>
                                    </View>
                                    <View style={styles.table_header_last_cell}>
                                        <Text style={{ width: 70, textAlign: "center" }}>Дата</Text>
                                    </View>
                                    <View style={styles.table_header_last_cell}>
                                        <Text style={{ width: 70, textAlign: "center" }}>Время</Text>
                                    </View>
                                </View >
                                <View>
                                    {data.weightingRows.map((item, index) =>
                                        <View id={item.product_id} wrap={false} style={styles.table_row}>
                                            <View style={styles.table_first_cell}>
                                                <Text style={{ width: 30, textAlign: "center" }}>{index + 1}</Text>
                                            </View>
                                            <View style={styles.table_left_cell}>
                                                <Text style={{ width: 70, textAlign: "center" }}>{item.product_id}</Text>
                                            </View>
                                            <View style={styles.table_flex_cell}>
                                                <Text style={styles.flex_text}>
                                                    {item.product_name}
                                                </Text>
                                            </View>

                                            <View style={styles.table_right_cell}>
                                                <Text style={{ width: 150, textAlign: "center" }}>{item.lot}</Text>
                                            </View>
                                            <View style={styles.table_right_cell}>
                                                <Text style={{ width: 150, textAlign: "center" }}>{item.user}</Text>
                                            </View>
                                            <View style={styles.table_right_cell}>
                                                <Text style={{ width: 70, textAlign: "center" }}>
                                                    {item.quantity ? `${parseFloat(item.quantity)}` : `-`}
                                                </Text>
                                            </View>
                                            <View style={styles.table_right_cell}>
                                                <Text style={{ width: 70, textAlign: "center" }}>
                                                    {item.date}
                                                </Text>
                                            </View>
                                            <View style={styles.table_last_cell}>
                                                <Text style={{ width: 70, textAlign: "center" }}>{item.time}</Text>
                                            </View>
                                        </View>
                                    )}
                                </View>
                            </View>
                            :
                            <Text style={styles.message_center}>
                                Информация не найдена...
                            </Text>
                        }
                        <Text style={styles.subheader_center}>
                            Информация по загрузкам
                        </Text>
                        {data.loadRows.length > 0
                            ?
                            <View style={styles.table} wrap={true}>
                                <View style={styles.table_header} wrap={false}>
                                    <View style={styles.table_header_first_cell}>
                                        <Text style={{ width: 30, textAlign: "center" }}>№</Text>
                                    </View>
                                    <View style={styles.table_header_first_cell}>
                                        <Text style={{ width: 70, textAlign: "center" }}>Код 1С</Text>
                                    </View>
                                    <View style={styles.table_header_flex_cell}>
                                        <Text>Наименование</Text>
                                    </View>
                                    <View style={styles.table_header_last_cell}>
                                        <Text style={{ width: 150, textAlign: "center" }}>Квазипартия</Text>
                                    </View>
                                    <View style={styles.table_header_last_cell}>
                                        <Text style={{ width: 150, textAlign: "center" }}>Загрузил</Text>
                                    </View>
                                    <View style={styles.table_header_last_cell}>
                                        <Text style={{ width: 70, textAlign: "center" }}>Дата</Text>
                                    </View>
                                    <View style={styles.table_header_last_cell}>
                                        <Text style={{ width: 70, textAlign: "center" }}>Время</Text>
                                    </View>
                                </View >
                                <View>
                                    {data.loadRows.map((item, index) =>
                                        <View id={item.product_id} wrap={false} style={styles.table_row}>
                                            <View style={styles.table_first_cell}>
                                                <Text style={{ width: 30, textAlign: "center" }}>{index + 1}</Text>
                                            </View>
                                            <View style={styles.table_left_cell}>
                                                <Text style={{ width: 70, textAlign: "center" }}>{item.product_id}</Text>
                                            </View>
                                            <View style={styles.table_flex_cell}>
                                                <Text style={styles.flex_text}>
                                                    {item.product_name}
                                                </Text>
                                            </View>
                                            <View style={styles.table_right_cell}>
                                                <Text style={{ width: 150, textAlign: "center" }}>{item.lot}</Text>
                                            </View>
                                            <View style={styles.table_right_cell}>
                                                <Text style={{ width: 150, textAlign: "center" }}>{item.user}</Text>
                                            </View>
                                            <View style={styles.table_right_cell}>
                                                <Text style={{ width: 70, textAlign: "center" }}>{item.date}</Text>
                                            </View>
                                            <View style={styles.table_last_cell}>
                                                <Text style={{ width: 70, textAlign: "center" }}>{item.time}</Text>
                                            </View>
                                        </View>
                                    )}
                                </View>
                            </View>
                            :
                            <Text style={styles.message_center}>Информация не найдена...</Text>
                        }
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    );
};

export default TestDoc;