📹 Real-Time Video Capture & Inference Overlay

This project demonstrates a browser-based real-time video streaming and inference overlay system.
It supports two modes:

Server Mode – phone streams frames to a Node.js backend for inference.

WASM Mode – inference runs directly in the browser (WebAssembly).

The viewer overlays bounding boxes (detections) on live video, synchronized by frame_id and timestamps (capture_ts, recv_ts, inference_ts).

🚀 Quick Start
1. Clone Repo
git clone https://github.com/yourname/realtime-overlay.git
cd realtime-overlay

2. One-Command Start (with Docker)
./start.sh server


or

./start.sh wasm


This will:

Build & start containers (docker-compose up)

Launch server (if in server mode)

Serve frontend (viewer.html, phone.html)

📱 Joining from Phone

Ensure your phone and laptop are on the same WiFi/network.

Open the viewer.html on your laptop (e.g., http://localhost:8080/viewer.html).

On the laptop viewer, a QR code / short URL will be displayed.

Scan the QR with your phone → it opens phone.html.

Phone camera starts automatically.

Frames + metadata stream to the server (or directly if in WASM mode).

🔧 Modes
Server Mode

Run ./start.sh server

Phone → sends video frames to Node.js server

Server → attaches inference_ts after running detection

Viewer → overlays results

WASM Mode

Run ./start.sh wasm

No server needed

Phone/browser runs inference locally (WebAssembly model)

Works fully offline

📂 Repo Structure
.
├── server.js           # Node.js WebSocket relay (server mode)
├── viewer.html         # Viewer (video + overlay)
├── phone.html          # Phone capture client
├── Dockerfile          # For frontend/server build
├── docker-compose.yml  # Compose setup
├── start.sh            # Convenience start script
├── README.md           # You are here
└── report.md           # Design notes, low-resource mode, backpressure

📊 Example Metadata

Each frame sends JSON like:

{
  "frame_id": "123",
  "capture_ts": 1690000000000,
  "recv_ts": 1690000000100,
  "inference_ts": 1690000000120,
  "detections": [
    { "label": "person", "score": 0.93, "xmin": 0.12, "ymin": 0.08, "xmax": 0.34, "ymax": 0.67 }
  ]
}


Coordinates are normalized [0..1]

Browser uses frame_id + capture_ts to align overlays

End-to-end latency = inference_ts - capture_ts

⚡ Backpressure Handling

Frame skipping when network is slow

Adaptive FPS (e.g., 30 → 10fps)

Minimal JSON metadata per frame

✅ Requirements

Docker & docker-compose

Modern browser (Chrome/Edge/Firefox/Safari ≥ 16)

iOS Safari users must enable camera permissions