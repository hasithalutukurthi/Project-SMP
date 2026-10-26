
import { useState } from 'react'
import './App.css'

function App() {
  const [showForm, setShowForm] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [search, setSearch] = useState('')
  const [subjectFilter, setSubjectFilter] = useState('All')
  const [activeCommentsId, setActiveCommentsId] = useState(null)
  const [commentText, setCommentText] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [doubt, setDoubt] = useState({
    subject: '',
    title: '',
    description: '',
  })

  const [doubts, setDoubts] = useState([
    {
      id: 1,
      subject: 'AIML',
      title: 'Why is K-Means called an unsupervised algorithm?',
      description:
        'I understand how clustering works, but I am confused about why K-Means comes under unsupervised learning.',
      author: 'Rahul',
      likes: 12,
      comments: 4,
      replies: [],
    },
    {
      id: 2,
      subject: 'DBMS',
      title: 'Can someone explain normalization in simple words?',
      description:
        'I keep getting confused between 1NF, 2NF and 3NF. Can someone explain it with an easy example?',
      author: 'Ananya',
      likes: 8,
      comments: 2,
      replies: [],
    },
  ])

  const handleChange = (e) => {
    setDoubt({
      ...doubt,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!doubt.subject || !doubt.title.trim() || !doubt.description.trim()) {
      alert('Please fill all the fields')
      return
    }

    const newDoubt = {
      id: Date.now(),
      ...doubt,
      author: 'You',
      likes: 0,
      comments: 0,
      replies: [],
    }

    setDoubts((previous) => [newDoubt, ...previous])
    setDoubt({ subject: '', title: '', description: '' })
    setShowForm(false)
  }

  const handleLike = (id) => {
    setDoubts((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    )
  }

  const handleComment = (e, id) => {
    e.preventDefault()

    if (!commentText.trim()) return

    setDoubts((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              comments: item.comments + 1,
              replies: [
                ...item.replies,
                { author: 'You', text: commentText.trim() },
              ],
            }
          : item
      )
    )

    setCommentText('')
  }

  const handleLogin = (e) => {
    e.preventDefault()
    alert(
      isSignup
        ? 'Sign Up demo! Connect a backend to create your account.'
        : 'Login demo! Connect a backend to authenticate your account.'
    )
  }

  // Login and Sign Up page
  if (showLogin) {
    return (
      <div className="login-page">
        <div className="login-card">
          <div className="login-logo">🧠 DoubtDrop</div>

          <div className="login-heading">
            <h1>{isSignup ? 'Create an account' : 'Welcome back!'}</h1>
            <p>
              {isSignup
                ? 'Join the community and learn together.'
                : 'Sign in to continue your learning journey.'}
            </p>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            {isSignup && (
              <>
                <label htmlFor="fullName">Full name</label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter your name"
                  required
                />
              </>
            )}

            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />

            <button type="submit" className="login-submit">
              {isSignup ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <p className="login-switch">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? 'Sign In' : 'Sign Up'}
            </button>
          </p>

          <button
            className="back-home"
            onClick={() => {
              setShowLogin(false)
              setIsSignup(false)
            }}
          >
            ← Back to Home
          </button>

          <p className="login-footer">
            STUDY • ASK • LEARN
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          🧠 <span>DoubtDrop</span>
        </div>

        <div className="nav-links">
          <a href="#" onClick={() => setShowForm(false)}>Home</a>
          <a href="#recent-doubts">Explore</a>
          <a href="#" onClick={() => setShowLogin(true)}>Profile</a>
        </div>

        <button
          className="login-btn"
          onClick={() => setShowLogin(true)}
        >
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div>
          <p className="small-title">STUDY • ASK • LEARN</p>

          <h1>
            Stuck on something?
            <br />
            <span>Drop your doubt.</span>
          </h1>

          <p className="description">
            Ask questions, share knowledge and learn together
            with students like you.
          </p>

          <button
            className="ask-btn"
            onClick={() => setShowForm(!showForm)}
          >
            + Ask a Doubt
          </button>
        </div>
      </section>

      {/* Ask Doubt Form */}
      {showForm && (
        <div className="form-container">
          <div className="form-header">
            <div>
              <h2>Ask a Doubt 🧠</h2>
              <p>Don't hesitate. Someone might know the answer!</p>
            </div>

            <button
              className="close-btn"
              onClick={() => setShowForm(false)}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <label>Subject</label>
            <select
              name="subject"
              value={doubt.subject}
              onChange={handleChange}
              required
            >
              <option value="">Select a subject</option>
              <option value="AIML">AIML</option>
              <option value="DBMS">DBMS</option>
              <option value="CNS">CNS</option>
              <option value="Maths">Maths</option>
              <option value="ECE">ECE</option>
              <option value="Other">Other</option>
            </select>

            <label>Question</label>
            <input
              type="text"
              name="title"
              value={doubt.title}
              onChange={handleChange}
              placeholder="What are you confused about?"
              required
            />

            <label>Explain your doubt</label>
            <textarea
              name="description"
              value={doubt.description}
              onChange={handleChange}
              placeholder="Explain your question in a little more detail..."
              rows="5"
              required
            />

            <button className="post-btn" type="submit">
              Post Doubt
            </button>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="search-box">
        🔍
        <input
          type="text"
          placeholder="Search doubts, subjects or topics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Main Content */}
      <main className="content" id="recent-doubts">
        <div className="section-heading">
          <div>
            <h2>Recent Doubts</h2>
            <p>See what students are asking</p>
          </div>

          <select
            className="filter-btn"
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
          >
            <option value="All">All Subjects</option>
            <option value="AIML">AIML</option>
            <option value="DBMS">DBMS</option>
            <option value="CNS">CNS</option>
            <option value="Maths">Maths</option>
            <option value="ECE">ECE</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Doubt Cards */}
        {doubts
          .filter((item) => {
            const matchesSearch =
              item.title.toLowerCase().includes(search.toLowerCase()) ||
              item.description.toLowerCase().includes(search.toLowerCase()) ||
              item.subject.toLowerCase().includes(search.toLowerCase())

            const matchesSubject =
              subjectFilter === 'All' || item.subject === subjectFilter

            return matchesSearch && matchesSubject
          })
          .map((item) => (
            <div className="doubt-card" key={item.id}>
              <div className="card-top">
                <span
                  className={`subject ${
                    item.subject === 'AIML' ? 'aiml' : 'dbms'
                  }`}
                >
                  {item.subject}
                </span>
                <span className="time">Recently</span>
              </div>

              <h3>{item.title}</h3>
              <p>{item.description}</p>

              <div className="tags">
                <span>#{item.subject}</span>
                <span>#doubt</span>
              </div>

              <div className="card-bottom">
                <span>👤 {item.author}</span>

                <div>
                  <button onClick={() => handleLike(item.id)}>
                    ♡ {item.likes}
                  </button>

                  <button
                    onClick={() =>
                      setActiveCommentsId(
                        activeCommentsId === item.id ? null : item.id
                      )
                    }
                  >
                    💬 {item.comments}
                  </button>
                </div>
              </div>

              {/* Comments */}
              {activeCommentsId === item.id && (
                <div className="comments-section">
                  <h4>Comments</h4>

                  {item.replies.length === 0 && (
                    <p>Be the first to add a comment!</p>
                  )}

                  {item.replies.map((reply, index) => (
                    <p key={index}>
                      <strong>{reply.author}:</strong> {reply.text}
                    </p>
                  ))}

                  <form onSubmit={(e) => handleComment(e, item.id)}>
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      required
                    />
                    <button type="submit">Post</button>
                  </form>
                </div>
              )}
            </div>
          ))}

        {doubts.filter((item) => {
          const matchesSearch =
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase()) ||
            item.subject.toLowerCase().includes(search.toLowerCase())

          const matchesSubject =
            subjectFilter === 'All' || item.subject === subjectFilter

          return matchesSearch && matchesSubject
        }).length === 0 && (
          <p className="no-results">No doubts found. Try another search!</p>
        )}
      </main>
    </div>
  )
}

export default App
