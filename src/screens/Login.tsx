/*TODO:
*  1. Add Login screen from template - (DONE)
*  2. Modify accordingly - (DONE)
*  3. connect with api - (DONE)
*  4. Save access Cookie - (DONE)
*  5. navigate to any relevant screen required - (DONE)
*  7. Attach Loader - (Done)
*  8. Show Error Alert - (DONE)
* */


import React, {FunctionComponent, useState} from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    Alert,
    Platform,
    Image,
    Keyboard,
    ActivityIndicator
} from 'react-native';
// @ts-ignore
import {Block, Button, Input, Text, theme} from 'galio-framework';
import materialTheme from '../constants/Theme';
import {HeaderHeight, height, width} from "../constants/utils";
import requests from "../requests";
import AsyncStorage from "@react-native-community/async-storage";
import {logoURL} from "../constants/config";

const service = new requests()
type Props = {
    navigation?: any,
    status?: {
        email: boolean,
        password: boolean,
    }
    email?: string,
    passwor?: string,
    error?: string,
    loading?: boolean
};

const Login: FunctionComponent<Props> =
    ({
         navigation,
         status = {
             email: false, password: false
         },
         email = '',
         passwor = '',
         error = '',
         loading = false
     }) => {
        const [active, setActive] = useState(status);
        const [mail, setMail] = useState(email);
        const [password, setPassword] = useState(passwor);
        const [err, setErr] = useState(error);
        const [load, setLoad] = useState(loading);

        const handleLogin = async () => {
            setErr('')
            Keyboard.dismiss()
            if (mail.length < 4) {
                return setErr('Email/Username is invalid')
            }
            if (password.length < 3) {
                return setErr('Password is invalid')
            }
            setLoad(true);
            const response = await service.loginUser(mail, password);
            console.log('response',response);
            setLoad(false);
            if (response.status === 200) {
                await AsyncStorage.setItem('cookie', response.data);
                return navigation.reset({
                    index: 0,
                    routes: [{ name: 'App' }],
                });
            } else {
                return setErr(`${response.message}`);
            }

        }

        const toggleActive = (value: string) => {
            let act: { email: boolean, password: boolean } = active;
            // @ts-ignore
            act[value] = !act[value];
            return setActive(act)
        }

        return <Block flex middle style={styles.container}>
            <KeyboardAvoidingView behavior="height" enabled>
                <Block flex={0.2} style={[styles.imageContainer, styles.shadow]}>
                    <Image source={require('../assets/logo_home.jpeg')} style={styles.logo}/>
                </Block>
                <Block flex>
                    <Block center>
                        <Input
                            borderless
                            color={materialTheme.COLORS.DEFAULT}
                            placeholder="Email"
                            type="email-address"
                            autoCapitalize="none"
                            bgColor='transparent'
                            onBlur={() => toggleActive('email')}
                            onFocus={() => toggleActive('email')}
                            placeholderTextColor={materialTheme.COLORS.WHITE}
                            onChangeText={(text: any) => setMail(text)}
                            style={[styles.input, active.email ? styles.inputActive : null]}
                        />
                        <Input
                            password
                            viewPass
                            borderless
                            color={materialTheme.COLORS.DEFAULT}
                            iconColor="white"
                            placeholder="Password"
                            bgColor='transparent'
                            onBlur={() => toggleActive('password')}
                            onFocus={() => toggleActive('password')}
                            placeholderTextColor={materialTheme.COLORS.WHITE}
                            onChangeText={(text: any) => setPassword(text)}
                            style={[styles.input, active.password ? styles.inputActive : null]}
                        />
                        {err.length > 0 ?
                            <Text
                                color={materialTheme.COLORS.ERROR}
                                size={theme.SIZES.FONT * 0.75}
                                style={{lineHeight: theme.SIZES.FONT * 2}}
                            >{err}
                            </Text> : null}

                        <Button color="transparent" shadowless>
                            <Text
                                disabled={load}
                                color={theme.COLORS.WHITE}
                                size={theme.SIZES.FONT * 0.75}
                                onPress={() => navigation.navigate('Reset')}
                                style={{alignSelf: 'flex-end', lineHeight: theme.SIZES.FONT * 2}}
                            >
                                Forgot your password?
                            </Text>
                        </Button>
                    </Block>
                    <Block flex top style={{marginTop: 20}}>
                        <Button
                            disabled={load}
                            color={materialTheme.COLORS.DEFAULT}
                            style={{height: 48}}
                            onPress={() => handleLogin()}
                        >
                            {!load
                                ? 'SIGN IN'
                                : <ActivityIndicator
                                    color={'#ffffff'}
                                    size={18}
                                />}
                        </Button>
                    </Block>
                </Block>
            </KeyboardAvoidingView>
        </Block>
    };

export default Login;

const styles = StyleSheet.create({
    container: {
        backgroundColor: materialTheme.COLORS.PRIMARY
    },
    signin: {
        marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    },
    social: {
        width: theme.SIZES.BASE * 3.5,
        height: theme.SIZES.BASE * 3.5,
        borderRadius: theme.SIZES.BASE * 1.75,
        justifyContent: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 1
    },
    input: {
        width: width * 0.9,
        borderRadius: 0,
        borderBottomWidth: 1,
        borderBottomColor: materialTheme.COLORS.WHITE,
    },
    inputActive: {
        borderBottomColor: materialTheme.COLORS.DEFAULT,
    },
    logo: {
        width: width/2,
        minHeight: 110,
        resizeMode: 'contain'
    },
    imageContainer: {
        backgroundColor: theme.COLORS.WHITE,
        marginVertical: theme.SIZES.BASE,
        borderWidth: 0,
        minHeight: height % 10,
        flex: .5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginTop: theme.SIZES.BASE * 3,
        marginBottom: theme.SIZES.BASE * 3
    },
    shadow: {
        shadowColor: theme.COLORS.BLACK,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 3,
        shadowOpacity: 0.1,
        elevation: 2,
    },
});
