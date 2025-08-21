# 📹 Real-Time Video Capture & Inference Overlay

This project demonstrates a browser-based real-time video streaming and inference overlay system using WebRTC technology.

## 🚀 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourname/webRTC.git
   cd webRTC
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   node server.js
   ```

4. **Access the application**
   - On your phone: Open `http://localhost:3000/phone.html` to use the phone camera
   - On your computer: Open `http://localhost:3000/viewer.html` to see the live feed from the phone with boundaries and predictions

> **Note:** Ensure your phone and computer are on the same network for the connection to work properly.

## 📱 How It Works

This application uses WebRTC to establish a peer-to-peer connection between your phone and computer:

1. The phone camera captures video frames
2. The frames are streamed directly to the viewer
3. The viewer displays the video with overlaid boundaries and predictions

## 🔧 Modes

### Server Mode

Run `node server.js`

- Phone → sends video frames to Node.js server
- Server → relays the video stream
- Viewer → overlays results

## 📂 Repo Structure

```
.
├── server.js           # Node.js WebSocket relay server
├── public/             # Frontend files
│   ├── viewer.html     # Viewer (video + overlay)
│   └── phone.html      # Phone capture client
├── package.json        # Project dependencies
└── README.md           # You are here
```

## ⚡ Features

- Real-time video streaming from phone to computer
- Object detection with bounding box overlay
- Low-latency communication using WebRTC

## ✅ Requirements

- Node.js
- Modern browser (Chrome/Edge/Firefox/Safari)
- Phone and computer on the same network