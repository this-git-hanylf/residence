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
    ScrollViewComponent,
    TextInput
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Container,
    Button,
    Header,
    Icon
} from "native-base";
import nbStyle from './Style';
import Style from '@Theme/Style';
import DeviceInfo from 'react-native-device-info';
import { Navigation } from 'react-native-navigation';
import { goHome } from '../navigation';
// import firebase from 'react-native-firebase'
import OfflineNotice from '@Component/OfflineNotice';
import { _storeData, _getData } from '@Component/StoreAsync';
import { authService, productService } from '../../_services';
import { nav, sessions } from '../../_helpers';
import colors from '../../Theme/Colors';



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

    onChangeText = (key, value) => {
        this.setState({ [key]: value });
    };

    async componentDidMount() {
        this.setState({ device: Platform.OS });

        // this.checkPermission();
        // this.createNotificationListeners();
    }

    handleEyeChanger = () => {
        this.setState({ isHidden: !this.state.isHidden }, () => {
            this.refs["password"].blur();
        });
    };

    btnLoginClick = async () => {
        console.log('klik login');
        // const mac = await DeviceInfo.getMACAddress().then(mac => {
        //     return mac;
        // });
        const mac = await DeviceInfo.getMacAddress().then((mac) => {
            // "E5:12:D8:E5:69:97"
            return mac;
        });
        const formData = {
            email: this.state.emailTextInput,
            password: this.state.passwordTextInput,
            token: "",
            token_firebase: this.state.token,
            device: this.state.device,
            mac: mac,
            app: "O"
        };
        var lengthPass = this.state.passwordTextInput.length;
        if (lengthPass < 4) {
            alert("Wrong password !!!");
        } else {
            this.doLogin(formData);
            console.log('forrmdata', formData);
        }
    };

    async doLogin(value) {
        this.setState({ showSpinner: !this.state.showSpinner });

        await authService.login(value).then(res => {
            if (!res.Error) {
                if (res.Data.isResetPass != 1) {
                    this.getTower(res);
                    console.log('res for getTower', res);
                } else {
                    nav.push(this.props.componentId, "screen.ChangePass", {
                        email: res.Data.user
                    });
                }
            } else {
                alert(res.Pesan);
            }
        });
    }

    getTower = async rest => {
        let result = rest.Data;
        const data = {
            email: this.state.emailTextInput,
            app: "S"
        };

        await productService.getTower(data).then(res => {
            console.log('res getTower', res);
            if (res.Error === false) {
                let resData = res.Data;
                result["UserProject"] = resData;
                this.signIn(result);
                console.log("resDataTower", resData);
            }
        });
    };
    signIn = async res => {
        console.log('sign in');
        const { emailTextInput, passwordTextInput } = this.state;
        try {
            sessions.setSess("@UserId", res.UserId);
            sessions.setSess("@Name", res.name);
            sessions.setSess("@Token", res.Token);
            sessions.setSess("@User", res.user);
            sessions.setSess("@Group", res.Group);
            sessions.setSess("@isLogin", true);
            sessions.setSess("@isReset", res.isResetPass);
            sessions.setSess("@AgentCd", res.AgentCd);
            sessions.setSess("@Debtor", res.Debtor_acct);
            sessions.setSess("@rowID", res.rowID);
            sessions.setSess("@RefreshProfile", false);
            sessions.setSess("@UserProject", res.UserProject);

            goHome();

        } catch (err) {
            console.log("error:", err);
        }
    };



    render() {
        return (
            <Container style={nbStyle.content}>
                <ImageBackground style={{ width: '100%', height: '100%', backgroundColor: colors.bg_peachmuda }}>
                    <OfflineNotice></OfflineNotice>

                    <SafeAreaView>
                        {/* ------- image header -------- */}
                        <View style={{ marginTop: 20, marginLeft: 30 }}>
                            <Image style={{ height: 50, width: 100 }}
                                source={require('@Asset/images/logo.png')}>
                            </Image>
                        </View>

                        {/* ---------- form input email dan password ---------- */}
                        <View style={nbStyle.wrap}>
                            <View>
                                <Text style={nbStyle.title}>
                                    Login
                                </Text>
                            </View>
                            <View style={nbStyle.textInputWrap}>
                                <TextInput
                                    style={nbStyle.textInput}
                                    placeholder={"Your Email"}
                                    onChangeText={val => this.onChangeText("emailTextInput", val)}
                                >
                                </TextInput>
                            </View>
                            <View style={[nbStyle.textInputWrap, { flexDirection: 'row', alignItems: 'center' }]}>
                                <TextInput
                                    style={nbStyle.textInput}
                                    ref="password"
                                    placeholder={"Password"}
                                    secureTextEntry={this.state.isHidden}
                                    onChangeText={val => this.onChangeText("passwordTextInput", val)}
                                >
                                </TextInput>
                                <Icon
                                    onPress={() => this.handleEyeChanger()}
                                    active name={this.state.isHidden ? "eye-outline" : "eye-off-outline"}
                                    type="Ionicons"
                                    style={nbStyle.EyePasswordBtnIcon}
                                >
                                </Icon>
                            </View>
                        </View>
                        <View style={nbStyle.wrap}>
                            <Button
                                style={nbStyle.btnMedium}
                                onPress={() => this.btnLoginClick()}
                            >
                                <Text style={nbStyle.loginBtnText}>
                                    {"Login".toUpperCase()}

                                </Text>
                            </Button>

                        </View>


                    </SafeAreaView>
                </ImageBackground>

            </Container>

        )
    }
}

export default Login;