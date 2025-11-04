"use client";

import { useState } from "react";

// Node connector component - removed, now using absolute positioned connections

// Work Node - Client/Agency
export const WorkNode = ({
  client,
  agency
}: {
  client: string;
  agency?: string;
}) => (
  <div className="relative group">
    {/* Node container */}
    <div className="backdrop-blur-md bg-gray-900/40 border border-gray-700/50 rounded-lg overflow-hidden hover:border-blue-500/50 transition-all duration-300 shadow-xl">
      {/* Top bar - highlighted */}
      <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/60 border-b border-gray-600/50 px-4 py-2 flex items-center justify-between">
        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Load Work</span>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500/60" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <div className="w-2 h-2 rounded-full bg-green-500/60" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <div>
          <div className="text-xs text-gray-500 font-mono mb-1">CLIENT</div>
          <div className="text-sm font-semibold text-white">{client}</div>
        </div>
        {agency && (
          <div>
            <div className="text-xs text-gray-500 font-mono mb-1">AGENCY</div>
            <div className="text-sm font-semibold text-gray-300">{agency}</div>
          </div>
        )}
      </div>
    </div>
  </div>
);

// Skill Node
export const SkillNode = ({
  skill,
  isLast = false
}: {
  skill: string;
  isLast?: boolean;
}) => (
  <div className="relative group">
    <div className="backdrop-blur-md bg-gray-900/30 border border-gray-700/40 rounded-lg overflow-hidden hover:border-purple-500/50 transition-all duration-300 shadow-lg">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-purple-900/40 to-purple-800/30 border-b border-purple-600/30 px-3 py-1.5 flex items-center justify-between">
        <span className="text-xs font-mono text-purple-300 uppercase tracking-wider">Skill</span>
        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
      </div>

      {/* Content */}
      <div className="p-6 min-h-[120px] flex items-center">
        <div className="text-sm font-medium text-white">{skill}</div>
      </div>
    </div>
  </div>
);

// Video Node
export const VideoNode = ({
  vimeoId,
  thumbnail
}: {
  vimeoId?: string;
  thumbnail?: string;
}) => (
  <div className="relative group">
    <div className="backdrop-blur-md bg-gray-900/40 border border-gray-700/50 rounded-lg overflow-hidden hover:border-green-500/50 transition-all duration-300 shadow-xl">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-green-900/40 to-green-800/30 border-b border-green-600/30 px-3 py-2 flex items-center justify-between">
        <span className="text-xs font-mono text-green-300 uppercase tracking-wider">Output</span>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        </div>
      </div>

      {/* Video preview */}
      <div className="aspect-video bg-black/50 flex items-center justify-center relative overflow-hidden group">
        {vimeoId ? (
          <div className="absolute inset-0">
            <iframe
              src={`https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=0&loop=0&byline=0&title=0&muted=1`}
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allow="autoplay; fullscreen; picture-in-picture"
            />
          </div>
        ) : thumbnail ? (
          <img src={thumbnail} alt="Preview" className="w-full h-full object-cover opacity-60" />
        ) : (
          <div className="text-gray-600">
            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}

        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Vimeo Link Node
export const VimeoNode = ({
  vimeoId,
  onOpenModal
}: {
  vimeoId?: string;
  onOpenModal?: () => void;
}) => (
  <div className="relative group">
    <button
      onClick={onOpenModal}
      className="w-full backdrop-blur-md bg-gray-900/40 border border-gray-700/50 rounded-lg overflow-hidden hover:border-blue-400/70 hover:bg-gray-900/60 transition-all duration-300 shadow-xl cursor-pointer"
    >
      {/* Top bar */}
      <div className="bg-gradient-to-r from-blue-900/40 to-blue-800/30 border-b border-blue-600/30 px-3 py-2 flex items-center justify-between">
        <span className="text-xs font-mono text-blue-300 uppercase tracking-wider">View Full</span>
        <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
        </svg>
      </div>

      {/* Content */}
      <div className="p-3 flex items-center justify-center gap-2">
        <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z"/>
        </svg>
        <span className="text-sm font-medium text-white">Open in Vimeo</span>
      </div>
    </button>
  </div>
);

// Workflow Row - Complete workflow for one project
export const WorkflowRow = ({
  client,
  agency,
  skills,
  vimeoId,
  thumbnail,
  onOpenVimeo
}: {
  client: string;
  agency?: string;
  skills: string[];
  vimeoId?: string;
  thumbnail?: string;
  onOpenVimeo?: () => void;
}) => (
  <div className="relative">
    {/* Main workflow container */}
    <div className="flex items-center justify-start gap-8 py-8">
      {/* 1. Work Node (Load Work) */}
      <div className="w-56 flex-shrink-0 relative z-10">
        <WorkNode client={client} agency={agency} />
        {/* Output connector dot */}
        <div className="absolute top-1/2 -right-4 w-3 h-3 bg-blue-500 rounded-full border-2 border-blue-300 -translate-y-1/2 z-20" />
      </div>

      {/* Connection line 1: Work → Skills */}
      <div className="h-0.5 w-8 bg-gradient-to-r from-blue-500/60 to-purple-500/60 flex-shrink-0" />

      {/* 2. Skills Node(s) */}
      <div className="relative z-10">
        {/* Input connector dot */}
        <div className="absolute top-1/2 -left-4 w-3 h-3 bg-purple-500 rounded-full border-2 border-purple-300 -translate-y-1/2 z-20" />

        <div className="flex flex-col gap-3">
          {skills.map((skill, index) => (
            <div key={index} className="w-48">
              <SkillNode skill={skill} isLast={index === skills.length - 1} />
            </div>
          ))}
        </div>

        {/* Output connector dot */}
        <div className="absolute top-1/2 -right-4 w-3 h-3 bg-purple-500 rounded-full border-2 border-purple-300 -translate-y-1/2 z-20" />
      </div>

      {/* Connection line 2: Skills → Video */}
      <div className="h-0.5 w-8 bg-gradient-to-r from-purple-500/60 to-green-500/60 flex-shrink-0" />

      {/* 3. Video Output Node */}
      <div className="w-[480px] flex-shrink-0 relative z-10">
        {/* Input connector dot */}
        <div className="absolute top-1/2 -left-4 w-3 h-3 bg-green-500 rounded-full border-2 border-green-300 -translate-y-1/2 z-20" />

        <VideoNode vimeoId={vimeoId} thumbnail={thumbnail} />

        {/* Output connector dot */}
        <div className="absolute top-1/2 -right-4 w-3 h-3 bg-green-500 rounded-full border-2 border-green-300 -translate-y-1/2 z-20" />
      </div>

      {/* Connection line 3: Video → Vimeo */}
      <div className="h-0.5 w-8 bg-gradient-to-r from-green-500/60 to-blue-400/60 flex-shrink-0" />

      {/* 4. Vimeo Link Node */}
      <div className="w-44 flex-shrink-0 relative z-10">
        {/* Input connector dot */}
        <div className="absolute top-1/2 -left-4 w-3 h-3 bg-blue-400 rounded-full border-2 border-blue-300 -translate-y-1/2 z-20" />

        <VimeoNode vimeoId={vimeoId} onOpenModal={onOpenVimeo} />
      </div>
    </div>
  </div>
);

// Vimeo Modal
export const VimeoModal = ({
  vimeoId,
  isOpen,
  onClose
}: {
  vimeoId: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-6xl aspect-video" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Vimeo iframe */}
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1`}
          className="w-full h-full rounded-lg"
          style={{ border: 0 }}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};
