import * as React from 'react';
import {BottomNavigation} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import PartA from './PartA.tsx';
import PartB from './PartB.tsx';
import PartC from './PartC.tsx';
import PartD from './PartD.tsx';

const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'music',
      title: 'Fresh',
      focusedIcon: 'heart',
      unfocusedIcon: 'heart-outline',
    },
    {key: 'albums', title: 'Expired', focusedIcon: 'emoticon-confused', unfocusedIcon: 'emoticon-confused-outline'},
    {key: 'recents', title: 'Almost Expired', focusedIcon: 'debian'},
    {
      key: 'nextMonthExpired',
      title: 'Expired Next Month',
      focusedIcon: 'emoticon-cool',
      unfocusedIcon: 'emoticon-cool-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: PartA,
    albums: PartB,
    recents: PartC,
    nextMonthExpired: PartD,
  });

  return (
    <SafeAreaProvider>
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </SafeAreaProvider>
  );
};

export default MyComponent;
