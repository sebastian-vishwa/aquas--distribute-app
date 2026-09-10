import 'package:flutter/material.dart';
import 'dashboard_screen.dart';
import 'deliveries_screen.dart';
import 'inventory_screen.dart';
import 'profile_screen.dart';

class MainNavigationScreen extends StatefulWidget {
  final String name;
  final String email;
  final String driverId;

  const MainNavigationScreen({
    super.key,
    this.name = "Marcus Chen",
    this.email = "marcus.chen@aquas.com",
    this.driverId = "AC-8472",
  });

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    final List<Widget> pages = [
      DashboardScreen(
        name: widget.name,
        email: widget.email,
        driverId: widget.driverId,
      ),
      DeliveriesScreen(
        name: widget.name,
        driverId: widget.driverId,
      ),
      InventoryScreen(
        driverId: widget.driverId,
      ),
      ProfileScreen(
        name: widget.name,
        email: widget.email,
        driverId: widget.driverId,
      ),
    ];

    return Scaffold(
      body: pages[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) => setState(() => _currentIndex = index),
        type: BottomNavigationBarType.fixed,
        selectedItemColor: const Color(0xFF0040A1),
        unselectedItemColor: Colors.grey,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.dashboard),
            label: 'Dashboard',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.local_shipping),
            label: 'Deliveries',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.inventory),
            label: 'Inventory',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
}