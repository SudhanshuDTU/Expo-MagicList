import { Stack } from 'expo-router';

export default function Layout() {
  return <Stack screenOptions={{headerTitle: 'MagicList',headerTitleStyle : {fontWeight: '600',fontSize: 20,color: '#E30B5C'},headerStyle:{backgroundColor: 'black'}}}/>;
}
