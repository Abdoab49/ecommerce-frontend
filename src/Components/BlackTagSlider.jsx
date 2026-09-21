import React from 'react';
import './BlackTagSlider.css';

const BlackTagSlider = () => {
  const rows = [
    {
      tags: ['# animation', '# Tailwind', '# React', '# SVG', '# HTML', '# CSS', '# JavaScript'],
      duration: '20000ms',
      direction: 'reverse'
    },
    {
      tags: ['# Gatsby', '# HTML', '# CSS', '# React', '# Next.js', '# Vue', '# Angular'],
      duration: '18000ms',
      direction: 'normal'
    },
    {
      tags: ['# Next.js', '# React', '# webdev', '# Typescript', '# Gatsby', '# Node.js', '# Python'],
      duration: '22000ms',
      direction: 'reverse'
    },
    {
      tags: ['# UI/UX', '# Design', '# Figma', '# Adobe XD', '# Sketch', '# Prototyping'],
      duration: '19000ms',
      direction: 'normal'
    },
    {
      tags: ['# MongoDB', '# PostgreSQL', '# Firebase', '# Supabase', '# Prisma'],
      duration: '17000ms',
      direction: 'reverse'
    }
  ];

  return (
    <div className="black-app">
      {/* تأثيرات خلفية متحركة اختيارية */}
      <div className="background-effects">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="content">
        <header>
          <h1>
            <span className="highlight">Infinite</span>
            <br />
            Scroll Tags
          </h1>
          <p>CSS-only infinite scrolling animation • Pure Black Theme</p>
        </header>

        <div className="tag-list">
          {rows.map((row, index) => (
            <div 
              key={index}
              className="loop-slider" 
              style={{ '--duration': row.duration, '--direction': row.direction }}
            >
              <div className="inner">
                {row.tags.map((tag, tagIndex) => (
                  <div key={`original-${index}-${tagIndex}`} className="tag">
                    <span>#</span> {tag.replace('# ', '')}
                  </div>
                ))}
                {row.tags.map((tag, tagIndex) => (
                  <div key={`dup-${index}-${tagIndex}`} className="tag">
                    <span>#</span> {tag.replace('# ', '')}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="fade"></div>
        </div>

        <footer>
          <p>✨ Hover to pause • Infinite scroll • Pure CSS</p>
        </footer>
      </div>
    </div>
  );
};

export default BlackTagSlider;