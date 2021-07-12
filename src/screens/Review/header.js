import React from "react"
import {Body, Button, Header, Icon, Left, Right, Title} from "native-base";
import {Colors} from "../../utils/colors";

function ReviewHeader({navigation, ...props}){
  return(
    <Header style={{backgroundColor: 'white'}}>
      <Left>
        <Button onPress={() => navigation.toggleDrawer()} transparent>
          <Icon style={{color: Colors.primary}} name='arrow-back'/>
        </Button>
      </Left>
      <Body>
        <Title style={{color: 'black'}}>Review</Title>
      </Body>
      <Right/>
    </Header>
  )
}

export default ReviewHeader;
