import React from 'react';
import './TagSlider.css'; // سنضيف الـ CSS في ملف منفصل

const TagSlider = () => {
  // البيانات المركزية لتسهيل التعديل
  const firstRowTags = [
    '# animation',
    '# Tailwind',
    '# React',
    '# SVG',
    '# HTML'
  ];

  const secondRowTags = [
    '# Gatsby',
    '# HTML',
    '# CSS',
    '# React',
    '# Next.js'
  ];

  const thirdRowTags = [
    '# Next.js',
    '# React',
    '# webdev',
    '# Typescript',
    '# Gatsby'
  ];

  return (
    <div className="app">
      <header>
        <h1>Infinite Scroll Tags</h1>
        <p>CSS-only infinite scrolling animation</p>
      </header>

      <div className="tag-list">
        {/* الصف الأول */}
        <div className="loop-slider" style={{ '--duration': '16638ms', '--direction': 'reverse' }}>
          <div className="inner">
            {firstRowTags.map((tag, index) => (
              <div key={`first-${index}`} className="tag">
                <span>#</span> {tag.replace('# ', '')}
              </div>
            ))}
            {/* المحتوى المكرر */}
            {firstRowTags.map((tag, index) => (
              <div key={`first-dup-${index}`} className="tag">
                <span>#</span> {tag.replace('# ', '')}
              </div>
            ))}
          </div>
        </div>

        {/* الصف الثاني */}
        <div className="loop-slider" style={{ '--duration': '15936ms', '--direction': 'normal' }}>
          <div className="inner">
            {secondRowTags.map((tag, index) => (
              <div key={`second-${index}`} className="tag">
                <span>#</span> {tag.replace('# ', '')}
              </div>
            ))}
            {/* المحتوى المكرر */}
            {secondRowTags.map((tag, index) => (
              <div key={`second-dup-${index}`} className="tag">
                <span>#</span> {tag.replace('# ', '')}
              </div>
            ))}
          </div>
        </div>

        {/* الصف الثالث */}
        <div className="loop-slider" style={{ '--duration': '15936ms', '--direction': 'normal' }}>
          <div className="inner">
            {thirdRowTags.map((tag, index) => (
              <div key={`third-${index}`} className="tag">
                <span>#</span> {tag.replace('# ', '')}
              </div>
            ))}
            {/* المحتوى المكرر */}
            {thirdRowTags.map((tag, index) => (
              <div key={`third-dup-${index}`} className="tag">
                <span>#</span> {tag.replace('# ', '')}
              </div>
            ))}
          </div>
        </div>

        <div className="fade"></div>
      </div>
    </div>
  );
};

export default TagSlider;