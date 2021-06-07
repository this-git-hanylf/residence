import { Navigation } from 'react-native-navigation'
import { Platform } from 'react-native';
import colors from '../Theme/Colors';
const selectedColor = colors.bg_coklat;
const iconColor = colors.bg_hijaugelap;;
const iconWidth = 40;


// const selectedColor = '#41B649';
// const iconColor = '#191919';



let iconHome;
let iconStatus;
let iconEmergency;
let iconInbox;
let iconProfile;
if (Platform.OS == "android") {

    iconHome = require('@Asset/icons/home.png')
    iconStatus = require('@Asset/icons/emergency-call.png')


    // iconEmergency = require('@Asset/icons/emergency.png')
    // iconInbox = require('@Asset/icons/notif.png')
    iconProfile = require('@Asset/icons/profile.png')
} else {
    // iconHome = require('@Asset/icons/ios-home.png')
    iconHome = require('@Asset/icons/home.png')
    iconStatus = require('@Asset/icons/emergency-call.png')
    // iconStatus = require('@Asset/icons/ios-status.png')
    // iconEmergency = require('@Asset/icons/ios-emergency.png')
    // iconInbox = require('@Asset/icons/ios-notif.png')
    iconProfile = require('@Asset/icons/ios-profile.png')
}


export const goHome = () => Navigation.setRoot({
    root: {
        bottomTabs: {
            id: 'BottomTabsId',
            children: [{
                stack: {
                    children: [{
                        component: {
                            name: 'tab.Home',
                            options: {
                                // topBar:{
                                //   visible:false,
                                //   height:0
                                // },

                                animations: {
                                    push: {
                                        enabled: "false",
                                    }
                                }
                            }
                        }
                    }],
                    options: {
                        bottomTab: {
                            text: 'Home',
                            icon: iconHome,
                            iconInsets: { bottom: -5 },
                            iconColor: iconColor,
                            textColor: iconColor,
                            selectedIconColor: selectedColor,
                            selectedTextColor: selectedColor,

                        }
                    }
                }
            },
            {
                stack: {
                    children: [{
                        component: {
                            // name: 'screen.Status',
                            name: 'screen.Cources',
                            options: {
                                topBar: {
                                    visible: false
                                },
                            }
                        }
                    }],
                    options: {
                        bottomTab: {
                            text: 'Emergency Call',
                            icon: iconStatus,
                            iconInsets: { bottom: -5 },
                            iconColor: iconColor,
                            textColor: iconColor,
                            selectedIconColor: selectedColor,
                            selectedTextColor: selectedColor,
                            iconWidth: 45,
                            iconHeight: 45

                        }
                    }
                }
            },
            {
                stack: {
                    children: [{
                        component: {
                            name: 'tab.Profile',
                            // name: 'screen.Cources',
                            // name: 'tab.Profile',
                            options: {
                                topBar: {
                                    visible: false
                                },
                            }
                        }
                    }],
                    options: {
                        bottomTab: {
                            text: 'Profile',
                            icon: iconProfile,
                            iconInsets: { bottom: -5 },
                            iconColor: iconColor,
                            textColor: iconColor,
                            selectedIconColor: selectedColor,
                            selectedTextColor: selectedColor
                        }
                    }
                }
            },
                // {
                //     stack: {
                //         children: [{
                //             component: {
                //                 id: 'inboxId',
                //                 name: 'tab.Inbox',
                //                 options: {
                //                     topBar: {
                //                         visible: false
                //                     },
                //                 }
                //             }
                //         }],
                //         options: {
                //             bottomTab: {
                //                 text: 'Inbox',
                //                 icon: iconInbox,
                //                 iconInsets: { bottom: -5 },
                //                 iconColor: iconColor,
                //                 textColor: iconColor,
                //                 selectedIconColor: selectedColor,
                //                 selectedTextColor: selectedColor,
                //             }
                //         }
                //     }
                // },
                // {
                //     stack: {
                //         children: [{
                //             component: {
                //                 name: 'tab.Profile',
                //                 options: {
                //                     topBar: {
                //                         visible: false
                //                     },
                //                 }
                //             }
                //         }],
                //         options: {
                //             bottomTab: {
                //                 text: 'Profile',
                //                 icon: iconProfile,
                //                 iconInsets: { bottom: -5 },
                //                 iconColor: iconColor,
                //                 textColor: iconColor,
                //                 selectedIconColor: selectedColor,
                //                 selectedTextColor: selectedColor
                //             }
                //         }
                //     }
                // }
            ],
            options: {
                bottomTabs: {
                    visible: true,
                    animate: false,
                    translucent: false,
                    disableIconTint: true,
                    disableSelectedIconTint: true,
                    fontSize: 10,
                    titleDisplayMode: 'alwaysShow',
                }
            }
        }
    }
});

// export const goToAuth = () => Navigation.setRoot({
//     root: {
//         stack: {
//             id: 'App',
//             children: [
//                 {
//                     component: {
//                         // name: 'screen.Login',
//                         name: 'tab.Home',
//                     }
//                 }
//             ],
//         }
//     }
// })

export const goToAuth = () => Navigation.setRoot({
    root: {
        bottomTabs: {
            id: 'BottomTabsId',
            children: [{
                stack: {
                    children: [{
                        component: {
                            name: 'tab.Home',
                            options: {
                                // topBar:{
                                //   visible:false,
                                //   height:0
                                // },

                                animations: {
                                    push: {
                                        enabled: "false",
                                    }
                                }
                            }
                        }
                    }],
                    options: {
                        bottomTab: {
                            text: 'Home',
                            icon: iconHome,
                            iconInsets: { bottom: -5 },
                            iconColor: iconColor,
                            textColor: iconColor,
                            selectedIconColor: selectedColor,
                            selectedTextColor: selectedColor,

                        }
                    }
                }
            },
            {
                stack: {
                    children: [{
                        component: {
                            // name: 'screen.Status',
                            // name: 'screen.Cources',
                            name: 'tab.Profile',
                            options: {
                                topBar: {
                                    visible: false
                                },
                            }
                        }
                    }],
                    options: {
                        bottomTab: {
                            text: 'Profile',
                            icon: iconProfile,
                            // icon: < Icon name="receipt-outline" style={{ fontSize: 18 }} ></Icon>
                            iconInsets: { bottom: -5 },
                            iconColor: iconColor,
                            textColor: iconColor,
                            selectedIconColor: selectedColor,
                            selectedTextColor: selectedColor
                        }
                    }
                }
            },
                // {
                //     stack: {
                //         children: [{
                //             component: {
                //                 name: 'tab.Emergency',
                //                 options: {
                //                     topBar: {
                //                         visible: false
                //                     },
                //                 }
                //             }
                //         }],
                //         options: {
                //             bottomTab: {
                //                 text: 'Emergency',
                //                 icon: iconEmergency,
                //                 iconInsets: { bottom: -5 },
                //                 iconColor: iconColor,
                //                 textColor: iconColor,
                //                 selectedIconColor: selectedColor,
                //                 selectedTextColor: selectedColor
                //             }
                //         }
                //     }
                // },
                // {
                //     stack: {
                //         children: [{
                //             component: {
                //                 id: 'inboxId',
                //                 name: 'tab.Inbox',
                //                 options: {
                //                     topBar: {
                //                         visible: false
                //                     },
                //                 }
                //             }
                //         }],
                //         options: {
                //             bottomTab: {
                //                 text: 'Inbox',
                //                 icon: iconInbox,
                //                 iconInsets: { bottom: -5 },
                //                 iconColor: iconColor,
                //                 textColor: iconColor,
                //                 selectedIconColor: selectedColor,
                //                 selectedTextColor: selectedColor,
                //             }
                //         }
                //     }
                // },
                // {
                //     stack: {
                //         children: [{
                //             component: {
                //                 name: 'tab.Profile',
                //                 options: {
                //                     topBar: {
                //                         visible: false
                //                     },
                //                 }
                //             }
                //         }],
                //         options: {
                //             bottomTab: {
                //                 text: 'Profile',
                //                 icon: iconProfile,
                //                 iconInsets: { bottom: -5 },
                //                 iconColor: iconColor,
                //                 textColor: iconColor,
                //                 selectedIconColor: selectedColor,
                //                 selectedTextColor: selectedColor
                //             }
                //         }
                //     }
                // }
            ],
            options: {
                bottomTabs: {
                    visible: true,
                    animate: false,
                    translucent: false,
                    disableIconTint: true,
                    disableSelectedIconTint: true,
                    fontSize: 10,
                    titleDisplayMode: 'alwaysShow',
                }
            }
        }
    }
})