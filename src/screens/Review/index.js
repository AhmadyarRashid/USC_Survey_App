import React, {Fragment, useState} from "react";
import {Container, Content, View, Text} from "native-base";
import ReviewHeader from "./header";
import styles from "./styles";
import ExpandableReview from "../../components/ExpandableReview";

const dataStructure = [
  {
    id: 1,
    name: 'Computer',
    details: [
      {
        id: 1,
        itemName: "Ram",
        description: "4GB"
      },
      {
        id: 2,
        itemName: "Hard disk",
        description: "1 TB"
      },
      {
        id: 3,
        itemName: "Graphic Card",
        description: "4GB"
      }
    ]
  },
  {
    id: 2,
    name: 'HP',
    details: [
      {
        id: 1,
        itemName: "Ram",
        description: "4GB"
      },
      {
        id: 2,
        itemName: "Hard disk",
        description: "1 TB"
      },
      {
        id: 3,
        itemName: "Graphic Card",
        description: "4GB"
      }
    ]
  },
  {
    id: 3,
    name: 'Dell',
    details: [
      {
        id: 1,
        itemName: "Ram",
        description: "4GB"
      },
      {
        id: 2,
        itemName: "Hard disk",
        description: "1 TB"
      },
      {
        id: 3,
        itemName: "Graphic Card",
        description: "4GB"
      }
    ]
  },
  {
    id: 4,
    name: 'Apple',
    details: [
      {
        id: 1,
        itemName: "Ram",
        description: "4GB"
      },
      {
        id: 2,
        itemName: "Hard disk",
        description: "1 TB"
      },
      {
        id: 3,
        itemName: "Graphic Card",
        description: "4GB"
      }
    ]
  }
]

function ReviewScreen(props) {
  const [data, setData] = useState(dataStructure)

  const onCheckBoxHandler = (productId, itemId, status) => {
    const updatedData = data.map(product => product.id === productId
      ? {
        ...product,
        details: product.details.map(item => item.id === itemId
          ? {...item, checked: status}
          : item)
      }
      : product)
    setData(updatedData)
  }

  return (
    <Fragment>
      <ReviewHeader {...props} />
      <Container style={styles.root}>
        <Content>
          {data.map(product => (
            <View style={styles.category}>
              <Text style={styles.categoryTitle}>{product.name}</Text>
              <ExpandableReview
                data={product.details}
                onCheckBoxHandler={(id, checked) => onCheckBoxHandler(product.id, id, checked)}
              />
            </View>
          ))}

        </Content>
      </Container>
    </Fragment>
  )
}

export default ReviewScreen;
