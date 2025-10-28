import { useState } from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

export default function Complaints() {
  const [formData, setFormData] = useState({
    supportType: 'Technical Support',
    query: '',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const supportTypes = [
    'Technical Support',
    'Billing',
    'Account Management',
    'Feature Request',
    'Bug Report',
    'General Inquiry',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ supportType: 'Technical Support', query: '', email: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting complaint:', error);
    }
  };

  return (
    <Layout title="Complaints - Horlapookie Support">
      <div className="max-w-2xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--accent-color)' }}>
            Submit a Complaint
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            We take your concerns seriously. Please provide details about your issue.
          </p>
        </motion.div>

        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg"
            style={{ backgroundColor: '#10b981', color: 'white' }}
          >
            Thank you! Your complaint has been submitted successfully. We'll get back to you soon.
          </motion.div>
        )}

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="p-8 rounded-lg border-2 space-y-6"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
        >
          <div>
            <label className="block mb-2 font-semibold">Type of Support</label>
            <select
              value={formData.supportType}
              onChange={(e) => setFormData({ ...formData, supportType: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-lg border-2"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            >
              {supportTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Your Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 rounded-lg border-2"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Describe Your Issue</label>
            <textarea
              value={formData.query}
              onChange={(e) => setFormData({ ...formData, query: e.target.value })}
              required
              rows={8}
              placeholder="Please provide as much detail as possible about your complaint..."
              className="w-full px-4 py-3 rounded-lg border-2"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 rounded-lg font-semibold hover:opacity-80 transition-opacity"
            style={{ backgroundColor: 'var(--accent-color)', color: 'white' }}
          >
            Submit Complaint
          </button>
        </motion.form>
      </div>
    </Layout>
  );
}