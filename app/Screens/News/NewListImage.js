import React from 'react'
import { Text, TouchableOpacity, View, Image, Dimensions, FlatList } from 'react-native'
import Style from '../../Theme/Style';
// import ProgressCircle from 'react-native-progress-circle'
const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

export default class NewsListImage extends React.Component {
    render() {
        const { img, title, bg, onPress, desc, data, item, numColumns, colorTextTitle, colorTextDesc } = this.props
        return (





            <Image
                source={img}
                style={{ resizeMode: 'contain', flex: 1, width: 200 }}
            />




        )
    }
}