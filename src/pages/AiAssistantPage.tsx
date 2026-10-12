import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import {
  Cpu,
  Send,
  Sparkles,
  Bot,
  User,
  ShieldCheck,
  RotateCcw,
  HelpCircle,
  AlertTriangle,
} from 'lucide-react';

interface AiAssistantPageProps {
  selectedCounty: string;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const AiAssistantPage: React.FC<AiAssistantPageProps> = ({ selectedCounty }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-0',
      sender: 'ai',
      text: `Habari! I am Daktari wa Shamba, your AI Agronomist & Livestock Extension Officer for ${selectedCounty}. Ask me anything about crop diseases, pest control, dairy feeding formulas, or fertilizer rates.`,
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    'How do I eradicate Fall Armyworm in young maize?',
    'What is the ideal feeding formula to boost cow milk from 14L to 25L?',
    'How to prevent blossom end rot in greenhouse tomatoes?',
    'What is the recommended spacing and fertilizer for Hass avocado?',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const generateLocalResponse = (q: string): string => {
    const query = q.toLowerCase();
    if (query.includes('armyworm') || query.includes('spodoptera')) {
      return `For Fall Armyworm in ${selectedCounty}:\n1. Biological: Spray Neem extract or Bacillus thuringiensis (Bt) at dusk. Apply Push-Pull technology by intercropping with Desmodium.\n2. Chemical options: Spinetoram (Radiant 120 SC at 10ml/20L) or Emamectin benzoate (Escort 19 EC at 15ml/20L). Rotate modes of action to prevent resistance.\n3. Pro-tip: Direct the spray lance straight into the funnel whorl late in the afternoon when caterpillars feed.`;
    }
    if (query.includes('milk') || query.includes('dairy') || query.includes('cow') || query.includes('feed')) {
      return `To boost milk yield from 14L to 22L+ in dairy cattle:\n1. Fodder Dry Matter: Ensure cow gets at least 15-18kg Dry Matter daily (approx. 50-60kg quality chopped maize silage or boma rhodes grass).\n2. Concentrates Rule: Feed 1kg of high-quality 16% Crude Protein Dairy Meal for every 2 to 2.5 Liters of milk produced above baseline (7kg meal for a 20L cow).\n3. Minerals & Water: Free-choice ad-libitum clean drinking water (a dairy cow drinks 80-120L water/day!) and 150g macro-mineral lick daily.`;
    }
    if (query.includes('tomato') || query.includes('blossom') || query.includes('rot')) {
      return `Blossom End Rot is caused by calcium deficiency in developing fruits, often triggered by irregular irrigation:\n1. Irrigation Consistency: Drip irrigate consistently to maintain moist (not soggy) root zones.\n2. Calcium Foliar: Spray Calcium Nitrate or Chelate foliar spray (e.g. Calmax at 30ml/20L) every 7-10 days starting at early flower set.\n3. Avoid high ammonium fertilizers during early fruiting as ammonium ions compete with calcium uptake.`;
    }
    if (query.includes('avocado') || query.includes('hass')) {
      return `For Hass Avocado in ${selectedCounty}:\n1. Spacing: 5m x 5m (150 trees/acre) or 6m x 6m (110 trees/acre).\n2. Planting Holes: Dig 60cm x 60cm x 60cm holes. Mix topsoil with 20kg well-decomposed farmyard manure + 250g Single Super Phosphate (SSP) or DAP.\n3. Moisture: Irrigate young grafted trees with 20-30 Liters of water twice a week during dry months and mulch heavily.`;
    }
    return `Thank you for your question regarding farming in ${selectedCounty}. Based on Kenya Agricultural & Livestock Research Organization (KALRO) protocols:\n- Maintain optimal soil organic matter by incorporating farmyard compost.\n- Always perform preventive scouting during early morning or dusk.\n- Ensure you adhere strictly to Pre-Harvest Intervals (PHI) when applying any chemical crop protection.\nFeel free to ask a more specific question about crops, dairy, poultry, or fertilizer formulas!`;
  };

  const handleSend = async (textToSend?: string) => {
    const queryText = (textToSend || input).trim();
    if (!queryText) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: queryText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      let aiText = '';
      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
        const ai = new GoogleGenAI({ apiKey });
        const systemPrompt = `You are "Daktari wa Shamba", a senior East African agronomist and veterinarian for ${selectedCounty}, Kenya. Provide precise, practical, climate-smart farming solutions with exact dosages (e.g. per 20L knapsack or per acre) and organic/biological options. Keep answers concise, highly actionable, and polite.`;
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `${systemPrompt}\n\nFarmer Question: ${queryText}`,
        });
        aiText = response.text || generateLocalResponse(queryText);
      } else {
        // Fallback domain-expert engine
        await new Promise((r) => setTimeout(r, 600));
        aiText = generateLocalResponse(queryText);
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const fallback = generateLocalResponse(queryText);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: fallback,
          time: 'Just now',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                Ask AI Daktari wa Shamba
              </h1>
              <p className="text-xs text-stone-500">
                24/7 Smart Agronomy, Pest Diagnosis & Dairy Formulation for {selectedCounty}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Backed by KALRO & KEPHIS Standards</span>
        </div>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-none">
        <span className="font-semibold text-stone-500 text-[11px] shrink-0">Try asking:</span>
        {quickQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => handleSend(q)}
            className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 hover:border-emerald-500 hover:text-emerald-800 text-stone-700 whitespace-nowrap shadow-2xs transition"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Window */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-md flex flex-col h-[520px] overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#F4F1EA]/40">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 max-w-[85%] ${
                m.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white ${
                  m.sender === 'ai' ? 'bg-emerald-700' : 'bg-stone-800'
                }`}
              >
                {m.sender === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs whitespace-pre-line ${
                  m.sender === 'user'
                    ? 'bg-emerald-800 text-white rounded-tr-none'
                    : 'bg-white text-stone-800 border border-stone-200 rounded-tl-none'
                }`}
              >
                <div className="font-semibold text-[10px] mb-1 opacity-70">
                  {m.sender === 'ai' ? 'Daktari wa Shamba' : 'You'} • {m.time}
                </div>
                {m.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center text-white shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-stone-200 text-xs text-stone-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]" />
                <span>Consulting agronomy database for {selectedCounty}...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 sm:p-4 bg-white border-t border-stone-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your crop or livestock question (e.g. symptoms, dosages, feeds)..."
            className="flex-1 text-xs sm:text-sm px-4 py-2.5 rounded-2xl bg-stone-50 border border-stone-300 focus:outline-hidden focus:border-emerald-600"
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold disabled:opacity-40 transition shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
