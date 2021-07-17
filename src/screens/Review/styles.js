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
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 18
  }
});

export default styles;
