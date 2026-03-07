import { useState, useRef, useEffect, memo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Phone, Send, User, MessageSquare, Image } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [comments, setComments] = useState([
    {
      id: '1',
      name: 'Ahmed Nada',
      image: '/lanyard/lanyard.png',
      text: 'بِاسْمِكَ اللَّهُمَّ نَخُوضُ دُرُوبًا جَدِيدَةً، لَا نَعْلَمُ مَا يَنْتَظِرُنَا فِيهَا؛ فَاجْعَلْ لَنَا فِيهَا خَيْرًا، وَيَسِّرْ لَنَا أَمْرَنَا، وَبَارِكْ لَنَا فِي خُطُوَاتِنَا، وَاكْتُبْ لَنَا التَّوْفِيقَ حَيْثُمَا ذَهَبْنَا.',
      timestamp: new Date(Date.now() - 86400000),
    },
    
  ]);

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    text: '',
  });

  const sectionRef = useRef(null);
  const contactRef = useRef(null);
  const commentsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contactRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        commentsRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!formData.name.trim() || !formData.text.trim()) return;

      const newComment = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        image: formData.image.trim() || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
        text: formData.text.trim(),
        timestamp: new Date(),
      };

      setComments((prev) => [newComment, ...prev]);
      setFormData({ name: '', image: '', text: '' });

      // Animate new comment
      setTimeout(() => {
        const newCommentEl = document.querySelector('.comment-card:first-child');
        if (newCommentEl) {
          gsap.fromTo(
            newCommentEl,
            { opacity: 0, y: -20, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' }
          );
        }
      }, 10);
    },
    [formData]
  );

  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const contactInfo = [
    { icon: <Mail size={20} />, label: 'Email', value: 'ahmednadaahmed79@gmail.com' },
    { icon: <Phone size={20} />, label: 'Phone', value: '+201507797027' },
    { icon: <MapPin size={20} />, label: 'Location', value: 'Alexandria, Egypt' },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-primary/5 via-transparent to-transparent" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm mb-4 block">
            {'// Get in Touch'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you.
            Drop a message and I'll get back to you soon.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div ref={contactRef}>
            <h3 className="text-2xl font-bold mb-8">Contact Information</h3>

            <div className="space-y-6 mb-10">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{info.label}</p>
                    <p className="font-medium">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="card-elevated p-6">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Currently Available
              </h4>
              <p className="text-muted-foreground text-sm">
                I'm open to freelance projects, full-time opportunities, and
                interesting collaborations. Let's create something amazing together.
              </p>
            </div>
          </div>

          {/* Comments Section */}
          <div ref={commentsRef}>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <MessageSquare size={24} className="text-primary" />
              Comments ({comments.length})
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="card-elevated p-6 mb-6">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="input-field pl-10"
                    required
                  />
                </div>
                <div className="relative">
                  <Image
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="Avatar URL (optional)"
                    className="input-field pl-10"
                  />
                </div>
              </div>
              <div className="relative mb-4">
                <textarea
                  name="text"
                  value={formData.text}
                  onChange={handleInputChange}
                  placeholder="Write a comment..."
                  rows={3}
                  className="input-field resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full sm:w-auto group"
              >
                Post Comment
                <Send
                  size={16}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </button>
            </form>

            {/* Comments Feed */}
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
              {comments.map((comment) => (
                <div key={comment.id} className="comment-card">
                  <div className="flex items-start gap-3">
                    <img
                      src={comment.image}
                      alt={comment.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-medium text-sm truncate">
                          {comment.name}
                        </span>
                        <span className="text-xs text-muted-foreground flex-shrink-0">
                          {formatTimeAgo(comment.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Contact);
