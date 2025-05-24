// src/components/Footer.tsx
"use client"; // Required for Next.js 13+ to use client-side features
import Link from 'next/link';
import { LuFacebook, LuInstagram, LuYoutube, LuTwitter } from 'react-icons/lu'; // Example social icons

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-neutral-800 text-neutral-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
                    {/* Column 1: About / Links */}
                    <div>
                        <h5 className="text-lg font-semibold text-white mb-4">GymBeam</h5>
                        <nav className="space-y-2">
                            <Link href="/about" className="block text-sm hover:text-orange-400 transition-colors">About Us</Link>
                            <Link href="/contact" className="block text-sm hover:text-orange-400 transition-colors">Contact</Link>
                            <Link href="/careers" className="block text-sm hover:text-orange-400 transition-colors">Careers</Link>
                            <Link href="/blog" className="block text-sm hover:text-orange-400 transition-colors">Blog</Link>
                        </nav>
                    </div>

                    {/* Column 2: Customer Service */}
                    <div>
                        <h5 className="text-lg font-semibold text-white mb-4">Customer Service</h5>
                        <nav className="space-y-2">
                            <Link href="/faq" className="block text-sm hover:text-orange-400 transition-colors">FAQ</Link>
                            <Link href="/shipping" className="block text-sm hover:text-orange-400 transition-colors">Shipping & Returns</Link>
                            <Link href="/terms" className="block text-sm hover:text-orange-400 transition-colors">Terms & Conditions</Link>
                            <Link href="/privacy" className="block text-sm hover:text-orange-400 transition-colors">Privacy Policy</Link>
                        </nav>
                    </div>

                    {/* Column 3: Social Media */}
                    <div>
                        <h5 className="text-lg font-semibold text-white mb-4">Follow Us</h5>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-orange-400 transition-colors"><LuFacebook size={24} /></a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-orange-400 transition-colors"><LuInstagram size={24} /></a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-orange-400 transition-colors"><LuYoutube size={24} /></a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-orange-400 transition-colors"><LuTwitter size={24} /></a>
                        </div>
                    </div>

                    {/* Column 4: Newsletter (Optional) */}
                    <div className="lg:col-span-1 md:col-span-3"> {/* Spans full on md, specific on lg */}
                        <h5 className="text-lg font-semibold text-white mb-4">Newsletter</h5>
                        <p className="text-sm mb-3">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
                        <form onSubmit={(e) => e.preventDefault()} className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 rounded-l-md text-neutral-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-r-md transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-neutral-700 pt-8 text-center">
                    <p className="text-sm">© {currentYear} GymBeam</p>
                    <p className="text-xs mt-1">Case Study Project by Pavol Padyšák</p>
                </div>
            </div>
        </footer>
    );
}