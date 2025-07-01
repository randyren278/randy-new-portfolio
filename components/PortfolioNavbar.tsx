"use client";
import React from "react";
import { FloatingNav } from "./ui/floating-navbar";

// You'll need to install @tabler/icons-react or replace these with your preferred icons
// npm install @tabler/icons-react

// For now, I'll create simple SVG icons since we can't guarantee @tabler/icons-react is installed
const HomeIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const UserIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const MessageIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const FolderIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

export interface PortfolioNavbarProps {
  onAboutClick?: () => void;
  onContactClick?: () => void;
  onProjectsClick?: () => void;
  onHomeClick?: () => void;
}

export function PortfolioNavbar({ 
  onAboutClick, 
  onContactClick, 
  onProjectsClick, 
  onHomeClick 
}: PortfolioNavbarProps) {
  const navItems = [
    {
      name: "Home",
      link: "#",
      icon: <HomeIcon />,
      onClick: onHomeClick || (() => {
        // Default action - scroll to top or refresh view
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }),
    },
    {
      name: "About",
      link: "#",
      icon: <UserIcon />,
      onClick: onAboutClick || (() => {
        console.log("About clicked - no handler provided");
      }),
    },
    {
      name: "Projects",
      link: "#",
      icon: <FolderIcon />,
      onClick: onProjectsClick || (() => {
        console.log("Projects clicked - no handler provided");
      }),
    },
    {
      name: "Contact",
      link: "#",
      icon: <MessageIcon />,
      onClick: onContactClick || (() => {
        console.log("Contact clicked - no handler provided");
      }),
    },
  ];

  return <FloatingNav navItems={navItems} alwaysVisible={true} />;
}