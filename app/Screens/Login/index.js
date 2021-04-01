import React, { Component } from "react";
import {
    View, Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    Animated,
    SafeAreaView,
    SectionList,
    FlatList,
    ScrollViewComponent
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Container,
    Button,
    Header
} from "native-base";
import { nbStyle } from './Style';
import Style from '@Theme/Style';
import DeviceInfo from 'react-native-device-info';
import { goHome } from '../navigation';
// import firebase from 'react-native-firebase'
import OfflineNotice from '@Component/OfflineNotice';
import { _storeData, _getData } from '@Component/StoreAsync';
// import { authService, productService } from '../../_services';
import { nav, sessions } from '../../_helpers';



class Login extends Component {
    static options(passProps) {
        return {
            topBar: {
                visible: false,
                height: 0
            },
            bottomTabs: {
                visible: false,
                drawBehind: true
            }
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            //This below for Control
            icEye: "visibility-off",
            avPassword: true,
            device: "",
            token: "",
            isCorrect: "",
            showSpinner: false,
            isHidden: true,

            //This below for form text
            passwordTextInput: "",
            emailTextInput: "",

            // This below for Alert
            showAlert: false,
            themeAlert: "info",
            titleAlert: "",
            subtitleAlert: "",
            titleButtonAlert: "Close",

            // This below for Validator
            emailError: "",
            passwordError: "",

            data: []
        };
    }

    render() {
        return (
            <Container style={nbStyle.content}>
                <ImageBackground source={require('@Asset/images/kincir_background.png')}>

                </ImageBackground>

            </Container>

        )
    }
}

export default Login;