import React from 'react'
import { Text, TouchableOpacity, View, Image, Dimensions, FlatList } from 'react-native'
import Style from '../../Theme/Style';
// import ProgressCircle from 'react-native-progress-circle'
const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

export default class NewsList extends React.Component {
    render() {
        const { img, title, bg, onPress, desc, data, item, numColumns, colorTextTitle, colorTextDesc } = this.props
        return (


            <TouchableOpacity
                onPress={onPress}
                style={{
                    // flexDirection: "row",
                    backgroundColor: bg,
                    padding: 10,
                    marginHorizontal: 10,
                    borderRadius: 20,
                    alignItems: "center",
                    marginTop: 10,
                    width: vw / numColumns,

                    // flexWrap: "wrap",
                    flex: 1
                }}
            >
                <Image
                    source={img}
                    style={{ width: '100%', height: 100, resizeMode: 'cover' }}
                />

                <View>
                    <Text style={{
                        color: colorTextTitle,
                        fontFamily: "Bold",
                        fontWeight: 'bold',
                        fontSize: 16,
                        paddingHorizontal: 10,
                        width: 170

                    }}>{title}</Text>
                    <Text ellipsizeMode='tail' numberOfLines={3} style={{
                        color: colorTextDesc,
                        fontFamily: "Medium",
                        fontSize: 12,
                        paddingHorizontal: 10
                    }}>
                        {desc}
                    </Text>
                </View>

                {/* <ProgressCircle
                    percent={30}
                    radius={17}
                    borderWidth={1.5}
                    color="f580084"
                    shadowColor="#FFF"
                    bgColor="#FFF"
                >
                    <Image
                        source={require('@Asset/images/pl.png')}
                    />
                </ProgressCircle> */}

            </TouchableOpacity>
        )
    }
}