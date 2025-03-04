import Image from "next/image"
const movies = [
    {
        title: "Inception",
        image: "/image/movies/inception.jpg",
        description: "A mind-bending thriller by Christopher Nolan."
    },
    {
        title: "Interstellar",
        image: "/image/movies/interstellar.jpg",
        description: "A journey beyond the stars with stunning visuals.",
    },
    {
        title: "The Dark Knight",
        image: "/image/movies/theDarkKnight.jpg",
        description: "A masterpiece redefining superhero cinema.",
    },
    {
        title: "Shawshank Redemption",
        image: "/image/movies/showshankRedemption.jpg",
        description: "A mind-bending thriller , based on true history."
    },
]
export default function UpNext() {
    return (<>
        <div className="py-10 px-6 bg-gray-100">
            <h2 className="text-3xl font-semibold text-[#FF6347] mb-6">🎬 Up Next</h2>
            <div className="grid md:grid-cols-4 gap-6">
                {movies.map((movie, index) => (
                    <div key={index} className="bg-white shadow-lg overflow-hidden transition transform hover:scale-105 cursor-pointer">
                        <Image src={movie.image} alt={movie.title} width={400} height={250} className="w-full h-56 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-gray-800">{movie.title}</h3>
                            <p className="text-gray-600 mt-2">{movie.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>)
}