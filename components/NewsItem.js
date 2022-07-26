import * as React from 'react';
import { Text, Image, Pressable, StyleSheet } from 'react-native';

export default function NewsItem({
    title,
    imageurl,
    body,
    source_info,
    url,
    published_on,
}) {
    return(
        <Pressable style={styles.container} onPress={() => alert('hello')}>
            <Text style={styles.title}>{source_info.name}</Text>
            <Text style={styles.body}>{new Date(published_on).toString().slice(0, 11)}</Text>
            <Image source={{ uri: imageurl }} style={{width: '100%', height: 250}} />
            <Text style={styles.title}>{title}</Text>
            <Text numberOfLines={2} style={styles.body}>{body}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        paddingHorizontal: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    body: {
        fontSize: 16,
        color: 'gray'
    }
})