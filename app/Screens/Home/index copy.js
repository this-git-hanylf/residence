import React, { Component } from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
    Dimensions
} from "react-native";
import { Header, Text } from "native-base";
// import CategoryMensu from "@Component/Home/Category/CategoryMenu";
import Style from "../../Theme/Style";
const { height, width } = Dimensions.get("window");
import Menus from "@Component/Home/Category/Menus";
import InvoiceCard from "../../components/Home/InvoiceCard";
class Home extends React.Component {

    static options(passProps) {
        const isIos = Platform.OS === "ios";
        return {
            statusBar: {
                style: isIos ? "dark" : "light",
                backgroundColor: "#008bbf"
            }
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            dateNow: new Date().toDateString(), //kalo udah ada data asli dari database,  new date nya  diganti 0
            totalInvoice: 100000,
            totalInvoiceDue: ".00"
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, }}>


                    <ScrollView style={{ flex: 1 }}
                        showsVerticalScrollIndicator={false}>
                        <Header noLeft androidStatusBarColor="#fff"
                            style={{
                                backgroundColor: "#666",
                                borderColor: '#fff',
                                // overflow: 'hidden',
                                height: 150,
                                borderRadius: 20,
                            }}>

                            <Text>
                                Hi, ini header
                        </Text>
                        </Header>
                        {/* NOTED : KALO HEADER NYA MAU FIXED DIEM DIATAS, PINDAHIN FULL TAG HEADER  KE BAWAH VIEW YANG DIATAS */}
                        <View style={nbStyles.container}>
                            <View style={{ heigt: height * 0.5 }}>
                                <Text>
                                    Halo, ini dibawahnya header
                                </Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <View style={nbStyles.mewnuWrap}>
                                        <Menus
                                            imgUrl={require("@Asset/icons/home.png")}
                                            name="Finance"
                                            tapTo=""
                                            // passing={this.state.totalInvoiceDue}
                                            {...this.props}
                                        />
                                        <Menus
                                            // imgUrl={require("@Asset/images/icon-home/helpdesk_blue.png")}
                                            imgUrl={require("@Asset/icons/home.png")}
                                            name="Helpdesk"
                                            tapTo=""
                                            {...this.props}
                                        />
                                        <Menus
                                            // imgUrl={require("@Asset/images/icon-home/helpdesk_blue.png")}
                                            imgUrl={require("@Asset/icons/home.png")}
                                            name="Helpdesk"
                                            tapTo=""
                                            {...this.props}
                                        />
                                        <Menus
                                            // imgUrl={require("@Asset/images/icon-home/helpdesk_blue.png")}
                                            imgUrl={require("@Asset/icons/home.png")}
                                            name="Helpdesk"
                                            tapTo=""
                                            {...this.props}
                                        />
                                        <Menus
                                            // imgUrl={require("@Asset/images/icon-home/helpdesk_blue.png")}
                                            imgUrl={require("@Asset/icons/home.png")}
                                            name="Helpdesk"
                                            tapTo=""
                                            {...this.props}
                                        />
                                        <Menus
                                            // imgUrl={require("@Asset/images/icon-home/helpdesk_blue.png")}
                                            imgUrl={require("@Asset/icons/home.png")}
                                            name="Helpdesk"
                                            tapTo=""
                                            {...this.props}
                                        />
                                        <Menus
                                            // imgUrl={require("@Asset/images/icon-home/helpdesk_blue.png")}
                                            imgUrl={require("@Asset/icons/home.png")}
                                            name="Helpdesk"
                                            tapTo=""
                                            {...this.props}
                                        />
                                        <Menus
                                            // imgUrl={require("@Asset/images/icon-home/helpdesk_blue.png")}
                                            imgUrl={require("@Asset/icons/home.png")}
                                            name="Helpdesk"
                                            tapTo=""
                                            {...this.props}
                                        />
                                    </View>

                                </ScrollView>
                                <InvoiceCard
                                    dateNow={this.state.dateNow}
                                    totalInvoice={this.state.totalInvoice}
                                    totalInvoiceDue={this.state.totalInvoiceDue}
                                // dateNow={ }
                                // onPress={() =>
                                //     this.handleNavigation(
                                //         "screen.Billing",
                                //         this.state.totalInvoiceDue
                                //     )
                                // }
                                />


                            </View>
                            <View>
                                <Text>
                                    What is Lorem Ipsum?
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                                    Why do we use it?
                                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).


                                    Where does it come from?
                                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

                                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>


            </SafeAreaView>




        )
    }
}

export default Home;

const nbStyles = {
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "space-between"
    },
    leftHeader: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    textHeader: [Style.textBlack, Style.textLarge, { marginTop: 5 }],
    subtitle: {
        textAlign: "center",
        color: "#ACD2FA"
    },
    btn: {
        marginTop: 15
    },

    icon_home: {
        width: 50,
        // height: 200
        height: 80
    },
    mewnuWrap: {
        marginVertical: 16,
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginHorizontal: 10
    },
    textWelcome: [Style.textWhite, { fontSize: 18, paddingHorizontal: 16 }],
    contentHeader: {
        paddingVertical: 16,
        marginHorizontal: 10,
        marginBottom: 10,
        borderRadius: 10,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "#37BEB7",
        shadowOpacity: 0.5,
        elevation: 4,
        marginTop: 4,
        // borderWidth: 1,
        backgroundColor: "rgba(0, 175, 240, 0.5)"
    }
};