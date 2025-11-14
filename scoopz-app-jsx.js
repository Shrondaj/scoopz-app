import React, { useState } from 'react';
import { Sparkles, TrendingUp, Calendar, Zap, Copy, Check, Video, Mic, Image, Type, Film } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('generate');
  const [niche, setNiche] = useState('');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [copiedField, setCopiedField] = useState(null);
  const [trendingTopics, setTrendingTopics] = useState(null);
  const [contentIdeas, setContentIdeas] = useState(null);

  const trendingTopicsData = {
    general: [
      { topic: "That girl aesthetic", engagement: "High", why: "Self-improvement content is viral" },
      { topic: "Underconsumption core", engagement: "Rising", why: "Anti-trend minimalism movement" },
      { topic: "Career advice for Gen Z", engagement: "High", why: "Job market anxiety trending" },
      { topic: "Storytime format", engagement: "High", why: "Personal stories always perform" },
      { topic: "Controversial hot takes", engagement: "Very High", why: "Drives comments and shares" }
    ],
    fitness: [
      { topic: "Gym anxiety stories", engagement: "High", why: "Relatable to beginners" },
      { topic: "Home workout hacks", engagement: "High", why: "Accessible to everyone" },
      { topic: "Fitness myths debunked", engagement: "Very High", why: "Educational + controversial" }
    ],
    business: [
      { topic: "Side hustle ideas 2025", engagement: "Very High", why: "Money content always wins" },
      { topic: "9-5 vs entrepreneurship", engagement: "High", why: "Polarizing = engagement" },
      { topic: "How I made $X in Y days", engagement: "Very High", why: "Results-driven content" }
    ]
  };

  const generateTrendingTopics = () => {
    setLoading(true);
    setTimeout(() => {
      const topics = niche ? (trendingTopicsData[niche.toLowerCase()] || trendingTopicsData.general) : trendingTopicsData.general;
      setTrendingTopics(topics);
      setLoading(false);
    }, 800);
  };

  const generateContent = async (selectedTopic = null) => {
    setLoading(true);
    
    const contentTopic = selectedTopic || topic;
    const userNiche = niche || 'general lifestyle';

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `You are a TikTok viral content expert. Generate a complete TikTok content package for a ${userNiche} creator about: "${contentTopic}"

Return ONLY valid JSON (no markdown, no backticks, no preamble) with this exact structure:
{
  "hook": "attention-grabbing first 3 seconds",
  "script": "full 30-60 second script with clear sections",
  "caption": "engaging caption with call-to-action",
  "hashtags": ["hashtag1", "hashtag2", "hashtag3", "hashtag4", "hashtag5"],
  "postingTip": "specific timing/strategy advice",
  "whyItWorks": "why this will perform well",
  "formatRecommendation": {
    "primaryFormat": "one of: talking-head, voiceover, faceless, text-overlay, b-roll",
    "reasoning": "why this format works best for this content",
    "visualSuggestions": "specific visual elements to include",
    "alternativeFormat": "backup format option"
  }
}`
            }
          ],
        })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || 'API Error');
      }
      
      const text = data.content.find(item => item.type === "text")?.text || "";
      const cleaned = text.replace(/```json|```/g, "").trim();
      
      // More robust JSON parsing
      let parsed;
      try {
        parsed = JSON.parse(cleaned);
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        throw new Error('Failed to parse AI response');
      }
      
      setGeneratedContent(parsed);
      setLoading(false);
    } catch (error) {
      console.error("Generation error:", error);
      setLoading(false);
      
      // Generate dynamic fallback based on the topic
      const hooks = [
        `POV: You just discovered ${contentTopic}...`,
        `Nobody talks about ${contentTopic} like this...`,
        `This ${contentTopic} hack changed everything for me...`,
        `I wish someone told me this about ${contentTopic}...`,
        `The truth about ${contentTopic} that nobody shares...`,
        `Stop doing ${contentTopic} like this...`,
        `I tested ${contentTopic} for 30 days and...`,
        `Everyone's doing ${contentTopic} wrong...`
      ];
      
      const randomHook = hooks[Math.floor(Math.random() * hooks.length)];
      
      setGeneratedContent({
        hook: randomHook,
        script: `HOOK: "${randomHook}"\n\n[Open with attention-grabbing visual]\n\nMost people approach ${contentTopic} completely wrong. Let me show you what actually works.\n\n[Share key insight #1]\nFirst thing you need to know...\n\n[Key insight #2]\nHere's what most people miss...\n\n[Key insight #3]\nAnd this is the game-changer...\n\n[Call to action]\nTry this approach and watch the difference. Follow for more ${userNiche} content that actually works.`,
        caption: `The real secret to ${contentTopic} 🔥 This changed everything for me. Drop a 💜 if you're trying this! #${userNiche.replace(/\s+/g, '')} #contentcreator`,
        hashtags: ["fyp", "viral", userNiche.replace(/\s+/g, ''), contentTopic.split(' ')[0].toLowerCase(), "tiktoktips"],
        postingTip: "Post between 6-9 PM when your audience is most active. Tuesday-Thursday typically see highest engagement for educational content.",
        whyItWorks: "Pattern interrupt hook + relatable problem + solution framework + strong CTA creates engagement and saves",
        formatRecommendation: {
          primaryFormat: "talking-head",
          reasoning: "Direct to camera builds trust and authenticity, essential for educational content about " + contentTopic,
          visualSuggestions: "Clean background, good lighting, use hand gestures for emphasis, maintain eye contact with camera",
          alternativeFormat: "voiceover with b-roll"
        }
      });
    }
  };

  const generateContentCalendar = async () => {
    setLoading(true);
    
    const userNiche = niche || 'general lifestyle';

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `Generate a 7-day TikTok content calendar for a ${userNiche} creator. Each day should have a different content type for variety and maximum engagement.

Return ONLY valid JSON (no markdown, no backticks, no preamble) with this exact structure:
{
  "days": [
    {
      "day": "Monday",
      "contentType": "Educational",
      "idea": "specific video idea",
      "hook": "attention-grabbing opening"
    }
  ]
}`
            }
          ],
        })
      });

      const data = await response.json();
      const text = data.content.find(item => item.type === "text")?.text || "";
      const cleaned = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      
      setContentIdeas(parsed.days);
      setLoading(false);
    } catch (error) {
      console.error("Calendar generation error:", error);
      setLoading(false);
      setContentIdeas([
        { day: "Monday", contentType: "Educational", idea: "Myth-busting common misconceptions", hook: "Stop believing this lie..." },
        { day: "Tuesday", contentType: "Storytime", idea: "Personal experience or lesson learned", hook: "So this just happened..." },
        { day: "Wednesday", contentType: "Tutorial", idea: "Step-by-step how-to guide", hook: "Here's exactly how to..." },
        { day: "Thursday", contentType: "Trend", idea: "Jump on a trending sound/format", hook: "[Use trending audio]" },
        { day: "Friday", contentType: "Behind-the-scenes", idea: "Show your process or day in the life", hook: "You asked what I actually do..." },
        { day: "Saturday", contentType: "Controversial Take", idea: "Hot take that sparks debate", hook: "Unpopular opinion but..." },
        { day: "Sunday", contentType: "Engagement", idea: "Ask questions, polls, or challenges", hook: "Comment your answer..." }
      ]);
    }
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Scoopz
              </h1>
              <p className="text-sm text-gray-600">TikTok Content Assistant</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="flex gap-2 bg-white p-1 rounded-xl shadow-sm">
          <button
            onClick={() => setActiveTab('generate')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'generate'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Zap className="w-4 h-4" />
            Generate Content
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'trending'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Trending Topics
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'calendar'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Content Calendar
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Generate Tab */}
        {activeTab === 'generate' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Generate Viral Content</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Niche (optional)
                  </label>
                  <input
                    type="text"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    placeholder="e.g., fitness, business, beauty, comedy..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic or Idea
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., morning routine, productivity hacks, gym fails..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => generateContent()}
                  disabled={!topic || loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Generating...' : '✨ Generate Complete Package'}
                </button>
              </div>
            </div>

            {/* Generated Content */}
            {generatedContent && (
              <div className="space-y-4">
                {/* Hook */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900">🎯 Viral Hook</h3>
                    <button
                      onClick={() => copyToClipboard(generatedContent.hook, 'hook')}
                      className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700"
                    >
                      {copiedField === 'hook' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copiedField === 'hook' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <p className="text-gray-700 font-medium">{generatedContent.hook}</p>
                </div>

                {/* Script */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900">📝 Full Script</h3>
                    <button
                      onClick={() => copyToClipboard(generatedContent.script, 'script')}
                      className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700"
                    >
                      {copiedField === 'script' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copiedField === 'script' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{generatedContent.script}</p>
                </div>

                {/* Caption */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900">💬 Caption</h3>
                    <button
                      onClick={() => copyToClipboard(generatedContent.caption, 'caption')}
                      className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700"
                    >
                      {copiedField === 'caption' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copiedField === 'caption' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <p className="text-gray-700">{generatedContent.caption}</p>
                </div>

                {/* Hashtags */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900">#️⃣ Hashtags</h3>
                    <button
                      onClick={() => copyToClipboard(generatedContent.hashtags.map(h => `#${h}`).join(' '), 'hashtags')}
                      className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700"
                    >
                      {copiedField === 'hashtags' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copiedField === 'hashtags' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {generatedContent.hashtags.map((tag, idx) => (
                      <span key={idx} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Strategy */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                    <h3 className="font-bold text-gray-900 mb-2">⏰ Posting Strategy</h3>
                    <p className="text-gray-700 text-sm">{generatedContent.postingTip}</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
                    <h3 className="font-bold text-gray-900 mb-2">🚀 Why This Works</h3>
                    <p className="text-gray-700 text-sm">{generatedContent.whyItWorks}</p>
                  </div>
                </div>

                {/* Format Recommendation */}
                {generatedContent.formatRecommendation && (
                  <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h3 className="font-bold text-gray-900 mb-4">🎬 Recommended Format</h3>
                    
                    <div className="space-y-4">
                      {/* Primary Format */}
                      <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                        <div className="flex-shrink-0">
                          {generatedContent.formatRecommendation.primaryFormat === 'talking-head' && (
                            <div className="bg-purple-600 p-3 rounded-lg">
                              <Video className="w-6 h-6 text-white" />
                            </div>
                          )}
                          {generatedContent.formatRecommendation.primaryFormat === 'voiceover' && (
                            <div className="bg-purple-600 p-3 rounded-lg">
                              <Mic className="w-6 h-6 text-white" />
                            </div>
                          )}
                          {generatedContent.formatRecommendation.primaryFormat === 'faceless' && (
                            <div className="bg-purple-600 p-3 rounded-lg">
                              <Film className="w-6 h-6 text-white" />
                            </div>
                          )}
                          {generatedContent.formatRecommendation.primaryFormat === 'text-overlay' && (
                            <div className="bg-purple-600 p-3 rounded-lg">
                              <Type className="w-6 h-6 text-white" />
                            </div>
                          )}
                          {generatedContent.formatRecommendation.primaryFormat === 'b-roll' && (
                            <div className="bg-purple-600 p-3 rounded-lg">
                              <Image className="w-6 h-6 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-bold text-gray-900 capitalize">
                              {generatedContent.formatRecommendation.primaryFormat.replace('-', ' ')}
                            </h4>
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                              Recommended
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">
                            {generatedContent.formatRecommendation.reasoning}
                          </p>
                          <div className="bg-white rounded-lg p-3 mt-2">
                            <p className="text-xs font-medium text-gray-600 mb-1">Visual Suggestions:</p>
                            <p className="text-sm text-gray-700">
                              {generatedContent.formatRecommendation.visualSuggestions}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Alternative Format */}
                      {generatedContent.formatRecommendation.alternativeFormat && (
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                          <div className="flex-shrink-0 bg-gray-200 p-2 rounded-lg">
                            <Zap className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-600">Alternative Format:</p>
                            <p className="text-sm font-medium text-gray-900 capitalize">
                              {generatedContent.formatRecommendation.alternativeFormat.replace('-', ' ')}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Trending Tab */}
        {activeTab === 'trending' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Trending Topics Right Now</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Niche (optional)
                  </label>
                  <input
                    type="text"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    placeholder="e.g., fitness, business, beauty..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={generateTrendingTopics}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {loading ? 'Loading...' : '🔥 Show Trending Topics'}
                </button>
              </div>
            </div>

            {trendingTopics && (
              <div className="space-y-3">
                {trendingTopics.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">{item.topic}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.why}</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          item.engagement === 'Very High' ? 'bg-red-100 text-red-700' :
                          item.engagement === 'High' ? 'bg-orange-100 text-orange-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.engagement} Engagement
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setTopic(item.topic);
                          setActiveTab('generate');
                          generateContent(item.topic);
                        }}
                        className="ml-4 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                      >
                        Create →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">7-Day Content Calendar</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Niche (optional)
                  </label>
                  <input
                    type="text"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    placeholder="e.g., fitness, business, beauty..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={generateContentCalendar}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {loading ? 'Generating...' : '📅 Generate Week Plan'}
                </button>
              </div>
            </div>

            {contentIdeas && (
              <div className="space-y-3">
                {contentIdeas.map((day, idx) => (
                  <div key={idx} className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-bold text-purple-600">{day.day}</span>
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                            {day.contentType}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">{day.idea}</h3>
                        <p className="text-sm text-gray-600">Hook: "{day.hook}"</p>
                      </div>
                      <button
                        onClick={() => {
                          setTopic(day.idea);
                          setActiveTab('generate');
                          generateContent(day.idea);
                        }}
                        className="ml-4 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors whitespace-nowrap"
                      >
                        Create →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;