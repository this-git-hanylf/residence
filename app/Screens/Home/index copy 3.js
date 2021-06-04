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
            <ImageBackground
                // source={require('@Asset/images/Home.png')}
                // source={this.state.randomImg}
                // source={this.getRandomPic()}
                source={this.state.imgMap[this.state.randomImg]}
                style={{ width: "100%", height: "100%", backgroundColor: '#f7f5f2' }}
            >
                <OfflineNotice />
                {/* <Image source={require('@Asset/images/Home.png')}>

                </Image> */}


                <SafeAreaView>
                    <Text style={{
                        paddingHorizontal: 15,
                        fontSize: 20,
                        paddingTop: 20,
                        marginBottom: 20,
                        fontFamily: "Bold",
                        // alignItems: "flex-start",
                        color: "#000"
                    }}>
                        Welcome back {this.state.user != null ? this.state.name : <Text style={{
                            paddingHorizontal: 15,
                            fontSize: 20,
                            paddingTop: 20,
                            marginBottom: 20,
                            fontFamily: "Bold",
                            // alignItems: "flex-start",
                            color: "#000"
                        }}>Friends</Text>}
                    </Text>
                </SafeAreaView>
                <ScrollView>
                    <FlatListSlider
                        data={this.state.promo}
                        timer={5000}
                        onPress={item => alert(JSON.stringify(item))}
                        indicatorContainerStyle={{ position: 'absolute', bottom: 20 }}
                        indicatorActiveColor={'#8e44ad'}
                        indicatorInActiveColor={'#ffffff'}
                        indicatorActiveWidth={30}
                        animation
                    />

                    {/* SEARCH BAR */}
                    {/* <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#FFF",
                        padding: 10,
                        borderRadius: 12,
                        marginHorizontal: 20,
                        marginTop: 20
                    }}>
                        <TextInput
                            placeholder="Search for new knowledge!"
                            placeholderTextColor="#345c74"
                            style={{
                                fontFamily: "Bold",
                                fontSize: 12,
                                width: 280,
                                paddingHorizontal: 12
                            }}
                        />
                        <Image
                            source={require('@Asset/images/sear.png')}
                            style={{ height: 14, width: 14 }}
                        />
                    </View> */}

                    {/* ------- CARD INVOICE ------- */}
                    {user != null ?
                        <View style={{
                            flexDirection: "row",
                            backgroundColor: "#fff",
                            marginTop: 20,
                            // paddingBottom: 5,
                            marginHorizontal: 20,
                            borderRadius: 20,
                            paddingVertical: 5,
                            paddingLeft: 30,
                            marginBottom: 10,
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

                            <View style={{ width: '50%' }}>

                                <Text style={{
                                    color: "#000",
                                    fontSize: 16,
                                    fontFamily: "Bold",
                                    paddingRight: 50
                                }}>
                                    <Icon name="receipt-outline" style={{ fontSize: 18 }}></Icon> Invoice
                                </Text>

                                <TouchableOpacity
                                    // // onPress={() => this.props.navigation.navigate('Cources')}
                                    // onPress={() => this.handleNavigation(
                                    //     "screen.Cources",
                                    //     // this.state.totalInvoiceDue
                                    // )}
                                    style={{
                                        flexDirection: "row",
                                        backgroundColor: "#F0E2D0",
                                        alignItems: "center",
                                        marginTop: 5,
                                        width: 140,
                                        paddingVertical: 10,
                                        borderRadius: 14,
                                        paddingHorizontal: 10,
                                        marginBottom: 10,
                                    }}
                                >
                                    <Text style={{
                                        color: "#000",

                                        fontWeight: 'bold',
                                        fontSize: 14,
                                        textAlign: 'left',
                                    }}>IDR </Text>
                                    <Text style={{
                                        color: "#000",
                                        fontWeight: 'bold',
                                        fontSize: 14,
                                        textAlign: 'right',
                                        width: '70%'
                                    }}>500,000.00 </Text>


                                    {/* <Image
                                    source={require('@Asset/images/a3.png')}
                                    style={{ marginLeft: 20, width: 8, height: 8 }}
                                /> */}
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '50%' }}>

                                <Text style={{
                                    color: "#000",
                                    fontSize: 16,
                                    fontFamily: "Bold",

                                    paddingRight: 35,

                                    textAlign: 'center'
                                }}>
                                    Total
                           </Text>

                                <TouchableOpacity
                                    // onPress={() => this.props.navigation.navigate('Cources')}
                                    // onPress={() => this.handleNavigation(
                                    //     "screen.Cources",
                                    //     // this.state.totalInvoiceDue
                                    // )}
                                    style={{
                                        flexDirection: "row",
                                        backgroundColor: "#F0E2D0",
                                        alignItems: "center",
                                        marginTop: 5,
                                        width: 140,
                                        paddingVertical: 10,
                                        borderRadius: 14,
                                        marginBottom: 10,
                                    }}
                                >
                                    <Text style={{
                                        color: "#000",
                                        fontWeight: 'bold',
                                        fontSize: 14,
                                        textAlign: 'center',
                                        width: '100%'
                                    }}>20 </Text>

                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        <View style={{ marginBottom: 100 }}></View>
                    }

                    {/* ------- END CARD INVOICE ------- */}


                    {/* -------- MENU - MENU ----------- */}
                    <Grid>
                        <Col style={{ height: 80, paddingLeft: 10, paddingRight: 10 }}>
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
                                    marginBottom: 10,
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
                                <Icon name="receipt-outline" style={{ fontSize: 25, padding: 5 }}></Icon>
                                <View style={{ flexGrow: 1, flexDirection: 'row' }}>
                                    <Text style={{
                                        color: "#000",
                                        fontSize: 16,
                                        fontFamily: "Bold",
                                    }}>
                                        Billing
                                    </Text>
                                </View>

                            </TouchableOpacity>
                        </Col>
                        <Col style={{ height: 80, paddingLeft: 10, paddingRight: 10 }}>
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
                                <Icon name="receipt-outline" style={{ fontSize: 25, padding: 5 }}></Icon>
                                <View style={{ flexGrow: 1, flexDirection: 'row' }}>
                                    <Text style={{
                                        color: "#000",
                                        fontSize: 16,
                                        fontFamily: "Bold",

                                    }}>
                                        Customer Services
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </Col>
                        <Col style={{ height: 80, paddingLeft: 10, paddingRight: 10 }}>
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
                                <Icon name="receipt-outline" style={{ fontSize: 25, padding: 5 }}></Icon>
                                <View style={{ flexGrow: 1, flexDirection: 'row' }}>
                                    <Text style={{
                                        color: "#000",
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
                    <Grid>
                        <Col style={{ height: 80, paddingLeft: 10, paddingRight: 10, paddingTop: 10 }}>
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
                                    marginBottom: 10,
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
                                            color: "#000",
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

                    {/* -------- NEWS N PROMOTION -------- */}
                    <Text style={{
                        color: "#345c74",
                        fontFamily: "Bold",
                        fontSize: 20,
                        paddingHorizontal: 20,
                        marginTop: 20,
                        marginBottom: 5,
                    }}>News</Text>

                    <View>
                        <Text style={{
                            color: "#345c74",
                            fontFamily: "Bold",
                            fontSize: 20,
                            paddingHorizontal: 20,
                            // marginTop: 20,
                            // marginBottom: 5,
                        }}>News</Text>
                    </View>
                    <FlatList data={this.state.news}
                        renderItem={({ item }) => (
                            // <View>

                            <NewsList
                                desc={item.i}
                                bg={Colors.bg_peach}
                                // bg={Style.hijaumuda}
                                img={{ uri: item.g }}
                                // img={require('@Asset/images/new/news/Shelton.jpg')}

                                title={item.j}
                                numColumns={2}
                                colorTextTitle={"#000"}
                                colorTextDesc={"#000"}
                            >
                                {/* <NewsListImage style={{ flex: 1 }} img={require('@Asset/images/screenshot.png')}>

                                </NewsListImage> */}
                            </NewsList>
                            // </View>

                        )}
                        style={{ flex: 1, marginVertical: 10 }}
                        keyExtractor={item => item.r}
                        numColumns={2}
                    />

                    {/* -------- END NEWS -------- */}

                    {/* -------- PROMOTIONS -------- */}

                    <Text style={{
                        color: "#345c74",
                        fontFamily: "Bold",
                        fontSize: 20,
                        paddingHorizontal: 20,
                        marginTop: 20,
                        marginBottom: 10
                    }}>Promotions</Text>
                    {/* ----- tampilan awal promo, list seperti biasa  */}
                    {/* <View style={{ paddingBottom: 140 }}>
                        {this.state.promo.map((item, index) => (
                            <CourseList key={index}
                                img={{ uri: item.image }}
                                title={item.judul}
                                bg={index % 2 === 0 ? "#fdddf3" : "#fef8e3"} //jika index  genap, maka warna krem. else ganjil warna pink
                                datepost={moment(item.date).format('ll')}
                            />
                        ))}
                    </View> */}
                    {/* -----  tutup tampilan awal promo, list seperti biasa  */}
                    <FlatListSlider
                        data={this.state.promo}
                        width={300}
                        timer={4000}
                        component={<Preview />}
                        onPress={item => alert(JSON.stringify(item))}
                        indicatorActiveWidth={30}
                        contentContainerStyle={styles.contentStyle}
                        indicatorStyle={{ marginTop: 0 }}
                    />

                    {/* -------- END PROMOTIONS -------- */}


                </ScrollView>

                {/* MODALIZE SCROLL DIBAWAH */}
                {/* <Modalize
                    handleStyle={{
                        marginTop: 30,
                        backgroundColor: "#e9e9e9",
                        width: 80,


                    }}
                    modalStyle={{
                        borderTopLeftRadius: 60,
                        borderTopRightRadius: 60,
                        backgroundColor: '#fff',
                        marginRight: 20,
                        marginLeft: 20

                    }}
                    alwaysOpen={135}
                    // style={{ backgroundColor: "#999" }}
                    // scrollViewProps={{ showsVerticalScrollIndicator: false }}
                    handlePosition="outside"
                    // handleContentLayout={true}
                    HeaderComponent={this.renderHeader()}
                    modalHeight={250}
                    // adjustToContentHeight={200}
                    beginScrollY={100}

                >


                    <ScrollView>

                        <View style={{ borderRadius: 60 }}>
                            <View style={{ flexDirection: 'row', alignSelf: 'center', }}>

                                <View style={{ flexDirection: 'column', textAlign: 'center' }}>
                                    <Image
                                        source={require('@Asset/images/new/menu/billing.png')}
                                        style={{ width: 40, height: 40, marginLeft: 20, marginRight: 20, marginTop: 25 }}
                                    />
                                    <Text style={[Style.textBlack, { textAlign: 'center' }]}>Billing</Text>
                                </View>
                                <View>
                                    <Image
                                        source={require('@Asset/images/new/menu/finance2.png')}
                                        // style={{ width: 70, height: 70, marginLeft: 10, marginRight: 10, marginTop: 10 }}
                                        style={{ width: 40, height: 40, marginLeft: 20, marginRight: 20, marginTop: 25 }}
                                    />
                                    <Text style={[Style.textBlack, { textAlign: 'center' }]}>Finance</Text>
                                </View>
                                <View>
                                    <Image
                                        source={require('@Asset/images/new/menu/meter2.png')}
                                        style={{ width: 40, height: 40, marginLeft: 20, marginRight: 20, marginTop: 25 }}
                                    />
                                    <Text style={[Style.textBlack, { textAlign: 'center' }]}>Meter</Text>
                                </View>
                                <View>
                                    <Image
                                        source={require('@Asset/images/new/menu/overtime2.png')}
                                        style={{ width: 40, height: 40, marginLeft: 20, marginRight: 20, marginTop: 25 }}
                                    />
                                    <Text style={[Style.textBlack, { textAlign: 'center' }]}>Overtime</Text>
                                </View>

                            </View>
                            <View style={{ flexDirection: 'row', alignSelf: 'center', }}>

                                <View style={{ flexDirection: 'column', textAlign: 'center' }}>
                                    <Image
                                        source={require('@Asset/images/new/menu/helpdesk3.png')}
                                        style={{ width: 40, height: 40, marginLeft: 20, marginRight: 20, marginTop: 25 }}
                                    />
                                    <Text style={[Style.textBlack, { textAlign: 'center' }]}>Helpdesk</Text>
                                </View>
                                <View>
                                    <Image
                                        source={require('@Asset/images/new/menu/housekeeping.png')}
                                        style={{ width: 40, height: 40, marginLeft: 20, marginRight: 20, marginTop: 25 }}
                                    />
                                    <Text style={[Style.textBlack, { textAlign: 'center' }]}>Housekeeping</Text>
                                </View>
                                <View>
                                    <Image
                                        source={require('@Asset/images/new/menu/mart.png')}
                                        style={{ width: 40, height: 40, marginLeft: 20, marginRight: 20, marginTop: 25 }}
                                    />
                                    <Text style={[Style.textBlack, { textAlign: 'center' }]}>Mart</Text>
                                </View>
                                <View>
                                    <Image
                                        source={require('@Asset/images/new/menu/club.png')}
                                        style={{ width: 40, height: 40, marginLeft: 20, marginRight: 20, marginTop: 25 }}
                                    />
                                    <Text style={[Style.textBlack, { textAlign: 'center' }]}>Club</Text>
                                </View>

                            </View>

                        
                        </View>
                    </ScrollView>


                </Modalize> */}
            </ImageBackground >
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