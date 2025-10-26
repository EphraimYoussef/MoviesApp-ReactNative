import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { DynamicColorIOS } from 'react-native';

const _layout = () => {
	return (
		<NativeTabs
      minimizeBehavior='onScrollDown'
      labelStyle={{
        color:DynamicColorIOS({
          dark:'white',
          light:'black'
        })
      }}
      tintColor={DynamicColorIOS({
        dark:'#ab8bff',
        light:'#7b46e4'
      })}
    >
      <NativeTabs.Trigger name="index">
        <Icon sf={{ default: 'house', selected: 'house.fill' }} drawable="custom_android_drawable" />
        <Label hidden/>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="search">
        <Icon sf={{ default: 'magnifyingglass', selected: 'magnifyingglass' }} drawable="custom_android_drawable" />
        <Label hidden/>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <Icon sf={{ default: 'person', selected: 'person.fill' }} drawable="custom_android_drawable" />
        <Label hidden/>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="saved">
        <Icon sf={{ default: 'bookmark', selected: 'bookmark.fill' }} drawable="custom_android_drawable" />
        <Label hidden/>
      </NativeTabs.Trigger>
    </NativeTabs>
	)
}

export default _layout