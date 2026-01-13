import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Hash, Video, Lightbulb, MessageSquare, Zap, AlertCircle, Key } from 'lucide-react';

export default function ScoopzApp() {
  const [activeTab, setActiveTab] = useState('ideas');
  const [niche, setNiche] = useState('');
  const [tone, setTone] = useState('casual');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(true);

  // Load API key from localStorage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('groq_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setShowApiInput(false);
    }
  }, []);

  // Save API key to localStorage
  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('groq_api_key', apiKey.trim());
      setShowApiInput(false);
      alert('API key saved! You can now generate content.');
    }
  };

  const tabs = [
    { id: 'ideas', label: 'Content Ideas', icon: Lightbulb },
    { id: 'script', label: 'Script Writer', icon: MessageSquare },
    { id: 'hashtags', label: 'Hashtags', icon: Hash },
    { id: 'trends', label: 'Trend Analysis', icon: TrendingUp },
  ];

  const generateContent = async () => {
    if (!niche.trim()) {
      setResult('⚠️ Please enter a niche or topic first!');
      return;
    }

    if (!apiKey.trim()) {
      setShowApiInput(true);
      setResult('⚠️ Please enter your Groq API key below.\n\nGet a FREE key at: https://console.groq.com/keys');
      return;
    }

    setLoading(true);
    setResult('');

    try {
      let prompt = '';

      switch(activeTab) {
        case 'ideas':
          prompt = `Generate 5 creative TikTok content ideas for the niche: "${niche}". Make them engaging, trendy, and actionable. Format as a numbered list with brief descriptions.`;
          break;
        case 'script':
          prompt = `Write a compelling TikTok script for: "${niche}". Use a ${tone} tone. Include a hook in the first 3 seconds, engaging middle content, and a strong CTA. Keep it under 60 seconds of speaking time.`;
          break;
        case 'hashtags':
          prompt = `Generate 15 relevant hashtags for TikTok content about: "${niche}". Mix popular, moderately popular, and niche-specific tags. Format as a copyable list.`;
          break;
        case 'trends':
          prompt = `Analyze current TikTok trends relevant to: "${niche}". Suggest 3 trending formats or challenges that could be adapted for this niche. Be specific and actionable.`;
          break;
      }

      // Use Groq API (FREE and FAST!)
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 1024,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'API request failed');
      }

      const data = await response.json();
      
      if (data.choices && data.choices[0]?.message?.content) {
        const text = data.choices[0].message.content;
        setResult(text);
      } else {
        throw new Error('Invalid response from API');
      }

    } catch (error) {
      console.error('Error:', error);
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        setResult('❌ Invalid API key. Please check your Groq API key and try again.\n\nGet a FREE key at: https://console.groq.com/keys');
        setShowApiInput(true);
      } else {
        setResult(`❌ Error: ${error.message}\n\nPlease try again or check your API key.`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Video className="w-10 h-10 text-pink-400" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Scoopz
            </h1>
          </div>
          <p className="text-blue-200 text-lg">Your AI-Powered TikTok Content Assistant</p>
          <p className="text-green-300 text-sm mt-2">⚡ Powered by Groq - 100% FREE & Lightning Fast!</p>
        </div>

        {/* API Key Setup Notice */}
        {!apiKey && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-green-100">
              <strong>FREE Setup:</strong> Get your free Groq API key at{' '}
              <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className="underline font-semibold">
                console.groq.com/keys
              </a>
              {' '}(No credit card required! 14,400 requests/day FREE)
            </div>
          </div>
        )}

        {/* API Key Input */}
        {showApiInput && (
          <div className="mb-6 p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
            <div className="flex items-center gap-2 mb-3">
              <Key className="w-5 h-5 text-yellow-400" />
              <label className="text-sm font-medium text-blue-200">
                Groq API Key (FREE)
              </label>
            </div>
            <div className="flex gap-2">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Paste your Groq API key here..."
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-white/40"
                onKeyPress={(e) => e.key === 'Enter' && saveApiKey()}
              />
              <button
                onClick={saveApiKey}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl font-medium transition-all"
              >
                Save
              </button>
            </div>
            <div className="mt-3 text-xs text-blue-300 space-y-1">
              <p>✅ Completely FREE - No credit card needed</p>
              <p>✅ 14,400 requests per day free tier</p>
              <p>✅ Lightning fast response times</p>
              <p>✅ Your key is saved locally in your browser</p>
              <p>
                Get your key:{' '}
                <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className="underline">
                  https://console.groq.com/keys
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Show/Edit API Key Button */}
        {apiKey && !showApiInput && (
          <div className="mb-6 flex justify-end">
            <button
              onClick={() => setShowApiInput(true)}
              className="text-sm text-blue-300 hover:text-blue-200 underline"
            >
              Edit API Key
            </button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setResult('');
                }}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-pink-500 shadow-lg shadow-pink-500/50'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main Content Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="space-y-4">
            {/* Input Section */}
            <div>
              <label className="block text-sm font-medium mb-2 text-blue-200">
                Your Niche or Topic
              </label>
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="e.g., fitness, cooking, tech reviews, comedy skits..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-white/40"
                onKeyPress={(e) => e.key === 'Enter' && generateContent()}
              />
            </div>

            {/* Tone Selector (for script tab) */}
            {activeTab === 'script' && (
              <div>
                <label className="block text-sm font-medium mb-2 text-blue-200">
                  Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                >
                  <option value="casual">Casual & Friendly</option>
                  <option value="energetic">Energetic & Hype</option>
                  <option value="professional">Professional</option>
                  <option value="humorous">Humorous</option>
                  <option value="educational">Educational</option>
                </select>
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={generateContent}
              disabled={loading || !niche.trim()}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate {tabs.find(t => t.id === activeTab)?.label}
                </>
              )}
            </button>

            {/* Results Section */}
            {result && (
              <div className="mt-6 p-6 bg-white/5 border border-white/20 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-semibold text-lg">Results</h3>
                </div>
                <div className="whitespace-pre-wrap text-blue-100 leading-relaxed">
                  {result}
                </div>
                {!result.includes('❌') && !result.includes('⚠️') && (
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(result);
                      alert('Copied to clipboard!');
                    }}
                    className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-all"
                  >
                    Copy to Clipboard
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="bg-white/5 backdrop-blur rounded-xl p-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-400" />
              Pro Tips
            </h4>
            <ul className="text-sm text-blue-200 space-y-1">
              <li>• Be specific with your niche for better results</li>
              <li>• Test multiple content ideas before filming</li>
              <li>• Use a mix of trending and niche hashtags</li>
            </ul>
          </div>
          <div className="bg-white/5 backdrop-blur rounded-xl p-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              Best Practices
            </h4>
            <ul className="text-sm text-blue-200 space-y-1">
              <li>• Hook viewers in first 3 seconds</li>
              <li>• Keep videos under 60 seconds</li>
              <li>• Always include a clear call-to-action</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="bg-white/5 backdrop-blur rounded-xl p-6">
            <p className="text-blue-200 text-sm mb-2">
              Created by <span className="font-semibold text-pink-400">Shronda Jeanine</span>
            </p>
            <p className="text-blue-300 text-xs">
              © 2025 Shronda Jeanine & Company. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}