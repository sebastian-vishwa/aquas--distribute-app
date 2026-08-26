import 'package:flutter/material.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF0040A1),
        elevation: 0,
        title: const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Driver Console', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 18)),
            Text('Aquas Logistics', style: TextStyle(color: Colors.white70, fontSize: 12)),
          ],
        ),
        leading: IconButton(icon: const Icon(Icons.menu, color: Colors.white), onPressed: () {}),
        actions: [IconButton(icon: const Icon(Icons.map, color: Colors.white), onPressed: () {})],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            // Today's Route Card
            Card(
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Today's Route", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF0040A1))),
                            Text("Route ID: #AQ-8492", style: TextStyle(color: Colors.grey, fontSize: 12)),
                          ],
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                          decoration: BoxDecoration(color: Colors.blue.shade50, borderRadius: BorderRadius.circular(12)),
                          child: const Text('In Progress', style: TextStyle(color: Color(0xFF0040A1), fontSize: 11, fontWeight: FontWeight.bold)),
                        )
                      ],
                    ),
                    const SizedBox(height: 16),
                    const Row(
                      crossAxisAlignment: CrossAxisAlignment.baseline,
                      textBaseline: TextBaseline.alphabetic,
                      children: [
                        Text('4', style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold)),
                        Text(' / 12', style: TextStyle(fontSize: 20, color: Colors.grey)),
                        Spacer(),
                        Text('Stops Completed', style: TextStyle(color: Colors.grey, fontWeight: FontWeight.bold, fontSize: 12)),
                      ],
                    ),
                    const SizedBox(height: 8),
                    LinearProgressIndicator(value: 4 / 12, backgroundColor: Colors.grey.shade200, color: const Color(0xFF0040A1), minHeight: 6),
                    const SizedBox(height: 16),
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF0088ED), foregroundColor: Colors.white),
                        onPressed: () {},
                        child: const Text('Start Route', style: TextStyle(fontWeight: FontWeight.bold)),
                      ),
                    )
                  ],
                ),
              ),
            ),
            const SizedBox(height: 12),
            // Active Route Map Placeholder
            Card(
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              child: Padding(
                padding: const EdgeInsets.all(12.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('Active Route', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF0040A1))),
                        Icon(Icons.map_outlined, color: Colors.grey),
                      ],
                    ),
                    const SizedBox(height: 12),
                    Container(
                      height: 140,
                      decoration: BoxDecoration(color: Colors.blue.shade50, borderRadius: BorderRadius.circular(8)),
                      child: const Center(child: Icon(Icons.alt_route, size: 50, color: Color(0xFF0088ED))),
                    )
                  ],
                ),
              ),
            ),
            const SizedBox(height: 12),
            // Stats Row
            Row(
              children: [
                Expanded(
                  child: Card(
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        children: const [
                          Icon(Icons.bolt, color: Colors.blue, size: 28),
                          SizedBox(height: 4),
                          Text('Efficiency', style: TextStyle(color: Colors.grey, fontSize: 12)),
                          Text('94%', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Color(0xFF0040A1))),
                        ],
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Card(
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        children: const [
                          Icon(Icons.access_time, color: Colors.blue, size: 28),
                          SizedBox(height: 4),
                          Text('Next ETA', style: TextStyle(color: Colors.grey, fontSize: 12)),
                          Text('14 mins', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Color(0xFF0040A1))),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }
}