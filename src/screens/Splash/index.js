import React from "react"
import {Image} from "react-native"
import {Container} from "native-base"
import LoadingGif from "../../howmuch-pos-core/assets/loading.gif"

function LoadingScreen(){
  return(
      <Container style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent:"center",
        backgroundColor: "#f5f5f5"
      }}>
        <Image
            style={{width: "100%", height: "20%"}}
            source={LoadingGif} />
      </Container>
  )
}

export default LoadingScreen;
