import Layout from '../components/Layout';
import { motion } from 'framer-motion';

export default function Tutorials() {
  const tutorials = [
    {
      id: 1,
      title: 'Getting Your Session ID',
      type: 'Video',
      url: 'https://youtu.be/u8ideSxqrmM?si=VfDehj5OrdNmHUZQ',
      description: 'Learn how to obtain your session ID with this step-by-step video tutorial.',
    },
    {
      id: 2,
      title: 'Account Setup Guide',
      type: 'Written',
      description: 'Complete guide to setting up your account and getting started.',
    },
    {
      id: 3,
      title: 'Advanced Features Overview',
      type: 'Written',
      description: 'Discover advanced features and how to use them effectively.',
    },
  ];

  return (
    <Layout title="Tutorials - Horlapookie Support">
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--accent-color)' }}>
            Tutorials & Guides
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Learn with our comprehensive tutorials and step-by-step guides
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {tutorials.map((tutorial, index) => (
            <motion.div
              key={tutorial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-lg border-2"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-bold">{tutorial.title}</h3>
                <span className="px-3 py-1 rounded text-sm" style={{ backgroundColor: 'var(--bg-primary)' }}>
                  {tutorial.type}
                </span>
              </div>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                {tutorial.description}
              </p>
              {tutorial.url && (
                <a
                  href={tutorial.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 rounded-lg font-semibold hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: 'var(--accent-color)', color: 'white' }}
                >
                  Watch Tutorial
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
