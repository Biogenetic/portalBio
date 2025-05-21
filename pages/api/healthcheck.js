export default function handler(req, res) {
  res.status(200).json({
    status: "Healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
}
