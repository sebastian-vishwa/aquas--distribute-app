import 'package:flutter/material.dart';

class InventoryScreen extends StatelessWidget {
  const InventoryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF0040A1),
        title: const Text('Truck Inventory', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
        actions: [IconButton(icon: const Icon(Icons.notifications_none, color: Colors.white), onPressed: () {})],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16.0),
        children: [
          TextField(
            decoration: InputDecoration(
              hintText: 'Search inventory...',
              prefixIcon: const Icon(Icons.search),
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
              filled: true,
              fillColor: Colors.white,
            ),
          ),
          const SizedBox(height: 16),
          _buildInventoryCard('5-Gallon Purified', 'SKU: AP-5G-PUR', '124', 'In Stock', Colors.blue.shade50, Colors.blue),
          _buildInventoryCard('Hand Pumps', 'SKU: AP-HP-STD', '12', 'Low Stock', Colors.red.shade50, Colors.red),
          _buildInventoryCard('16.9oz Bottles (Case)', 'SKU: AP-16OZ-CS24', '45', 'In Stock', Colors.blue.shade50, Colors.blue),
        ],
      ),
    );
  }

  Widget _buildInventoryCard(String name, String sku, String qty, String status, Color statusBg, Color statusColor) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(name, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(color: statusBg, borderRadius: BorderRadius.circular(8)),
                  child: Text(status, style: TextStyle(color: statusColor, fontSize: 10, fontWeight: FontWeight.bold)),
                )
              ],
            ),
            Text(sku, style: const TextStyle(color: Colors.grey, fontSize: 12)),
            const SizedBox(height: 12),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(qty, style: const TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: Color(0xFF0040A1))),
                TextButton(onPressed: () {}, child: const Text('Update')),
              ],
            )
          ],
        ),
      ),
    );
  }
}