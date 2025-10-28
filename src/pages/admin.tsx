import { useState } from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

export default function Admin() {
  const [passkey, setPasskey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [uploadData, setUploadData] = useState({
    type: 'file',
    title: '',
    url: '',
    description: '',
    category: 'Downloads',
  });
  const [uploaded, setUploaded] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passkey }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.authenticated) {
          setAuthenticated(true);
          setError('');
          localStorage.setItem('adminToken', data.token);
        } else {
          setError('Invalid passkey. Access denied.');
        }
      } else {
        setError('Invalid passkey. Access denied.');
      }
    } catch (error) {
      setError('Authentication failed. Please try again.');
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(uploadData),
      });

      if (response.ok) {
        setUploaded(true);
        setUploadData({ type: 'file', title: '', url: '', description: '', category: 'Downloads' });
        setTimeout(() => setUploaded(false), 3000);
      } else if (response.status === 401) {
        setAuthenticated(false);
        localStorage.removeItem('adminToken');
        setError('Session expired. Please login again.');
      }
    } catch (error) {
      console.error('Error uploading content:', error);
    }
  };

  if (!authenticated) {
    return (
      <Layout title="Admin - Horlapookie Support">
        <div className="max-w-md mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-lg border-2"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
          >
            <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: 'var(--accent-color)' }}>
              Admin Access
            </h1>
            
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="block mb-2 font-semibold">Enter Passkey</label>
                <input
                  type="password"
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2"
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                  placeholder="Enter admin passkey"
                />
              </div>

              {error && (
                <div className="p-3 rounded" style={{ backgroundColor: '#ef4444', color: 'white' }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg font-semibold hover:opacity-80 transition-opacity"
                style={{ backgroundColor: 'var(--accent-color)', color: 'white' }}
              >
                Access Admin Panel
              </button>
            </form>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Admin Panel - Horlapookie Support">
      <div className="max-w-2xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--accent-color)' }}>
            Admin Content Upload
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Upload files, videos, or links to the support website
          </p>
        </motion.div>

        {uploaded && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg"
            style={{ backgroundColor: '#10b981', color: 'white' }}
          >
            Content uploaded successfully!
          </motion.div>
        )}

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleUpload}
          className="p-8 rounded-lg border-2 space-y-6"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
        >
          <div>
            <label className="block mb-2 font-semibold">Content Type</label>
            <select
              value={uploadData.type}
              onChange={(e) => setUploadData({ ...uploadData, type: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border-2"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            >
              <option value="file">File</option>
              <option value="video">Video</option>
              <option value="link">Link</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Title</label>
            <input
              type="text"
              value={uploadData.title}
              onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-lg border-2"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">URL</label>
            <input
              type="url"
              value={uploadData.url}
              onChange={(e) => setUploadData({ ...uploadData, url: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-lg border-2"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Description</label>
            <textarea
              value={uploadData.description}
              onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border-2"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Category</label>
            <select
              value={uploadData.category}
              onChange={(e) => setUploadData({ ...uploadData, category: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border-2"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            >
              <option value="Downloads">Downloads</option>
              <option value="Tutorials">Tutorials</option>
              <option value="Resources">Resources</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 rounded-lg font-semibold hover:opacity-80 transition-opacity"
            style={{ backgroundColor: 'var(--accent-color)', color: 'white' }}
          >
            Upload Content
          </button>
        </motion.form>
      </div>
    </Layout>
  );
}
