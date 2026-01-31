import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-400">
        Discord API UAS
      </h1>

      <div className="space-x-4">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/login" className="hover:text-blue-400">Login</Link>
        <Link to="/demo" className="hover:text-blue-400">Demo</Link>
        <Link to="/docs" className="hover:text-blue-400">Docs</Link>
      </div>
    </nav>
  );
}
