import React from "react"
import {Body, Button, Header, Icon, Left, Right, Title, Text} from "native-base";
import {Colors} from "../../utils/colors";

function ReviewHeader({navigation, onSubmitReport, isSelectionScreen, storeId, ...props}) {
  return (
      <Header style={{backgroundColor: 'white'}}>
        <Left>
          <Button onPress={() => navigation.goBack()} transparent>
            <Icon style={{color: Colors.primary}} name='arrow-back'/>
          </Button>
        </Left>
        <Body>
          <Title style={{color: 'black'}}>Review</Title>
        </Body>
        <Right>
          {!isSelectionScreen
              ? <Button
                  onPress={() => onSubmitReport()}
                  transparent>
                <Text style={{color: Colors.primary}}>Submit</Text>
              </Button> :
              <Button
                  onPress={() => navigation.navigate("Store", {storeId})}
                  transparent>
                <Text style={{color: Colors.primary}}>Edit Shop</Text>
              </Button>
          }
        </Right>
      </Header>
  )
}

export default ReviewHeader;
