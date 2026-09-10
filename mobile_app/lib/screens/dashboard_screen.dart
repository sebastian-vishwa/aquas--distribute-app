import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';

class DashboardScreen extends StatelessWidget {
  final String name;
  final String email;
  final String driverId;

  const DashboardScreen({
    super.key,
    this.name = "Driver",
    this.email = "",
    this.driverId = "",
  });

  // 📍  Shop Locations
  static const LatLng kadawathaShop = LatLng(6.9986, 79.9503);
  static const LatLng nugegodaShop = LatLng(6.8649, 79.8997);
  static const LatLng maharagamaShop = LatLng(6.8480, 79.9265);

  @override
  Widget build(BuildContext context) {
    // Optimized Route Order
    final routePoints = [
      kadawathaShop,
      nugegodaShop,
      maharagamaShop,
    ];

    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF0040A1),
        elevation: 0,
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Welcome, $name',
              style: const TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
                fontSize: 18,
              ),
            ),
            Text(
              'ID: $driverId • Aquas Logistics',
              style: const TextStyle(color: Colors.white70, fontSize: 12),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.map, color: Colors.white),
            onPressed: () {},
          )
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            // Today's Route Card
            Card(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              "Today's Route",
                              style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                                color: Color(0xFF0040A1),
                              ),
                            ),
                            Text(
                              "Driver: $name | ID: #$driverId",
                              style: const TextStyle(
                                color: Colors.grey,
                                fontSize: 12,
                              ),
                            ),
                          ],
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 10,
                            vertical: 4,
                          ),
                          decoration: BoxDecoration(
                            color: Colors.blue.shade50,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: const Text(
                            'In Progress',
                            style: TextStyle(
                              color: Color(0xFF0040A1),
                              fontSize: 11,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        )
                      ],
                    ),
                    const SizedBox(height: 16),
                    const Row(
                      crossAxisAlignment: CrossAxisAlignment.baseline,
                      textBaseline: TextBaseline.alphabetic,
                      children: [
                        Text(
                          '4',
                          style: TextStyle(
                            fontSize: 32,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Text(
                          ' / 12',
                          style: TextStyle(fontSize: 20, color: Colors.grey),
                        ),
                        Spacer(),
                        Text(
                          'Stops Completed',
                          style: TextStyle(
                            color: Colors.grey,
                            fontWeight: FontWeight.bold,
                            fontSize: 12,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    LinearProgressIndicator(
                      value: 4 / 12,
                      backgroundColor: Colors.grey.shade200,
                      color: const Color(0xFF0040A1),
                      minHeight: 6,
                    ),
                    const SizedBox(height: 16),
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF0088ED),
                          foregroundColor: Colors.white,
                        ),
                        onPressed: () {},
                        child: const Text(
                          'Start Route',
                          style: TextStyle(fontWeight: FontWeight.bold),
                        ),
                      ),
                    )
                  ],
                ),
              ),
            ),
            const SizedBox(height: 12),

            // Active Route Map Card (With Leaflet Map & Optimized Locations)
            Card(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
              child: Padding(
                padding: const EdgeInsets.all(12.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'Active Route',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Color(0xFF0040A1),
                          ),
                        ),
                        Icon(Icons.map_outlined, color: Colors.grey),
                      ],
                    ),
                    const SizedBox(height: 12),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(8),
                      child: SizedBox(
                        height: 220,
                        width: double.infinity,
                        child: FlutterMap(
                          options: const MapOptions(
                            // Center point around Colombo Suburbs
                            initialCenter: LatLng(6.9100, 79.9200),
                            initialZoom: 10.5,
                          ),
                          children: [
                            // OpenStreetMap Tile Layer
                            TileLayer(
                              urlTemplate:
                              'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                              userAgentPackageName: 'com.aquas.logistics',
                            ),
                            // Route Optimization Line Connecting
                            PolylineLayer(
                              polylines: [
                                Polyline(
                                  points: routePoints,
                                  strokeWidth: 4.0,
                                  color: const Color(0xFF0088ED),
                                ),
                              ],
                            ),
                            // Location Shop Markers
                            MarkerLayer(
                              markers: [
                                _buildShopMarker(kadawathaShop, "Kadawatha", "1"),
                                _buildShopMarker(nugegodaShop, "Nugegoda", "2"),
                                _buildShopMarker(maharagamaShop, "Maharagama", "3"),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 12),

            // Driver Performance Summary
            const Row(
              children: [
                Expanded(
                  child: Card(
                    child: Padding(
                      padding: EdgeInsets.all(16.0),
                      child: Column(
                        children: [
                          Icon(Icons.bolt, color: Colors.blue, size: 28),
                          SizedBox(height: 4),
                          Text(
                            'Efficiency',
                            style: TextStyle(color: Colors.grey, fontSize: 12),
                          ),
                          Text(
                            '94%',
                            style: TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                              color: Color(0xFF0040A1),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
                SizedBox(width: 8),
                Expanded(
                  child: Card(
                    child: Padding(
                      padding: EdgeInsets.all(16.0),
                      child: Column(
                        children: [
                          Icon(Icons.access_time, color: Colors.blue, size: 28),
                          SizedBox(height: 4),
                          Text(
                            'Next ETA',
                            style: TextStyle(color: Colors.grey, fontSize: 12),
                          ),
                          Text(
                            '14 mins',
                            style: TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                              color: Color(0xFF0040A1),
                            ),
                          ),
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

  // Custom Map Marker Widget with location labels
  Marker _buildShopMarker(LatLng point, String title, String stopNumber) {
    return Marker(
      point: point,
      width: 90,
      height: 50,
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
            decoration: BoxDecoration(
              color: const Color(0xFF0040A1),
              borderRadius: BorderRadius.circular(4),
              boxShadow: const [
                BoxShadow(color: Colors.black26, blurRadius: 2),
              ],
            ),
            child: Text(
              "$stopNumber. $title",
              style: const TextStyle(
                color: Colors.white,
                fontSize: 10,
                fontWeight: FontWeight.bold,
              ),
              overflow: TextOverflow.ellipsis,
            ),
          ),
          const Icon(
            Icons.location_on,
            color: Color(0xFFDC2626),
            size: 26,
          ),
        ],
      ),
    );
  }
}