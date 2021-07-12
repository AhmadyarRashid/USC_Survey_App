import React, {useState} from 'react';
import {TouchableOpacity, Alert, Modal} from 'react-native';
import {View, Text, Button, Icon} from 'native-base';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';
import {removeLineItem} from '../../howmuch-pos-core/utils/controller';
import {Colors} from '../../utils/colors';
import EditableModal from '../EditableModal';
import styles from './styles';

const tableHead = [
  'Name', 'Price', 'Qty', 'Total', 'Action',
];

function LineItemsList({order, ...props}) {
  const {line_items} = order;
  const [selectedLineItem, setSelectedLineItem] = useState({});
  const [selectedColIndex, setSelectedColIndex] = useState(1);
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [isModalShow, setModalShow] = useState(false);

  let data = [];
  line_items.forEach(({display_name, price, quantity, total, id}) => {
    data.push([display_name, price, quantity, total, id]);
  });

  const deleteLineItemHandler = (variantId) => {
    removeLineItem({orderId: order.number, variantId}).then(response => {
      const updated_line_items = order.line_items.filter(
          item => item.id !== variantId,
      );
      const updatedOrder = {
        ...order,
        ...response.order,
        line_items: updated_line_items,
      };
      props.updateOrder(updatedOrder);
    });
  };

  const element = (data, colIndex, rowIndex) => {
    if (colIndex > 0 && colIndex < 5) {
      let editableCell = <React.Fragment></React.Fragment>;
      if (colIndex === 4) {
        editableCell =
          <Icon
              active
              onPress={() => deleteLineItemHandler(line_items[rowIndex].id)}
              name="cancel"
              style={{color: Colors.danger, fontSize: 22, marginLeft: 8}} type="MaterialIcons"/>
      } else {
        editableCell = <Button
            onPress={async () => {
              await setSelectedColIndex(colIndex);
              await setSelectedLineItem(line_items[rowIndex]);
              await setSelectedRowIndex(rowIndex);
              await setModalShow(true);
            }}
            transparent
            small
        >
          <Text>{data}</Text>
        </Button>;
      }
      return (
          <TouchableOpacity>
            <View style={styles.btn}>
              {editableCell}
            </View>
          </TouchableOpacity>
      );
    }
    return data;
  };

  return (
      <View style={styles.root}>
        <EditableModal
            {...props}
            order={order}
            isOpen={isModalShow}
            selectedLineItem={selectedLineItem}
            selectedColIndex={selectedColIndex}
            selectedRowIndex={selectedRowIndex}
            handlerCloseModal={() => setModalShow(false)}
        />
        <Table borderStyle={{borderWidth: 0, borderColor: 'grey'}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.headerText}/>
          {
            data.map((rowData, index) => (
                <TableWrapper key={index} style={{display: 'flex', flexDirection: 'row'}}>
                  {
                    rowData.map((cellData, cellIndex) => (
                        <Cell
                            key={cellIndex}
                            data={element(cellData, cellIndex, index)}
                            textStyle={{color: 'black'}}
                        />
                    ))
                  }
                </TableWrapper>
            ))
          }
        </Table>
      </View>
  );
}

export default LineItemsList;
