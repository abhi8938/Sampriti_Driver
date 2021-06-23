import React, {FunctionComponent} from 'react';
import {TouchableOpacity, StyleSheet, Platform, Dimensions, Image, View, Switch} from 'react-native';
// @ts-ignore
import {Block, NavBar, Text, theme} from 'galio-framework';
import Icon from './Icon';
import argonTheme from '../constants/Theme';
import materialTheme from "../constants/Theme";

const {height, width} = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);


type ButtonProps = {
    navigation: any,
    isEnabled: any,
    toggleSwitch: () => {}
}


const BellButton: FunctionComponent<ButtonProps> = ({isWhite, style, navigation}) => (
    <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Notification')}>
        <Icon
            family={'Feather'}
            size={18}
            name="bell"
            color={argonTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
        />
        <Block middle style={styles.notify}/>
    </TouchableOpacity>
);


const DutySwitch: FunctionComponent<ButtonProps> = ({navigation, isEnabled, toggleSwitch}) => <Switch
    trackColor={{false: "#D4D4D4", true: "#D4D4D4"}}
    thumbColor={isEnabled ? "#77AF9C" : "#8CD790"}
    ios_backgroundColor="#3e3e3e"
    onValueChange={toggleSwitch}
    value={isEnabled}
/>


type props = {
    back?: boolean,
    navigation: any,
    white?: boolean,
    title: string,
    transparent?: boolean,
    bgColor?: any,
    iconColor?: string,
    titleColor?: string,
    scene: any,
    image?: boolean,
    search?: boolean
}

class Header extends React.Component<props> {

    handleLeftPress = () => {
        const {
            back,
            navigation,
            title
        } = this.props;
        if (title == 'Order Details') return (back ? navigation.reset({
            index: 0,
            routes: [{name: 'App'}],
        }) : null);
        return (back ? navigation.goBack() : null);
    }

    renderRight = () => {
        // const { routeName } = navigation.state;
        const {
            navigation,
            title,
        } = this.props;
        if (title === 'My Orders') {
            return [
                <View style={styles.rightSection}>
                    <DutySwitch navigation={navigation} isEnabled={true} toggleSwitch={() => console.log('Switch')}/>
                    <BellButton key='chat-title' navigation={navigation} isWhite={false}/>
                </View>
            ]
        }
    }


    // renderOptions = () => {
    //   const { navigation, optionLeft, optionRight } = this.props;
    //
    //   return (
    //     <Block row style={styles.options}>
    //       <Button shadowless style={[styles.tab, styles.divider]} onPress={() => navigation.navigate('Beauty')}>
    //         <Block row middle>
    //           <Icon name="diamond" family="ArgonExtra" style={{ paddingRight: 8 }} color={argonTheme.COLORS.ICON} />
    //           <Text style={{ fontFamily: 'open-sans-regular' }} size={16}  style={styles.tabTitle}>{optionLeft || 'Beauty'}</Text>
    //         </Block>
    //       </Button>
    //       <Button shadowless style={styles.tab} onPress={() => navigation.navigate('Fashion')}>
    //         <Block row middle>
    //           <Icon size={16} name="bag-17" family="ArgonExtra" style={{ paddingRight: 8 }} color={argonTheme.COLORS.ICON}/>
    //           <Text style={{ fontFamily: 'open-sans-regular' }} size={16} style={styles.tabTitle}>{optionRight || 'Fashion'}</Text>
    //         </Block>
    //       </Button>
    //     </Block>
    //   );
    // }
    // renderTabs = () => {
    //   const { tabs, tabIndex, navigation } = this.props;
    //   const defaultTab = tabs && tabs[0] && tabs[0].id;
    //
    //   if (!tabs) return null;
    //
    //   return (
    //     <Tabs
    //       data={tabs || []}
    //       initialIndex={tabIndex || defaultTab}
    //       onChange={id => navigation.setParams({ tabId: id })} />
    //   )
    // }

    render() {
        const {
            back,
            navigation,
            white,
            title,
            transparent,
            bgColor,
            iconColor,
            titleColor,
            image
        } = this.props;

        // @ts-ignore
        const noShadow: Array<string> = ['Search', 'Profile'].includes(title);

        const headerStyles = [
            !noShadow ? styles.shadow : null,
            transparent ? {backgroundColor: materialTheme.COLORS.PRIMARY} : null,
        ];

        const navbarStyles = [
            styles.navbar,
            bgColor && {backgroundColor: bgColor}
        ];

        return (
            <Block style={headerStyles}>
                <NavBar
                    back={false}
                    title={title === 'My Orders' ? 'Sampriti Delivery' : title}
                    style={navbarStyles}
                    transparent={transparent}
                    right={this.renderRight()}
                    rightStyle={{alignItems: 'flex-end', flex: 1}}
                    onLeftPress={this.handleLeftPress}
                    left={
                        back ? <Icon
                            name={back ? 'chevron-left' : ""}
                            family="entypo"
                            size={24}
                            onPress={this.handleLeftPress}
                            color={iconColor || (white ? argonTheme.COLORS.WHITE : argonTheme.COLORS.FACEBOOK)}
                            style={{marginTop: 2}}
                        /> : image ? <Image source={require('../assets/logo_home.jpeg')}
                                            style={{width: width / 5, height: 40, resizeMode: 'contain'}}/> : null}
                    leftStyle={{paddingVertical: 2, flex: back ? 0.3 : 0}}
                    titleStyle={[
                        styles.title,
                        {color: argonTheme.COLORS[white ? 'WHITE' : 'HEADER']},
                        titleColor && {color: titleColor}
                    ]}
                />
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    rightSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        padding: 12,
        position: 'relative',
    },
    title: {
        width: '100%',
        fontSize: 16,
        fontWeight: 'bold',
    },
    navbar: {
        // paddingVertical: 0,
        paddingBottom: theme.SIZES.BASE * 1,
        paddingTop: iPhoneX() ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
        zIndex: 5,
    },
    shadow: {
        backgroundColor: theme.COLORS.WHITE,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.2,
        elevation: 3,
    },
    notify: {
        backgroundColor: argonTheme.COLORS.DEFAULT,
        borderRadius: 4,
        height: theme.SIZES.BASE / 2,
        width: theme.SIZES.BASE / 2,
        position: 'absolute',
        top: 8,
        right: 10,
    },
    header: {
        backgroundColor: theme.COLORS.WHITE,
    },
    divider: {
        borderRightWidth: 0.3,
        borderRightColor: theme.COLORS.ICON,
    },
    search: {
        height: 48,
        width: width - 32,
        marginHorizontal: 16,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: argonTheme.COLORS.BORDER
    },
    options: {
        marginBottom: 24,
        marginTop: 10,
        elevation: 4,
    },
    tab: {
        backgroundColor: theme.COLORS.TRANSPARENT,
        width: width * 0.35,
        borderRadius: 0,
        borderWidth: 0,
        height: 24,
        elevation: 0,
    },
    tabTitle: {
        lineHeight: 19,
        fontWeight: '400',
        color: argonTheme.COLORS.HEADER
    },
});

export default Header;
