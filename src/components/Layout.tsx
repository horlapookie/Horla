import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title = 'Horlapookie Support' }: LayoutProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Horlapookie Support - Get help and support" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <AnimatedBackground theme={theme} />

      <div className="min-h-screen relative">
        <nav className="sticky top-0 z-50 border-b backdrop-blur-md bg-opacity-80" 
             style={{ 
               backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)',
               borderColor: 'var(--border-color)'
             }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-2xl font-bold" style={{ color: 'var(--accent-color)' }}>
                Horlapookie Support
              </Link>
              
              <div className="flex items-center gap-6">
                <Link href="/" className="hover:opacity-70 transition-opacity">Home</Link>
                <Link href="/knowledge-base" className="hover:opacity-70 transition-opacity">Knowledge Base</Link>
                <Link href="/forum" className="hover:opacity-70 transition-opacity">Forum</Link>
                <Link href="/tutorials" className="hover:opacity-70 transition-opacity">Tutorials</Link>
                <Link href="/contact" className="hover:opacity-70 transition-opacity">Contact</Link>
                <Link href="/complaints" className="hover:opacity-70 transition-opacity">Complaints</Link>
                <Link href="/admin" className="hover:opacity-70 transition-opacity">Admin</Link>
                
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg transition-colors"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)'
                  }}
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? '🌙' : '☀️'}
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        <footer className="mt-20 border-t py-8" style={{ borderColor: 'var(--border-color)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ color: 'var(--text-secondary)' }}>
            <p>&copy; 2025 Horlapookie Support. All rights reserved.</p>
            <a href="https://GitHub.com/horlapookie" target="_blank" rel="noopener noreferrer" 
               className="mt-2 inline-block hover:opacity-70" style={{ color: 'var(--accent-color)' }}>
              Visit our GitHub page
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}

function AnimatedBackground({ theme }: { theme: 'light' | 'dark' }) {
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const [dust, setDust] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    const starCount = 100;
    const dustCount = 30;
    
    setStars(
      Array.from({ length: starCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
      }))
    );

    setDust(
      Array.from({ length: dustCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 6,
      }))
    );
  }, []);

  return (
    <div className="stars-background">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            animationDelay: `${star.delay}s`,
            opacity: theme === 'dark' ? 0.7 : 0.3,
          }}
        />
      ))}
      {dust.map((particle) => (
        <div
          key={particle.id}
          className="dust-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            opacity: theme === 'dark' ? 0.4 : 0.2,
          }}
        />
      ))}
    </div>
  );
}
