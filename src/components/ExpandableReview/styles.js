import {StyleSheet} from 'react-native';
import {Colors} from "../../utils/colors";

const styles = StyleSheet.create({
  root: {
    padding: 12
  },
  header: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.lightGrey,
  },
  headerText: {
    fontWeight: "600",
    width: "70%"
  },
  headerIcon: {
    fontSize: 18
  },
  contentMain: {
    backgroundColor: Colors.white,
    padding: 10,
    fontStyle: "italic",
  }
});

export default styles;
