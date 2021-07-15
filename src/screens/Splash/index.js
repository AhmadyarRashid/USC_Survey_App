import React from "react"
import {Image, View, Text} from "react-native"
import {Container} from "native-base"
import LoadingGif from "../../assets/usc.jpg"
import {Colors} from "../../utils/colors";

function LoadingScreen(){
  return(
      <Container style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent:"center",
        backgroundColor: Colors.lightGrey
      }}>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent:'center'}}>
          <Image
            source={LoadingGif} />
        </View>
        <Text style={{color: Colors.black, textAlign: 'center', marginTop: 22}}>Loading...</Text>
      </Container>
  )
}

export default LoadingScreen;
