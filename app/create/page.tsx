"use client";

import React from 'react';
import { EditorProvider } from './components/editor/EditorContext';
import { EditorLayout } from './components/editor/EditorLayout';

export default function CreateInvitationPage() {
  return (
    <EditorProvider>
      <EditorLayout />
    </EditorProvider>
  );
}
