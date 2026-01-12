import React, { useState } from 'react';
import { Sparkles, TrendingUp, Hash, Video, Lightbulb, MessageSquare, Zap } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('ideas');
  const [niche, setNiche] = useState('');
  const [tone, setTone] = useState('casual');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    setResult('');

    try {
      let prompt = '';
      
      switch(activeTab) {
        case 'ideas':
          prompt = `Generate 5 creative TikTok content ideas for: "${niche}". Make them actionable for SHRONDRA JEANINE & COMPANY.`;
          break;
        case 'script':
          prompt = `Write a TikTok script for: "${niche}". Use a ${tone} tone. Include a hook, middle, and CTA.`;
          break;
        case 'hashtags':
          prompt = `Generate 15 relevant hashtags for: "${niche}".`;
          break;
        case 'trends':
          prompt = `Suggest 3 TikTok trends relevant to: "${niche}".`;
          break;
      }

      // VITE SPECIFIC: Pulling the key from .env
      const API_KEY = import.meta.env.VITE_GEMINI_KEY; 

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
      setResult(text);
    } catch (error) {
      console.error('Error:', error);
      setResult(`❌ Error: ${error.message}. Ensure your .env file has VITE_GEMINI_KEY.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Video className="w-10 h-10 text-pink-400" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Scoopz
            </h1>
          </div>
          <p className="text-blue-200 text-lg">AI-Powered Assistant for Shrondra Jeanine & Co</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setResult(''); }}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
                  activeTab === tab.id ? 'bg-pink-500 shadow-lg' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Input Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl">
          <div className="space-y-4">
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="What is your topic (e.g. Abundant Harvest, Recovery Tips)?"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
            />
            
            <button
              onClick={generateContent}
              disabled={loading || !niche.trim()}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 py-4 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              {loading ? "Generating..." : <><Sparkles className="w-5 h-5" /> Generate</>}
            </button>

            {result && (
              <div className="mt-6 p-6 bg-white/5 border border-white/20 rounded-xl">
                <div className="whitespace-pre-wrap text-blue-100">{result}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
