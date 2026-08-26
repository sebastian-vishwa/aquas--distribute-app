import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF0040A1),
        title: const Text('Driver Profile', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16.0),
        children: [
          const Center(
            child: Column(
              children: [
                CircleAvatar(radius: 40, backgroundColor: Color(0xFF0040A1), child: Icon(Icons.person, size: 50, color: Colors.white)),
                SizedBox(height: 8),
                Text('Marcus Chen', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                Text('Senior Fleet Driver • ID: AC-8472', style: TextStyle(color: Colors.grey, fontSize: 12)),
              ],
            ),
          ),
          const SizedBox(height: 20),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  Text('Assigned Vehicle', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF0040A1))),
                  SizedBox(height: 8),
                  Text('Unit: Truck #402'),
                  Text('Status: Active', style: TextStyle(color: Colors.green)),
                ],
              ),
            ),
          ),
          const SizedBox(height: 12),
          Card(
            child: Column(
              children: [
                SwitchListTile(title: const Text('Push Notifications'), value: true, onChanged: (v) {}),
                SwitchListTile(title: const Text('Dark Mode'), value: false, onChanged: (v) {}),
                const ListTile(leading: Icon(Icons.lock_outline), title: Text('Security & PIN'), trailing: Icon(Icons.chevron_right)),
                const ListTile(leading: Icon(Icons.logout, color: Colors.red), title: Text('Log Out', style: TextStyle(color: Colors.red))),
              ],
            ),
          )
        ],
      ),
    );
  }
}