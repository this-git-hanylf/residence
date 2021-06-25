import React from 'react'
import { View, Text, ImageBackground, TouchableOpacity, Image, Animated, SafeAreaView, SectionList, FlatList, ScrollViewComponent, Platform, StatusBar, Dimensions, StyleSheet } from 'react-native'
import colors from '../../Theme/Colors';
import OfflineNotice from "@Component/OfflineNotice";
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { sessions } from '../../_helpers/';
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
        super(props)
        // this.imgMap = {
        //     0: "@Asset/images/xd.png",
        //     1: "@Asset/images/ae.png",
        //     2: "@Asset/images/sketch.png",
        //     // 3: "img_3.jpg",
        //     // 4: "img_4.jpg"
        // };
        this._isMounted = false;
        this.state = {
            refreshing: false,
            isDisable: false,
            name: "",
            totalInvoice: 0,
            totalInvoiceDue: ".00",
            dateNow: 0,
            token: "",

            // mounted: false,
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

            datagambar: [
                { id: 'ini judul untuk news', image: 'https://images.unsplash.com/photo-1568700942090-19dc36fab0c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' },
                { id: 'ini judul untuk news', image: 'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60' },
                { id: 'c', value: 'C', image: 'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60', },
                { id: 'd', value: 'D', image: 'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60', },
                { id: 'e', value: 'E', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80', },
                { id: 'f', value: 'F', image: 'https://images.unsplash.com/photo-1568700942090-19dc36fab0c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80', },
            ],
            datapromo: [
                { id: 'a', judul: 'Promo Galon 15%', date: '6/6/2021', image: 'https://images.unsplash.com/photo-1568700942090-19dc36fab0c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' },
                { id: 'b', judul: 'Promo Sembako 20%', date: '6/6/2021', image: 'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60' },
                { id: 'c', judul: 'Soft Opening Laundry', date: '6/6/2021', image: 'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60', },

            ],
        };
      

        // Navigation.events().bindComponent(this);
        // this.getRandomPic = this.getRandomPic.bind(this);
    }

    async componentDidMount() {
        this._isMounted = true;
        this.props.fetchData().then((response) => {
            if(this._isMounted) {
              this.setState({ data: response })
            }
        });

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


            // mounted: true

        }
        console.log('data', data);

        this.setState(data, () => {
         

        })
    }

    componentWillUnmount(){
        this._isMounted = false;
    }



    
 
    renderHeader = () => {
        return (
            <View style={{ marginTop: 10, marginBottom: 10 }} onPress={() => console.log("aler")}></ View>
        )
    }
    render() {
        // console.log(this.getRandomPic())
        // console.log('randompict', this.state.imgMap[this.state.randomImg]);
        const { user } = this.state;
        const screenWidth = Math.round(Dimensions.get('window').width);
        // let imgcoba = 
        return (

            <ImageBackground style={{ width: "100%", height: "100%", backgroundColor: colors.bg_peach }}>

                <OfflineNotice />
                <SafeAreaView style={{ backgroundColor: colors.bg_hijautua, height: 130 }}>
                    <View>
                        <Text>header</Text>
                    </View>
                </SafeAreaView>

                <ScrollView>
                  <View>
                      <Text>
                          content
                      </Text>
                  </View>
                 
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