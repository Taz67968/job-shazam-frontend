import UploadCV from "../components/UploadCv";
import "../app/globals.css"

export default function UploadPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Upload Your CV</h1>
      <UploadCV />
    </main>
  );
}
