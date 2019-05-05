import React,{Component} from'react';
import{
    View,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    Text
}
from'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash'

const firstData=[
    {"id": 1, "helps":"business & devlopment",  "name": "Arobawo ! "},
    {"id": 2, "helps":"business & devlopment",  "name": "Arobaw"},
    {"id": 3, "helps":"business & devlopment",  "name": "Arobaw"},
    {"id": 4, "helps":"business & devlopment",  "name": "Arobaw"},
    {"id": 5, "helps":"business & devlopment",  "name": "Arobawe"},
    {"id": 6, "helps":"business & devlopment",  "name": "Arobawx"},
    {"id": 7, "helps":"business & devlopment",  "name": "Mohammed"},
    {"id": 8, "helps":"business & devlopment",  "name": "Arobaw friend"},
    {"id": 9, "helps":"business & devlopment",  "name": "Arobawnk you"},
    {"id": 10,"helps":"business & devlopment",  "name": "Arobawwazo"}
    ];
const secondData=[
    {"id": 412, "helps":"busineass & devlopment",  "name": "Arazobaw"},
    {"id": 323, "helps":"busineszs & devlopment",  "name": "Arazeobaw"},
    {"id": 512, "helps":"businesas & devlopment",  "name": "Arazebawx"},
    {"id": 47, "helps":"businwess & devlopment",  "name": "Aroazebaw "},
    {"id": 58, "helps":"businegss & devlopment",  "name": "Aroazebaw friend"},
    {"id": 69, "helps":"businetss & devlopment",  "name": "Arobazeawnk you"},
    {"id": 610,"helps":"busineshs & devlopment",  "name": "Arobaeawwazo"}

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
        };
        this.filterby=this.filterby.bind(this);
        this.orderby=this.orderby.bind(this);
       }
       filterby(){
        let data=this.state.generalData;
        data = data.filter(x => String(x.name).includes(this.state.nameFiltred));
        this.setState({ourData:data})



       }
       orderby(){
        console.log("clicked")
        console.log(data)
            let data=this.state.generalData;
            data=_.sortBy(data,['name', 'id'])
            this.setState({ourData:data})
            console.log(data)


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
       }
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
      
       
    render() {
        return (
            <View>
                <View style={{flexDirection:'row',
                            justifyContent:'center'}}>
                <TextInput
                    style={{height: 40,borderWidth:2,margin:5,width:'60%'}}
                    placeholder="Type here to filter by NAME!"
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
                        style={{width:30,justifyContent:'center', borderRadius:20,borderColor:'grey',margin:6}} 
                        onPress={this.orderby}>
                        <Icon color='black' size={20} name="search"/>
                    </TouchableOpacity>
                    
                </View>
                <ScrollView 
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
