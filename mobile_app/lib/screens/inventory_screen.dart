import 'package:flutter/material.dart';

class InventoryScreen extends StatelessWidget {
  final String driverId;

  const InventoryScreen({
    super.key,
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
            const Text('Truck Inventory', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 18)),
            Text('Vehicle Unit #402 • Driver ID: $driverId', style: const TextStyle(color: Colors.white70, fontSize: 12)),
          ],
        ),
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
          _buildInventoryCard('500ml Water Bottle', 'SKU: AP-500ML', '150', 'In Stock', Colors.blue.shade50, Colors.blue),
          _buildInventoryCard('1L Water Bottle', 'SKU: AP-1L', '85', 'In Stock', Colors.blue.shade50, Colors.blue),
          _buildInventoryCard('1.5L Water Bottle', 'SKU: AP-15L', '15', 'Low Stock', Colors.red.shade50, Colors.red),
          _buildInventoryCard('5L Water Bottle', 'SKU: AP-5L', '40', 'In Stock', Colors.blue.shade50, Colors.blue),
          _buildInventoryCard('20L Water Jar', 'SKU: AP-20L', '120', 'In Stock', Colors.blue.shade50, Colors.blue),
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