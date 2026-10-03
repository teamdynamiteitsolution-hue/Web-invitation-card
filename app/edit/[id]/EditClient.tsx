"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2, Image as ImageIcon, Sparkles, Video, PlayCircle } from "lucide-react";
import DynamicCardExperience from "@/experiences/dynamic-card";

export default function EditClient({ id, invitation, animations }: { id: string, invitation: any, animations: any[] }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState<any>(invitation.eventData ? JSON.parse(invitation.eventData) : {});
  const [revealMode, setRevealMode] = useState<string>(invitation.revealMode || "fade");
  const [customImage, setCustomImage] = useState<string>(invitation.customImage || "");
  const [bgBlur, setBgBlur] = useState<number>(invitation.bgBlur || 0);
  const [animationId, setAnimationId] = useState<string>(invitation.animationId || "");
  const [activeTab, setActiveTab] = useState("content");

  // layoutConfig for dynamic fields
  const layout = invitation.template?.layoutConfig ? JSON.parse(invitation.template.layoutConfig) : { nodes: [] };
  const supportedRevealModes = invitation.template?.supportedRevealModes ? JSON.parse(invitation.template.supportedRevealModes) : ["fade"];
  const supportedBgModes = invitation.template?.supportedBgModes ? JSON.parse(invitation.template.supportedBgModes) : ["none"];
  const templateAnimations = animations.filter(a => a.interactionType === 'video'); // Or check compatibility

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/user/invitations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          contentData: formData,
          revealMode,
          customImage,
          bgBlur,
          animationId
        })
      });
      if (res.ok) {
        router.push("/profile");
      } else {
        alert("Failed to update invitation");
      }
    } catch (e) {
      alert("Error saving data");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const selectedAnimation = animations.find(a => a.id === animationId) || invitation.animation;

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8">
      
      {/* Settings Panel */}
      <div className="flex-1 bg-white rounded-3xl p-6 md:p-8 border border-[#D4AF37]/20 shadow-soft-surface overflow-y-auto max-h-[85vh]">
        <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Cinzel, serif' }}>Customize Invitation</h1>
        
        {/* Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2 hide-scrollbar border-b border-gray-100">
          {[
            { id: 'content', label: 'Content' },
            { id: 'opening', label: 'Opening' },
            { id: 'reveal', label: 'Reveal Style' },
            { id: 'background', label: 'Background' },
          ].map(tab => {
            // Hide background tab if not supported
            if (tab.id === 'background' && !supportedBgModes.some((m: string) => m.includes('user_image'))) return null;
            
            return (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${activeTab === tab.id ? 'bg-[#8C4A52] text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === 'content' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {layout.nodes.map((node: any) => {
                if (node.type !== 'text') return null;
                return (
                  <div key={node.id} className={node.id === 'venue' || node.id === 'message' ? "md:col-span-2" : ""}>
                    <label className="block text-sm font-bold text-[#7C7267] mb-2 uppercase tracking-wider">{node.id.replace(/([A-Z])/g, ' $1').trim()}</label>
                    {node.id === 'venue' || node.id === 'message' ? (
                      <textarea 
                        value={formData[node.id] || ""}
                        onChange={e => setFormData({...formData, [node.id]: e.target.value})}
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#D4AF37]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C4A52] font-serif resize-none"
                        rows={3}
                        placeholder={node.default || `Enter ${node.id}`}
                      />
                    ) : node.id.toLowerCase().includes('date') || node.id.toLowerCase().includes('time') ? (
                      <input 
                        type={node.id.toLowerCase().includes('time') ? "time" : "date"}
                        value={formData[node.id] || ""}
                        onChange={e => setFormData({...formData, [node.id]: e.target.value})}
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#D4AF37]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C4A52] font-serif"
                      />
                    ) : (
                      <input 
                        type="text" 
                        value={formData[node.id] || ""}
                        onChange={e => setFormData({...formData, [node.id]: e.target.value})}
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#D4AF37]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C4A52] font-serif"
                        placeholder={node.default || `Enter ${node.id}`}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {activeTab === 'opening' && (
            <div className="grid grid-cols-1 gap-4">
              <p className="text-gray-500 font-serif mb-2">Select a cinematic opening animation for your guests.</p>
              {templateAnimations.map((anim: any) => (
                <div 
                  key={anim.id}
                  onClick={() => setAnimationId(anim.id)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer flex gap-4 transition-all ${animationId === anim.id ? 'border-[#8C4A52] bg-[#FAF8F5]' : 'border-gray-100 hover:border-[#D4AF37]/50'}`}
                >
                  <div className="w-24 h-24 rounded-xl bg-gray-200 overflow-hidden flex-shrink-0 relative">
                    <img src={anim.previewPosterUrl} alt={anim.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <PlayCircle className="w-8 h-8 text-white opacity-80" />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="font-bold text-[#2C2623] text-lg">{anim.name}</h3>
                    <p className="text-sm text-gray-500 font-serif">{anim.description}</p>
                  </div>
                  {animationId === anim.id && (
                    <div className="flex items-center text-[#8C4A52]">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reveal' && (
            <div className="grid grid-cols-1 gap-4">
              <p className="text-gray-500 font-serif mb-2">How should your invitation details appear after the card opens?</p>
              {supportedRevealModes.map((mode: string) => (
                <div 
                  key={mode}
                  onClick={() => setRevealMode(mode)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center gap-4 transition-all ${revealMode === mode ? 'border-[#8C4A52] bg-[#FAF8F5]' : 'border-gray-100 hover:border-[#D4AF37]/50'}`}
                >
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/20">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#2C2623] capitalize">{mode} Reveal</h3>
                    <p className="text-sm text-gray-500 font-serif">
                      {mode === 'scratch' ? 'Guests scratch the screen to reveal details like a real physical card.' : 
                       mode === 'fade' ? 'Information gently fades in after the card appears.' : 
                       mode === 'sequential' ? 'Details appear one by one elegantly.' : 'Scroll to reveal story.'}
                    </p>
                  </div>
                  {revealMode === mode && <CheckCircle2 className="w-6 h-6 text-[#8C4A52]" />}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'background' && (
            <div className="grid grid-cols-1 gap-6">
              <p className="text-gray-500 font-serif mb-2">Upload a personal photo to use as the background for your invitation.</p>
              
              <div className="w-full relative">
                {customImage ? (
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-gray-200">
                    <img src={customImage} alt="Custom Background" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => setCustomImage("")}
                      className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-red-500 px-3 py-1 rounded-full text-xs font-bold shadow-sm"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="w-full h-48 rounded-2xl border-2 border-dashed border-[#D4AF37]/40 bg-[#FAF8F5] flex flex-col items-center justify-center cursor-pointer hover:bg-[#F9F0EC] transition-colors">
                    <ImageIcon className="w-10 h-10 text-[#D4AF37] mb-2" />
                    <span className="font-bold text-[#2C2623]">Click to upload photo</span>
                    <span className="text-xs text-gray-500 mt-1">JPG, PNG (Max 5MB)</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                )}
              </div>

              {customImage && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-bold text-[#7C7267] uppercase tracking-wider">Background Blur</label>
                    <span className="text-[#8C4A52] font-bold text-sm">{bgBlur}px</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" max="20" step="1"
                    value={bgBlur}
                    onChange={(e) => setBgBlur(Number(e.target.value))}
                    className="w-full accent-[#8C4A52]"
                  />
                  <p className="text-xs text-gray-500 mt-2 font-serif text-center">Adjust blur to make text more readable</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center gap-4">
          <button onClick={() => router.push("/profile")} className="px-6 py-3 rounded-full border border-gray-200 font-bold hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            disabled={saving}
            className="px-8 py-3 bg-[#8C4A52] text-white rounded-full font-bold shadow-elevated-card hover:bg-[#7a3e45] transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Live Preview */}
      <div className="w-full lg:w-[450px] shrink-0 flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4 text-[#2C2623]" style={{ fontFamily: 'Cinzel, serif' }}>Live Preview</h2>
        <div className="relative w-full max-w-[412px] h-[750px] shadow-2xl rounded-[32px] overflow-hidden border-[8px] border-[#1A1614] bg-black">
          <DynamicCardExperience 
            key={`${animationId}-${revealMode}-${customImage ? 'img' : 'noimg'}-${bgBlur}`}
            template={invitation.template} 
            animation={selectedAnimation}
            eventData={formData} 
            revealMode={revealMode}
            customImage={customImage}
            bgBlur={bgBlur}
          />
        </div>
        <p className="mt-4 text-sm text-gray-500 font-serif italic text-center">Interact with the preview above</p>
      </div>

    </main>
  );
}
