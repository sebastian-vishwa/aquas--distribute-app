import 'package:flutter/material.dart';

class DeliveriesScreen extends StatelessWidget {
  final String name;
  final String driverId;

  const DeliveriesScreen({
    super.key,
    this.name = "Driver",
    this.driverId = "",
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF0040A1),
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Dhananjana ($driverId)', style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 18)),
            const Text('North District Route', style: TextStyle(color: Colors.white70, fontSize: 12)),
          ],
        ),
        bottom: const PreferredSize(
          preferredSize: Size.fromHeight(30),
          child: Padding(
            padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
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
                      const CircleAvatar(backgroundColor: Color(0xFF0040A1), child: Text('5', style: TextStyle(color: Colors.white))),
                      const SizedBox(width: 12),
                      const Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('TechNova Logistics', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF0040A1))),
                            Text('📍 kandy RD , Kadawatha ', style: TextStyle(color: Colors.grey, fontSize: 12)),
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
                    child: const Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
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
          const Text('UPCOMING Shops', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.grey, fontSize: 12)),
          const SizedBox(height: 8),
          _buildUpcomingItem('6', 'Apex Manufacturing', '112 High Level Rd, Maharagama', '5 Jars', 'Est. 10:45 AM'),
          _buildUpcomingItem('7', 'Blue Horizon Corp', '45 Pannipitiya Rd, Kottawa', '12 Jars', 'Est. 11:20 AM'),
          _buildUpcomingItem('8', 'Crestview Enterprises', '75 Dehiwala Rd, Maharagama', '8 Jars', 'Est. 11:50 AM'),
          _buildUpcomingItem('9', 'Evergreen Traders', '22 Rukmalgama Rd, Kottawa', '15 Jars', 'Est. 12:30 PM'),
          _buildUpcomingItem('10', 'Sunrise Cafe', '18 Navinna, Maharagama', '3 Jars', 'Est. 01:15 PM'),
          _buildUpcomingItem('11', 'Lanka Spice Ltd', '88 Makumbura, Kottawa', '20 Jars', 'Est. 02:00 PM'),
          _buildUpcomingItem('12', 'Pamunuwa Textiles', '50 Pamunuwa Rd, Maharagama', '10 Jars', 'Est. 02:45 PM'),
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