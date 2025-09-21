import React from 'react';
import NumberBall from './NumberBall';
import './TwoZoneNumberGrid.css';

/**
 * 两区数字网格组件 - 展示双色球和大乐透的抽奖结果
 */
const TwoZoneNumberGrid = ({ 
  primaryNumbers = [], 
  secondaryNumbers = [], 
  isAnimating = false, 
  lotteryConfig,
  actualPrimaryCount,
  actualSecondaryCount
}) => {
  const { primary, secondary } = lotteryConfig.zones;
  
  // 使用传入的实际数量，如果没有传入则使用默认值
  const primaryCount = actualPrimaryCount || primary.defaultCount;
  const secondaryCount = actualSecondaryCount || secondary.defaultCount;
  
  // 调试信息
  console.log('TwoZoneNumberGrid props:', {
    primaryNumbers,
    secondaryNumbers,
    actualPrimaryCount,
    actualSecondaryCount,
    primaryCount,
    secondaryCount
  });
  
  // 创建显示数组
  const primaryDisplayNumbers = Array.from({ length: primaryCount }, (_, index) => 
    primaryNumbers[index] || null
  );
  
  const secondaryDisplayNumbers = Array.from({ length: secondaryCount }, (_, index) => 
    secondaryNumbers[index] || null
  );

  return (
    <div className="two-zone-number-grid">
      <h2 className="two-zone-number-grid__title">
        {isAnimating ? '正在抽取中...' : '开奖结果'}
      </h2>
      
      {/* 主区结果 */}
      <div className="two-zone-number-grid__section">
        <h3 className="two-zone-number-grid__section-title">
          {primary.name}
        </h3>
        <div className={`two-zone-number-grid__container two-zone-number-grid__container--primary two-zone-number-grid__container--count-${primaryCount}`}>
          {primaryDisplayNumbers.map((number, index) => (
            <NumberBall
              key={`primary-${index}`}
              number={number}
              index={index}
              isAnimating={isAnimating}
              totalCount={primaryCount}
              zone="primary"
            />
          ))}
        </div>
      </div>

      {/* 副区结果 */}
      <div className="two-zone-number-grid__section">
        <h3 className="two-zone-number-grid__section-title">
          {secondary.name}
        </h3>
        <div className={`two-zone-number-grid__container two-zone-number-grid__container--secondary two-zone-number-grid__container--count-${secondaryCount}`}>
          {secondaryDisplayNumbers.map((number, index) => (
            <NumberBall
              key={`secondary-${index}`}
              number={number}
              index={index}
              isAnimating={isAnimating}
              totalCount={secondaryCount}
              zone="secondary"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TwoZoneNumberGrid;