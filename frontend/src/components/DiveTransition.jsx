export default function DiveTransition({ active }) {
  return (
    <div
      className={`fixed inset-0 pointer-events-none transition-all duration-1000
        ${active ? "opacity-100 scale-110 blur-md" : "opacity-0 scale-100 blur-0"}
        bg-black`}
      style={{ zIndex: 9999 }}
    />
  )
}
