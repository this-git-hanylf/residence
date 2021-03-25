import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ImageBackground } from "react-native";
import { goToAuth, goHome } from "./navigation";
import { session } from "../_helpers";

class Initializing extends Component {
    async componentDidMount() {
        try {
            const user = await session.getSess("@isLogin");
            console.log("user: ", user);
            if (user) {
                setTimeout(() => {
                    goHome();

                }, 1000);
            } else {
                setTimeout(() => {
                    // goToAuth();
                    goHome();
                }, 1000);
            }
        } catch (err) {
            console.log("error: ", err);
            setTimeout(() => {
                // goToAuth();
                goHome();
            }, 1000);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    <ActivityIndicator size="large" color="#00AFF0" />
                    <Text style={styles.loadingText}>Loading...</Text>
                </Text>
            </View>
        )
    };
}
export default Initializing;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center"
    },
    loadingText: {
        fontFamily: "Montserrat-SemiBold",
        fontSize: 17,
        fontWeight: "300"
    }
});