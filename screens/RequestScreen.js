import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

const GET_API = 'https://dummy.restapiexample.com/api/v1/employee/1';
const POST_API = 'https://dummy.restapiexample.com/api/v1/create';
const PUT_API = 'https://dummy.restapiexample.com/api/v1/update/21';
const DELETE_API = 'https://dummy.restapiexample.com/api/v1/delete/2';

export default function RequestScreen() {
    const [getResponse, setGetResponse] = React.useState();
    const [postResponse, setPostResponse] = React.useState();
    const [putResponse, setPutResponse] = React.useState();
    const [deleteResponse, setDeleteResponse] = React.useState();

    const getRequest = async () => {
        try {
            const response = await fetch(GET_API);
            const json = await response.json();
            setGetResponse(json);
        } catch(e) {
            console.log(e);
        }
    }

    const postRequest = async () => {
        try {
            const response = await fetch(POST_API, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    name: 'test',
                    salary: 'test',
                    age: 'test',
                }),
            });
            const json = await response.json();
            setPostResponse(json);
        } catch (e) {
            console.log(e);
        }
    }

    const putRequest = async () => {
        try {
            const response = await fetch(PUT_API, {
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    name: 'test',
                    salary: 'test',
                    age: 'test',
                }),
            });
            const json = await response.json();
            setPutResponse(json);
        } catch (e) {
            console.log(e);
        }
    }

    const deleteRequest = async () => {
        try {
            const response = await fetch(DELETE_API, {
                method: "DELETE",
                headers: {
                    "Content-Type" : "application/json",
                },
            });
            const json = await response.json();
            setDeleteResponse(json);
        } catch (e) {
            console.log(e);
        }
    }

// async function sendPushNotification() {
//     await fetch('https://exp.host/--/api/v2/push/send', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//                                                //deflate: A compression format that uses the zlib structure with the deflate compression algorithm.
//         'Accept-encoding': 'gzip, deflate', //A compression format that uses the Lempel-Ziv coding (LZ77) with a 32-bit CRC.
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(state),
//     });
//   }



  return (
    <View style={styles.container}>
        <Text style={{fontSize: 22, fontWeight: 'bold'}}>Request Screen</Text>
        {/* GET REQUEST  */}
        <Text>
            getResponse: {JSON.stringify(getResponse)}
        </Text>
        <Button title='GET' onPress={getRequest} />
        {/* POST REQUEST  */}
        <Text>
            postResponse: {JSON.stringify(postResponse)}
        </Text>
        <Button title='POST' onPress={postRequest} />

        {/* PUT REQUEST  */}
        <Text>
            putResponse: {JSON.stringify(putResponse)}
        </Text>
        <Button title='PUT' onPress={putRequest} />

        {/* PUT REQUEST  */}
        <Text>
            deleteResponse: {JSON.stringify(deleteResponse)}
        </Text>
        <Button title='DELETE' onPress={deleteRequest} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});