import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Card, Text} from 'react-native-paper';
import {Database} from './Database.tsx';
import {format} from 'date-fns';
import {getImageSource} from './ImageLoader.tsx';
import {styles} from './Styling.tsx';

const PartB = () => {
  const [dataDB, setDataFromDB] = useState([]);
  const db = new Database();
  let masterArray: any[] = [];
  let categoryArray: any[] = [];
  let itemsArray: any[] = [];
  let categoryItems = {};
  let contentArray: any[] = {
    category: '',
    data: [],
  };

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const lol = await db.getCategories();

    for (let i = 0; i < lol.rows.length; i++) {
      let row = lol.rows.item(i);
      let category = row.category;
      categoryArray.push(category);
      // console.log(category);

      const items = await db.getExpiredItem(category);

      for (let j = 0; j < items.rows.length; j++) {
        let row = items.rows.item(j);
        let name = row.itemName;
        let expiryDate = row.expiryDate;

        const newItem = {...categoryItems, name, expiryDate};
        itemsArray.push(newItem);
      }

      const newContentArray = {
        ...contentArray,
        category: categoryArray[i],
        data: JSON.stringify(itemsArray),
      };
      itemsArray = [];
      masterArray.push(newContentArray);
    }

    console.log(masterArray);
    setDataFromDB(masterArray);
  };

  const dataSections = dataDB.map(item => ({
    title: item.category,
    data: JSON.parse(item.data),
  }));

  function formatDate(originalDate){
    return format(new Date(originalDate), 'dd-MM-yyyy');
  }

  const renderItem = (item) => (
    <View style={{ flex: 1, margin: 3, padding: 10 }}>
      <Card>
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>{item.name}</Text>
          <Text variant="bodyMedium">{formatDate(item.expiryDate)}</Text>
        </Card.Content>
        <Card.Cover source={getImageSource(item.name.toLowerCase().replace(' ', ''))} />
      </Card>
    </View>
  );

  const renderCategory = ({item}) => (
    <View style={styles.header}>
      <Text style={styles.header}>{item.title}</Text>
      <FlatList
        data={item.data}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={item => `${item.title}-${item.name}`} // Use a unique key
        numColumns={2} // Set numColumns to 2 for a two-column layout
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dataSections}
        renderItem={renderCategory}
        keyExtractor={item => item.title}
      />
    </SafeAreaView>
  );
};
export default PartB;
