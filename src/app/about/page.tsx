import Navbar from "@/components/navbar";
import { Footer } from "@/components/Footer";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto px-4 py-24">
                <h1 className="text-4xl font-bold mb-8 gradient-text">About Job Shazam</h1>
                <div className="prose prose-invert max-w-none">
                    <p className="text-muted-foreground text-lg">
                        Job Shazam is dedicated to helping professionals find their dream careers through AI-enhanced insights.
                    </p>
                    <p className="text-muted-foreground">
                        Our mission is to bridge the gap between talent and opportunity by providing the most efficient and user-friendly job search experience.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}
