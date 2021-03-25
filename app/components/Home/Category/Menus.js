import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;
import Style from "../../../Theme/Style";

class Menus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDisable: false,
            // linkTo: 'screen,ZonkScreen',
            passing: '',
            linkTo: ''
        }

        Navigation.events().bindComponent(this);
    }

    componentDidMount() {
        let link = this.props.tapTo
        let passing = this.props.passing
        if (link) {
            this.setState({ linkTo: link, passing: passing })
        }
    }

    handleNavigation = (data) => {
        this.setState({ isDisable: true }, () => {
            this.goToScreen(data);
        })
    }

    goToScreen = (screenName) => {


        Navigation.push(this.props.componentId, {
            component: {
                name: screenName,
                passProps: {
                    passed: this.props.passing
                }
            }
        })
    }

    componentDidDisappear() {
        this.setState({ isDisable: false })
    }
    render() {
        return (
            <View pointerEvents={this.state.isDisable ? 'none' : 'auto'}>
                <TouchableOpacity style={nbStyles.btnBox} onPress={() => this.handleNavigation(this.state.linkTo)}>
                    <View style={nbStyles.imageWrap}>
                        <Image source={this.props.imgUrl} style={nbStyles.btnImage} />
                    </View>
                    <Text style={[Style.textBlack, Style.textSmall]}>{this.props.name}</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

export default Menus;

const nbStyles = {
    btnBox: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        // width: '100%'
    },
    imageWrap: {
        borderRadius: Math.round(vw + vh) / 2,
        backgroundColor: '#fff',
        height: 50,
        width: 50,
    },
    btnImage: {
        height: 50,
        width: 50,
        // borderRadius: 44,
        marginBottom: 5
    },
    btnText: {
        fontWeight: '100',
        fontSize: 11,
    }
};