import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import Image from 'next/image'; // Import Next.js Image component
import { ForumPost } from '../types';

export default function Forum() {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'General',
    author: '',
    imageUrl: '',
    videoUrl: '',
    linkUrl: '',
  });

  const categories = ['General', 'Technical', 'Feature Requests', 'Bug Reports', 'Tips & Tricks'];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/forum');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const uploads = [];
    if (newPost.imageUrl) uploads.push({ type: 'image', url: newPost.imageUrl });
    if (newPost.videoUrl) uploads.push({ type: 'video', url: newPost.videoUrl });
    if (newPost.linkUrl) uploads.push({ type: 'link', url: newPost.linkUrl });

    try {
      const response = await fetch('/api/forum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newPost.title,
          content: newPost.content,
          category: newPost.category,
          author: newPost.author,
          uploads,
        }),
      });

      if (response.ok) {
        setShowNewPostForm(false);
        setNewPost({ title: '', content: '', category: 'General', author: '', imageUrl: '', videoUrl: '', linkUrl: '' });
        fetchPosts();
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <Layout title="Community Forum - Horlapookie Support">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--accent-color)' }}>
              Community Forum
            </h1>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Connect with other users and share your knowledge
            </p>
          </div>
          <button
            onClick={() => setShowNewPostForm(!showNewPostForm)}
            className="px-6 py-3 rounded-lg font-semibold hover:opacity-80 transition-opacity"
            style={{ backgroundColor: 'var(--accent-color)', color: 'white' }}
          >
            {showNewPostForm ? 'Cancel' : 'New Post'}
          </button>
        </div>

        {showNewPostForm && (
          <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="p-6 rounded-lg border-2 space-y-4"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
          >
            <input
              type="text"
              placeholder="Your Name"
              value={newPost.author}
              onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
              required
              className="w-full px-4 py-2 rounded border"
              style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            />
            <input
              type="text"
              placeholder="Post Title"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              required
              className="w-full px-4 py-2 rounded border"
              style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            />
            <textarea
              placeholder="Post Content"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              required
              rows={6}
              className="w-full px-4 py-2 rounded border"
              style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            />
            <select
              value={newPost.category}
              onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
              className="w-full px-4 py-2 rounded border"
              style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>

            <div className="space-y-2">
              <p className="font-semibold">Optional Attachments:</p>
              <input
                type="url"
                placeholder="Image URL"
                value={newPost.imageUrl}
                onChange={(e) => setNewPost({ ...newPost, imageUrl: e.target.value })}
                className="w-full px-4 py-2 rounded border"
                style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              />
              <input
                type="url"
                placeholder="Video URL"
                value={newPost.videoUrl}
                onChange={(e) => setNewPost({ ...newPost, videoUrl: e.target.value })}
                className="w-full px-4 py-2 rounded border"
                style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              />
              <input
                type="url"
                placeholder="Link URL"
                value={newPost.linkUrl}
                onChange={(e) => setNewPost({ ...newPost, linkUrl: e.target.value })}
                className="w-full px-4 py-2 rounded border"
                style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-lg font-semibold hover:opacity-80 transition-opacity"
              style={{ backgroundColor: 'var(--accent-color)', color: 'white' }}
            >
              Create Post
            </button>
          </motion.form>
        )}

        {loading ? (
          <div className="text-center py-12" style={{ color: 'var(--text-secondary)' }}>
            Loading posts...
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12" style={{ color: 'var(--text-secondary)' }}>
            No posts yet. Be the first to create one!
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 rounded-lg border-2"
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold">{post.title}</h3>
                  <span className="px-3 py-1 rounded text-sm" style={{ backgroundColor: 'var(--bg-primary)' }}>
                    {post.category}
                  </span>
                </div>
                <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>{post.content}</p>
                <div className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                  Posted by {post.author} • {new Date(post.createdAt).toLocaleDateString()}
                </div>
                {post.uploads && post.uploads.length > 0 && (
                  <div className="space-y-2">
                    {post.uploads.map((upload, i) => (
                      <div key={i}>
                        {upload.type === 'image' && (
                          <Image
                            src={upload.url}
                            alt="Post attachment"
                            width={800}
                            height={600}
                            className="max-w-full rounded"
                          />
                        )}
                        {upload.type === 'video' && (
                          <video src={upload.url} controls className="max-w-md rounded" />
                        )}
                        {upload.type === 'link' && (
                          <a href={upload.url} target="_blank" rel="noopener noreferrer"
                             style={{ color: 'var(--accent-color)' }}>
                            🔗 {upload.url}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}