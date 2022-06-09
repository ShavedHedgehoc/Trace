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
    // Font.register({
    //     family: 'Note',
    //     src: "https://fonts.googleapis.com/css2?family=Noto+Sans+Display:wght@300&display=swap"
    // })
    

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
            paddingBottom: '10px'
        },
        subheader: {
            textAlign: 'left',
            fontSize: '12px',            
        },
        row: {
            // flex:"true",
            flexDirection: "row",
            // flexGrow:1,
            // border:" 1px black solid",
            fontSize: "10px",
            display: "flex",
            // height:"20px"
        },
        table: {
            // borderLeft: "1 black solid",
            // borderRight: "1 black solid",
            width: "100%",
            marginTop: "10px"
        }
    })

    const viewerHeight = window.innerHeight - 100
    const viewerWidth = window.innerWidth - 4

    return (
        <div>
            <PDFViewer style={{ width: viewerWidth, height: viewerHeight, margin: 0 }}>
                <Document>
                    <Page size="A4" style={styles.body}>
                        <Text style={styles.header}>
                            Отчет по варке {data.header.boil_name}
                        </Text>
                        <Text style={styles.subheader}>
                            Артикул: {data.header.marking}
                        </Text>
                        <Text style={styles.subheader}>
                            Дата варки: {data.header.date}
                        </Text>
                        <Text style={styles.subheader}>
                            Площадка: {data.header.plant}
                        </Text>

                        <View style={styles.table} wrap={true}>
                            {/* header */}
                            <View style={{
                                width: "100%",
                                backgroundColor: "gray",
                                fontSize: "12px",
                                display: "flex",
                                flexDirection: "row",
                                paddingTop: 5,
                                paddingBottom: 5,
                                borderTop: "1 black solid",
                                borderBottom: "1 black solid",
                                borderLeft: "1 black solid",
                                borderRight: "1 black solid",
                            }}>
                                <View style={{
                                    display: "flex",
                                    alignSelf: "flex-start",
                                    height: "100%",
                                    justifyContent: "center"
                                }}>
                                    <Text style={{
                                        width: 70,
                                        textAlign: "center",
                                    }}>
                                        Код 1С
                                    </Text>
                                </View>
                                <View style={{
                                    display: "flex",
                                    flexGrow: 1,
                                    flexDirection: "row",
                                    justifyContent: "center",
                                }}>
                                    <Text>Наименование</Text>
                                </View>
                                <View style={{
                                    display: "flex",
                                    alignSelf: "flex-end",
                                    height: "100%",
                                    justifyContent: "center"
                                }}>
                                    <Text style={{
                                        width: 70,
                                        textAlign: "center"
                                    }}>
                                        План
                                    </Text>
                                </View>
                                <View style={{
                                    display: "flex",
                                    alignSelf: "flex-end",
                                    height: "100%",
                                    justifyContent: "center"
                                }}>
                                    <Text style={{
                                        width: 70,
                                        textAlign: "center"
                                    }}>
                                        Факт
                                    </Text>
                                </View>
                            </View >
                            <View                             
                            style={{
                                // borderBottom: "1 black solid",
                            }}>
                            {data.summaryRows.map(item =>
                                <View id={item.product_id} wrap={false} style={{
                                    width: "100%",
                                    fontSize: "12px",
                                    display: "flex",
                                    flexDirection: "row",                                    
                                    borderBottom: "1 black solid",
                                }}>
                                    <View style={{
                                        display: "flex",
                                        alignSelf: "flex-start",
                                        height: "100%",
                                        justifyContent: "center",
                                        borderRight: "1 black solid",
                                        borderLeft: "1 black solid",
                                    }}>
                                        <Text style={{
                                            width: 70,
                                            textAlign: "center",
                                        }}>
                                            {item.product_id}
                                        </Text>
                                    </View>
                                    <View style={{
                                        display: "flex",
                                        flex: 2,
                                    }}>
                                        <Text style={{
                                            paddingLeft: 10,
                                            paddingRight: 10,
                                            paddingTop: 3,
                                            paddingBottom: 3
                                        }}>
                                            {item.product_name}
                                        </Text>
                                    </View>
                                    <View style={{
                                        display: "flex",
                                        alignSelf: "flex-end",
                                        height: "100%",
                                        justifyContent: "center",
                                        borderLeft: "1 black solid"
                                    }}>
                                        <Text style={{
                                            width: 70,
                                            textAlign: "center",
                                        }}>
                                            {item.plan ? `${parseFloat(item.plan)}` : `-`}
                                        </Text>
                                    </View>
                                    <View style={{
                                        display: "flex",
                                        alignSelf: "flex-end",
                                        height: "100%",
                                        justifyContent: "center",
                                        borderLeft: "1 black solid",
                                        borderRight: "1 black solid",
                                    }}>
                                        <Text
                                            style={{
                                                width: 70,
                                                textAlign: "center",
                                            }}>
                                            {item.fact ? `${parseFloat(item.fact)}` : `-`}
                                        </Text>
                                    </View>
                                </View>
                            )}
                            </View>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    );
};

export default TestDoc;