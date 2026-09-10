import 'dart00:json'; // jsonDecode සඳහා
import 'package:http/http.dart' as http;

class ApiService {
  // emulator එක සඳහා 10.0.2.2 ( physical phone එකක් නම් ඔබේ IP එක )
  static const String baseUrl = 'http://10.0.2.2:5000/api';

  static Future<List<dynamic>> fetchDeliveries() async {
    final response = await http.get(Uri.parse('$baseUrl/deliveries'));

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Data load කරගැනීමට නොහැකි විය');
    }
  }
}