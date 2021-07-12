import {StyleSheet} from 'react-native';
import {Colors} from "../../utils/colors"

const styles = StyleSheet.create({
  root: {
    marginTop: 8,
    zIndex: -100,
    // paddingBottom: 8,
    // paddingTop: 8,
    // borderWidth: 1,
    // borderTopColor: Colors.lightGrey,
    // borderBottomColor: Colors.lightGrey,
    // borderLeftColor: Colors.white,
    // borderRightColor: Colors.white
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.black
  },
  inputItem: {
    width: '45%',
    marginTop: 8,
    marginRight: 4,
  },
  fullInputItem: {
    width: '98%',
    marginTop: 8,
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // marginTop: 8,
  },
  button: {
    // marginTop: 12,
    marginRight: 5
  },
  actionButton: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  }
});

export default styles;
