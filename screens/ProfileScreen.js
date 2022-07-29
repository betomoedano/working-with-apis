import * as React from 'react';
import { Button, Image, Platform, Text } from 'react-native';
import * as ImagePicker  from 'expo-image-picker';
import { CLOUD_NAME, UPLOAD_PRESET } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {

    const [picture, setPicture] = React.useState('');

    React.useEffect(() => {
        const getPhoto = async () => {
            const photo = await AsyncStorage.getItem("@pic");
            if(photo !== null) setPicture(photo);
        }
        getPhoto();
    })

    const pickImage = async () => {
        if(Platform.OS !== "web") {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if(status !== 'granted') {
                alert("Sorry, we need access");
            }
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: .1,
            base64: true,
        })

        let base64Img = `data:image/jpg;base64,${result.base64}`;
        let apiUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload/`;
        const data = new FormData();
        data.append("file", base64Img);
        data.append("upload_preset", UPLOAD_PRESET);
        // let data = {
        //     "file": base64Img,
        //     "upload_preset": UPLOAD_PRESET,
        // }

        if(!result.cancelled) {
            setPicture(result.uri);
            try {
                const response = await fetch(apiUrl, {
                    method: "POST",
                    body: data,
                });
                const json = await response.json();
                // save locally 
                await AsyncStorage.setItem('@pic', json.url)
                // save to database
                console.log("Response from Cloudinary", json);
            } catch (e) {
                console.log(e);
            }
        }        
    }
    return(
        <>
            <Text>ProfileScreen</Text>
            {picture !== '' && <Image source={{uri:picture}} style={{width: 200, height: 200}} /> }
            <Button title='Open Image Library' onPress={pickImage}/>
        </>
    )
}