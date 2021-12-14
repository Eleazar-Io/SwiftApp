import React from "react";
import AppBar from '@app/components/AppBar';
import { SafeAreaView, ScrollView, Text } from "react-native";
import { withProfiler } from '@sentry/react-native';
import { GET_POPULAR } from "./services/schema";
import useQueryCustom from "@root/_src/core/hooks/useCustomQuery";
import { useQuery } from '@apollo/client'
import styles from './style'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const Popular = ({loading, error, data})=> {
   
    console.log(data)
    if(loading||error) return <></>
    if(data)
    return(
        <>
            <AppBar useBack title="Popular" />
            <SafeAreaView>
                <ScrollView style={styles.container}>
                {
                    data.products.items.map((res)=>(
                        <Card>
                            <Card.Content>
                            <Title>{res.name}</Title>
                            <Paragraph>{res.price_range.minimum_price.regular_price.currency} - {res.price_range.minimum_price.regular_price.value}</Paragraph>
                            </Card.Content>
                            <Card.Cover source={{ uri: res.image.url }} />
                            <Card.Actions>
                            <Button>Details</Button>
                            </Card.Actions>
                        </Card>
                    ))
                }
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default withProfiler(Popular, {name: 'Popular'});