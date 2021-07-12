import React from 'react';
import {Image} from 'react-native';
import {Text, Body, Container} from 'native-base';
import NoDataImage from '../../howmuch-pos-core/assets/noDataFound.jpeg';
import {Colors} from '../../utils/colors';

function NoDataFound() {
  return (
      <Container>
        <Image
            style={{width: '100%'}}
            source={NoDataImage}
        />
        <Body>
          <Text style={{color: Colors.grey}}>No Order Found</Text>
        </Body>
      </Container>
  );
}

export default NoDataFound;
