import React from 'react'
import { View, Text, ImageBackground, TouchableOpacity, Image, Animated, SafeAreaView, SectionList, FlatList, ScrollViewComponent, Platform, StatusBar, Dimensions, StyleSheet } from 'react-native'
import { Card, CardItem, Body, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import CourseList from '../CourseList/CourseList'
import { Navigation } from "react-native-navigation";
import { Modalize } from 'react-native-modalize';
// import Style from '../../Theme/Style';
import { Style, Colors } from "../../Theme/";
import NewsList from '../News/NewsList';
import NewsListImage from '../News/NewListImage';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { sessions } from '../../_helpers/';
import OfflineNotice from "@Component/OfflineNotice";
import Preview from '../../components/FlatListSlider/Preview';
import FlatListSlider from '../../components/FlatListSlider/FlatListSlider';
import moment from 'moment';
import colors from '../../Theme/Colors';



const data = [
    { id: 'ini judul untuk news', value: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', img: '@Asset/images/new/news/Shelton.jpg' },
    { id: 'ini judul untuk news', value: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', img: '@Asset/images/new/news/Shelton.jpg' },
    { id: 'c', value: 'C', img: '@Asset/images/new/news/Shelton.jpg' },
    { id: 'd', value: 'D', img: '@Asset/images/new/news/Shelton.jpg' },
    { id: 'e', value: 'E', img: '@Asset/images/new/news/Shelton.jpg' },
    { id: 'f', value: 'F', img: '@Asset/images/new/news/Shelton.jpg' },
];

export default class Home extends React.Component {
    static options(passProps) {
        const isIos = Platform.OS === "ios";

        return {
            topBar: {
                visible: false,
                // height : 0,
                drawBehind: true,
                background: {
                    color: "#fff"
                }
            },
            statusBar: {
                style: isIos ? "dark" : "light",
                backgroundColor: "#008bbf"
            }
        };
    }
    constructor(props) {
        super(props);
        // this.imgMap = {
        //     0: "@Asset/images/xd.png",
        //     1: "@Asset/images/ae.png",
        //     2: "@Asset/images/sketch.png",
        //     // 3: "img_3.jpg",
        //     // 4: "img_4.jpg"
        // };

        this.state = {
            refreshing: false,
            isDisable: false,
            name: "",
            totalInvoice: 0,
            totalInvoiceDue: ".00",
            dateNow: 0,
            token: "",

            mounted: false,
            // fotoProfil: require("@Asset/images/profile.png"),

            username: "",
            dash: [],
            dataNews: [],
            dataTower: [],
            dataProfile: [],
            news: [],
            promo: [],

            scrollY: new Animated.Value(0),
            noOfPic: 2,
            // imgMap: imgMap,
            imgMap: [
                require('@Asset/images/Home.png'),
                require('@Asset/images/kincir_background.png'),
                require('@Asset/images/relax_background.png'),
            ],
            datagambar: [
                { id: 'ini judul untuk news', image: 'https://images.unsplash.com/photo-1568700942090-19dc36fab0c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' },
                { id: 'ini judul untuk news', image: 'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60' },
                { id: 'c', value: 'C', image: 'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60', },
                { id: 'd', value: 'D', image: 'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60', },
                { id: 'e', value: 'E', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80', },
                { id: 'f', value: 'F', image: 'https://images.unsplash.com/photo-1568700942090-19dc36fab0c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80', },
            ],
        };
        this.setState(() => {
            // this.getRandomPic();

        });

        Navigation.events().bindComponent(this);
        // this.getRandomPic = this.getRandomPic.bind(this);
    }

    async componentWillMount() {
        this.startHeaderHeight = 150;
        if (Platform.OS == "android") {
            this.startHeaderHeight = 100 + StatusBar.currentHeight;
        }


        const data = {
            email: await sessions.getSess("@User"),
            user: await sessions.getSess("@isLogin"),
            // user: 'hany',
            name: await sessions.getSess("@Name"),
            // token: await sessions.getSess("@Token"),
            // userId: await sessions.getSess("@UserId"),
            // dataTower: await sessions.getSess("@UserProject"),


            mounted: true

        }
        console.log('data', data);

        this.setState(data, () => {
            this.getNews();
            this.getPromo();

        })
    }

    handleNavigation = (screenName, passedProps) => {
        this.setState({ isDisable: true }, () => {
            this.goToScreen(screenName, passedProps);
        });
    };

    getRandomPic() {
        // const random = Math.floor(Math.random() * Math.floor(this.state.noOfPic));
        // console.log("imgmap array", this.state.imgMap[random]);
        // // let arr = random;
        // return require("@Asset/images/" + this.state.imgMap[arr]);
        const randomNumber = Math.floor(Math.random() * this.state.imgMap.length);
        console.log('random number', randomNumber);
        this.setState({
            randomImg: randomNumber
        });
    }

    goToScreen = (screenName, passedProps) => {
        Navigation.push(this.props.componentId, {
            component: {
                name: screenName,
                passProps: {
                    passed: passedProps
                }
            }
        });
    };

    // getRandomPic() {
    //     let random = Math.floor(Math.random() * Math.floor(this.state.noOfPic));
    //     console.log("random", random);
    //     console.log('imgp', this.state.imgMap[random]);
    //     let path = require(this.state.imgMap[random]);
    //     // const vars = this.state.imgMap[random];
    //     // this.setState({ randomImg: path });
    //     // let path = require(this.imgMap[random]);
    //     console.log('parh', path);

    //     // this.setState({ randomImg: path });
    //     // return (
    //     //     <ImageBackground source={require('@Asset/images/' + this.state.imgMap[random])} ></ImageBackground>);
    //     // return random;
    //     // console.log('random', random);
    //     // console.log('imgmap', '@Asset/images/' + this.state.imgMap[random]);
    // }

    componentDidMount() {
        this.getRandomPic();

    }

    // scroll = () => {
    //     var wrap = $("#wrap");

    //     wrap.on("scroll", function (e) {

    //         if (this.scrollTop > 147) {
    //             wrap.addClass("fix-search");
    //         } else {
    //             wrap.removeClass("fix-search");
    //         }

    //     });
    // }

    getNews = () => {
        fetch(
            "https://my.api.mockaroo.com/news.json?key=0e67c810",
            // "https://my.api.mockaroo.com/news.json",
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    // Token: this.state.token
                }
            }
        )
            .then(response => response.json())
            .then((res) => {
                if (!res.Error) {
                    const resData = res;
                    this.setState({ news: resData });
                } else {
                    this.setState({ isLoaded: !this.state.isLoaded }, () => {
                        alert(res.Pesan);
                    });
                }
                console.log("getNews", res);
            })
            .catch(error => {
                console.log(error);
            });

    };

    getPromo = () => {
        fetch(
            "https://my.api.mockaroo.com/demo_adv_scheme.json?key=0e67c810",
            // "https://my.api.mockaroo.com/news.json",
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    // Token: this.state.token
                }
            }
        )
            .then(response => response.json())
            .then((res) => {
                if (!res.Error) {
                    let resData = res;
                    let data = [];
                    resData.map((item) => {
                        let items = {
                            // ...item,
                            rowID: item.r,
                            adv_cd: item.a,
                            descs: item.b,
                            status: item.c,
                            start: item.d,
                            end: item.e,
                            banner: item.f,
                            audit_user: item.g,
                            audit_date: item.h,
                            image: item.i,
                        };
                        data.push(items);
                    });
                    // ---- script diatas guna nya untuk ubah nama props dari db, supaya sesuai dengan sistem di mobile
                    console.log('datapromonih', data);


                    // const resData = res; biasanyya pakai ini langsung bisa, kalo nama props sesuuai dengan db dan mobile
                    this.setState({ promo: data });
                } else {
                    this.setState({ isLoaded: !this.state.isLoaded }, () => {
                        alert(res.Pesan);
                    });
                }
                console.log("getPromo", res);
            })
            .catch(error => {
                console.log(error);
            });

    };



    renderHeader = () => {
        return (
            <View style={{ marginTop: 10, marginBottom: 10 }} onPress={() => console.log("aler")}></ View>
        )
    }
    render() {
        // console.log(this.getRandomPic())
        console.log('randompict', this.state.imgMap[this.state.randomImg]);
        const { user } = this.state;
        const screenWidth = Math.round(Dimensions.get('window').width);
        // let imgcoba = 
        return (

            <ImageBackground style={{ width: "100%", height: "100%", backgroundColor: colors.bg_peach }}>

                <OfflineNotice />
                <SafeAreaView style={{ backgroundColor: colors.bg_hijautua, height: 130 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Icon name="receipt-outline" style={{ fontSize: 25, paddingTop: 30, paddingLeft: 15 }}></Icon>
                        </View>
                        <View>
                            <Text style={{
                                paddingHorizontal: 15,
                                fontSize: 20,
                                paddingTop: 20,
                                fontFamily: "Bold",

                                color: "#fff"
                            }}>
                                Welcome back,
                    </Text>
                            <Text style={{
                                paddingHorizontal: 15,
                                fontSize: 20,
                                marginBottom: 20,
                                fontFamily: "Bold",

                                color: "#fff"
                            }}>
                                {this.state.user != null ? this.state.name : <Text style={{
                                    paddingHorizontal: 15,
                                    fontSize: 20,
                                    paddingTop: 20,
                                    marginBottom: 20,
                                    fontFamily: "Bold",

                                    color: "#fff"
                                }}>Friends</Text>}
                            </Text>
                        </View>
                    </View>
                </SafeAreaView>

                <ScrollView>
                    <FlatListSlider
                        data={this.state.datagambar}
                        timer={5000}
                        onPress={item => alert(JSON.stringify(item))}
                        indicatorContainerStyle={{ position: 'absolute', bottom: 20 }}
                        indicatorActiveColor={'#8e44ad'}
                        indicatorInActiveColor={'#ffffff'}
                        indicatorActiveWidth={30}
                        animation

                    />
                    {user != null ?
                        <View style={{
                            // flexDirection: "row",
                            backgroundColor: "#fff",
                            marginTop: 15,
                            // paddingBottom: 5,
                            // marginHorizontal: 10,
                            borderRadius: 20,
                            paddingVertical: 5,
                            // paddingLeft: 30,
                            marginBottom: 15,
                            // width: '100%'

                            // -- create shadow
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,
                            elevation: 3,
                            // -- end create shadows
                        }}>

                            <Grid>
                                <Col style={{ backgroundColor: 'red', marginHorizontal: 10, flexDirection: "row", alignItems: "center", }}>
                                    <Icon name="receipt-outline" style={{ fontSize: 30, padding: 5, color: colors.bg_abuabu }}></Icon>
                                    <View style={{ flexGrow: 1, flexDirection: 'column' }}>
                                        <Text style={{
                                            color: colors.bg_abuabu,
                                            fontSize: 16,
                                            fontFamily: "Bold",
                                        }}>
                                            INVOICE
                                    </Text>
                                        <Text style={{
                                            color: colors.bg_abuabu,
                                            fontSize: 16,
                                            fontFamily: "Bold",
                                        }}>
                                            invoice
                                    </Text>

                                    </View>
                                </Col>
                                <Col style={{ backgroundColor: 'blue', marginHorizontal: 10 }}>
                                    <Text>
                                        col 1
                                    </Text>
                                </Col>
                            </Grid>
                        </View>
                        :
                        <View style={{ marginBottom: 100 }}></View>
                    }


                    {/* -------- MENU - MENU ----------- */}
                    <Grid>
                        <Col style={{ height: 90, paddingLeft: 10, paddingRight: 10 }}>
                            <TouchableOpacity
                                // // onPress={() => this.props.navigation.navigate('Cources')}
                                // onPress={() => this.handleNavigation(
                                //     "screen.Cources",
                                //     // this.state.totalInvoiceDue
                                // )}
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                    alignItems: "center",

                                    height: 80,
                                    width: '100%',
                                    paddingVertical: 10,

                                    paddingHorizontal: 10,
                                    marginBottom: 15,
                                    borderRadius: 20,
                                    textAlign: 'center',

                                    // -- create shadow
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.22,
                                    shadowRadius: 2.22,
                                    elevation: 3,
                                    // -- end create shadow

                                }}
                            >
                                <Icon name="receipt-outline" style={{ fontSize: 25, padding: 5, color: colors.bg_abuabu }}></Icon>
                                <View style={{ flexGrow: 1, flexDirection: 'row' }}>
                                    <Text style={{
                                        color: colors.bg_abuabu,
                                        fontSize: 16,
                                        fontFamily: "Bold",
                                    }}>
                                        Billing
                                    </Text>
                                </View>

                            </TouchableOpacity>
                        </Col>
                        <Col style={{ height: 90, paddingLeft: 10, paddingRight: 10 }}>
                            <TouchableOpacity
                                // // onPress={() => this.props.navigation.navigate('Cources')}
                                // onPress={() => this.handleNavigation(
                                //     "screen.Cources",
                                //     // this.state.totalInvoiceDue
                                // )}
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                    alignItems: "center",

                                    height: 80,
                                    width: '100%',
                                    paddingVertical: 10,
                                    borderRadius: 20,
                                    paddingHorizontal: 10,
                                    marginBottom: 10,

                                    // -- create shadow
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.22,
                                    shadowRadius: 2.22,
                                    elevation: 3,
                                    // -- end create shadow
                                }}
                            >
                                <Icon name="receipt-outline" style={{ fontSize: 25, padding: 5, color: colors.bg_abuabu }}></Icon>
                                <View style={{ flexGrow: 1, flexDirection: 'row' }}>
                                    <Text style={{
                                        color: colors.bg_abuabu,
                                        fontSize: 16,
                                        fontFamily: "Bold",

                                    }}>
                                        Customer Services
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </Col>
                        <Col style={{ height: 90, paddingLeft: 10, paddingRight: 10 }}>
                            <TouchableOpacity
                                // // onPress={() => this.props.navigation.navigate('Cources')}
                                // onPress={() => this.handleNavigation(
                                //     "screen.Cources",
                                //     // this.state.totalInvoiceDue
                                // )}
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                    alignItems: "center",

                                    height: 80,
                                    width: '100%',
                                    paddingVertical: 10,
                                    borderRadius: 20,
                                    paddingHorizontal: 10,
                                    marginBottom: 10,

                                    // -- create shadow
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.22,
                                    shadowRadius: 2.22,
                                    elevation: 3,
                                    // -- end create shadow
                                }}
                            >
                                <Icon name="receipt-outline" style={{ fontSize: 25, padding: 5, color: colors.bg_abuabu }}></Icon>
                                <View style={{ flexGrow: 1, flexDirection: 'row' }}>
                                    <Text style={{
                                        color: colors.bg_abuabu,
                                        fontSize: 16,
                                        fontFamily: "Bold",

                                    }}>
                                        Fasilitas
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </Col>
                    </Grid>

                    {/* -------- END MENU - MENU ----------- */}

                    {/* --------- ANNOUNCEMENT ------- */}
                    <View style={{ paddingLeft: 10, paddingTop: 15 }}>
                        <Text style={{
                            color: colors.bg_abuabu,
                            fontSize: 16,
                            fontFamily: "Bold",
                            textAlign: 'left',
                            width: '100%',
                            fontWeight: 'bold',
                            textTransform: 'uppercase'

                        }}>
                            Announcement
                        </Text>

                    </View>
                    <Grid style={{ paddingTop: 10 }}>
                        <Col style={{ height: 90, paddingLeft: 10, paddingRight: 10 }}>
                            <TouchableOpacity
                                // // onPress={() => this.props.navigation.navigate('Cources')}
                                // onPress={() => this.handleNavigation(
                                //     "screen.Cources",
                                //     // this.state.totalInvoiceDue
                                // )}
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#fff",
                                    alignItems: "center",

                                    height: 80,
                                    width: '100%',
                                    paddingVertical: 10,

                                    paddingHorizontal: 10,
                                    marginBottom: 15,
                                    borderRadius: 20,
                                    // textAlign: 'center',

                                    // -- create shadow
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.22,
                                    shadowRadius: 2.22,
                                    elevation: 3,
                                    // -- end create shadow

                                }}
                            >

                                <View style={{ flexDirection: 'column', width: '100%' }}>
                                    <View>
                                        <Text style={{
                                            color: colors.bg_abuabu,
                                            fontSize: 16,
                                            fontFamily: "Bold",
                                            textAlign: 'center',
                                            width: '100%',
                                            fontWeight: 'bold'
                                        }}>
                                            Announcement
                                        </Text>

                                    </View>

                                    <View>
                                        <Text style={{
                                            color: "#000",
                                            fontSize: 14,
                                            fontFamily: "Bold",
                                            textAlign: 'center',
                                            width: '100%'
                                        }}>
                                            Lift Tower A sedang diperbaiki
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Col>
                    </Grid>

                    {/* --------- END ANNOUNCEMENT ------- */}

                </ScrollView>
            </ImageBackground>



        )
    }
}

const styles = StyleSheet.create({
    separator: {
        height: 20,
    },
    contentStyle: {
        paddingHorizontal: 16,
        // flex: 1
    },
});