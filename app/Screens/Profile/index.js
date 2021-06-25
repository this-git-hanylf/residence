import React, { Component } from "react";
import {
    View, Text,
    StyleSheet,
    ImageBackground,
    Image,
    TouchableOpacity,
    Alert,
    Modal,
    ScrollView,
    Dimensions
} from 'react-native';
import nbStyle from './Style';
import { goToAuth } from '../navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Navigation } from 'react-native-navigation';
import DeviceInfo from 'react-native-device-info';
// import email from 'react-native-email';
// import RNFetchBlob from 'rn-fetch-blob'
// import ImagePicker from 'react-native-image-crop-picker';
// import { Icon as Icons } from 'react-native-element';
import OfflineNotice from "@Component/OfflineNotice";
import { urlApi } from "@Config";
import { sessions, nav } from "../../_helpers";
// import { authService } from '../../_services';
import colors from "../../Theme/Colors";
import { Container } from "native-base";
import FlatListMenu from '../../components/FlatListMenu/FlatListMenu';

const vw = Dimensions.get('window').width;
class Profile extends Component {
    static options(passProps) {
        return {
            topBar: {
                visible: false,
                height: 0
            }
            // statusBar :{
            //     style : 'light',
            //     backgroundColor :'#2c9993',
            // },
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            mounted: false,
            isDisabled: false,

            username: "",
            email: "",
            token: "",
            userId: "",

            fotoProfildefault: require("@Asset/icons/profile.png"),

            dataProfile: [],
            modalVisible: false,
            dataMenu: [
                { id: '1', menu: 'info personal' },
                { id: '2', menu: 'help' },
                { id: '3', menu: 'about us' },
                { id: '4', menu: 'sign out' },
            ]
        };
        Navigation.events().bindComponent(this);
    }

    async componentDidMount() {
        const data = {
            email: await sessions.getSess("@User"),
            username: await sessions.getSess("@Name"),
            token: await sessions.getSess("@Token"),
            userId: await sessions.getSess("@UserId"),
            mounted: true,
            isLogin: await sessions.getSess("@isLogin")
        };

        this.setState(data, () => { this.getProfile() }
        );
    }


    async componentDidAppear() {
        let refresh = await sessions.getSess("@RefreshProfile");
        console.log(refresh);
        if (this.state.mounted) {
            if (refresh === true) {
                sessions.setSess("@RefreshProfile", false);
                this.getProfile();
            }
        }
    }

    componentWillUnmount() {
        this.setState({ mounted: false });
        // this.props.onBack();
    }

    getProfile = () => {
        fetch(
            urlApi +
            "c_profil/getData/IFCAMOBILE/" +
            this.state.email +
            "/" +
            this.state.userId,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Token: this.state.token
                }
            }
        )
            .then(response => response.json())
            .then(res => {
                const resData = res.Data[0];
                console.log("res", res);

                // ? Agar Gambar Tidak ter cache
                let url =
                    resData.pict + "?random_number=" + new Date().getTime();
                this.setState({ dataProfile: resData }, () => {
                    if (resData.pict) {
                        this.setState({ fotoProfil: { uri: url } });
                    }
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    handleNavigation = (screenName, passedProps) => {
        this.setState({ isDisabled: true }, () => {
            this.goToScreen(screenName, passedProps);
        });
    };

    goToScreen = (screenName, passedProps) => {
        Navigation.push(this.props.componentId, {
            component: {
                name: screenName,
                passProps: {
                    passed: passedProps,
                    token: this.state.token
                }
            }
        });
    };

    componentDidDisappear() {
        this.setState({ isDisabled: false });
    }

    btnLogout = async () => {
        console.log('logouut');
        const formData = {
            email: this.state.email,
            ipAddress: await DeviceInfo.getMacAddress().then((mac) => mac),
            device: Platform.OS,
        };

        fetch(urlApi + "c_auth/Logout/IFCAPB", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Token: this.state.token
            }
        })
            .then(response => response.json())
            .then(res => {
                if (res.Error === false) {
                    this.logout();
                } else {
                    Alert.alert(res.Pesan);
                }
            })
            .catch(error => {
                console.log(error);
            });

        const data = await sessions._getAllData();
        data.map((val) => {
            if (val != "@isIntro") {
                sessions._removeData(val);
            }
        });
        goToAuth();

        // fetch(urlApi + "c_auth/Logout/" + this.state.email, {
        //     method: "POST",
        //     body: JSON.stringify(formData),
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json",
        //         Token: this.state.token
        //     }
        // })



    };

    logout = async () => {
        try {
            await sessions.destroySess();
            const data = await sessions._getAllData();
            data.map((val) => {
                if (val != "@isIntro") {
                    sessions._removeData(val);
                }
            });
            goToAuth();
        } catch (err) {
            console.log("error signing out...: ", err);
        }
    };



    render() {
        let { fotoProfil } = this.state;
        console.log('data menu', this.state.dataMenu);
        return (
            <ImageBackground style={{
                width: "100%", height: "100%", backgroundColor: colors.bg_hijautua
            }}>
                {this.state.isLogin == true ?
                    <View>
                        <View style={{ top: '5%' }}>
                            <Text style={{ color: colors.bg_putih, fontSize: 20, textAlign: 'center' }}>Profile</Text>
                        </View>

                        <View style={{ backgroundColor: colors.bg_putih, borderTopLeftRadius: 60, borderTopRightRadius: 60, top: '10%', height: '100%' }}>
                            {/* ----- image foto profil ------ */}
                            <View style={{
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 20
                            }}>
                                <Image source={fotoProfil}
                                    style={{
                                        borderRadius: 40,
                                        width: 80,
                                        height: 80,

                                    }}
                                />

                            </View>
                            {/* ----- end image foto profil ------ */}

                            {/* ------ content profil -------  */}
                            <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                                <Text style={{ fontSize: 18, color: colors.bg_abuabu }}>
                                    {this.state.username}
                                </Text>
                                <Text style={{ fontSize: 14, color: colors.bg_hijaugelap }}>
                                    {this.state.email}
                                </Text>
                            </View>


                            {/* ----- menu profil ---- */}
                            {this.state.dataMenu.map((item, index) => (
                                // <View key={index}>
                                <FlatListMenu
                                    key={index}
                                    onPress={() => this.btnLogout()}
                                    bg={colors.bg_putih}
                                    menu_name={item.menu}
                                    borderColor={colors.bg_coklat}
                                >
                                </FlatListMenu>
                                // </View>
                            )
                            )}
                            {/* ----- end menu profil ---- */}


                            {/* ------ end content profil -------  */}

                            {/* ------ button logout ------ */}
                            {/* <View style={{ alignItems: 'center', marginTop: 20 }}>
                                <TouchableOpacity
                                    style={{ backgroundColor: colors.bg_putih, borderColor: colors.bg_coklat, borderWidth: 1, padding: 10, borderRadius: 10, width: 100 }}
                                    // onPress={() => this.btnLogout()}
                                    // onPress={() => this.handleNavigation(
                                    //     "screen.Login"

                                    // )}
                                    // onPress={() => nav.push(this.props.componentId, "screen.Login")}
                                    onPress={() => this.btnLogout()}
                                >
                                    <Text style={{ color: colors.bg_coklat, textAlign: 'center' }}>
                                        Sign out
                                    </Text>
                                </TouchableOpacity>
                            </View> */}

                            {/* ------ end button logout ------ */}
                        </View>

                    </View>

                    :
                    <View>
                        <View style={{ top: '5%' }}>
                            <Text style={{ color: colors.bg_abuabu, fontSize: 18, textAlign: 'center' }}>Profile</Text>
                        </View>

                        <View style={{ backgroundColor: colors.bg_putih, borderTopLeftRadius: 60, borderTopRightRadius: 60, top: '10%', height: '100%' }}>
                            <View style={{
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <Image source={fotoProfil}
                                    style={{
                                        borderRadius: 40,
                                        width: 80,
                                        height: 80,

                                    }}
                                />
                            </View>
                            <TouchableOpacity
                                style={nbStyle.btnYes}
                                // onPress={() => this.btnLogout()}
                                // onPress={() => this.handleNavigation(
                                //     "screen.Login"

                                // )}
                                // onPress={() => nav.push(this.props.componentId, "screen.Login")}
                                onPress={() => nav.push(this.props.componentId, "screen.Login")}
                            >
                                <Text style={nbStyle.textYes}>
                                    login
                        </Text>
                            </TouchableOpacity>

                        </View>

                    </View>

                }




            </ImageBackground>


        )
    }
}

export default Profile;