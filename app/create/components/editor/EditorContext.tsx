"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Tab = 'animation' | 'design' | 'information' | 'style';

interface EditorState {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  
  selectedTemplateId: string | null;
  setSelectedTemplateId: (id: string | null) => void;
  
  selectedAnimationId: string | null;
  setSelectedAnimationId: (id: string | null) => void;
  
  eventData: {
    category?: 'wedding' | 'birthday' | 'holud' | 'reception' | 'party' | 'corporate' | 'custom';
    personName?: string;
    turningAge?: string;
    brideName: string;
    groomName: string;
    date: string;
    time: string;
    venue: string;
    venueAddress: string;
    couplePhoto: string;
    showInvitationMessage?: boolean;
    [key: string]: any;
  };
  updateEventData: (data: Partial<EditorState['eventData']>) => void;
  
  typographyStyles: Record<string, string>; // nodeKey -> presetId
  updateTypographyStyle: (nodeKey: string, presetId: string) => void;
  
  layoutPresetId: string;
  setLayoutPresetId: (id: string) => void;
  
  isSaving: boolean;
  setIsSaving: (saving: boolean) => void;
}

const defaultState: EditorState = {
  activeTab: 'animation',
  setActiveTab: () => {},
  
  selectedTemplateId: null,
  setSelectedTemplateId: () => {},
  
  selectedAnimationId: null,
  setSelectedAnimationId: () => {},
  
  eventData: {
    category: "wedding",
    eventLabel: "The Wedding Of",
    brideName: "Lary",
    groomName: "John",
    personName: "Aaryan",
    turningAge: "5th Birthday",
    date: "Saturday, 14 June 2027",
    time: "7:00 PM",
    venue: "The Royal Palace",
    venueAddress: "Dhaka, Bangladesh",
    couplePhoto: "/assets/categories/wedding.webp",
    groomPhoto: "/assets/categories/wedding.webp",
    bridePhoto: "/assets/categories/wedding.webp",
    gallery1: "/assets/Cards/card 1.png",
    gallery2: "/assets/Cards/card 2.png",
    gallery3: "/assets/Cards/card 3.png",
    gallery4: "/assets/Cards/card 4.png",
    invitationMessage: "Your presence will make our special day even more wonderful. We look forward to celebrating with you!",
    showInvitationMessage: false,
    rsvpContact: "+880 1712 345678",
  },
  updateEventData: () => {},
  
  typographyStyles: {},
  updateTypographyStyle: () => {},
  
  layoutPresetId: 'classic_editorial',
  setLayoutPresetId: () => {},
  
  isSaving: false,
  setIsSaving: () => {},
};

const EditorContext = createContext<EditorState>(defaultState);

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<Tab>('animation');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [selectedAnimationId, setSelectedAnimationId] = useState<string | null>(null);
  const [eventData, setEventData] = useState(defaultState.eventData);
  const [typographyStyles, setTypographyStyles] = useState<Record<string, string>>({});
  const [layoutPresetId, setLayoutPresetId] = useState('classic_editorial');
  const [isSaving, setIsSaving] = useState(false);

  const updateEventData = (data: Partial<EditorState['eventData']>) => {
    setEventData(prev => ({ ...prev, ...data }));
  };

  const updateTypographyStyle = (nodeKey: string, presetId: string) => {
    setTypographyStyles(prev => ({ ...prev, [nodeKey]: presetId }));
  };

  return (
    <EditorContext.Provider value={{
      activeTab, setActiveTab,
      selectedTemplateId, setSelectedTemplateId,
      selectedAnimationId, setSelectedAnimationId,
      eventData, updateEventData,
      typographyStyles, updateTypographyStyle,
      layoutPresetId, setLayoutPresetId,
      isSaving, setIsSaving
    }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => useContext(EditorContext);
