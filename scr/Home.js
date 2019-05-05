import React,{Component} from'react';
import{
    View,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    Text,
    RefreshControl,
    Switch,
    I18nManager,
    Alert
}
from'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash'

const firstData=[
    {"id": 1, "helps":"business & devlopment",  "name": "Chohra Mohammed"},
    {"id": 2, "helps":"business & devlopment",  "name": "Amir Khoutir"},
    {"id": 3, "helps":"business & devlopment",  "name": "Chellaf Younes"},
    {"id": 4, "helps":"business & devlopment",  "name": "Bederrer Alladin"},
    {"id": 5, "helps":"business & devlopment",  "name": "Benyamina Mouad"},
    {"id": 6, "helps":"business & devlopment",  "name": "Sabour Oussama"},
    {"id": 7, "helps":"business & devlopment",  "name": "Oumellal Abdeslam"},
    {"id": 8, "helps":"business & devlopment",  "name": "Bouregag Abdelkaded"},
    {"id": 9, "helps":"business & devlopment",  "name": "Borsali Faycel"},
    {"id": 10,"helps":"business & devlopment",  "name": "Bouguesri Adel"}
    ];
const secondData=[
    {"id": 412, "helps":"busineass & devlopment",  "name": "Neddar Islem"},
    {"id": 323, "helps":"busineszs & devlopment",  "name": "Khodja Mehdi"},
    {"id": 512, "helps":"businesas & devlopment",  "name": "Bacha Brahim"},
    {"id": 47, "helps":"businwess & devlopment",  "name": "Damene Miloud "},
    {"id": 58, "helps":"businegss & devlopment",  "name": "Touaria Sami"},
    {"id": 69, "helps":"businetss & devlopment",  "name": "Hafsawi Houssem"},
    {"id": 610,"helps":"busineshs & devlopment",  "name": "Kafi Abderrazak"}

];
    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
      };
export default class Home extends Component
{
    constructor(props) {
        super(props);
        this.state= {
            loadMore: false,
            ourData:[],
            generalData:[],
            nameFiltred:'',
            refreshing: false,
            isRTL:true,
        };
        this.filterby=this.filterby.bind(this);
        this.orderby=this.orderby.bind(this);
       }
       filterby(){
        let data=this.state.generalData;
        data = data.filter(x => String(x.name.toUpperCase()).includes(this.state.nameFiltred.toUpperCase()));
        this.setState({ourData:data})
       }
       orderby(){
            let data=this.state.ourData;
            data=_.sortBy(data,['name', 'id'])
            this.setState({ourData:data})
       }
       componentWillMount(){
          this.setState({ourData:firstData}) 
          this.setState({generalData:firstData}) 
       }
       updateList(){
        if(!this.state.loadMore)
            {
            let data=this.state.ourData;
            data=data.concat(secondData);
            this.setState({generalData:data});
            this.setState({ourData:data});
            this.setState({loadMore:true})
            this.setState({nameFiltred:''})
        }
    }
   
  
  _onDirectionChange = () => {
    I18nManager.forceRTL(this.state.isRTL);
    this.setState({isRTL: !this.state.isRTL});
    Alert.alert(
      'Reload this page',
      'Please reload this page to change the UI direction! ' +
        'All examples in this app will be affected. ' +
        'Check them out to see what they look like in RTL layout.',
    );
  }


       showList(){
           return(
            this.state.ourData.map(data => {
                return(
                    
                 <TouchableOpacity key={data.id}>
                <View style={styles.listViewContainer} >
                 <Image
                     style={styles.image}
                     source={require('./Images/profile.jpg')}
                     >
                 </Image>  
                  <View style={styles.textContainer}>
                     <Text style={styles.name} >{data.name}</Text>
                     <Text style={styles.helps}> {data.helps}</Text>
                     
                 </View>
                 <Icon name="arrow-right" style={styles.button} 
                       color='black'
                       size={32}
                       onPress={()=>{
     
                       }}
                 >
                 </Icon>
                 
     
                 </View>
                 <View
                     style={{
                         borderBottomColor: 'black',
                         borderBottomWidth: 0.5,
                         width:'90%',
                         marginLeft:'5%'
                     }}
                     />
                 </TouchableOpacity>
                 )})

           );
       }
       
       _onRefresh = () => {
        this.setState({refreshing: true});
        this.setState({ourData:this.state.generalData}) 
          this.setState({refreshing: false});
          this.setState({nameFiltred:''})
      }
    
       
    render() {
        return (
            <View>
                <View style={{flexDirection:'row',
                            justifyContent:'center'}}>
                <TextInput
                    style={{height: 40,borderWidth:2,margin:5,width:'60%'}}
                    placeholder="Type here to filter by NAME!"
                    value={this.state.nameFiltred}
                    onChangeText={(nameFiltred) => {this.setState({nameFiltred});
                        this.filterby;
                    }}
                    />    
                    <TouchableOpacity
                        style={{width:30,justifyContent:'center', borderRadius:20,borderColor:'grey',margin:6}} 
                        onPress={this.filterby}>
                        <Icon color='black' size={20} name="search"/>
                    </TouchableOpacity>                
                   
                    <TouchableOpacity
                        style={{justifyContent:'center', borderRadius:4,borderColor:'grey',borderWidth:1,marginLeft:20,margin:6}} 
                        onPress={this.orderby}>
                        <Text style={{fontSize:14,color:'black'}}> SortElements</Text>
                    </TouchableOpacity>
                    
                </View>
                <View title={'Quickly Test RTL Layout'}>
                    <View style={styles.flexDirectionRow}>
                    <Text style={styles.switchRowTextView}>forceRTL</Text>
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
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                        />}
                      contentContainerStyle={{ flexGrow: 1, borderWidth: 1,paddingBottom:80 }}
                      onScroll={({nativeEvent}) => {
                        if (isCloseToBottom(nativeEvent)) {
                             this.updateList() }}}
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
    const styles=StyleSheet.create({
        image:{
            width: 60, 
            height: 60,
            borderRadius:60,
            margin:10,
            position:'absolute',
            left:'5%'
        },
        listViewContainer:{
            flexDirection:'row',
            flex:1,
            width:'100%',
            height:80,
            justifyContent: 'center',
            


        },
        button:{
            marginTop:'5%',
            position:'absolute',
            right:'5%'
        },
        name:{
            color:'black',
            fontSize:16
        },
        helps:{

        },
        textContainer:{
            flexDirection:'column',
            margin:10,

        }
        


    })
