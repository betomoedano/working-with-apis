import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_KEY } from '@env';

export default function MapsScreen() {
    const [origin, setOrigin] = React.useState({
        latitude: 37.3888055199,
        longitude:  -122.02054891,
        latitudeDelta: .5,
        longitudeDelta: .1,
    });

    const [destination, setDestination] = React.useState({
        latitude:  37.3179706,
        longitude:  -121.8641,
        latitudeDelta: .1,
        longitudeDelta: .1,
    });

    React.useEffect(() =>{
        getLocationPermission();
        Location.getCurrentPositionAsync({
            accuracy: LocationAccuracy.Highest,
            distanceInterval: 1,
        }).then(location => {
            setOrigin({
                ...origin,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            })
        })
    }, [])

    async function getLocationPermission() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if(status !== 'granted') {
            alert('Permission denied');
            return;
        }
    }

    return(
        <View style={styles.container}>
            <MapView 
                initialRegion={origin}
                region={origin}
                style={styles.map} 
                // onRegionChange={(region) => {
                //     setDestination(region)
                // }}
            >
                {/* <View style={{backgroundColor: '#ffffff90' }}>
                    <Text style={{fontSize: 22, fontWeight: 'bold'}}>Latitude: {origin.latitude.toString().slice(0, 9)}</Text>
                    <Text style={{fontSize: 22, fontWeight: 'bold'}}>Longitude: {origin.longitude.toString().slice(0, 9)}</Text>
                </View> */}
                <View style={{backgroundColor: '#ffffff90' }}>
                    <Text style={{fontSize: 22, fontWeight: 'bold'}}>Latitude: {destination.latitude.toString().slice(0, 9)}</Text>
                    <Text style={{fontSize: 22, fontWeight: 'bold'}}>Longitude: {destination.longitude.toString().slice(0, 9)}</Text>
                </View>
                <Marker coordinate={origin} draggable onDragEnd={
                    (direction) => setOrigin(direction.nativeEvent.coordinate)
                }/>
                <Marker coordinate={destination} draggable onDragEnd={
                    (direction) => setDestination(direction.nativeEvent.coordinate)
                }/>

                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={GOOGLE_MAPS_KEY}
                    strokeColor="black"
                    strokeWidth={5}
                />
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    }
})