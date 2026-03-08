import { useState, useRef, useEffect, memo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Phone, Send, User, MessageSquare, Image, Pin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [comments, setComments] = useState([
    {
      id: '1',
      name: 'Ahmed Nada',
      image: '/lanyard/lanyard.png',
      text: 'بِاسْمِكَ اللَّهُمَّ نَخُوضُ دُرُوبًا جَدِيدَةً، لَا نَعْلَمُ مَا يَنْتَظِرُنَا فِيهَا؛ فَاجْعَلْ لَنَا فِيهَا خَيْرًا، وَيَسِّرْ لَنَا أَمْرَنَا، وَبَارِكْ لَنَا فِي خُطُوَاتِنَا، وَاكْتُبْ لَنَا التَّوْفِيقَ حَيْثُمَا ذَهَبْنَا.',
      timestamp: new Date(Date.now() - 86400000),
      pinned: true,
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    text: '',
  });

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const contactRef = useRef(null);
  const commentsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        contactRef.current.children,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        }
      );

      gsap.fromTo(
        commentsRef.current.children,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!formData.name.trim() || !formData.text.trim()) return;

      const newComment = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        image:
          formData.image.trim() ||
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
        text: formData.text.trim(),
        timestamp: new Date(),
      };

      setComments((prev) => [newComment, ...prev]);
      setFormData({ name: '', image: '', text: '' });

      setTimeout(() => {
        const newCommentEl = document.querySelector('.comment-card:first-child');
        if (newCommentEl) {
          gsap.fromTo(
            newCommentEl,
            { opacity: 0, y: -15, scale: 0.97 },
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
    { icon: <Mail size={18} />, label: 'Email', value: 'ahmednadaahmed79@gmail.com' },
    { icon: <Phone size={18} />, label: 'Phone', value: '+201507797027' },
    { icon: <MapPin size={18} />, label: 'Location', value: 'Alexandria, Egypt' },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-28 lg:py-36 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-primary/5 via-transparent to-transparent" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="section-label">
            {'// Get in Touch'}
          </span>
          <h2 className="section-heading">
            Let&apos;s <span className="text-gradient">Connect</span>
          </h2>
          <p className="section-subtext">
            Have a project in mind or just want to chat? I&apos;d love to hear
            from you. Drop a message and I&apos;ll get back to you soon.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div ref={contactRef}>
            <h3 className="text-xl sm:text-2xl font-bold mb-8">
              Contact Information
            </h3>

            {/* Contact items — card surfaces */}
            <div className="space-y-3 mb-10">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 group p-4 rounded-2xl border border-border/30 bg-card/20 backdrop-blur-sm hover:border-primary/20 hover:bg-card/30 transition-all duration-300"
                  style={{ boxShadow: 'inset 0 1px 0 hsl(0 0% 100% / 0.02)' }}
                >
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/[0.08] text-primary flex items-center justify-center border border-primary/15 group-hover:bg-primary/[0.12] group-hover:border-primary/25 transition-all duration-300"
                    style={{
                      boxShadow: 'inset 0 1px 0 hsl(142 76% 45% / 0.08)',
                    }}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-muted-foreground/60 mb-1 font-medium">
                      {info.label}
                    </p>
                    <p className="font-medium text-sm sm:text-base text-foreground/90">
                      {info.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Availability card — gradient border */}
            <div className="relative p-px rounded-2xl bg-gradient-to-br from-primary/25 via-border/30 to-primary/15">
              <div
                className="p-6 rounded-2xl bg-card"
                style={{
                  boxShadow:
                    'inset 0 1px 0 hsl(0 0% 100% / 0.03), 0 4px 16px hsl(0 0% 0% / 0.12)',
                }}
              >
                <h4 className="font-semibold mb-3 flex items-center gap-2.5 text-sm">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                  </span>
                  Currently Available
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  I&apos;m open to freelance projects, full-time opportunities, and
                  interesting collaborations. Let&apos;s create something amazing
                  together.
                </p>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div ref={commentsRef}>
            <h3 className="text-xl sm:text-2xl font-bold mb-8 flex items-center gap-3">
              <MessageSquare size={22} className="text-primary" />
              Comments
              <span className="text-sm font-normal text-muted-foreground/70 ml-auto">
                {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
              </span>
            </h3>

            {/* Comment Form */}
            <form
              onSubmit={handleSubmit}
              className="card-elevated p-5 sm:p-6 mb-6 rounded-2xl"
            >
              <p className="text-xs uppercase tracking-widest text-muted-foreground/50 font-medium mb-4">
                Leave a comment
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-3">
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/40"
                    aria-hidden="true"
                  />
                  <label htmlFor="comment-name" className="sr-only">Your name</label>
                  <input
                    id="comment-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="input-field pl-10 text-sm"
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="relative">
                  <Image
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/40"
                    aria-hidden="true"
                  />
                  <label htmlFor="comment-image" className="sr-only">Avatar URL</label>
                  <input
                    id="comment-image"
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="Avatar URL (optional)"
                    className="input-field pl-10 text-sm"
                  />
                </div>
              </div>
              <div className="relative mb-4">
                <label htmlFor="comment-text" className="sr-only">Comment</label>
                <textarea
                  id="comment-text"
                  name="text"
                  value={formData.text}
                  onChange={handleInputChange}
                  placeholder="Write a comment..."
                  rows={3}
                  className="input-field resize-none text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full sm:w-auto group text-sm"
              >
                Post Comment
                <Send
                  size={14}
                  className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                />
              </button>
            </form>

            {/* Comments Feed */}
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className={`comment-card relative overflow-hidden ${
                    comment.pinned ? 'border-primary/20 bg-card/50' : ''
                  }`}
                  style={
                    comment.pinned
                      ? { boxShadow: 'inset 0 1px 0 hsl(0 0% 100% / 0.03), 0 2px 12px hsl(0 0% 0% / 0.1)' }
                      : undefined
                  }
                >
                  {/* Pin accent bar */}
                  {comment.pinned && (
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary via-primary/40 to-transparent rounded-full" />
                  )}

                  <div className={comment.pinned ? 'pl-3' : ''}>
                    {/* Pinned label */}
                    {comment.pinned && (
                      <div className="flex items-center gap-1.5 mb-3">
                        <Pin size={11} className="text-primary/50 rotate-45" />
                        <span className="text-[10px] uppercase tracking-[0.15em] text-primary/50 font-semibold">
                          Pinned
                        </span>
                      </div>
                    )}

                    <div className="flex items-start gap-3.5">
                      <img
                        src={comment.image}
                        alt={comment.name}
                        width={44}
                        height={44}
                        className={`rounded-full object-cover shadow-sm ${
                          comment.pinned
                            ? 'w-11 h-11 ring-2 ring-primary/20'
                            : 'w-10 h-10 ring-2 ring-primary/15'
                        }`}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.currentTarget.src =
                            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face';
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className={`font-semibold truncate ${
                            comment.pinned
                              ? 'text-[0.9rem] text-foreground'
                              : 'text-sm text-foreground/90'
                          }`}>
                            {comment.name}
                          </span>
                          <span className="text-[11px] text-muted-foreground/50 flex-shrink-0 font-medium">
                            {formatTimeAgo(comment.timestamp)}
                          </span>
                        </div>
                        <p className={`leading-relaxed ${
                          comment.pinned
                            ? 'text-[0.9rem] sm:text-base text-foreground/70'
                            : 'text-sm text-muted-foreground'
                        }`}>
                          {comment.text}
                        </p>
                      </div>
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
