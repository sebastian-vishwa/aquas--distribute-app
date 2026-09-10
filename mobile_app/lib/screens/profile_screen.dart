import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  final String name;
  final String email;
  final String driverId;

  const ProfileScreen({
    super.key,
    this.name = "Driver",
    this.email = "",
    this.driverId = "",
  });

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
          Center(
            child: Column(
              children: [
                const CircleAvatar(
                  radius: 40,
                  backgroundColor: Color(0xFF0040A1),
                  child: Icon(Icons.person, size: 50, color: Colors.white),
                ),
                const SizedBox(height: 12),
                Text(name, style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
                const SizedBox(height: 4),
                Text('Senior Fleet Driver • ID: $driverId', style: const TextStyle(color: Colors.grey, fontSize: 14)),
              ],
            ),
          ),
          const SizedBox(height: 20),
          Card(
            elevation: 2,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Account Information', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF0040A1))),
                  const Divider(height: 20),
                  ListTile(
                    dense: true,
                    contentPadding: EdgeInsets.zero,
                    leading: const Icon(Icons.email_outlined, color: Color(0xFF0040A1)),
                    title: const Text('Email Address'),
                    subtitle: Text(email, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.black87)),
                  ),
                  ListTile(
                    dense: true,
                    contentPadding: EdgeInsets.zero,
                    leading: const Icon(Icons.badge_outlined, color: Color(0xFF0040A1)),
                    title: const Text('Driver ID'),
                    subtitle: Text(driverId, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.black87)),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 12),
          Card(
            elevation: 2,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            child: const Padding(
              padding: EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Assigned Vehicle', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF0040A1))),
                  SizedBox(height: 8),
                  Text('Unit: Truck #402'),
                  SizedBox(height: 4),
                  Text('Status: Active', style: TextStyle(color: Colors.green, fontWeight: FontWeight.bold)),
                ],
              ),
            ),
          ),
          const SizedBox(height: 12),
          Card(
            elevation: 2,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            child: Column(
              children: [
                SwitchListTile(title: const Text('Push Notifications'), value: true, onChanged: (v) {}),
                SwitchListTile(title: const Text('Dark Mode'), value: false, onChanged: (v) {}),
                const ListTile(leading: Icon(Icons.lock_outline), title: Text('Security & PIN'), trailing: Icon(Icons.chevron_right)),
                ListTile(
                  leading: const Icon(Icons.logout, color: Colors.red),
                  title: const Text('Log Out', style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold)),
                  onTap: () {
                    Navigator.pop(context);
                  },
                ),
              ],
            ),
          )
        ],
      ),
    );
  }
}