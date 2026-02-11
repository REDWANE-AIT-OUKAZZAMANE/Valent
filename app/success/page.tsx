import Surprise from "../util/confetti";
import Link from 'next/link';
import Image from "next/image";
import AnimatedHearts from "../util/AnimatedHearts";

export default function page() {
    return (
        <div>
            <AnimatedHearts />
            <div className="homepage-link">
                <Link href='/'> ← Go Back</Link>
            </div>
            <div>
                <section className="success">
                    <Surprise />
                    <Image src="/celebrate.gif" alt="two animals holding hearts and smiling gif" width={570} height={300} className="yay-img" priority />
                    <p id="yay">💖 Yipee! 💖</p>
                    <div className="success-nav">
                        <Link href="/love-language" className="success-link">Take Love Language Quiz 💬</Link>
                        <Link href="/gallery" className="success-link">Start a Gallery 📸</Link>
                    </div>
                </section>
            </div>
        </div>
    )
}