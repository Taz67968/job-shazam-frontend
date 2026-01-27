import Navbar from "@/components/navbar";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto px-4 py-24">
                <h1 className="text-4xl font-bold mb-8 gradient-text">Privacy Policy</h1>
                <div className="prose prose-invert max-w-none">
                    <p className="text-muted-foreground text-lg">
                        Your privacy is important to us. This page will soon contain our detailed privacy policy.
                    </p>
                    <p className="text-muted-foreground">
                        We are committed to protecting your personal data and ensuring transparency in how we collect and use your information.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}
