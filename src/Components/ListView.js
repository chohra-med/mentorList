import React, {Component} from 'react';
import {
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    Text,
    RefreshControl,
    Switch,
    I18nManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

//we import Loadach to filter Items
import _ from 'lodash';
import I18n from '../locales/i18n';
import {PROFILE} from "../assets/Images";


// Data that will be showed first
const firstData = [
    {"id": 1, "helps": "Software engineer", "name": "Chohra Mohammed"},
    {"id": 2, "helps": "Junior Mobile Developer", "name": "Amir Khoutir"},
    {"id": 3, "helps": "Junior Data Science", "name": "Chellaf Younes"},
    {"id": 4, "helps": "Senior Data Science", "name": "Bederrer Alladin"},
    {"id": 5, "helps": "Junior Mobile Developer", "name": "Benyamina Mouad"},
    {"id": 6, "helps": "Senior FullStack Developer", "name": "Sabour Oussama"},
    {"id": 7, "helps": "Lead Fronted Developer", "name": "Oumellal Abdeslam"},
    {"id": 8, "helps": "Senior Backend Developer", "name": "Bouregag Abdelkaded"},
    {"id": 9, "helps": "Senior Supply chain Specialist", "name": "Borsali Faycel"},
    {"id": 10, "helps": "Junior Digital Marketing", "name": "Bouguesri Adel"}
];

// Data that will be showed after
const secondData = [
    {"id": 412, "helps": "Junior Devops Developer", "name": "Neddar Islem"},
    {"id": 323, "helps": "Senior Blockchain Developer", "name": "Khodja Mehdi"},
    {"id": 512, "helps": "Senior Blockchain Developer", "name": "Bacha Brahim"},
    {"id": 47, "helps": "Junior Web Developer", "name": "Damene Miloud "},
    {"id": 58, "helps": "CEO", "name": "Touaria Sami"},
    {"id": 69, "helps": "Business developer", "name": "Hafsawi Houssem"},
    {"id": 610, "helps": "Junior Ui/Ux Designer", "name": "Kafi Abderrazak"}
];

//this function return if ScrollView reached the buttom or not
const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
};

export default class ListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadMore: false,
            ourData: [],
            generalData: [],
            nameFiltred: '',
            refreshing: false,
            isRTL: true,
            currentLanguage: 'en'
        };
        this.filterby = this.filterby.bind(this);
        this.orderby = this.orderby.bind(this);
    };

    //to filter our data by NAME
    filterby() {
        let data = this.state.generalData;
        data = data.filter(x => String(x.name.toUpperCase()).includes(this.state.nameFiltred.toUpperCase()));
        this.setState({ourData: data})
    }

    //to order our data by NAME
    orderby() {
        let data = this.state.ourData;
        data = _.sortBy(data, ['name', 'id']);
        this.setState({ourData: data})
    }

    //We recupere our data and put it in our State, And we set the language
    componentWillMount() {
        this.setState({ourData: firstData});
        this.setState({generalData: firstData});
        this.setState({isRTL: !I18nManager.isRTL});
        if (I18nManager.isRTL) {
            this.setState({currentLanguage: 'ar'});
        } else {
            this.setState({currentLanguage: 'en'});

        }
    }

    // this is called when we want to add the second data
    // When scrollView reached its end
    updateList() {
        if (!this.state.loadMore) {
            let data = this.state.ourData;
            data = data.concat(secondData);
            this.setState({generalData: data});
            this.setState({ourData: data});
            this.setState({loadMore: true});
            this.setState({nameFiltred: ''})
        }
    }

    //This enable us to control the direction for different language
    _onDirectionChange = () => {
        I18nManager.forceRTL(this.state.isRTL);
        this.setState({isRTL: !this.state.isRTL});
        if (this.state.isRTL) {
            this.setState({currentLanguage: 'ar'});
        } else {
            this.setState({currentLanguage: 'en'});
        }
    };

//This function enable us to MAP our Data in the our form
    showList() {
        return (
            this.state.ourData.map(data => {
                return (
                    <TouchableOpacity key={data.id}>
                        <View style={styles.listViewContainer}>
                            <Image
                                style={styles.image}
                                source={PROFILE}
                            >
                            </Image>
                            <View style={styles.textContainer}>
                                <Text style={styles.name}>{data.name}</Text>
                                <Text style={styles.helps}> {data.helps}</Text>

                            </View>
                            <Icon name="arrow-right" style={styles.button}
                                  color='black'
                                  size={32}
                                  onPress={() => {
                                  }}
                            >
                            </Icon>
                        </View>
                        <View
                            style={{
                                borderBottomColor: 'black',
                                borderBottomWidth: 0.5,
                                width: '90%',
                                marginLeft: '5%'
                            }}
                        />
                    </TouchableOpacity>
                )
            })
        );
    }

    //this is called when we refresh our scroll view
    _onRefresh = () => {
        this.setState({refreshing: true});
        this.setState({ourData: this.state.generalData});
        this.setState({refreshing: false});
        this.setState({nameFiltred: ''})
    };


    render() {
        let {currentLanguage, nameFiltred, refreshing} = this.state;
        I18n.locale = currentLanguage;
        I18n.fallbacks = true;
        return (
            <View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <TextInput
                        style={{height: 40, borderWidth: 2, margin: 5, width: '60%'}}
                        placeholder={I18n.t('filtering')}
                        value={nameFiltred}
                        onChangeText={(nameFiltred) => {
                            this.setState({nameFiltred});
                            this.filterby;
                        }}
                    />
                    <TouchableOpacity
                        style={{width: 30, justifyContent: 'center', borderRadius: 20, borderColor: 'grey', margin: 6}}
                        onPress={this.filterby}
                    >
                        <Icon color='black' size={20} name="search"/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            borderRadius: 4,
                            borderColor: 'grey',
                            borderWidth: 1,
                            marginLeft: 20,
                            margin: 6
                        }}
                        onPress={this.orderby}
                    >
                        <Text style={{fontSize: 14, color: 'black'}}> {I18n.t('sortElement')}</Text>
                    </TouchableOpacity>

                </View>
                <View title={'Quickly Test RTL Layout'}>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={[styles.name, {margin: 1}]}> {I18n.t('changeLanguage')}</Text>
                        <View style={styles.switchRowSwitchView}>
                            <Switch
                                onValueChange={this._onDirectionChange}
                                style={styles.rightAlignStyle}
                                value={this.state.isRTL}
                            />

                        </View>
                    </View>
                </View>
                <ScrollView

                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={this._onRefresh}
                        />}

                    contentContainerStyle={{flexGrow: 1, borderWidth: 1, paddingBottom: 80}}

                    onScroll={({nativeEvent}) => {
                        if (isCloseToBottom(nativeEvent)) {
                            this.updateList()
                        }
                    }}
                >
                    <View>
                        {
                            this.showList()
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
}
