"use client";

import React, { useState } from 'react';
import { useEditor } from '../EditorContext';
import { TYPOGRAPHY_PRESETS, getPresetStyle } from '@/lib/typography-presets';
import { getTemplateById } from '@/lib/template-definitions';

export const StyleTab = ({ dbData }: { dbData?: any }) => {
  const { typographyStyles, updateTypographyStyle, selectedTemplateId, eventData } = useEditor();
  const [targetNode, setTargetNode] = useState<string>('brideName');

  const currentTemplate = dbData?.templates?.find((t: any) => t.id === selectedTemplateId);
  const def = getTemplateById(currentTemplate?.slug) || getTemplateById(selectedTemplateId) || getTemplateById(eventData?.templateSlug) || getTemplateById(eventData?.templateDefinitionId);
  
  // Detect if current template is a Scroll Page or a Single Card
  const isScroll = def?.experienceType === 'SCROLL' || 
                   currentTemplate?.experienceType === 'SCROLL' || 
                   currentTemplate?.slug?.includes('scroll') || 
                   selectedTemplateId?.includes('scroll');

  const applyPresetToGlobal = (presetId: string) => {
    updateTypographyStyle(targetNode, presetId);
  };

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h2 className="text-xl font-bold text-[#2C2623] mb-1" style={{ fontFamily: 'Cinzel, serif' }}>Typography &amp; Fonts</h2>
        <p className="text-sm text-[#7C7267]">
          Customize typography and font styles for your invitation names and headings.
        </p>
      </div>

      {/* Typography Section (Available for both Card and Scroll) */}
      <div className="space-y-4">
        <h3 className="text-xs uppercase tracking-widest font-bold text-[#2C2623] border-b pb-1">Select Field to Style</h3>

        <div className="flex flex-wrap gap-2 mb-4">
          <button 
            onClick={() => setTargetNode('brideName')} 
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${targetNode === 'brideName' ? 'bg-[#2C2623] text-white' : 'bg-gray-100 text-[#7C7267] hover:bg-gray-200'}`}
          >
            Bride / Name
          </button>
          <button 
            onClick={() => setTargetNode('groomName')} 
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${targetNode === 'groomName' ? 'bg-[#2C2623] text-white' : 'bg-gray-100 text-[#7C7267] hover:bg-gray-200'}`}
          >
            Groom / Title
          </button>
          <button 
            onClick={() => setTargetNode('primaryHeading')} 
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${targetNode === 'primaryHeading' ? 'bg-[#2C2623] text-white' : 'bg-gray-100 text-[#7C7267] hover:bg-gray-200'}`}
          >
            Event Label
          </button>
        </div>

        <div className="space-y-3">
          {TYPOGRAPHY_PRESETS.map(preset => {
            const style = getPresetStyle(preset.id);
            const isSelected = typographyStyles[targetNode] === preset.id;
            
            return (
              <button
                key={preset.id}
                onClick={() => applyPresetToGlobal(preset.id)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex flex-col gap-2 ${isSelected ? 'border-[#8C4A52] bg-[#F9F0EC]' : 'border-gray-100 hover:border-[#D4AF37]/50 bg-white shadow-sm'}`}
              >
                <div className="text-xs uppercase tracking-widest text-[#7C7267] font-bold font-sans">
                  {preset.name}
                </div>
                <div 
                  className="text-2xl text-[#2C2623]" 
                  style={style as any}
                >
                  Elegance &amp; Style
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
