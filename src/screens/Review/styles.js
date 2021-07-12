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
  category: {
    marginBottom: 20
  },
  categoryTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.primary,
    fontSize: 24,
    marginBottom: 12,
  }
});

export default styles;
