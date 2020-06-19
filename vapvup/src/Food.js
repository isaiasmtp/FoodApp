import React, { Component } from "react";
import { Text, 
    View,
    FlatList,
    StyleSheet,
    Dimensions,
    ScrollView,
    TextInput,
    Image,
    TouchableOpacity
 } from 'react-native'

 var { height, width } = Dimensions.get("window");
import Swiper from 'react-native-swiper'

import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/Ionicons'

export default class Food extends Component{

    constructor(props){
        super(props);
        this.state = {
            dataBanner:[],
            dataCategories:[],
            dataFood:[],
            selectCatg:0,
        }
    }

    componentDidMount(){
        const url = "http://tutofox.com/foodapp/api.json"
        return fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoading:false,
                dataBanner: responseJson.banner,
                dataCategories: responseJson.categories,
                dataFood: responseJson.food
            })
        })
        .catch((error) => console.log(error));
    }

    render(){
        return (
            <ScrollView>
                <View style={{ flex:1,backgroundColor:"#f2f2f2"}}>
                    <View style={{width:width, alignItems:'center'}}>
                    <Image style={{height:60,width:width/2,margin:10 }} resizeMode="contain" source={require("../imgs/vapt-vupt-logo.png")}  />
                    <Swiper style={{ height:width/2 }} showsButtons={false} autoplay={true} autoplayTimeout={2} >
                    { 
                        this.state.dataBanner.map((itemmap) => {
                            return(
                                <Image style={styles.imageBanner} resizeMode="contain" source={{uri: itemmap}}></Image>
                            )
                        })
                    }
                    </Swiper>
                    </View>
                    <View style={{width:width, borderRadius:20, paddingVertical:20, backgroundColor:'white'}}>
                        <View style={{height:10}}/>
                        <FlatList
                            horizontal={true}
                            data={this.state.dataCategories}
                            renderItem={({item}) => this._renderItem(item)}
                            keyExtractor={(item, index) => index.toString()}>
                        </FlatList>
                        <FlatList
                        data={this.state.dataFood}
                        numColumns={2}
                        renderItem={({item}) => this._renderItemFood(item)}
                        keyExtractor={(item, index) => index.toString()}>
                        </FlatList>
                    </View>
                    <Text>App Delivery</Text>
                    {/* <Text>{JSON.stringify(this.state.dataFood)}</Text> */}
                </View>
            </ScrollView>
        );
    }
    
    _renderItem(item){
        return(
            <TouchableOpacity
            onPress={()=> this.setState({selectCatg: item.id})}
            style={[styles.divCategories,{backgroundColor: item.color}]}>
                <Image
                    style={{width:100, height:80}}
                    resizeMode="contain"
                    source={{uri: item.image}} />
                    <Text style= {{fontWeight:'bold', fontSize:22}}>
                        {item.name}
                    </Text>
            </TouchableOpacity>
        )
    }

    _renderItemFood(item){
        let catg = this.state.selectCatg
        if(catg == 0 || catg == item.categorie){
            return(
                <TouchableOpacity style={styles.divFood}>
                    <Image style={styles.imageFood}
                    resizeMode='contain'
                    source={{ uri:item.image }}/>
                    <View style={{backgroundColor:'transparent', height:((width/2)-20)-90, width:(((width/2)-20)-10)}}></View>
                    <Text style={{ fontWeight:'bold', fontSize:22, textAlign:'center' }}>{item.name}</Text>
                    <Text>Description and Food Details</Text>
                    <Text style={{color:'green', fontSize:20}}>R${item.price}</Text>
                
                <TouchableOpacity
                style={{
                    width:(width/2)-40,
                    backgroundColor:'#33c37d',
                    alignItems:'center',
                    justifyContent:'center',
                    borderRadius:5,
                    padding:5,
                    flexDirection:'row'
                }}
                onPress={() => this.onClickAddCart(item)}
                >
                    <Text
                    style={{fontSize:18,
                    color:'white',
                    fontWeight:'bold'}}>Add Cart</Text>
                    <View style={{width:10}}/>
                    <Icon name='ios-add-circle' size={30} color={'white'}/>
                </TouchableOpacity>

                </TouchableOpacity>
            )
        }
    }

    onClickAddCart(data){
        const itemcart = {
            food:data,
            quantity:1,
            price: data.price,
        }
        AsyncStorage.getItem('cart').then((datacart) => {

            if(datacart !== null){
                const cart = JSON.parse(datacart)
                cart.push(itemcart)
                AsyncStorage.setItem("cart",JSON.stringify(cart))
            }else{
                const cart = []
                cart.push(itemcart)
                AsyncStorage.setItem("cart",JSON.stringify(cart))
            }
            alert("Add successful")

        })
        .catch((error) => {
            alert(error)
        })
    }

}

const styles = StyleSheet.create({
    imageBanner: {
      height:width/2,
      width:width-40,
      borderRadius:10,
      marginHorizontal:20
    }, 
    titleCatg:{
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center',
        marginBottom:10
    },
    divCategories:{
        backgroundColor:'red',
        margin:5, alignItems:'center',
        borderRadius: 10,
        padding:10
    },imageFood:{
        width:(width/2 - 20) - 10,
        height:(width/2 - 20) - 30,
        backgroundColor:'transparent',
        position:"absolute",
        top: -45
    },divFood:{
        width:(width/2) - 20,
        backgroundColor:'red',
        padding:10,
        borderWidth:0,
        borderRadius:10,
        marginTop:55,
        marginLeft:10,
        alignItems: 'center',
        elevation:8,
        shadowOpacity:0.3,
        shadowRadius:50,
        backgroundColor:'white'
    }
  });