export function Partners() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-2xl font-bold text-center mb-12">Trusted by industry leaders</h2>
      <div className="grid grid-cols-6 gap-8 items-center opacity-60">
        {/* Remplacez par les vrais logos des partenaires */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-12 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  )
}

