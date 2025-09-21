import React from 'react';
import './NumberBall.css';

/**
 * 数字球组件 - 用于展示选中的数字
 */
const NumberBall = ({ number, index, isAnimating = false, totalCount = 6, zone = 'primary' }) => {
  // 根据总数量和索引计算颜色类名
  const getColorClass = (index, totalCount, zone) => {
    // 如果是副区（蓝球/后区），使用特殊颜色
    if (zone === 'secondary') {
      return `number-ball--secondary-${(index % 6) + 1}`;
    }
    
    // 主区的颜色逻辑
    if (totalCount > 6) {
      const colorIndex = (index % 12) + 1; // 支持12种颜色
      return `number-ball--color-${colorIndex}`;
    } else {
      // 原有的颜色逻辑，通过nth-child实现
      return '';
    }
  };

  const colorClass = getColorClass(index, totalCount, zone);

  return (
    <div 
      className={`number-ball ${colorClass} ${isAnimating ? 'number-ball--animating' : ''}`}
      style={{ 
        '--animation-delay': `${index * 100}ms`
      }}
    >
      {isAnimating ? '?' : number}
    </div>
  );
};

export default NumberBall;