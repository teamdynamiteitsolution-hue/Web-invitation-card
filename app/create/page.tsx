"use client";

import React, { Suspense } from 'react';
import { EditorProvider } from './components/editor/EditorContext';
import { EditorLayout } from './components/editor/EditorLayout';
import { Loader2 } from 'lucide-react';

export default function CreateInvitationPage() {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center bg-[#FAF8F5]">
        <Loader2 className="w-8 h-8 animate-spin text-[#8C4A52]" />
      </div>
    }>
      <EditorProvider>
        <EditorLayout />
      </EditorProvider>
    </Suspense>
  );
}

