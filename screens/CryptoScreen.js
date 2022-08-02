import * as React from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
import { CRYPTO_KEY } from "@env";

const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?symbol=BTC,ETH,APE,LINK,MM,DOGE';

export default function CryptoScreen() {
    const [coins, setCoins] = React.useState({});

    React.useEffect(() => {
       fetchCoins(); 
    }, [])

    async function fetchCoins() {
        try {
            const response = await fetch(url, {
                headers: {
                    'X-CMC_PRO_API_KEY': CRYPTO_KEY 
                }
            });
            const data = await response.json();
            setCoins(data.data);
        } catch(e) {
            console.log(e);
        }
    }
    return (
        <ScrollView>
            <Text>Crypto Screen</Text>
            {Object.keys(coins).map(key => {
                return (
                    <View key={key} style={{
                        backgroundColor: 'white',
                        padding: 15,
                        margin: 10,
                        borderRadius: 15
                    }}>
                        <Image source={{uri: coins[key].logo}} style={{ width: 64, height: 64}} />
                        <Text>{coins[key].name}</Text>
                        <Text>{coins[key].symbol}</Text>
                        <Text>{coins[key].description}</Text>
                    </View>
                )
            })}

        </ScrollView>
    )
}