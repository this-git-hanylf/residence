import React, { Component } from "react";
import {
    View, Text,
    StyleSheet,
    ImageBackground,
    Image,
    TouchableOpacity,
    Alert,
    Modal,
} from 'react-native';
import nbStyle from './Style';
import { goToAuth } from '../navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Navigation } from 'react-native-navigation';
// import email from 'react-native-email';
// import RNFetchBlob from 'rn-fetch-blob'
// import ImagePicker from 'react-native-image-crop-picker';
// import { Icon as Icons } from 'react-native-element';
import OfflineNotice from "@Component/OfflineNotice";
// import { urlApi } from "@Config";
import { sessions, nav } from "../../_helpers";


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

            fotoProfil: require("@Asset/icons/profile.png"),

            dataProfile: [],
            modalVisible: false
        };
        Navigation.events().bindComponent(this);
    }

    async componentWillMount() {
        const data = {
            email: await sessions.getSess("@User"),
            username: await sessions.getSess("@Name"),
            token: await sessions.getSess("@Token"),
            userId: await sessions.getSess("@UserId"),
            mounted: true
        };

        this.setState(data, () =>
        // this.getProfile()
        { }
        );
    }


    async componentDidAppear() {
        let refresh = await sessions.getSess("@RefreshProfile");
        console.log(refresh);
        if (this.state.mounted) {
            if (refresh === true) {
                sessions.setSess("@RefreshProfile", false);
                // this.getProfile();
            }
        }
    }

    componentWillUnmount() {
        this.setState({ mounted: false });
    }

    // getProfile = () => {
    //     fetch(
    //         urlApi +
    //         "c_profil/getData/IFCAMOBILE/" +
    //         this.state.email +
    //         "/" +
    //         this.state.userId,
    //         {
    //             method: "GET",
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //                 Token: this.state.token
    //             }
    //         }
    //     )
    //         .then(response => response.json())
    //         .then(res => {
    //             const resData = res.Data[0];
    //             console.log("res", res);

    //             // ? Agar Gambar Tidak ter cache
    //             let url =
    //                 resData.pict + "?random_number=" + new Date().getTime();
    //             this.setState({ dataProfile: resData }, () => {
    //                 if (resData.pict) {
    //                     this.setState({ fotoProfil: { uri: url } });
    //                 }
    //             });
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // };

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



    render() {
        return (
            <View>
                {/* <OfflineNotice /> */}
                <TouchableOpacity
                    style={nbStyle.btnYes}
                    // onPress={() => this.btnLogout()}
                    // onPress={() => this.handleNavigation(
                    //     "screen.Login"

                    // )}
                    onPress={() => nav.push(this.props.componentId, "screen.Login")}
                >
                    <Text style={nbStyle.textYes}>
                        logins
                    </Text>
                </TouchableOpacity>
                <Text>ini profile</Text>
            </View>

        )
    }
}

export default Profile;