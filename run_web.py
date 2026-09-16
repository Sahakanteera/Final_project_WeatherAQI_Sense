"""
WeatherAQI Sense - Local Web Dashboard Server
Runs a lightweight HTTP server and opens the dashboard in the default browser.
"""

import http.server
import socketserver
import webbrowser
import os
import sys
import threading
import time

PORT = 8000

class CustomHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS and disable aggressive caching for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def log_message(self, format, *args):
        # Clean logging
        sys.stdout.write(f"[Web Dashboard] {self.address_string()} - {format % args}\n")

def open_browser(url: str):
    time.sleep(0.8)
    print(f"\n🌐 Opening browser at: {url}")
    webbrowser.open(url)

def start_server(port: int = PORT):
    # Set current directory to project root
    project_root = os.path.dirname(os.path.abspath(__file__))
    os.chdir(project_root)

    url = f"http://localhost:{port}"

    try:
        with socketserver.TCPServer(("", port), CustomHTTPHandler) as httpd:
            print("=" * 65)
            print("   🌍 WEATHERAQI SENSE - WEB DASHBOARD SERVER")
            print(f"   Dashboard URL : {url}")
            print(f"   Project Root  : {project_root}")
            print("=" * 65)
            print(f"🚀 Server is running. Press Ctrl+C to stop.\n")

            # Launch browser in a background thread
            threading.Thread(target=open_browser, args=(url,), daemon=True).start()

            httpd.serve_forever()
    except OSError as e:
        if "address already in use" in str(e).lower() or getattr(e, 'winerror', None) == 10048:
            print(f"⚠️ Port {port} is already in use (server might already be running).")
            print(f"🌐 Opening existing dashboard at: {url}")
            webbrowser.open(url)
        else:
            raise e

if __name__ == "__main__":
    try:
        start_server()
    except KeyboardInterrupt:
        print("\n\n🛑 Web server stopped. Goodbye!\n")
