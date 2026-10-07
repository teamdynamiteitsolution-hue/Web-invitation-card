"use client";

import React, { useState } from 'react';
import { useEditor } from '../EditorContext';
import { LayoutTemplate, CheckCircle2, Scroll, Sparkles } from 'lucide-react';

export const DesignTab = ({ templates }: { templates: any[] }) => {
  const { selectedTemplateId, setSelectedTemplateId, setLayoutPresetId, updateEventData } = useEditor();
  const [filter, setFilter] = useState<'card' | 'scroll' | 'all'>('card');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // ONLY render templates directly from the database (zero fake/duplicate items)
  const allTemplates = React.useMemo(() => {
    return (templates || []).map(t => {
      let manifest: any = {};
      try {
        manifest = typeof t.assetManifest === 'string' ? JSON.parse(t.assetManifest) : (t.assetManifest || {});
      } catch {}

      const exp = (t.experienceType || '').toLowerCase();
      const isScroll = exp === 'scroll' || exp === 'scroll_story';

      return {
        id: t.id,
        slug: t.slug || t.id,
        name: t.name,
        price: Number(t.price || 0),
        category: t.category?.slug || t.category?.name?.toLowerCase() || 'wedding',
        experienceType: isScroll ? 'SCROLL' : (t.experienceType || 'dynamic_card'),
        compositionId: manifest.photoFrameStyle || t.archetype || 'classic_editorial',
        previewImageUrl: t.previewImageUrl || '',
      };
    });
  }, [templates]);

  const handleSelect = (tmpl: any) => {
    setSelectedTemplateId(tmpl.id);
    if (tmpl.compositionId) {
      setLayoutPresetId(tmpl.compositionId);
    }
    updateEventData({
      templateSlug: tmpl.slug,
      templateDefinitionId: tmpl.id,
      layoutPresetId: tmpl.compositionId,
      ...(tmpl.category && tmpl.category !== 'all' ? { category: tmpl.category as any } : {})
    });
  };

  const isScrollType = (type: string) => {
    const t = (type || '').toLowerCase();
    return t === 'scroll' || t === 'scroll_story';
  };

  const filteredTemplates = allTemplates.filter(tmpl => {
    // 1. Format Filter
    const isScroll = isScrollType(tmpl.experienceType);
    if (filter === 'scroll' && !isScroll) return false;
    if (filter === 'card' && isScroll) return false;

    // 2. Category Sub-filter
    if (categoryFilter !== 'all') {
      if (tmpl.category !== categoryFilter) return false;
    }

    return true;
  });

  const scrollCategories = [
    { id: 'all', label: 'All Scrolls' },
    { id: 'wedding', label: '💍 Wedding' },
    { id: 'holud', label: '🌿 Gaye Holud' },
    { id: 'birthday', label: '🎂 Birthday' },
    { id: 'corporate', label: '💼 Office / Corporate' },
    { id: 'reception', label: '🥂 Reception' },
  ];

  const cardCategories = [
    { id: 'all', label: 'All Cards' },
    { id: 'wedding', label: '💍 Wedding' },
    { id: 'holud', label: '🌿 Gaye Holud' },
    { id: 'birthday', label: '🎂 Birthday' },
    { id: 'reception', label: '🥂 Reception' },
    { id: 'party', label: '🎉 Party / Event' },
  ];

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h2 className="text-xl font-bold text-[#2C2623] mb-1" style={{ fontFamily: 'Cinzel, serif' }}>Card Design</h2>
        <p className="text-sm text-[#7C7267]">Select format &amp; category for your invitation.</p>
      </div>

      {/* Primary Format Filter Tabs: Single Card vs Scroll Page */}
      <div className="flex gap-2 p-1.5 bg-stone-100 rounded-2xl select-none border border-[#D4AF37]/20">
        {[
          { id: 'card', label: '🎴 Single Card' },
          { id: 'scroll', label: '📜 Scroll Page' },
          { id: 'all', label: 'All Formats' },
        ].map(f => (
          <button
            key={f.id}
            type="button"
            onClick={() => {
              setFilter(f.id as any);
              setCategoryFilter('all');
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all text-center ${
              filter === f.id
                ? 'bg-[#8C4A52] text-white shadow-sm'
                : 'text-[#7C7267] hover:text-[#2C2623] hover:bg-white/50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Sub-Category Filter Row */}
      <div className="space-y-1.5">
        <label className="text-[10px] uppercase tracking-wider font-bold text-[#8C4A52] block px-1">
          {filter === 'scroll' ? 'Scroll Page Categories' : 'Card Categories'}
        </label>
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none select-none">
          {(filter === 'scroll' ? scrollCategories : cardCategories).map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                categoryFilter === cat.id
                  ? 'bg-[#2C2623] text-[#D4AF37] border-[#D4AF37] shadow-xs'
                  : 'bg-white text-[#7C7267] border-stone-200 hover:border-[#D4AF37]/50 hover:bg-[#F9F0EC]/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
        {filteredTemplates.length === 0 && (
          <div className="col-span-2 py-12 text-center text-stone-400 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
            <LayoutTemplate className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-xs font-semibold text-[#7C7267]">No templates found in this category.</p>
            <p className="text-[11px] text-stone-400 mt-1">Add new templates via the Admin Panel.</p>
          </div>
        )}

        {filteredTemplates.map(tmpl => {
          const isScroll = isScrollType(tmpl.experienceType);
          const isSelected = selectedTemplateId === tmpl.id;

          // Dedicated accurate visual banner for each scroll template
          const renderScrollThumbnail = () => {
            if (tmpl.slug === 'haldi-scroll') {
              return (
                <div className="w-full h-full bg-gradient-to-b from-[#FEF08A] via-[#FACC15] to-[#CA8A04] text-[#713F12] flex flex-col justify-between p-3 select-none text-center relative overflow-hidden">
                  <div className="text-xl">🌼</div>
                  <div>
                    <span className="text-[8px] uppercase tracking-widest font-bold block opacity-80">Gaye Holud</span>
                    <h5 className="font-bold text-xs leading-tight text-[#713F12]">Haldi Fiesta</h5>
                  </div>
                  <span className="text-[8px] bg-white/70 backdrop-blur-xs px-2 py-0.5 rounded-full font-bold uppercase self-center shadow-xs">
                    Festive Yellow
                  </span>
                </div>
              );
            }
            if (tmpl.slug === 'birthday-scroll') {
              return (
                <div className="w-full h-full bg-gradient-to-b from-[#180B38] via-[#2E1065] to-[#0F0728] text-white flex flex-col justify-between p-3 select-none text-center relative overflow-hidden">
                  <div className="text-xl">🎂 ✨</div>
                  <div>
                    <span className="text-[8px] uppercase tracking-widest font-bold block text-amber-300">Birthday Glow</span>
                    <h5 className="font-bold text-xs leading-tight text-white">Milestone Party</h5>
                  </div>
                  <span className="text-[8px] bg-purple-500/40 border border-purple-400/60 px-2 py-0.5 rounded-full font-bold uppercase self-center shadow-xs text-amber-200">
                    Cosmic Starlight
                  </span>
                </div>
              );
            }
            if (tmpl.slug === 'corporate-scroll') {
              return (
                <div className="w-full h-full bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0A0F1D] text-white flex flex-col justify-between p-3 select-none text-center relative overflow-hidden">
                  <div className="text-xl">🌐 🏢</div>
                  <div>
                    <span className="text-[8px] uppercase tracking-widest font-bold block text-sky-400">Corporate</span>
                    <h5 className="font-bold text-xs leading-tight text-white">Prestige Summit</h5>
                  </div>
                  <span className="text-[8px] bg-sky-500/20 border border-sky-400/50 px-2 py-0.5 rounded-full font-bold uppercase self-center text-sky-200">
                    Executive Navy
                  </span>
                </div>
              );
            }
            if (tmpl.slug === 'velvet-scroll') {
              return (
                <div className="w-full h-full bg-gradient-to-b from-[#450A0A] via-[#5C0D11] to-[#2B050B] text-[#FAF6F0] flex flex-col justify-between p-3 select-none text-center relative overflow-hidden">
                  <div className="text-xl text-[#D4AF37]">👑 ❦</div>
                  <div>
                    <span className="text-[8px] uppercase tracking-widest font-bold block text-[#D4AF37]">Reception</span>
                    <h5 className="font-bold text-xs leading-tight text-white">Ruby Velvet</h5>
                  </div>
                  <span className="text-[8px] bg-[#D4AF37]/20 border border-[#D4AF37]/60 px-2 py-0.5 rounded-full font-bold uppercase self-center text-[#D4AF37]">
                    Crimson &amp; Gold
                  </span>
                </div>
              );
            }
            if (tmpl.slug === 'botanical-scroll') {
              return (
                <div className="w-full h-full bg-gradient-to-b from-[#EBF3EE] via-[#F4F8F5] to-white text-[#1B3022] flex flex-col justify-between p-3 select-none text-center relative overflow-hidden">
                  <div className="text-xl text-[#1F4E3B]">🌿 ❦</div>
                  <div>
                    <span className="text-[8px] uppercase tracking-widest font-bold block text-[#1F4E3B]">Garden Story</span>
                    <h5 className="font-bold text-xs leading-tight text-[#1B3022]">Emerald Sage</h5>
                  </div>
                  <span className="text-[8px] bg-[#1F4E3B]/10 border border-[#1F4E3B]/40 px-2 py-0.5 rounded-full font-bold uppercase self-center text-[#1F4E3B]">
                    Botanical Green
                  </span>
                </div>
              );
            }
            if (tmpl.slug === 'floral-romance-scroll') {
              return (
                <div className="w-full h-full bg-gradient-to-b from-[#4A171E] via-[#6A2D31] to-[#2B080E] text-[#EDE7E1] flex flex-col justify-between p-3 select-none text-center relative overflow-hidden border border-[#D4AF37]/30">
                  <div className="text-xl text-[#E6C6C3]">🌸 ❦</div>
                  <div>
                    <span className="text-[8px] uppercase tracking-widest font-bold block text-[#E6C6C3]">Floral Romance</span>
                    <h5 className="font-bold text-xs leading-tight text-white font-serif">Blossom Luxury</h5>
                  </div>
                  <span className="text-[8px] bg-[#E6C6C3]/20 border border-[#E6C6C3]/50 px-2 py-0.5 rounded-full font-bold uppercase self-center text-[#E6C6C3]">
                    Burgundy &amp; Rose Gold
                  </span>
                </div>
              );
            }
            if (tmpl.slug === 'editorial-botanical-scroll') {
              return (
                <div className="w-full h-full bg-gradient-to-b from-[#F5F0E8] via-[#ECE5D8] to-[#DDD5C5] text-[#28352B] flex flex-col justify-between p-3 select-none text-center relative overflow-hidden border border-[#9BA58F]/40">
                  <div className="text-xl text-[#71806C]">🌿 ✦</div>
                  <div>
                    <span className="text-[8px] uppercase tracking-widest font-bold block text-[#71806C]">Minimal Arch</span>
                    <h5 className="font-bold text-xs leading-tight text-[#28352B] font-serif">Editorial Botanical</h5>
                  </div>
                  <span className="text-[8px] bg-[#71806C]/15 border border-[#71806C]/40 px-2 py-0.5 rounded-full font-bold uppercase self-center text-[#28352B]">
                    Olive &amp; Cream
                  </span>
                </div>
              );
            }
            if (tmpl.slug === 'cinematic-story-scroll') {
              return (
                <div className="w-full h-full bg-gradient-to-b from-[#11100E] via-[#1E1C18] to-[#0A0908] text-[#EEE8DC] flex flex-col justify-between p-3 select-none text-center relative overflow-hidden border border-[#C5B69A]/30">
                  <div className="text-xl text-[#C5B69A]">🎬 ✦</div>
                  <div>
                    <span className="text-[8px] uppercase tracking-widest font-bold block text-[#C5B69A]">Cinematic Story</span>
                    <h5 className="font-bold text-xs leading-tight text-white font-serif">Chapter &amp; Drama</h5>
                  </div>
                  <span className="text-[8px] bg-[#C5B69A]/20 border border-[#C5B69A]/50 px-2 py-0.5 rounded-full font-bold uppercase self-center text-[#C5B69A]">
                    Midnight &amp; Gold
                  </span>
                </div>
              );
            }
            if (tmpl.slug === 'botanical-magazine-scroll') {
              return (
                <div className="w-full h-full bg-gradient-to-b from-[#F8F4EC] via-[#EAE3D2] to-[#D7CCA8] text-[#24382B] flex flex-col justify-between p-3 select-none text-center relative overflow-hidden border border-[#B9C9A9]/50">
                  <div className="text-xl text-[#A37C4A]">📰 ❦</div>
                  <div>
                    <span className="text-[8px] uppercase tracking-widest font-bold block text-[#73816F]">Magazine Spread</span>
                    <h5 className="font-bold text-xs leading-tight text-[#24382B] font-serif">Botanical Magazine</h5>
                  </div>
                  <span className="text-[8px] bg-[#A37C4A]/15 border border-[#A37C4A]/40 px-2 py-0.5 rounded-full font-bold uppercase self-center text-[#73816F]">
                    Earth Tone Spread
                  </span>
                </div>
              );
            }
            // Default Royal Heritage
            return (
              <div className="w-full h-full bg-gradient-to-b from-[#2C241E] via-[#3D322A] to-[#1F1915] text-[#FAF6F0] flex flex-col justify-between p-3 select-none text-center relative overflow-hidden">
                <div className="text-xl text-[#D4AF37]">❖ ⚜</div>
                <div>
                  <span className="text-[8px] uppercase tracking-widest font-bold block text-[#D4AF37]">Palace Edition</span>
                  <h5 className="font-bold text-xs leading-tight text-white">Royal Heritage</h5>
                </div>
                <span className="text-[8px] bg-[#D4AF37]/20 border border-[#D4AF37]/60 px-2 py-0.5 rounded-full font-bold uppercase self-center text-[#D4AF37]">
                  Gold &amp; Ivory
                </span>
              </div>
            );
          };

          return (
            <div 
              key={tmpl.id}
              onClick={() => handleSelect(tmpl)}
              className={`cursor-pointer group relative rounded-2xl overflow-hidden border-2 transition-all ${
                isSelected ? 'border-[#8C4A52] shadow-md ring-2 ring-[#8C4A52]/20' : 'border-stone-200 hover:border-[#D4AF37]/60'
              }`}
            >
              {/* Badge for format */}
              <div className="absolute top-2 left-2 z-20">
                {isScroll ? (
                  <span className="bg-[#8C4A52] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                    <Scroll className="w-2.5 h-2.5" /> Scroll
                  </span>
                ) : (
                  <span className="bg-[#2C2623]/80 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-xs">
                    Card
                  </span>
                )}
              </div>

              {/* Price Badge & Selection Indicator on Top Right */}
              <div className="absolute top-2 right-2 z-20 flex items-center gap-1">
                <span className="bg-white/95 backdrop-blur-xs text-[#8C4A52] font-extrabold text-[10px] sm:text-xs px-2 py-0.5 rounded-md border border-[#D4AF37]/40 shadow-xs">
                  ৳{tmpl.price}
                </span>
                {isSelected && (
                  <div className="bg-[#8C4A52] text-white rounded-full p-0.5 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              {/* Thumbnail Container */}
              <div className="aspect-[4/5] bg-gray-100 relative overflow-hidden">
                {isScroll ? (
                  <div className="w-full h-full relative">
                    {renderScrollThumbnail()}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-transparent to-transparent py-1 text-center">
                      <span className="text-[8px] text-white/95 font-mono tracking-wider">↕ Interactive Scroll</span>
                    </div>
                  </div>
                ) : tmpl.previewImageUrl ? (
                  <img 
                    src={tmpl.previewImageUrl} 
                    alt={tmpl.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <LayoutTemplate className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Caption */}
              <div className={`p-2.5 text-center ${isSelected ? 'bg-[#F9F0EC]' : 'bg-gray-50'}`}>
                <h4 className="font-bold text-xs text-[#2C2623] truncate">{tmpl.name}</h4>
                <span className="text-[9px] uppercase text-[#7C7267] tracking-wider block mt-0.5">
                  {tmpl.category} • {isScroll ? 'Scroll Story' : 'Single Card'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
