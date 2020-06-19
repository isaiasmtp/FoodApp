import React, { Component } from 'react';
import { Text, View, Dimensions, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-community/async-storage'

var {  width } = Dimensions.get("window");


export default class Address extends Component {

    constructor(props){
        var total = 0
        super(props);
        this.state = {
            dataCart: [],
            total:0
        };

        AsyncStorage.getItem('cart').then((cart) => {
            if (cart !== null){
                const cartfood = JSON.parse(cart)
                this.setState({dataCart:cartfood})
                this.onLoadTotal()
            }
        })
    }

    render(){
        return(
            <View style={{ flex:1, alignItems:'center', justifyContent:'center'}}>
                <View style={{height:20}}/>
                <Text style={{fontSize:28, color:'gray', fontWeight:'bold'}}>Carrinho</Text>
                <View style={{height:10}}/>
                <View style={{backgroundColor:'transparent', flex:1}}>

                <ScrollView>
                {
                    this.state.dataCart.map((item,i) => {
                        return(
                    <View style={{width:width-20,margin:10, flexDirection:'row', backgroundColor:'transparente', borderBottomWidth:2, borderColor:'#cccccc', paddingBottom:1}}>
                        
                        <Image style={{width:width/3, height: width/3}} source={{uri: item.food.image}} />
                        <View style={{backgroundColor:'transparent', flex:1,justifyContent:'space-between'}}>
                            <View>                                
                                <Text style={{fontSize:20, fontWeight:'bold'}}>{item.food.name}</Text>
                                <Text>Lore Ipsun food</Text>
                            </View>

                            <View style={{backgroundColor:'transparent', flexDirection:'row', justifyContent:'space-between'}}>
                            <Text style={{
                                fontWeight:'bold',
                                color:'#33c37d',
                                fontSize:20
                            }}>R${item.price * item.quantity}</Text>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <TouchableOpacity onPress={() => this.onChangeQuant(i, false)}>
                                        <Icon name='ios-remove-circle' size={30} color={'33c37d'}/>
                                    </TouchableOpacity>
                                    <Text style={{fontWeight:'bold', paddingHorizontal:8}}>{item.quantity}</Text>
                                    <TouchableOpacity onPress={() => this.onChangeQuant(i, true)}>
                                        <Icon name='ios-add-circle' size={30} color={'33c37d'}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                        )
                    })
                }
                
                    <View style={{height:20}}/>
                    <Text style={{fontSize:28, color:'#33c37c', textAlign:'center'}}>R$ {this.state.total}</Text>
                
                </ScrollView>
                </View>
                <View style={{height:10}}/>

                <TouchableOpacity
                style={{backgroundColor:'#33c37d',
                width:width-40,
                alignItems:'center',
                padding:10,
                borderRadius:5}}>
                    <Text style={{
                        fontSize:24,
                        fontWeight:'bold',
                        color:'white'
                    }}>
                        CHECKOUT
                    </Text>
                </TouchableOpacity>
                <View style={{height:10}}/>
            </View>
        )
    }

    onLoadTotal(){
        const cart = this.state.dataCart        
        for (var i = 0; i < cart.length; i++){
            this.setState({total: this.state.total + (cart[i].price * cart[i].quantity)})
        }
    }

    onChangeQuant(i, type){
        const cart = this.state.dataCart
        let cant = cart[i].quantity

        if(type){
            cant = cant + 1
            cart[i].quantity = cant
            this.setState({dataCart:cart,
            total:this.state.total +  cart[i].price})
            AsyncStorage.setItem("cart",JSON.stringify(cart))
        }else if(type==false && cant >= 2){
            cant = cant - 1
            cart[i].quantity = cant
            this.setState({dataCart:cart,
            total:this.state.total -  cart[i].price})
            AsyncStorage.setItem("cart",JSON.stringify(cart))
        }else if(type==false && cant == 1){
            let price = cart[i].price
            cart.splice(i,1)
            this.setState({dataCart:cart,
            total:this.state.total - price})
            AsyncStorage.setItem("cart",JSON.stringify(cart))
        }
    }
}