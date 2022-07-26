import * as React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { useFetch } from '../hooks/useFetch';
import NewsItem from './NewsItem';
import useSWR from 'swr';

const url = 'https://min-api.cryptocompare.com/data/v2/news/?lang=EN';
const fetcher = url => fetch(url).then(r => r.json());

export default function NewsList() {
    // const { isLoading, error, responseJSON } = useFetch(url);
    const { data, error } = useSWR(url, fetcher);

    if(!data) return <Text>Loading...</Text>;
    if(error) return <Text>Error</Text>;
    return (
        <FlatList 
            data={data.Data}
            renderItem={({item}) => <NewsItem {...item} />}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={{borderBottomWidth: StyleSheet.hairlineWidth}} />}
            contentContainerStyle={{paddingVertical: 50}}
            ListHeaderComponent={() => <Text style={{fontSize: 32, fontWeight: 'bold'}}>News</Text>}
            ListFooterComponent={() => <Text style={{fontSize: 32, fontWeight: 'bold'}}>The End ✌️</Text>}
            horizontal={false}
            inverted={false}
            numColumns={1}
            onEndReached={() => alert('thats all')}
            onEndReachedThreshold={.5}

        />
    )
}