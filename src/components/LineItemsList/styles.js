import {StyleSheet} from 'react-native';
import {Colors} from "../../utils/colors"

const styles = StyleSheet.create({
  root: {
    marginTop: 8
  },
  head: {
    backgroundColor: Colors.primary,
  },
  headerText: {
    padding: 4,
    color: Colors.white,
  },
  bodyText: {
    padding: 4,
    color: Colors.black,
  }
});

export default styles;
