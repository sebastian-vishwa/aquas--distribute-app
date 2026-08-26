import 'package:flutter/material.dart';
import 'package:in_app_update/in_app_update.dart'; // In-App Update package එක
import 'screens/login_screen.dart';
import 'screens/dashboard_screen.dart';
import 'screens/deliveries_screen.dart';
import 'screens/inventory_screen.dart';
import 'screens/profile_screen.dart';

void main() {
  runApp(const AquasDriverApp());
}

// Update check කිරීම සඳහා මෙය StatefulWidget එකක් බවට පත් කර ඇත
class AquasDriverApp extends StatefulWidget {
  const AquasDriverApp({super.key});

  @override
  State<AquasDriverApp> createState() => _AquasDriverAppState();
}

class _AquasDriverAppState extends State<AquasDriverApp> {

  @override
  void initState() {
    super.initState();
    // App එක විවෘත වන විටම Play Store Updates තිබේදැයි පරීක්ෂා කිරීම
    _checkForUpdate();
  }

  // Play Store In-App Update Check කරන Function එක
  Future<void> _checkForUpdate() async {
    try {
      AppUpdateInfo updateInfo = await InAppUpdate.checkForUpdate();

      if (updateInfo.updateAvailability == UpdateAvailability.updateAvailable) {
        // App එක Update කරනකම් පාවිච්චි කරන්න බැරි වෙන්න Immediate Update එකක් දීම
        await InAppUpdate.performImmediateUpdate();
      }
    } catch (e) {
      debugPrint("Update Check Failed: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Aquas Driver Console',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
        scaffoldBackgroundColor: const Color(0xFFF8FAFC),
      ),
      home: const LoginScreen(),
    );
  }
}

class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({super.key});

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _selectedIndex = 0;

  final List<Widget> _screens = const [
    DashboardScreen(),
    DeliveriesScreen(),
    InventoryScreen(),
    ProfileScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _selectedIndex,
        children: _screens,
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        onTap: (index) {
          setState(() {
            _selectedIndex = index;
          });
        },
        type: BottomNavigationBarType.fixed,
        selectedItemColor: const Color(0xFF0052B4),
        unselectedItemColor: Colors.grey,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.dashboard_outlined),
            activeIcon: Icon(Icons.dashboard),
            label: 'Dashboard',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.local_shipping_outlined),
            activeIcon: Icon(Icons.local_shipping),
            label: 'Deliveries',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.inventory_2_outlined),
            activeIcon: Icon(Icons.inventory_2),
            label: 'Inventory',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person_outline),
            activeIcon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
}