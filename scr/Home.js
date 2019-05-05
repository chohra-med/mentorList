import React,{Component} from'react';
import{
    View,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
    Animated,
    Text
}
from'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

const Datas=[
    {"id": 1, "helps":"business & devlopment",  "name": "Arobawo ! "},
    {"id": 2, "helps":"business & devlopment",  "name": "Arobaw"},
    {"id": 3, "helps":"business & devlopment",  "name": "Arobaw"},
    {"id": 4, "helps":"business & devlopment",  "name": "Arobaw"},
    {"id": 5, "helps":"business & devlopment",  "name": "Arobawe"},
    {"id": 6, "helps":"business & devlopment",  "name": "Arobawx"},
    {"id": 7, "helps":"business & devlopment",  "name": "Arobaw "},
    {"id": 8, "helps":"business & devlopment",  "name": "Arobaw friend"},
    {"id": 9, "helps":"business & devlopment",  "name": "Arobawnk you"},
    {"id": 10,"helps":"business & devlopment",  "name": "Arobawwazo"}
    ];

export default class Home extends Component
{
    constructor(props) {
        super(props);
        this.state= {
            loadMore: false,
            ourData:[],
        };
       }
       componentWillMount(){
          this.setState({ourData:Datas}) 
          console.log(this.state.ourData);
          console.log(Datas)
       }
       updatePageNumberAndMakeNewRequest(){
           console.log('la fin');
       }
     

    render() {
        const {
              data
            } = this.state;
        return (
            <ScrollView style={styles.contentWrap}
                       onScrollEndDrag={this.updatePageNumberAndMakeNewRequest}
                      contentContainerStyle={{ flexGrow: 1, borderWidth: 1 }}>
              <View>
                { 
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
                  size={23}
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
           }
              </View>
            </ScrollView>
        );
      }
    }
    const styles=StyleSheet.create({
        image:{
            width: 60, 
            height: 60,
            borderRadius:60,
            margin:10,
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
