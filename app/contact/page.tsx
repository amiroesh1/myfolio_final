export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-20 bg-gray-50">
      <h1 className="text-5xl font-extrabold text-[#1E293B] mb-8 text-center">Contact Us</h1>
      <p className="text-[#475569] max-w-2xl text-center mx-auto text-lg leading-relaxed">
        Reach out to us for support, inquiries, or to stay connected through our social channels.
      </p>
      <div className="mt-12 bg-white p-10 rounded-xl shadow-2xl max-w-xl mx-auto">
        <p className="text-[#475569] text-lg mb-6 text-center">
          <strong>Email us at:</strong> <a href="mailto:sunkarulyansar@gmail.com" className="text-blue-600 underline hover:text-blue-800">sunkarulyansar@gmail.com</a>
        </p>
        <p className="text-[#475569] text-lg mb-6 text-center">
          <strong>Follow us on:</strong>
        </p>
        <ul className="list-none space-y-4 text-center">
          <li>
            <a href="https://instagram.com/sun_ansarito" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">
              Instagram (sun_ansarito)
            </a>
          </li>
          <li>
            <a href="https://instagram.com/amiroesh" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">
              Instagram (amiroesh)
            </a>
          </li>
          <li>
            <a href="https://t.me/sun_ansarito" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">
              Telegram
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
