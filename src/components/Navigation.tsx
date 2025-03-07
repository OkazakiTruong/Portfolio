/* eslint-disable @typescript-eslint/no-explicit-any */

export default function Navigation({handleNavClick,sections,activeSection}:any) {
  return (
    <nav className='fixed border-white text-white flex gap-2 py-3 px-6 border rounded-3xl bottom-3 left-[50%] translate-[-50%]'>
        {sections.map((id:any) => (
          <button
            key={id}
            onClick={() => handleNavClick(id)}
            className={`px-4 py-2 rounded ${
              activeSection === id ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </button>
        ))}
    </nav>
  )
}
