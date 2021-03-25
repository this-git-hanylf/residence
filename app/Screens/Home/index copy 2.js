import React from 'react'
import { View, Text, ImageBackground, TouchableOpacity, Image, Animated, SafeAreaView, SectionList, FlatList, ScrollViewComponent } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import CourseList from '../CourseList/CourseList'
import { Navigation } from "react-native-navigation";
import { Modalize } from 'react-native-modalize';
import Style from '../../Theme/Style';


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

            scrollY: new Animated.Value(0)
        };

        Navigation.events().bindComponent(this);
    }

    handleNavigation = (screenName, passedProps) => {
        this.setState({ isDisable: true }, () => {
            this.goToScreen(screenName, passedProps);
        });
    };

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
            <View style={{ marginTop: 20, marginBottom: 20 }} onPress={() => console.log("aler")}></ View>
        )
    }
    render() {
        return (
            <ImageBackground
                source={require('@Asset/images/Home.png')}
                style={{ width: "100%", height: "100%" }}
            >
                <ScrollView>
                    <View style={{ flexDirection: 'row', width: '100%', alignContent: 'center', alignItems: 'center' }}>

                        <View style={{
                            // width: "100%",
                            alignItems: "flex-end",

                            paddingHorizontal: 20
                        }}>
                            <View style={{
                                paddingHorizontal: 10,
                                paddingVertical: 12,
                                borderRadius: 10,
                                marginTop: 30,
                                backgroundColor: "#d1a0a7"
                            }}>
                                <Image
                                    source={require('@Asset/images/hum.png')}
                                    style={{ height: 15, width: 20 }}
                                />
                            </View>
                        </View>

                    </View>
                    <Text style={{
                        paddingHorizontal: 15,
                        fontSize: 20,
                        paddingTop: 20,
                        fontFamily: "Bold",
                        // alignItems: "flex-start",
                        color: "#FFF"
                    }}>
                        Welcome back Mikolaj
                        </Text>


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

                    <View style={{
                        flexDirection: "row",
                        backgroundColor: "#FFF2F2",
                        marginTop: 35,
                        marginHorizontal: 20,
                        borderRadius: 20,
                        paddingVertical: 30,
                        paddingLeft: 30,
                        // width: '100%'
                    }}>


                        <View>
                            <Text style={{
                                color: "#345c74",
                                fontSize: 20,
                                fontFamily: "Bold",
                                // width: 250,
                                paddingRight: 50
                            }}>
                                Invoice
                           </Text>
                            <TouchableOpacity
                                // onPress={() => this.props.navigation.navigate('Cources')}
                                onPress={() => this.handleNavigation(
                                    "screen.Cources",
                                    // this.state.totalInvoiceDue
                                )}
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#f58084",
                                    alignItems: "center",
                                    marginTop: 20,
                                    width: 150,
                                    paddingVertical: 10,
                                    borderRadius: 14,
                                    paddingHorizontal: 10
                                }}
                            >
                                <Text style={{
                                    color: "#FFF",
                                    fontFamily: "Bold",
                                    fontSize: 12
                                }}>Categories</Text>
                                <Image
                                    source={require('@Asset/images/a3.png')}
                                    style={{ marginLeft: 20, width: 8, height: 8 }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={{
                                color: "#345c74",
                                fontSize: 20,
                                fontFamily: "Bold",
                                // width: 250,
                                paddingRight: 100
                            }}>
                                Invoice
                           </Text>
                            <TouchableOpacity
                                // onPress={() => this.props.navigation.navigate('Cources')}
                                onPress={() => this.handleNavigation(
                                    "screen.Cources",
                                    // this.state.totalInvoiceDue
                                )}
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#f58084",
                                    alignItems: "center",
                                    marginTop: 20,
                                    width: 150,
                                    paddingVertical: 10,
                                    borderRadius: 14,
                                    paddingHorizontal: 10
                                }}
                            >
                                <Text style={{
                                    color: "#FFF",
                                    fontFamily: "Bold",
                                    fontSize: 12
                                }}>Categories</Text>
                                <Image
                                    source={require('@Asset/images/a3.png')}
                                    style={{ marginLeft: 20, width: 8, height: 8 }}
                                />
                            </TouchableOpacity>
                        </View>
                        {/* <Image
                            source={require('@Asset/images/undraw.png')}
                            style={{ marginLeft: -80, marginTop: 35 }}
                        /> */}

                    </View>
                    <Text style={{
                        color: "#345c74",
                        fontFamily: "Bold",
                        fontSize: 20,
                        paddingHorizontal: 20,
                        marginTop: 20,
                        marginBottom: 10
                    }}>Courses in progress</Text>

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
                    }}>Courses in progress</Text>

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
                    }}>Courses in progress</Text>

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
                        backgroundColor: '#999',
                        marginRight: 20,
                        marginLeft: 20

                    }}
                    alwaysOpen={130}
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
                                <Image
                                    source={require('@Asset/images/xd.png')}
                                    style={{ width: 55, height: 55, margin: 15 }}
                                />
                                <Image
                                    source={require('@Asset/images/sketch.png')}
                                    style={{ width: 55, height: 55, margin: 15 }}
                                />
                                <Image
                                    source={require('@Asset/images/ae.png')}
                                    style={{ width: 55, height: 55, margin: 15 }}
                                />
                                <Image
                                    source={require('@Asset/images/xd.png')}
                                    style={{ width: 55, height: 55, margin: 15 }}
                                />


                            </View>
                            <View style={{ flexDirection: 'row', alignSelf: 'center', }}>
                                <Image
                                    source={require('@Asset/images/xd.png')}
                                    style={{ width: 55, height: 55, margin: 15 }}
                                />
                                <Image
                                    source={require('@Asset/images/sketch.png')}
                                    style={{ width: 55, height: 55, margin: 15 }}
                                />
                                <Image
                                    source={require('@Asset/images/ae.png')}
                                    style={{ width: 55, height: 55, margin: 15 }}
                                />
                                <Image
                                    source={require('@Asset/images/xd.png')}
                                    style={{ width: 55, height: 55, margin: 15 }}
                                />


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