export default function Docs() {
  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">API Documentation</h2>
      <ul className="list-disc ml-6 text-gray-300">
        <li>POST /api/auth/login</li>
        <li>GET /api/auth/me</li>
        <li>GET /api/external/quote</li>
      </ul>
    </div>
  );
}
