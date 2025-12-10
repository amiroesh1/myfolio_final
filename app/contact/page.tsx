export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-20 bg-gray-50">
      <h1 className="text-5xl font-extrabold text-[#1E293B] mb-8 text-center">Contact Us</h1>
      <p className="text-[#475569] max-w-2xl text-center mx-auto text-lg leading-relaxed">
        Reach out to us for support, partnerships, or feedback.
      </p>
      <div className="mt-12 bg-white p-10 rounded-xl shadow-2xl max-w-xl mx-auto space-y-4 text-center">
        <div className="text-[#475569] text-lg">
          <strong>Email:</strong>{' '}
          <a href="mailto:amir.mirmanov11@gmail.com" className="text-blue-600 underline hover:text-blue-800">
            amir.mirmanov11@gmail.com
          </a>
        </div>
        <div className="pt-4 text-[#475569] text-lg font-semibold">Telegram</div>
        <div className="space-y-2">
          <a
            href="https://t.me/myfoliokz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 block"
          >
            @myfoliokz
          </a>
          <a
            href="https://t.me/amiroesh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 block"
          >
            @amiroesh
          </a>
        </div>
      </div>
    </div>
  )
}
