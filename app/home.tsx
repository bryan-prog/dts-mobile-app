import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, DrawerLayoutAndroid, Image, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';  
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width: screenWidth } = Dimensions.get('window');  

export default function Dashboard() {
  const router = useRouter();
  const [drawer, setDrawer] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('authToken');
      console.log('Logout token:', token);

      if (token) {
        const response = await axios.post('http://dts.sanjuancity.gov.ph/api/logout', {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Response status', response.status); 
        console.log('Response headers', response.config.headers);
    

     
        await AsyncStorage.removeItem('authToken');
        
   
        router.replace('/');
      } else {
        Alert.alert('Error', 'No authentication token found.');
      }
    } catch (error) {
      console.log('Logout error:', error);
      if (error.response) {
        console.log('API error:', error.response.data);
        Alert.alert('Logout Failed', error.response.data.message || 'An error occurred during logout.');
      } else {
        Alert.alert('Logout Failed', 'An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  const navigationView = () => (
    <View style={styles.sidebar}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/DTS.png')} 
          style={styles.logoImage}
        />
      </View>
    
      <View style={styles.menuItems}>
        <TouchableOpacity style={styles.menuItem}>
          <MaterialCommunityIcons name="view-dashboard" size={20} color="#000080" />
          <Text style={styles.menuText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <MaterialCommunityIcons name="folder" size={20} color="#228B22" />
          <Text style={styles.menuText}>Documents</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <MaterialCommunityIcons name="calendar-clock" size={20} color="#FF4500" />
          <Text style={styles.menuText}>Pending for Release</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <MaterialCommunityIcons name="inbox-arrow-down" size={20} color="#B22222" />
          <Text style={styles.menuText}>Incoming Documents</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <MaterialCommunityIcons name="check-box-outline" size={20} color="#FF8C00" />
          <Text style={styles.menuText}>Tagged as Terminal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <MaterialCommunityIcons name="account-multiple-plus" size={20} color="#1E90FF" />
          <Text style={styles.menuText}>List / Register User</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <MaterialCommunityIcons name="qrcode" size={20} color="#FF6347" />
          <Text style={styles.menuText}>QR Manager</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <>
            <MaterialCommunityIcons name="logout" size={20} color="white" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={(drawer) => setDrawer(drawer)}
      drawerWidth={250}
      drawerPosition="left"
      renderNavigationView={navigationView}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => drawer.openDrawer()}>
            <MaterialCommunityIcons name="menu" size={36} color="white" />
          </TouchableOpacity>

          <View style={styles.navbarImages}>
            <Image
              source={require("../assets/images/bagong-pilipinas.png")}
              style={styles.navbarImage}
            />
            <Image
              source={require("../assets/images/sjc.png")}
              style={styles.navbarImage}
            />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>RELEASED</Text>
              <Text style={styles.cardCount}>14</Text>
              <Text style={styles.cardSubtitle}>Last Updated</Text>
            </View>
            <LinearGradient
              colors={["#FF7E5F", "#FD3A4A"]}
              style={styles.iconBackground}
            >
              <MaterialCommunityIcons name="folder" size={40} color="white" />
            </LinearGradient>
          </View>

          <View style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>FOR RELEASE</Text>
              <Text style={styles.cardCount}>1</Text>
              <Text style={styles.cardSubtitle}>Last Updated</Text>
            </View>
            <LinearGradient
              colors={["#FFB74D", "#FFA726"]}
              style={styles.iconBackground}
            >
              <MaterialCommunityIcons
                name="cloud-upload"
                size={40}
                color="white"
              />
            </LinearGradient>
          </View>

          <View style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>INCOMING</Text>
              <Text style={styles.cardCount}>7</Text>
              <Text style={styles.cardSubtitle}>Last Updated</Text>
            </View>
            <LinearGradient
              colors={["#66BB6A", "#43A047"]}
              style={styles.iconBackground}
            >
              <MaterialCommunityIcons
                name="inbox-arrow-down"
                size={40}
                color="white"
              />
            </LinearGradient>
          </View>

          <View style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>RECEIVED</Text>
              <Text style={styles.cardCount}>15</Text>
              <Text style={styles.cardSubtitle}>Last Updated</Text>
            </View>
            <LinearGradient
              colors={["#42A5F5", "#1E88E5"]}
              style={styles.iconBackground}
            >
              <MaterialCommunityIcons name="inbox" size={40} color="white" />
            </LinearGradient>
          </View>
          <View style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>TERMINAL</Text>
              <Text style={styles.cardCount}>6</Text>
              <Text style={styles.cardSubtitle}>Last Updated</Text>
            </View>
        
          <LinearGradient
            colors={["#AA4465", "#923CB5"]}
            style={styles.iconBackground}
          >
            <MaterialCommunityIcons
              name="check-bold"
              size={40}
              color="white"
            />
          </LinearGradient>
          </View>
        </ScrollView>
      </View>
    </DrawerLayoutAndroid>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  navbarImages: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navbarImage: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  scrollViewContent: {
    width: '100%',
    padding: 10,
    backgroundColor: '#F5F5F5',
    flexGrow: 1,
  },
  sidebar: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2E3B55',
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 150, 
    height: 50,
    resizeMode: 'contain',
  },
  menuItems: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: '#D9534F',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    marginBottom: 20,
    elevation: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#D3D3D3',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardCount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  iconBackground: {
    width: 80, 
    height: 80,
    borderRadius: 40, 
    justifyContent: 'center',
    alignItems: 'center',
  },
});
