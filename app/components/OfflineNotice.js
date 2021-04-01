import React, { PureComponent } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');
import NetInfo from "@react-native-community/netinfo";


class OfflineNotice extends PureComponent {
    state = {
        isConnected: true,
        isVisible: false,
        connected_status: false
    }

    NetInfoSubscribtion = null;

    componentDidMount() {
        this.NetInfoSubscribtion = NetInfo.addEventListener(
            this._handleConnectivityChange,
        );
    }

    _handleConnectivityChange = (state) => {
        this.setState({ connected_status: state.isConnected, isVisible: true }, () => {
            setTimeout(() => {
                this.setState({ isVisible: false })
            }, 2000)
        })
    }
    componentWillUnmount() {
        this.NetInfoSubscribtion && this.NetInfoSubscribtion();
    }


    render() {
        return (
            <View>
                {this.state.connected_status ?
                    this.state.isVisible &&
                    <View style={styles.onlineContainer}>
                        <Text style={styles.onlineText}>Connected</Text>
                    </View>
                    : <View style={styles.offlineContainer}>
                        <Text style={styles.offlineText}>No Internet Connection</Text>
                    </View>}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    offlineContainer: {
        backgroundColor: '#b52424',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width,
        // position: 'absolute',
        top: 0
    },
    offlineText: {
        color: '#fff'
    },

    onlineContainer: {
        backgroundColor: "#4AA22E",
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width,
        // position: 'absolute',
        top: 0
    },
    onlineText: {
        color: '#fff'
    }
});
export default OfflineNotice;