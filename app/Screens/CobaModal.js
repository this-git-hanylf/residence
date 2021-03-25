
import React, { useRef, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, Animated, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Modalize } from 'react-native-modalize';

const HEADER_HEIGHT = 100;

export const CobaModal = ({ componentId, animated }) => {
    const modalizeRef = useRef(null);
    const [handle, setHandle] = useState(false);

    const handlePosition = position => {
        setHandle(position === 'top');
    };

    const handleClosed = () => {
        Navigation.dismissOverlay(componentId);
    };

    const renderContent = () => (
        <>
            <Animated.View
                style={[
                    s.content__cover,
                    {
                        shadowOpacity:
                            animated &&
                            animated.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.2, 0.35],
                            }),
                        transform: [
                            {
                                scale:
                                    animated &&
                                    animated.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0.18, 1],
                                        extrapolate: 'clamp',
                                    }),
                            },
                            {
                                translateX:
                                    animated &&
                                    animated.interpolate({
                                        inputRange: [0, 0.25, 1],
                                        outputRange: [0, 100, 140],
                                        extrapolate: 'clamp',
                                    }),
                            },
                            {
                                translateY:
                                    animated &&
                                    animated.interpolate({
                                        inputRange: [0, 0.25, 1],
                                        outputRange: [0, 100, 165],
                                        extrapolate: 'clamp',
                                    }),
                            },
                        ],
                    },
                ]}
            >
                <Animated.Image
                    style={[
                        s.content__asset,
                        {
                            borderRadius:
                                animated && animated.interpolate({ inputRange: [0, 1], outputRange: [32, 8] }),
                        },
                    ]}
                    source={{
                        uri: 'https://images.genius.com/7ea34ad2fa694fb706de3e81dc1588c4.1000x1000x1.jpg',
                    }}
                />
            </Animated.View>

            <Animated.View
                style={[
                    s.content__header,
                    {
                        opacity:
                            animated &&
                            animated.interpolate({
                                inputRange: [0, 0.75],
                                outputRange: [1, 0],
                            }),
                    },
                ]}
            >
                <Text style={s.content__title}>Your Design</Text>

                <TouchableOpacity activeOpacity={0.75}>
                    <Image style={{ marginRight: 30 }} source={require('@Asset/images/Home.png')} />
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.75}>
                    <Image source={require('@Asset/images/Home.png')} />
                </TouchableOpacity>
            </Animated.View>

            <Animated.Image
                // I didn't want to recreate the whole thing, so just exported as an image
                style={[
                    s.content__inner,
                    {
                        opacity:
                            animated &&
                            animated.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 1],
                            }),
                        transform: [
                            {
                                translateY:
                                    animated &&
                                    animated.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-300, 0],
                                    }),
                            },
                        ],
                    },
                ]}
                source={require('@Asset/images/Home.png')}
            />
        </>
    );

    const handleOpen = () => {
        if (modalizeRef.current) {
            modalizeRef.current.open();
        }
    };

    useEffect(() => {
        handleOpen();
    }, []);

    return (
        <Modalize
            ref={modalizeRef}
            panGestureAnimatedValue={animated}
            snapPoint={HEADER_HEIGHT}
            withHandle={handle}
            handlePosition="inside"
            handleStyle={{ top: 13, width: 40, height: handle ? 6 : 0, backgroundColor: '#bcc0c1' }}
            onPositionChange={handlePosition}
            onClosed={handleClosed}
        >
            {renderContent()}
        </Modalize>
    );
};

const s = StyleSheet.create({
    content__header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        height: HEADER_HEIGHT,

        paddingHorizontal: 30,
        paddingBottom: 5,
    },

    content__cover: {
        zIndex: 100,

        marginTop: -132, // not the best
        marginLeft: -115, // not the best

        width: 360,
        height: 360,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 18,
    },

    content__asset: {
        width: '100%',
        height: '100%',
    },

    content__title: {
        paddingLeft: 90,
        marginRight: 'auto',

        fontSize: 18,
    },

    content__inner: {
        top: 200,
        left: 30,
    },
});

