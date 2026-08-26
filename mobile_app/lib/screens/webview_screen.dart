import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class WebDashboardScreen extends StatefulWidget {
  final String title;
  final String webUrl;

  const WebDashboardScreen({
    super.key,
    required this.title,
    required this.webUrl,
  });

  @override
  State<WebDashboardScreen> createState() => _WebDashboardScreenState();
}

class _WebDashboardScreenState extends State<WebDashboardScreen> {
  late final WebViewController _controller;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();

    // 1. Controller එක initialize කර URL එක Load කිරීම
    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted) // React App එක වැඩ කිරීමට JavaScript අවශ්‍යයි
      ..setBackgroundColor(const Color(0x00000000))
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageStarted: (String url) {
            setState(() {
              _isLoading = true; // Page එක load වෙන්න පටන් ගනිද්දී Loading spinner එක පෙන්වයි
            });
          },
          onPageFinished: (String url) {
            setState(() {
              _isLoading = false; // Page එක load වී අවසන් වූ පසු Loading spinner එක අයින් කරයි
            });
          },
          onWebResourceError: (WebResourceError error) {
            debugPrint('Page error: ${error.description}');
          },
        ),
      )
      ..loadRequest(Uri.parse(widget.webUrl));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title, style: const TextStyle(color: Colors.white)),
        backgroundColor: const Color(0xFF0040A1),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: Stack(
        children: [
          // Web page එක පෙන්වන ස්ථානය
          WebViewWidget(controller: _controller),

          // Page එක load වෙන තෙක් පෙන්වන Loading Indicator එක
          if (_isLoading)
            const Center(
              child: CircularProgressIndicator(),
            ),
        ],
      ),
    );
  }
}