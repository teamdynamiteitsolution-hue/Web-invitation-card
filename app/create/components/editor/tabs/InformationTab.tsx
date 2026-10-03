"use client";

import React, { useRef } from 'react';
import { useEditor } from '../EditorContext';
import { ImagePlus, X, Calendar, Clock } from 'lucide-react';
import { getTemplateById } from '@/lib/template-definitions';

export const InformationTab = ({ dbData }: { dbData?: any }) => {
  const { eventData, updateEventData, selectedTemplateId, layoutPresetId } = useEditor();

  const currentTemplate = dbData?.templates?.find((t: any) => t.id === selectedTemplateId);
  const def = getTemplateById(currentTemplate?.slug) || getTemplateById(selectedTemplateId) || getTemplateById(eventData?.templateSlug) || getTemplateById(eventData?.templateDefinitionId);

  // Intelligently compute active preset from editor state
  const activePreset = layoutPresetId || def?.compositionId || 'classic_editorial';
  const isSplitStyle = activePreset === 'split_couple_portraits' || activePreset === 'split_couple' || currentTemplate?.slug === 'split-couple';
  const isScrollStyle = currentTemplate?.experienceType === 'SCROLL' || currentTemplate?.slug?.includes('scroll') || def?.experienceType === 'SCROLL' || activePreset === 'scroll_full_flow';
  const isArchStyle = activePreset === 'arch_portrait' || activePreset === 'cinematic_scene' || activePreset === 'image_focus' || currentTemplate?.slug === 'arch-portrait' || currentTemplate?.slug === 'cinematic';
  const isBirthday = (eventData.category || 'wedding') === 'birthday';

  let imageSlots: { id: string; label: string; description: string; required: boolean }[] = [];

  if (def && Array.isArray(def.imageSlots) && def.imageSlots.length > 0) {
    imageSlots = def.imageSlots.map(s => ({
      id: s.id,
      label: s.label,
      description: s.description || '',
      required: !!s.required
    }));
  } else if (isBirthday) {
    if (isScrollStyle) {
      imageSlots = [
        { id: 'couplePhoto', label: 'Birthday Star Portrait', description: 'Main portrait for the birthday star', required: true },
        { id: 'gallery1', label: 'Gallery 1', description: 'Memories & moments photo gallery', required: false },
        { id: 'gallery2', label: 'Gallery 2', description: 'Memories & moments photo gallery', required: false },
        { id: 'gallery3', label: 'Gallery 3', description: 'Memories & moments photo gallery', required: false },
        { id: 'gallery4', label: 'Gallery 4', description: 'Memories & moments photo gallery', required: false },
      ];
    } else {
      imageSlots = (def?.imageSlots && def.imageSlots.length > 0)
        ? [{ id: 'couplePhoto', label: 'Birthday Star Photo', description: 'Main portrait for the birthday star', required: true }]
        : [];
    }
  } else if (isScrollStyle) {
    if (currentTemplate?.slug === 'corporate-scroll' || eventData.category === 'corporate') {
      imageSlots = [
        { id: 'couplePhoto', label: 'Couple / Hero Photo', description: 'Main summit banner or executive photo', required: false },
        { id: 'gallery1', label: 'Gallery 1', description: 'Interactive moments gallery', required: false },
        { id: 'gallery2', label: 'Gallery 2', description: 'Interactive moments gallery', required: false },
        { id: 'gallery3', label: 'Gallery 3', description: 'Interactive moments gallery', required: false },
        { id: 'gallery4', label: 'Gallery 4', description: 'Interactive moments gallery', required: false },
      ];
    } else {
      imageSlots = [
        { id: 'bridePhoto', label: 'Bride Photo', description: 'The Happy Couple section', required: true },
        { id: 'groomPhoto', label: 'Groom Photo', description: 'The Happy Couple section', required: true },
        { id: 'couplePhoto', label: 'Couple / Hero Photo', description: 'Top opening hero presentation', required: false },
        { id: 'gallery1', label: 'Gallery 1', description: 'Interactive moments gallery', required: false },
        { id: 'gallery2', label: 'Gallery 2', description: 'Interactive moments gallery', required: false },
        { id: 'gallery3', label: 'Gallery 3', description: 'Interactive moments gallery', required: false },
        { id: 'gallery4', label: 'Gallery 4', description: 'Interactive moments gallery', required: false },
      ];
    }
  } else if (isSplitStyle) {
    imageSlots = [
      { id: 'groomPhoto', label: 'Groom Photo', description: 'Left arch frame portrait', required: true },
      { id: 'bridePhoto', label: 'Bride Photo', description: 'Right arch frame portrait', required: true },
    ];
  } else if (isArchStyle) {
    imageSlots = [
      { id: 'couplePhoto', label: 'Couple / Hero Photo', description: 'Framed inside elegant architectural arch', required: true }
    ];
  } else {
    imageSlots = [];
  }

  const datePickerRef = useRef<HTMLInputElement>(null);
  const timePickerRef = useRef<HTMLInputElement>(null);

  const openDatePicker = () => {
    if (datePickerRef.current) {
      if (typeof datePickerRef.current.showPicker === 'function') {
        datePickerRef.current.showPicker();
      } else {
        datePickerRef.current.focus();
      }
    }
  };

  const openTimePicker = () => {
    if (timePickerRef.current) {
      if (typeof timePickerRef.current.showPicker === 'function') {
        timePickerRef.current.showPicker();
      } else {
        timePickerRef.current.focus();
      }
    }
  };

  const currentCategory = eventData.category || 'wedding';

  const categories = [
    { id: 'wedding', label: 'Wedding', icon: '💍', defaultLabel: 'The Wedding Of' },
    { id: 'birthday', label: 'Birthday', icon: '🎂', defaultLabel: 'Celebrating The Birthday Of' },
    { id: 'holud', label: 'Gaye Holud', icon: '🌿', defaultLabel: 'Gaye Holud Of' },
    { id: 'reception', label: 'Reception', icon: '🥂', defaultLabel: 'Wedding Reception Of' },
    { id: 'party', label: 'Party / Event', icon: '🎉', defaultLabel: 'Cordially Invited To' },
  ];

  const handleCategorySelect = (catId: string, defaultLabel: string) => {
    updateEventData({
      category: catId as any,
      eventLabel: defaultLabel
    });
  };

  const handleFileUpload = (slotId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        updateEventData({ [slotId]: result });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h2 className="text-xl font-bold text-[#2C2623] mb-1" style={{ fontFamily: 'Cinzel, serif' }}>Event Information</h2>
        <p className="text-sm text-[#7C7267]">
          {def?.name ? `Editing details for ${def.name}` : 'Fill in the event details'}
        </p>
      </div>      <div className="space-y-5">
        {/* ============================================================== */}
        {/* 01. EVENT CATEGORY SELECTOR (ONLY FOR SINGLE CARDS)            */}
        {/* ============================================================== */}
        {!isScrollStyle && (
          <div className="bg-stone-50/80 p-3 rounded-2xl border border-[#D4AF37]/30 mb-6">
            <label className="block text-[11px] font-bold text-[#8C4A52] uppercase tracking-wider mb-2">
              Select Event Category
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {categories.map((cat) => {
                const isSelected = currentCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat.id, cat.defaultLabel)}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs font-semibold transition-all border ${
                      isSelected
                        ? 'bg-[#8C4A52] text-white border-[#8C4A52] shadow-sm scale-102'
                        : 'bg-white text-[#2C2623] border-[#D4AF37]/30 hover:border-[#8C4A52]/50 hover:bg-[#F9F0EC]/50'
                    }`}
                  >
                    <span className="text-base mb-1">{cat.icon}</span>
                    <span className="text-[10px] text-center whitespace-nowrap leading-tight">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Event Label / Top Heading */}
        <div>
          <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide mb-1">
            {currentCategory === 'birthday' ? 'Birthday Greeting / Banner' : 'Event Label / Invitation Line'}
          </label>
          <input 
            type="text"
            value={eventData.eventLabel || (currentCategory === 'birthday' ? "Happy Birthday" : "The Wedding Of")}
            onChange={(e) => updateEventData({ eventLabel: e.target.value })}
            placeholder="e.g. The Wedding Of / Happy Birthday / You Are Invited"
            className="w-full px-3 py-2 border border-[#D4AF37]/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C4A52] font-serif text-sm"
          />
        </div>

        {/* Dynamic Name Fields based on Category */}
        {currentCategory === 'birthday' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide mb-1">
                Birthday Person / Star&apos;s Name
              </label>
              <input 
                type="text"
                value={eventData.personName || eventData.brideName || ""}
                onChange={(e) => updateEventData({ 
                  personName: e.target.value,
                  brideName: e.target.value // for compatibility with template layouts
                })}
                placeholder="e.g. Aaryan / Sarah"
                className="w-full px-3 py-2 border border-[#D4AF37]/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C4A52] font-serif"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide mb-1">
                Age / Milestone (e.g. Turning 5)
              </label>
              <input 
                type="text"
                value={eventData.turningAge || ""}
                onChange={(e) => updateEventData({ 
                  turningAge: e.target.value,
                  groomName: e.target.value // for fallback layouts
                })}
                placeholder="e.g. 5th Birthday / Turning 21"
                className="w-full px-3 py-2 border border-[#D4AF37]/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C4A52] font-serif"
              />
            </div>
          </div>
        ) : currentCategory === 'party' ? (
          <div>
            <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide mb-1">
              Event Title / Honoree Name
            </label>
            <input 
              type="text"
              value={eventData.brideName || ""}
              onChange={(e) => updateEventData({ brideName: e.target.value })}
              placeholder="e.g. Annual Gala / John's Farewell"
              className="w-full px-3 py-2 border border-[#D4AF37]/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C4A52] font-serif"
            />
          </div>
        ) : (
          /* Wedding / Gaye Holud / Reception: Bride & Groom */
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide mb-1">
                {currentCategory === 'holud' ? 'Bride / Groom Name' : 'Bride Name'}
              </label>
              <input 
                type="text"
                value={eventData.brideName}
                onChange={(e) => updateEventData({ brideName: e.target.value })}
                placeholder="Bride Name"
                className="w-full px-3 py-2 border border-[#D4AF37]/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C4A52] font-serif"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide mb-1">
                {currentCategory === 'holud' ? 'Partner / Event Tag' : 'Groom Name'}
              </label>
              <input 
                type="text"
                value={eventData.groomName}
                onChange={(e) => updateEventData({ groomName: e.target.value })}
                placeholder="Groom Name"
                className="w-full px-3 py-2 border border-[#D4AF37]/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C4A52] font-serif"
              />
            </div>
          </div>
        )}

        {/* Date & Time with Interactive Calendar & Clock Pickers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide">
                Event Date
              </label>
              <button 
                type="button"
                onClick={openDatePicker}
                className="flex items-center gap-1 text-[11px] font-bold text-[#8C4A52] hover:text-[#7a3e45] bg-[#F9F0EC] px-2 py-0.5 rounded-md border border-[#8C4A52]/20"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Open Calendar</span>
              </button>
            </div>
            <div className="relative flex items-center">
              <input 
                type="text"
                value={eventData.date}
                onChange={(e) => updateEventData({ date: e.target.value })}
                placeholder="e.g. Saturday, 14 June 2026"
                className="w-full pl-3 pr-10 py-2.5 border border-[#D4AF37]/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C4A52] font-serif text-xs font-medium"
              />
              <button 
                type="button"
                onClick={openDatePicker}
                className="absolute right-2.5 text-[#8C4A52] hover:scale-110 active:scale-95 transition-transform p-1"
                title="Open Calendar"
              >
                <Calendar className="w-4 h-4" />
              </button>
              {/* Actual Native Date Input for Picker Dialog */}
              <input 
                ref={datePickerRef}
                type="date"
                className="absolute opacity-0 pointer-events-none w-0 h-0 -z-10"
                onChange={(e) => {
                  if (e.target.value) {
                    const [y, m, d] = e.target.value.split('-').map(Number);
                    const picked = new Date(y, m - 1, d);
                    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    const formatted = `${days[picked.getDay()]}, ${picked.getDate()} ${months[picked.getMonth()]} ${picked.getFullYear()}`;
                    updateEventData({ date: formatted });
                  }
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide">
                Event Time
              </label>
              <button 
                type="button"
                onClick={openTimePicker}
                className="flex items-center gap-1 text-[11px] font-bold text-[#8C4A52] hover:text-[#7a3e45] bg-[#F9F0EC] px-2 py-0.5 rounded-md border border-[#8C4A52]/20"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Open Clock</span>
              </button>
            </div>
            <div className="relative flex items-center">
              <input 
                type="text"
                value={eventData.time}
                onChange={(e) => updateEventData({ time: e.target.value })}
                placeholder="e.g. 07:00 PM"
                className="w-full pl-3 pr-10 py-2.5 border border-[#D4AF37]/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C4A52] font-serif text-xs font-medium"
              />
              <button 
                type="button"
                onClick={openTimePicker}
                className="absolute right-2.5 text-[#8C4A52] hover:scale-110 active:scale-95 transition-transform p-1"
                title="Open Clock"
              >
                <Clock className="w-4 h-4" />
              </button>
              {/* Actual Native Time Input for Picker Dialog */}
              <input 
                ref={timePickerRef}
                type="time"
                className="absolute opacity-0 pointer-events-none w-0 h-0 -z-10"
                onChange={(e) => {
                  if (e.target.value) {
                    const [hours, minutes] = e.target.value.split(':').map(Number);
                    const period = hours >= 12 ? 'PM' : 'AM';
                    const displayHours = hours % 12 || 12;
                    const formatted = `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
                    updateEventData({ time: formatted });
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Venue */}
        <div>
          <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide mb-1">
            {currentCategory === 'birthday' ? 'Party Venue' : 'Venue Name'}
          </label>
          <input 
            type="text"
            value={eventData.venue}
            onChange={(e) => updateEventData({ venue: e.target.value })}
            placeholder="e.g. The Royal Palace / Sky Lounge"
            className="w-full px-3 py-2 border border-[#D4AF37]/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C4A52] font-serif text-sm"
          />
        </div>
        
        <div>
          <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide mb-1">Venue Address</label>
          <input 
            type="text"
            value={eventData.venueAddress}
            onChange={(e) => updateEventData({ venueAddress: e.target.value })}
            placeholder="e.g. Dhaka, Bangladesh"
            className="w-full px-3 py-2 border border-[#D4AF37]/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C4A52] font-serif text-sm"
          />
        </div>

        {/* Google Maps Location Link */}
        <div>
          <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide mb-1">
            Google Maps Location Link (Optional)
          </label>
          <input 
            type="url"
            value={eventData.googleMapsUrl || ""}
            onChange={(e) => updateEventData({ googleMapsUrl: e.target.value })}
            placeholder="e.g. https://maps.app.goo.gl/xyz or Google Maps link"
            className="w-full px-3 py-2 border border-[#D4AF37]/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C4A52] font-serif text-sm"
          />
          <p className="text-[10px] text-[#7C7267] mt-1">
            Guests can click "Get Directions / View on Google Maps" on your interactive card/story.
          </p>
        </div>

        {/* Invitation Message & Card Toggle */}
        <div className="p-3.5 rounded-2xl bg-stone-50/60 border border-[#D4AF37]/30 space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide">
              {currentCategory === 'birthday' ? 'Birthday Wishes / Message' : 'Invitation Message / Story'}
            </label>
            <label className={`flex items-center gap-2 ${isScrollStyle ? 'cursor-default' : 'cursor-pointer'} select-none`}>
              <span className="text-[11px] font-semibold text-[#8C4A52]">
                {isScrollStyle ? 'Always on in Scroll Story' : 'Show on Card'}
              </span>
              <input 
                type="checkbox"
                checked={isScrollStyle ? true : !!eventData.showInvitationMessage}
                disabled={isScrollStyle}
                onChange={(e) => updateEventData({ showInvitationMessage: e.target.checked })}
                className={`w-4 h-4 rounded border-gray-300 text-[#8C4A52] focus:ring-[#8C4A52] ${isScrollStyle ? 'opacity-80 cursor-not-allowed accent-[#8C4A52]' : 'cursor-pointer'}`}
              />
            </label>
          </div>
          <textarea 
            rows={3}
            value={eventData.invitationMessage || ""}
            onChange={(e) => updateEventData({ invitationMessage: e.target.value })}
            placeholder="Write a warm message or greeting to show on the invitation..."
            className="w-full px-3 py-2 bg-white border border-[#D4AF37]/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C4A52] font-serif text-xs leading-relaxed"
          />
          <p className="text-[10px] text-[#7C7267] italic">
            {isScrollStyle
              ? "✓ Proclamation and story are permanently featured in this scroll experience."
              : eventData.showInvitationMessage 
              ? "✓ Message will be rendered in the center of your card." 
              : "Message is saved and will appear in details/story."}
          </p>
        </div>

        {/* ============================================================== */}
        {/* DYNAMIC IMAGE SLOTS SECTION                                    */}
        {/* Only displays the required/optional images for this template    */}
        {/* ============================================================== */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide">
              Required Images ({imageSlots.length})
            </label>
            <span className="text-[10px] text-[#8C4A52] font-bold">
              {imageSlots.length === 0 ? 'No images required' : `${imageSlots.length} image slots defined`}
            </span>
          </div>

          {imageSlots.length === 0 ? (
            <div className="p-4 rounded-xl bg-gray-50 border border-dashed border-gray-200 text-xs text-[#7C7267] text-center italic">
              This typography-first design does not require any image uploads.
            </div>
          ) : (
            <div className="space-y-4">
              {imageSlots.map((slot: any) => {
                const currentVal = eventData[slot.id];
                const hasCustomImg = currentVal && !currentVal.includes('/assets/Cards/') && !currentVal.includes('/assets/categories/');

                return (
                  <div key={slot.id} className="p-3.5 rounded-2xl bg-white border border-[#D4AF37]/30 shadow-xs flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {currentVal ? (
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#D4AF37]/50 flex-shrink-0 bg-stone-100">
                          <img src={currentVal} alt={slot.label} className="w-full h-full object-cover" />
                          {hasCustomImg && (
                            <button 
                              onClick={() => updateEventData({ [slot.id]: "/assets/categories/wedding.webp" })}
                              className="absolute top-1 right-1 bg-white/80 p-0.5 rounded-full text-red-500 hover:bg-white"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-xl border border-dashed border-gray-300 flex items-center justify-center text-gray-400 bg-gray-50 flex-shrink-0">
                          <ImagePlus className="w-5 h-5" />
                        </div>
                      )}

                      <div>
                        <h4 className="font-bold text-xs text-[#2C2623]">{slot.label}</h4>
                        <p className="text-[10px] text-[#7C7267] leading-tight mt-0.5">{slot.description || 'Slot asset'}</p>
                        {slot.required && (
                          <span className="inline-block mt-1 text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                            Required
                          </span>
                        )}
                      </div>
                    </div>

                    <label className="cursor-pointer">
                      <div className="px-3 py-1.5 rounded-xl border border-[#D4AF37]/50 text-[11px] font-bold text-[#8C4A52] hover:bg-[#F9F0EC] transition-colors whitespace-nowrap">
                        Upload
                      </div>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(slot.id, file);
                        }}
                      />
                    </label>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
