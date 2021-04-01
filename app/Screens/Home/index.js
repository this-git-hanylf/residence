import React from 'react'
import { View, Text, ImageBackground, TouchableOpacity, Image, Animated, SafeAreaView, SectionList, FlatList, ScrollViewComponent, Platform, StatusBar } from 'react-native'
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

            scrollY: new Animated.Value(0),
            noOfPic: 2,
            // imgMap: imgMap,
            imgMap: [
                require('@Asset/images/Home.png'),
                require('@Asset/images/kincir_background.png'),
                require('@Asset/images/relax_background.png'),
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
            // name: await sessions.getSess("@Name"),
            // token: await sessions.getSess("@Token"),
            // userId: await sessions.getSess("@UserId"),
            // dataTower: await sessions.getSess("@UserProject"),


            mounted: true

        }
        console.log('data', data);

        this.setState(data, () => {

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



    renderHeader = () => {
        return (
            <View style={{ marginTop: 10, marginBottom: 10 }} onPress={() => console.log("aler")}></ View>
        )
    }
    render() {
        // console.log(this.getRandomPic())
        console.log('randompict', this.state.imgMap[this.state.randomImg]);
        const { user } = this.state;
        // let imgcoba = 
        return (
            <ImageBackground
                // source={require('@Asset/images/Home.png')}
                // source={this.state.randomImg}
                // source={this.getRandomPic()}
                source={this.state.imgMap[this.state.randomImg]}
                style={{ width: "100%", height: "100%", backgroundColor: '#fff' }}
            >
                <OfflineNotice />
                {/* <Image source={require('@Asset/images/Home.png')}>

                </Image> */}
                <SafeAreaView>
                    <View style={{ flexDirection: 'row', width: '100%', alignContent: 'center', alignItems: 'center' }}>

                        <View style={{

                            alignItems: "flex-end",

                            paddingHorizontal: 20
                        }}>

                            <Image
                                source={require('@Asset/images/ae.png')}
                                style={{
                                    height: 80,
                                    width: 80,
                                    paddingHorizontal: 10,
                                    paddingVertical: 10,
                                    borderRadius: 50,
                                    marginTop: 30,
                                }}
                            />
                            {/* </View> */}
                        </View>

                    </View>
                    <Text style={{
                        paddingHorizontal: 15,
                        fontSize: 20,
                        paddingTop: 20,
                        marginBottom: 20,
                        fontFamily: "Bold",
                        // alignItems: "flex-start",
                        color: "#000"
                    }}>
                        Welcome back {this.state.user != null ? this.state.user : <Text style={{
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
                            // width: '100%'
                        }}>

                            <View style={{ width: '50%' }}>

                                <Text style={{
                                    color: "#000",
                                    fontSize: 16,
                                    fontFamily: "Bold",
                                    // width: 250,

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

                    {/* -------- NEWS N PROMOTION -------- */}
                    <Text style={{
                        color: "#000",
                        fontFamily: "Bold",
                        fontSize: 16,
                        paddingHorizontal: 20,
                        marginTop: 30,
                        marginBottom: 10
                    }}>News and Promotions</Text>

                    <FlatList data={data}
                        renderItem={({ item }) => (
                            // <View>

                            <NewsList
                                desc={item.value}
                                bg={Colors.bg_peach}
                                // bg={Style.hijaumuda}
                                // img={{ uri: item.img }}
                                img={require('@Asset/images/new/news/Shelton.jpg')}

                                title={item.id}
                                numColumns={2}
                                colorTextTitle={"#000"}
                                colorTextDesc={"#000"}
                            >
                                {/* <NewsListImage style={{ flex: 1 }} img={require('@Asset/images/screenshot.png')}>

                                </NewsListImage> */}
                            </NewsList>
                            // </View>

                        )}
                        style={{ flex: 1, marginVertical: 20 }}
                        keyExtractor={item => item.id}
                        numColumns={2}
                    />
                    {/* -------- END NEWS N PROMOTION -------- */}


                    <Text style={{
                        color: "#345c74",
                        fontFamily: "Bold",
                        fontSize: 20,
                        paddingHorizontal: 20,
                        marginTop: 20,
                        marginBottom: 10
                    }}>Courses in progress 1</Text>


                    <CourseList
                        img={require('@Asset/images/xd.png')}
                        title="Adobe XD Prototyping"
                        bg="#fdddf3"
                    />
                    <CourseList
                        img={require('@Asset/images/sketch.png')}
                        title="Sketch shortcuts and tricks"
                        bg="#fef8e3"
                    />
                    <CourseList
                        img={require('@Asset/images/ae.png')}
                        title="UI Motion Design in After Effects"
                        bg="#fcf2ff"
                    />



                    <Text style={{
                        color: "#345c74",
                        fontFamily: "Bold",
                        fontSize: 20,
                        paddingHorizontal: 20,
                        marginTop: 20,
                        marginBottom: 10
                    }}>Courses in progress 2</Text>

                    <View style={{ paddingBottom: 140 }}>
                        <CourseList
                            img={require('@Asset/images/xd.png')}
                            title="Adobe XD Prototyping"
                            bg="#fdddf3"
                        />
                        <CourseList
                            img={require('@Asset/images/sketch.png')}
                            title="Sketch shortcuts and tricks"
                            bg="#fef8e3"
                        />
                        <CourseList
                            img={require('@Asset/images/ae.png')}
                            title="UI Motion Design in After Effects"
                            bg="#fcf2ff"
                        />

                    </View>


                </ScrollView>

                {/* MODALIZE SCROLL DIBAWAH */}
                <Modalize
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
                                        style={{ width: 40, height: 40, marginLeft: 10, marginRight: 10, marginTop: 10 }}
                                    />
                                    <Text style={[Style.textBlack, { textAlign: 'center' }]}>Billing</Text>
                                </View>
                                <View>
                                    <Image
                                        source={require('@Asset/images/new/menu/finance.png')}
                                        style={{ width: 70, height: 70, marginLeft: 10, marginRight: 10, marginTop: 10 }}
                                    />
                                    <Text style={[Style.textBlack, { textAlign: 'center' }]}>Finance</Text>
                                </View>
                                <View>
                                    <Image
                                        source={require('@Asset/images/new/menu/meter.png')}
                                        style={{ width: 70, height: 70, marginLeft: 10, marginRight: 10, marginTop: 10 }}
                                    />
                                    <Text style={[Style.textBlack, { textAlign: 'center' }]}>Meter</Text>
                                </View>
                                <View>
                                    <Image
                                        source={require('@Asset/images/new/menu/overtime.png')}
                                        style={{ width: 70, height: 70, marginLeft: 10, marginRight: 10, marginTop: 10 }}
                                    />
                                    <Text style={[Style.textBlack, { textAlign: 'center' }]}>Overtime</Text>
                                </View>

                            </View>
                            <View style={{ flexDirection: 'row', alignSelf: 'center', }}>

                                <View style={{ flexDirection: 'column', textAlign: 'center' }}>
                                    <Image
                                        source={require('@Asset/images/new/menu/helpdesk2.png')}
                                        style={{ width: 70, height: 70, marginLeft: 10, marginRight: 10, marginTop: 10 }}
                                    />
                                    <Text style={[Style.textBlack, { textAlign: 'center' }]}>Helpdesk</Text>
                                </View>
                                <View>
                                    <Image
                                        source={require('@Asset/images/new/menu/finance.png')}
                                        style={{ width: 70, height: 70, marginLeft: 10, marginRight: 10, marginTop: 10 }}
                                    />
                                    <Text style={[Style.textBlack, { textAlign: 'center' }]}>Finance</Text>
                                </View>
                                <View>
                                    <Image
                                        source={require('@Asset/images/new/menu/meter.png')}
                                        style={{ width: 70, height: 70, marginLeft: 10, marginRight: 10, marginTop: 10 }}
                                    />
                                    <Text style={[Style.textBlack, { textAlign: 'center' }]}>Meter</Text>
                                </View>
                                <View>
                                    <Image
                                        source={require('@Asset/images/new/menu/overtime.png')}
                                        style={{ width: 70, height: 70, marginLeft: 10, marginRight: 10, marginTop: 10 }}
                                    />
                                    <Text style={[Style.textBlack, { textAlign: 'center' }]}>Overtime</Text>
                                </View>

                            </View>

                            {/* <CourseList
                                // onPress={() => this.props.navigation.navigate("Xd")}s
                                img={require('@Asset/images/xd.png')}
                                title="Adobe XD Prototyping"
                                bg="#fdddf3"
                            />
                           */}
                        </View>
                    </ScrollView>


                </Modalize>
            </ImageBackground >
        )
    }
}