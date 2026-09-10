import 'package:flutter/material.dart';
import 'screens/login_screen.dart';

void main() {
  runApp(const AquasApp());
}

class AquasApp extends StatelessWidget {
  const AquasApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Aquas Logistics',
      theme: ThemeData(
        primaryColor: const Color(0xFF0040A1),
        useMaterial3: true,
      ),
      home: const LoginScreen(),
    );
  }
}