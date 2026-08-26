import 'package:flutter/material.dart';

class DeliveriesScreen extends StatelessWidget {
  const DeliveriesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF0040A1),
        title: const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('North District', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 18)),
            Text('Route Progress', style: TextStyle(color: Colors.white70, fontSize: 12)),
          ],
        ),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(30),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: const [
                Text('4/12 Stops', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                Text('33% Complete', style: TextStyle(color: Colors.white70, fontSize: 12)),
              ],
            ),
          ),
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16.0),
        children: [
          const Text('CURRENT STOP', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.grey, fontSize: 12)),
          const SizedBox(height: 8),
          Card(
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      CircleAvatar(backgroundColor: const Color(0xFF0040A1), child: const Text('5', style: TextStyle(color: Colors.white))),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: const [
                            Text('TechNova Logistics', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF0040A1))),
                            Text('📍 892 Silicon Way, Suite 400', style: TextStyle(color: Colors.grey, fontSize: 12)),
                          ],
                        ),
                      ),
                      IconButton(icon: const Icon(Icons.phone, color: Colors.blue), onPressed: () {}),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(color: Colors.blue.shade50, borderRadius: BorderRadius.circular(8)),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: const [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('5-Gallon Purified Water', style: TextStyle(fontWeight: FontWeight.bold)),
                            Text('Standard Dispenser Jars', style: TextStyle(fontSize: 11, color: Colors.grey)),
                          ],
                        ),
                        Text('10x', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Color(0xFF0040A1))),
                      ],
                    ),
                  ),
                  const SizedBox(height: 12),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF0088ED), foregroundColor: Colors.white),
                      onPressed: () {},
                      icon: const Icon(Icons.check_circle_outline),
                      label: const Text('Mark Delivered'),
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
          const Text('UPCOMING SEQUENCE', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.grey, fontSize: 12)),
          const SizedBox(height: 8),
          _buildUpcomingItem('6', 'Apex Manufacturing', '1200 Industrial Blvd', '5 Jars', 'Est. 10:45 AM'),
          _buildUpcomingItem('7', 'Blue Horizon Corp', '450 Ocean View Dr, Fl 2', '12 Jars', 'Est. 11:20 AM'),
        ],
      ),
    );
  }

  Widget _buildUpcomingItem(String num, String title, String sub, String jars, String time) {
    return Card(
      child: ListTile(
        leading: CircleAvatar(backgroundColor: Colors.grey.shade200, child: Text(num, style: const TextStyle(color: Colors.black))),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
        subtitle: Text(sub, style: const TextStyle(fontSize: 12)),
        trailing: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Text(time, style: const TextStyle(fontSize: 10, color: Colors.grey)),
            Text(jars, style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF0040A1))),
          ],
        ),
      ),
    );
  }
}