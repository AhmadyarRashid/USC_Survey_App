import {StyleSheet} from 'react-native';
import {Colors} from "../../utils/colors";

const styles = StyleSheet.create({
  root: {
    padding: 12
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  icon: {
    fontSize: 18,
    marginRight: 6,
    color: Colors.primary
  },
  picker: {
    marginTop: 20
  }
});

export default styles;
