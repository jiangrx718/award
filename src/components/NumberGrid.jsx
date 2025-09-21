import React from 'react';
import NumberBall from './NumberBall';
import './NumberGrid.css';

/**
 * 数字网格组件 - 展示选中的数字
 */
const NumberGrid = ({ numbers, isAnimating = false, maxCount = 6, title = '幸运数字' }) => {
  // 根据maxCount动态创建显示位置
  const displayNumbers = Array.from({ length: maxCount }, (_, index) => 
    numbers[index] || null
  );

  // 计算布局类名和CSS变量
  const getLayoutClass = (count) => {
    if (count <= 3) return `number-grid__container--count-${count}`;
    if (count <= 10) return `number-grid__container--count-${count}`;
    return 'number-grid__container--count-10';
  };

  const containerStyle = maxCount <= 3 ? { '--count': maxCount } : {};

  return (
    <div className="number-grid">
      <h2 className="number-grid__title">
        {isAnimating ? '正在抽取中...' : title}
      </h2>
      <div 
        className={`number-grid__container ${getLayoutClass(maxCount)}`}
        style={containerStyle}
      >
        {displayNumbers.map((number, index) => (
          <NumberBall
            key={index}
            number={number}
            index={index}
            isAnimating={isAnimating}
            totalCount={maxCount}
          />
        ))}
      </div>
    </div>
  );
};

export default NumberGrid;