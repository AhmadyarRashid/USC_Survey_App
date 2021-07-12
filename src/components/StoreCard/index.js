import React from 'react';
import {Image} from 'react-native';
import {View, Text, Card, CardItem, Left, Thumbnail, Body, Button, Icon, Right, Content} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

function StoreCard({shop, ...props}) {
  return (
      <Card>
        <CardItem cardBody style={styles.cardRoot}>
          <View style={styles.cardImageContainer}>
            <Image
                style={styles.shopBanner}
                source={{uri: shop.banner_main}}
            />
          </View>
          <View style={styles.cardDetails}>
            <Text style={styles.cardText}>{shop.name}</Text>
            <View style={styles.cardActionsRow}>
              <Button
                  small
                  success
                  onPress={() => {
                    AsyncStorage.setItem('last_selected_slug', shop.slug);
                    props.navigation.navigate('Orders', {
                      storeName: shop.name,
                      slug: shop.slug,
                      id: shop.id,
                    })
                  }}
                  style={styles.orderBtn}
              >
                <Text>Orders</Text>
              </Button>
              <Button
                  small
                  success
                  onPress={() => {
                    AsyncStorage.setItem('last_selected_slug', shop.slug);
                    !!shop && props.navigation.navigate('NewOrder', {
                      storeName: shop.name,
                      slug: shop.slug,
                      id: shop.id,
                    });
                  }}
              >
                <Text>New Order</Text>
              </Button>
            </View>
          </View>
        </CardItem>
      </Card>
  );
}

export default StoreCard;
