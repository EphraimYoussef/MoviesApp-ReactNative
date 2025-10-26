import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';

const _layout = () => {
	return (
		<NativeTabs>
      <NativeTabs.Trigger name="index">
        <Icon sf="house.fill" drawable="custom_android_drawable" />
        <Label>Home</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="search">
        <Icon sf="magnifyingglass" drawable="custom_android_drawable" />
        <Label>Search</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <Icon sf="person.fill" drawable="custom_android_drawable" />
        <Label>Profile</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="saved">
        <Icon sf="bookmark.fill" drawable="custom_android_drawable" />
        <Label>Saved</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
	)
}

export default _layout