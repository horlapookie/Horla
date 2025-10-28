import Layout from '../components/Layout';
import { motion } from 'framer-motion';

export default function Contact() {
  const contactMethods = [
    {
      title: 'Email Support',
      description: 'Send us an email and we\'ll get back to you within 24 hours',
      link: 'mailto:olamilekanidowu998@gmail.com',
      icon: '📧',
    },
    {
      title: 'Telegram Channel',
      description: 'Join our Telegram channel for updates and support',
      link: 'https://t.me/yourhighnesstech1',
      icon: '📱',
    },
    {
      title: 'Direct Telegram',
      description: 'Reach out directly via Telegram',
      link: 'https://t.me/@horlapookie',
      icon: '💬',
    },
    {
      title: 'WhatsApp Channel',
      description: 'Join our WhatsApp channel for the latest information',
      link: 'https://whatsapp.com/channel/0029VbBg3f665yDK7dGyMC3q',
      icon: '📲',
    },
    {
      title: 'WhatsApp Group',
      description: 'Join our WhatsApp group for direct support and discussions',
      link: 'https://chat.whatsapp.com/KTMff3UzdO40EXdcPVPeCh?mode=ems_copy_t',
      icon: '👥',
    },
  ];

  return (
    <Layout title="Contact Support - Horlapookie Support">
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--accent-color)' }}>
            Contact Support
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Get in touch with us through any of these channels
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => (
            <motion.a
              key={index}
              href={method.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-lg border-2 hover:shadow-lg transition-all"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
            >
              <div className="text-4xl mb-4">{method.icon}</div>
              <h3 className="text-xl font-bold mb-2">{method.title}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{method.description}</p>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-8 rounded-lg border-2 text-center"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
        >
          <h2 className="text-2xl font-bold mb-4">Need to file a complaint?</h2>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
            If you have a specific issue or complaint, please use our dedicated complaints form
          </p>
          <a
            href="/complaints"
            className="inline-block px-6 py-3 rounded-lg font-semibold hover:opacity-80 transition-opacity"
            style={{ backgroundColor: 'var(--accent-color)', color: 'white' }}
          >
            Submit a Complaint
          </a>
        </motion.div>
      </div>
    </Layout>
  );
}
