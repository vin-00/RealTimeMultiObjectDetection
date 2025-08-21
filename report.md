# Overview

This prototype demonstrates a lightweight browser-based video capture and inference overlay system.

Phone (capture side): Uses getUserMedia to stream camera frames over WebRTC/WebSocket.

Viewer (display side): Receives video and inference metadata, aligns frames via frame_id and capture_ts, and overlays normalized bounding boxes.

Server (optional): Acts as relay (server-mode) or can be bypassed in WASM-only mode (wasm-mode).

This design allows flexible deployment in resource-constrained environments (mobile devices, browsers) without heavy native dependencies.

# Design Choices

Normalized Coordinates [0–1]
Bounding box coordinates are normalized, making overlays resolution-agnostic. This ensures consistent rendering across devices with different aspect ratios and resolutions.

Timestamp-based Synchronization
Each frame is tagged with:

frame_id (incremental ID for ordering)

capture_ts (when the phone camera captured it)

recv_ts (when the viewer received it)

inference_ts (when inference completed, if applicable)

These values allow the browser to align metadata with frames and compute end-to-end latency.

# Overlay on Canvas Layer
Instead of modifying the video directly, bounding boxes are drawn on a <canvas> stacked on top of the <video>. This keeps the video rendering fast while allowing dynamic overlay updates.

# Low-Resource Mode

WASM-only mode: Inference runs locally in the browser (WebAssembly). This reduces dependency on a server and avoids network latency, at the cost of higher CPU usage on the device.

Server mode: The phone only sends frames, and inference runs on a more powerful backend. This saves battery and CPU on the mobile device but requires network bandwidth.

The system can switch between these modes based on device capabilities or connectivity.

# Backpressure Policy

Mobile devices and browsers cannot always sustain full-frame transmission under poor networks. To handle this:

Frame Skipping: If the send buffer is congested, older frames are dropped (only the latest frame is kept). This prioritizes freshness over completeness.

Adaptive FPS: The sender dynamically reduces frame capture rate (e.g., from 30fps → 10fps) when network throughput is low.

Lightweight Metadata: Only minimal JSON per frame (labels, scores, normalized coords) is sent, avoiding large payloads.

This ensures smooth real-time interaction even in constrained environments.
