import React, {useState, useEffect} from 'react';
import {Modal} from 'react-native';
import {View, Text, Label, Input, Item, Button, Card, CardItem} from 'native-base';
import {Formik} from 'formik';
import {
  updateCustomer,
  addNewCustomer,
  syncCustomerToLive,
  getStoredTaxons,
} from '../../howmuch-pos-core/utils/controller';
import styles from './styles';
import CustomerAutocomplete from './CustomerAutoComplete';
// for multi select dropdown
import Icon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

function CustomerInfoComponent({
                                 order, customers,
                                 updateCustomerList = () => {
                                 },
                               }) {

  const [selectedCustomer, setSelectedCustomer] = useState({
    email: '',
    phoneNo: '',
    name: '',
  });
  const [selectedTaxons, setSelectedTaxons] = useState([]);
  const [taxonsList, setTaxonsList] = useState([]);

  // for create new customer in modal
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    (async function () {
      const taxons = await getStoredTaxons();
      setTaxonsList([
        {
          name: 'Taxons',
          id: 0,
          children: taxons,
        },
      ]);
    })();
  }, []);

  const openNewCustomerHandler = () => {
    // reset fields before open new customer modal
    setOpen(true);
    setSelectedCustomer({
      name: '', email: '', phoneNo: '',
    });
  };

  const saveCustomerHandler = () => {
    const {name, email, phoneNo} = selectedCustomer;
    const payload = {
      id: order.number,
      customer: {
        name,
        email,
        phone: phoneNo,
      },
    };
    updateCustomer(payload)
        .then(response => {
          alert('customer update successfully');
        })
        .catch(error => {
          console.log('update customer error: ', error);
        });
  };

  return (
      <React.Fragment>
        <Card style={styles.root}>
          <CardItem>
            <Text style={styles.heading}>Customer Info</Text>
          </CardItem>
          <CardItem style={styles.form}>
            <CustomerAutocomplete
                filteredBy="email"
                customers={customers}
                onSelectCustomer={customer => setSelectedCustomer(customer)}
                defaultValue={selectedCustomer.email}
                openNewCustomerHandler={openNewCustomerHandler}
            />

            <CustomerAutocomplete
                filteredBy="name"
                customers={customers}
                onSelectCustomer={customer => setSelectedCustomer(customer)}
                defaultValue={selectedCustomer.name}
                openNewCustomerHandler={openNewCustomerHandler}
            />

            <CustomerAutocomplete
                filteredBy="phoneNo"
                customers={customers}
                onSelectCustomer={customer => setSelectedCustomer(customer)}
                defaultValue={selectedCustomer.phoneNo}
                openNewCustomerHandler={openNewCustomerHandler}
            />
          </CardItem>
          <CardItem style={styles.actionButton}>
            <Button
                style={styles.button}
                success
                small
                onPress={() => saveCustomerHandler()}
                title="Submit">
              <Text>Submit</Text>
            </Button>
            <Button
                style={styles.button}
                danger
                small
                type='reset'
                onPress={() => setSelectedCustomer({name: '', email: '', phoneNo: ''})}>
              <Text>Reset</Text>
            </Button>
          </CardItem>
        </Card>

        <Modal
            animationType="slide"
            transparent={true}
            visible={isOpen}
            style={styles.modal}
            onRequestClose={() => {
              setOpen(!isOpen);
              selectedTaxons([]);
            }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalBody}>
              <Text style={styles.heading}>Create New Customer</Text>
              <Formik
                  initialValues={{
                    name: '',
                    phoneNo: '',
                    email: '',
                  }}
                  onSubmit={async values => {
                    console.log('new customer values:', values);
                    const {name, email, phoneNo} = values;
                    const payload = {
                      id: order.number,
                      customer: {
                        name,
                        email,
                        phone: phoneNo,
                        taxon_names: selectedTaxons,
                      },
                    };

                    // update customer auto complete fields
                    setSelectedCustomer({
                      name, email, phoneNo,
                    });
                    setSelectedTaxons([]);

                    // add new customer in local database
                    const newCustomer = {
                      cached_outstanding_balance: '0.0',
                      cached_return_due: '0.0',
                      deleted_at: null,
                      display_name: name,
                      email,
                      phone: phoneNo,
                      first_name: name,
                      id: Math.round(Math.random() * 1000),
                      last_name: null,
                      newsletter_subscriber: null,
                      store_id: order.shop.id,
                    };
                    await addNewCustomer(order.shop.slug, newCustomer);

                    updateCustomerList(newCustomer);

                    // set customer against order
                    updateCustomer(payload)
                        .then(response => {
                          alert('add customer successfully');
                          setOpen(false);
                        })
                        .catch(error => {
                          console.log('update customer error: ', error);
                        });


                    try {
                      await syncCustomerToLive(order.number, payload);
                    } catch (e) {
                      console.log('error:', e);
                    }

                  }}
              >
                {({handleChange, handleBlur, handleSubmit, values, resetForm}) => (
                    <>
                      <View style={styles.form}>
                        <Item floatingLabel style={styles.inputItem}>
                          <Label>Name</Label>
                          <Input
                              value={values.name}
                              onBlur={handleBlur('name')}
                              onChangeText={handleChange('name')}
                          />
                        </Item>
                        <Item floatingLabel style={styles.inputItem}>
                          <Label>Phone No</Label>
                          <Input
                              value={values.phoneNo}
                              onBlur={handleBlur('phoneNo')}
                              onChangeText={handleChange('phoneNo')}
                          />
                        </Item>
                        <Item floatingLabel style={[styles.inputItem, {width: '90%'}]}>
                          <Label>Email</Label>
                          <Input
                              value={values.email}
                              onBlur={handleBlur('email')}
                              onChangeText={handleChange('email')}
                          />
                        </Item>
                      </View>
                      <View style={{width: '100%'}}>
                        <SectionedMultiSelect
                            colors={{primary: 'green'}}
                            items={taxonsList}
                            IconRenderer={Icon}
                            uniqueKey="id"
                            subKey="children"
                            selectText="Choose taxons..."
                            showDropDowns={true}
                            readOnlyHeadings={true}
                            onSelectedItemsChange={selectedItems => {
                              console.log('taxons:', selectedTaxons);
                              setSelectedTaxons(selectedItems);
                            }}
                            selectedItems={selectedTaxons}
                        />
                      </View>
                      <View style={[styles.actionButton, {justifyContent: 'center'}]}>
                        <Button
                            style={styles.button}
                            danger
                            small
                            type='reset'
                            onPress={() => {
                              setSelectedTaxons([]);
                              resetForm();
                            }}>
                          <Text>Reset</Text>
                        </Button>
                        <Button
                            style={styles.button}
                            success
                            small
                            onPress={handleSubmit}
                            title="Submit">
                          <Text>Create</Text>
                        </Button>
                        <Button
                            style={styles.button}
                            danger
                            small
                            type='reset'
                            onPress={() => {
                              setSelectedTaxons([]);
                              setOpen(false);
                            }}>
                          <Text>Close</Text>
                        </Button>
                      </View>
                    </>
                )}
              </Formik>
            </View>
          </View>
        </Modal>
      </React.Fragment>
  );
}

export default CustomerInfoComponent;
