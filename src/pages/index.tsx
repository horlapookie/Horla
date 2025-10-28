import { useState } from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const popularArticles = [
    { id: 1, title: 'Getting Started Guide', category: 'Getting Started', views: 1500 },
    { id: 2, title: 'Account Setup Tutorial', category: 'Getting Started', views: 1200 },
    { id: 3, title: 'Troubleshooting Common Issues', category: 'Troubleshooting', views: 980 },
    { id: 4, title: 'Advanced Features Overview', category: 'Advanced Features', views: 750 },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/knowledge-base?search=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <Layout>
      <div className="space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <h1 className="text-5xl font-bold mb-4" style={{ color: 'var(--accent-color)' }}>
            Welcome to Horlapookie Support
          </h1>
          <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
            Find answers, get help, and connect with our community
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-lg text-lg border-2 transition-colors"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                }}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 rounded-lg font-semibold transition-opacity hover:opacity-80"
                style={{ backgroundColor: 'var(--accent-color)', color: 'white' }}
              >
                Search
              </button>
            </div>
          </form>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <QuickLinkCard
            title="Get Your Session ID"
            description="Access your session ID quickly"
            link="https://horlapookie-session.onrender.com"
            external
          />
          <QuickLinkCard
            title="Session ID Tutorial"
            description="Watch how to get your session ID"
            link="https://youtu.be/u8ideSxqrmM?si=VfDehj5OrdNmHUZQ"
            external
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold mb-6">Popular Articles</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {popularArticles.map((article, index) => (
              <motion.a
                key={article.id}
                href={`/knowledge-base?article=${article.id}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="p-6 rounded-lg border-2 hover:shadow-lg transition-all"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border-color)',
                }}
              >
                <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                <div className="flex justify-between items-center" style={{ color: 'var(--text-secondary)' }}>
                  <span className="text-sm">{article.category}</span>
                  <span className="text-sm">{article.views} views</span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-3xl font-bold mb-6">Quick Links</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <QuickLinkCard title="Knowledge Base" link="/knowledge-base" />
            <QuickLinkCard title="Community Forum" link="/forum" />
            <QuickLinkCard title="Tutorials & Guides" link="/tutorials" />
            <QuickLinkCard title="Contact Support" link="/contact" />
            <QuickLinkCard title="Submit a Complaint" link="/complaints" />
            <QuickLinkCard 
              title="Join Telegram Channel" 
              link="https://t.me/yourhighnesstech1" 
              external 
            />
            <QuickLinkCard 
              title="Telegram Support" 
              link="https://t.me/@horlapookie" 
              external 
            />
            <QuickLinkCard 
              title="WhatsApp Channel" 
              link="https://whatsapp.com/channel/0029VbBg3f665yDK7dGyMC3q" 
              external 
            />
            <QuickLinkCard 
              title="WhatsApp Group" 
              link="https://chat.whatsapp.com/KTMff3UzdO40EXdcPVPeCh?mode=ems_copy_t" 
              external 
            />
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}

function QuickLinkCard({ 
  title, 
  description, 
  link, 
  external = false 
}: { 
  title: string; 
  description?: string; 
  link: string; 
  external?: boolean;
}) {
  const content = (
    <>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {description && <p style={{ color: 'var(--text-secondary)' }}>{description}</p>}
    </>
  );

  const className = "block p-6 rounded-lg border-2 hover:shadow-lg transition-all";
  const style = {
    backgroundColor: 'var(--bg-secondary)',
    borderColor: 'var(--border-color)',
  };

  if (external) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className={className} style={style}>
        {content}
      </a>
    );
  }

  return (
    <a href={link} className={className} style={style}>
      {content}
    </a>
  );
}
