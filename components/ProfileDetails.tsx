import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  TextInput, 
  ScrollView,
  Modal,
  Alert,
  ActivityIndicator 
} from 'react-native';
import { useUser, useClerk } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const ProfileDetails = () => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Update user profile
  const handleUpdate = async () => {
    if (!user) {
      return;
    }
    setLoading(true);
    try {
      await user.update({
        firstName: firstName,
        lastName: lastName,
      });
      Alert.alert('Success', 'Profile updated successfully!');
      setIsEditing(false);
    } 
    catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to update profile');
    } 
    finally {
      setLoading(false);
    }
  };

  // Delete account
  const handleDeleteAccount = async () => {
    if (!user) {
      return;
    }
    setLoading(true);
    try {
      await user.delete();
      Alert.alert('Account Deleted', 'Your account has been deleted successfully');
    } 
    catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to delete account');
    } 
    finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  // Sign out
  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
            } 
            catch (error: any) {
              Alert.alert('Error', 'Failed to sign out');
              console.error(error);
            }
          }
        }
      ]
    );
  };

  // Upload profile picture
  const handleImagePicker = async () => {
    try {
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need camera roll permissions to upload a profile picture.');
        return;
      }

      // Pick image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        await uploadProfileImage(result.assets[0].uri);
      }
    } catch (error: any) {
      Alert.alert('Error', 'Failed to pick image');
      console.error(error);
    }
    setShowImageOptions(false);
  };

  // Take photo with camera
  const handleCamera = async () => {
    try {
      // Request permission
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need camera permissions to take a photo.');
        return;
      }

      // Take photo
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        await uploadProfileImage(result.assets[0].uri);
      }
    } 
    catch (error: any) {
      Alert.alert('Error', 'Failed to open camera');
      console.error(error);
    }
    setShowImageOptions(false);
  };

  // Upload image to Clerk
  const uploadProfileImage = async (imageUri: string) => {
    if (!user) {
      return;
    }
    setUploadingImage(true);
    try {
      // For React Native, we need to create a file object from the URI
      // Extract filename from URI or use default
      const filename = imageUri.split('/').pop() || 'profile-image.jpg';
      
      // Create file object compatible with React Native
      const file = {
        uri: imageUri,
        type: 'image/jpeg',
        name: filename,
      } as any;
      
      // Upload to Clerk
      await user.setProfileImage({ file });
      
      Alert.alert('Success', 'Profile picture updated successfully!');
    } 
    catch (error: any) {
      console.error('Upload error:', error);
      Alert.alert('Error', error.message || 'Failed to upload profile picture');
    } 
    finally {
      setUploadingImage(false);
    }
  };

  // Delete profile picture
  const handleDeleteProfileImage = async () => {
    if (!user || !user.imageUrl){
      return;
    }
    
    Alert.alert(
      'Delete Profile Picture',
      'Are you sure you want to remove your profile picture?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setUploadingImage(true);
            try {
              await user.setProfileImage({ file: null });
              Alert.alert('Success', 'Profile picture removed successfully!');
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Failed to remove profile picture');
            } finally {
              setUploadingImage(false);
              setShowImageOptions(false);
            }
          }
        }
      ]
    );
  };

  if (!isLoaded) {
    return( 
      <View className="flex-1 items-center justify-center ">
        <ActivityIndicator
          size="large"
          color="#ab8bff"
        />
      </View>
    )
  }

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-white text-2xl font-bold text-center">
          No user found
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className='flex-1 h-full mb-32'>
      <View className='bg-gradient-to-b from-violet-600 to-purple-800 pt-16 pb-20'>

        <View className='items-center'>

          <View className='relative'>

            {/* Loading indicator */}
            {
              uploadingImage && (
                <View className='absolute inset-0 z-10 items-center justify-center bg-black/50 rounded-full w-28 h-28'>
                  <ActivityIndicator size="large" color="#8b5cf6" />
                </View>
              )
            }

            {/* Profile picture */}
            {
              user.imageUrl ? (
                <Image 
                  source={{ uri: user.imageUrl }} 
                  className='w-28 h-28 rounded-full border-4 border-white'
                />
              ) : (
                <View className='w-28 h-28 bg-violet-400 rounded-full items-center justify-center border-4 border-white'>
                  <Text className='text-white text-5xl font-bold'>
                    {user.firstName?.[0]}{user.lastName?.[0]}
                  </Text>
                </View>
              )
            }
            

            {/* Camera badge */}
            {
              !isEditing && (
                <TouchableOpacity 
                  onPress={() => setShowImageOptions(true)}
                  className='absolute bottom-0 right-0 bg-violet-500 rounded-full p-2 border-2 border-white'
                  disabled={uploadingImage}
                >
                  <Ionicons name="camera" size={16} color="white" />
                </TouchableOpacity>
              )
            }
          </View>

        </View>

      </View>

      {/* Main Content Card */}
      <View className='px-6 -mt-12'>
        <View className='bg-extra rounded-3xl p-6 shadow-2xl border border-slate-700'>
          {
            isEditing ? (
              // Edit Mode
              <View>
                <Text className='text-white text-2xl font-bold mb-6 text-center'>
                  Edit Profile
                </Text>

                {/* First Name Input */}
                <View className='mb-4'>
                  <Text className='text-gray-400 text-sm mb-2 ml-1'>First Name</Text>
                  <TextInput
                    value={firstName}
                    onChangeText={setFirstName}
                    className='bg-slate-800 text-white px-4 py-3 rounded-xl border border-slate-600'
                    placeholder="Enter first name"
                    placeholderTextColor="#64748b"
                  />
                </View>

                {/* Last Name Input */}
                <View className='mb-6'>
                  <Text className='text-gray-400 text-sm mb-2 ml-1'>Last Name</Text>
                  <TextInput
                    value={lastName}
                    onChangeText={setLastName}
                    className='bg-slate-800 text-white px-4 py-3 rounded-xl border border-slate-600'
                    placeholder="Enter last name"
                    placeholderTextColor="#64748b"
                  />
                </View>

                {/* Action Buttons */}
                <View className='flex-row gap-3'>
                  <TouchableOpacity
                    onPress={() => {
                      setIsEditing(false);
                      setFirstName(user.firstName || '');
                      setLastName(user.lastName || '');
                    }}
                    className='flex-1 bg-slate-700 py-3 rounded-xl'
                    disabled={loading}
                  >
                    <Text className='text-white font-semibold text-center'>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleUpdate}
                    className='flex-1 bg-violet-600 py-3 rounded-xl'
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <Text className='text-white font-semibold text-center'>Save</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              // View Mode
              <View className='flex-1 gap-5'>
                <Text className='text-white text-3xl font-bold text-center mb-2'>
                  {user.firstName} {user.lastName}
                </Text>
                <Text className='text-gray-400 text-center mb-6'>
                  {user.emailAddresses?.[0]?.emailAddress}
                </Text>

                {/* Edit Profile Button */}
                <TouchableOpacity
                  onPress={() => setIsEditing(true)}
                  className='bg-violet-600 py-3 rounded-xl flex-row items-center justify-center mb-6'
                >
                  <Ionicons name="pencil" size={18} color="white" />
                  <Text className='text-white font-semibold ml-2'>Edit Profile</Text>
                </TouchableOpacity>

                {/* Info Cards */}
                <View className='space-y-3 mb-6 flex gap-3'>
                  {/* User ID */}
                  <View className='bg-slate-800 rounded-xl p-4 border border-slate-700'>
                    <View className='flex-row items-center justify-between'>
                      <View className='flex-row items-center flex-1'>
                        <View className='bg-violet-600/20 rounded-full p-2 mr-3'>
                          <Ionicons name="finger-print" size={20} color="#8b5cf6" />
                        </View>
                        <View className='flex-1'>
                          <Text className='text-gray-400 text-xs mb-1'>User ID</Text>
                          <Text className='text-white font-medium' numberOfLines={1}>
                            {user.id.slice(0, 20)}...
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* Email */}
                  <View className='bg-slate-800 rounded-xl p-4 border border-slate-700'>
                    <View className='flex-row items-center'>
                      <View className='bg-blue-600/20 rounded-full p-2 mr-3'>
                        <Ionicons name="mail" size={20} color="#3b82f6" />
                      </View>
                      <View className='flex-1'>
                        <Text className='text-gray-400 text-xs mb-1'>Email</Text>
                        <Text className='text-white font-medium'>
                          {user.emailAddresses?.[0]?.emailAddress}
                        </Text>
                      </View>
                      {user.emailAddresses?.[0]?.verification?.status === 'verified' && (
                        <View className='bg-green-600/20 rounded-full px-3 py-1'>
                          <Text className='text-green-400 text-xs font-semibold'>Verified</Text>
                        </View>
                      )}
                    </View>
                  </View>

                  {/* Member Since */}
                  <View className='bg-slate-800 rounded-xl p-4 border border-slate-700'>
                    <View className='flex-row items-center'>
                      <View className='bg-purple-600/20 rounded-full p-2 mr-3'>
                        <Ionicons name="calendar" size={20} color="#a855f7" />
                      </View>
                      <View>
                        <Text className='text-gray-400 text-xs mb-1'>Member Since</Text>
                        <Text className='text-white font-medium'>
                          {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }) : 'N/A'}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Last Sign In */}
                  <View className='bg-slate-800 rounded-xl p-4 border border-slate-700'>
                    <View className='flex-row items-center'>
                      <View className='bg-amber-600/20 rounded-full p-2 mr-3'>
                        <Ionicons name="time" size={20} color="#f59e0b" />
                      </View>
                      <View>
                        <Text className='text-gray-400 text-xs mb-1'>Last Sign In</Text>
                        <Text className='text-white font-medium'>
                          {user.lastSignInAt ? new Date(user.lastSignInAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          }) : 'N/A'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Action Buttons */}
                <View className='space-y-3 flex gap-3'>
                  {/* Sign Out Button */}
                  <TouchableOpacity
                    onPress={handleSignOut}
                    className='bg-slate-700 py-4 rounded-xl flex-row items-center justify-center'
                  >
                    <Ionicons name="log-out-outline" size={20} color="white" />
                    <Text className='text-white font-semibold ml-2'>Sign Out</Text>
                  </TouchableOpacity>

                  {/* Delete Account Button */}
                  <TouchableOpacity
                    onPress={() => setShowDeleteModal(true)}
                    className='bg-red-600/10 py-4 rounded-xl flex-row items-center justify-center border border-red-600/30'
                  >
                    <Ionicons name="trash-outline" size={20} color="#dc2626" />
                    <Text className='text-red-500 font-semibold ml-2'>Delete Account</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
          }
        </View>
      </View>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={showDeleteModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View className='flex-1 justify-center items-center bg-black/70 px-6'>
          <View className='bg-[#1e293b] rounded-3xl p-6 w-full max-w-sm border border-red-600/30'>
            <View className='items-center mb-4'>
              <View className='bg-red-600/20 rounded-full p-4 mb-3'>
                <Ionicons name="warning" size={40} color="#dc2626" />
              </View>
              <Text className='text-white text-2xl font-bold mb-2'>Delete Account?</Text>
              <Text className='text-gray-400 text-center'>
                This action cannot be undone. All your data will be permanently deleted.
              </Text>
            </View>

            <View className='flex-row gap-3 mt-4'>
              <TouchableOpacity
                onPress={() => setShowDeleteModal(false)}
                className='flex-1 bg-slate-700 py-3 rounded-xl'
                disabled={loading}
              >
                <Text className='text-white font-semibold text-center'>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleDeleteAccount}
                className='flex-1 bg-red-600 py-3 rounded-xl'
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className='text-white font-semibold text-center'>Delete</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Image Options Modal */}
      <Modal
        visible={showImageOptions}
        transparent
        animationType="slide"
        onRequestClose={() => setShowImageOptions(false)}
      >
        <TouchableOpacity 
          activeOpacity={1}
          onPress={() => setShowImageOptions(false)}
          className='flex-1 justify-end bg-black/50'
        >
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
            <View className='bg-[#1e293b] rounded-t-3xl p-6 border-t border-slate-700'>
              <View className='w-12 h-1 bg-slate-600 rounded-full self-center mb-6' />
              
              <Text className='text-white text-xl font-bold mb-4'>Profile Picture</Text>
              
              <View className='space-y-3 flex gap-3'>
                {/* Take Photo */}
                <TouchableOpacity
                  onPress={handleCamera}
                  className='bg-slate-800 py-4 rounded-xl flex-row items-center px-4 border border-slate-700'
                >
                  <View className='bg-blue-600/20 rounded-full p-2 mr-3'>
                    <Ionicons name="camera" size={24} color="#3b82f6" />
                  </View>
                  <Text className='text-white font-semibold text-lg'>Take Photo</Text>
                </TouchableOpacity>

                {/* Choose from Library */}
                <TouchableOpacity
                  onPress={handleImagePicker}
                  className='bg-slate-800 py-4 rounded-xl flex-row items-center px-4 border border-slate-700'
                >
                  <View className='bg-purple-600/20 rounded-full p-2 mr-3'>
                    <Ionicons name="images" size={24} color="#a855f7" />
                  </View>
                  <Text className='text-white font-semibold text-lg'>Choose from Library</Text>
                </TouchableOpacity>

                {/* Delete Photo (only show if user has a profile image) */}
                {user?.imageUrl && (
                  <TouchableOpacity
                    onPress={handleDeleteProfileImage}
                    className='bg-red-600/10 py-4 rounded-xl flex-row items-center px-4 border border-red-600/30'
                  >
                    <View className='bg-red-600/20 rounded-full p-2 mr-3'>
                      <Ionicons name="trash" size={24} color="#dc2626" />
                    </View>
                    <Text className='text-red-500 font-semibold text-lg'>Delete Photo</Text>
                  </TouchableOpacity>
                )}

                {/* Cancel */}
                <TouchableOpacity
                  onPress={() => setShowImageOptions(false)}
                  className='bg-slate-700 py-4 rounded-xl mt-2'
                >
                  <Text className='text-white font-semibold text-center text-lg'>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

    </ScrollView>
  );
};

export default ProfileDetails;