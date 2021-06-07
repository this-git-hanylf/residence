import React from 'react'
import { Text, TouchableOpacity, View, Image, Linking } from 'react-native'
// import ProgressCircle from 'react-native-progress-circle'
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../../Theme/Colors';


export default class FlatListMenu extends React.Component {
    render() {
        const { menu_name, bg, onPress, borderColor } = this.props
        return (
            <TouchableOpacity onPress={onPress}
                style={{
                    flexDirection: "row",
                    backgroundColor: bg,
                    paddingVertical: 10,
                    marginHorizontal: 20,
                    alignItems: "center",
                    marginTop: 10,
                    borderBottomColor: borderColor,
                    borderBottomWidth: 0.3,
                    height: 50
                }}>
                <View style={{ width: '95%' }}>
                    <Text style={{
                        color: colors.bg_abuabu,
                        fontFamily: "Bold",
                        fontSize: 16,
                        paddingHorizontal: 10,
                        width: '100%',

                        textAlign: 'justify',
                        fontWeight: 'bold'
                    }}>{menu_name}</Text>
                </View>
                <Icon name="chevron-right" style={{ fontSize: 14, color: colors.bg_hijautua, textAlign: 'right' }}></Icon>
            </TouchableOpacity>

        )
    }
}