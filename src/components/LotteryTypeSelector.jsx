import React from 'react';
import { LOTTERY_TYPES } from '../utils/numberPicker';
import './LotteryTypeSelector.css';

/**
 * 抽奖类型选择组件
 */
const LotteryTypeSelector = ({ 
  currentType, 
  onTypeChange, 
  disabled = false 
}) => {
  const handleTypeChange = (typeId) => {
    if (!disabled && typeId !== currentType) {
      onTypeChange(typeId);
    }
  };

  return (
    <div className="lottery-type-selector">
      <h3 className="lottery-type-selector__title">选择抽奖类型</h3>
      
      <div className="lottery-type-selector__options">
        {Object.entries(LOTTERY_TYPES).map(([key, type]) => (
          <button
            key={key}
            className={`lottery-type-selector__option ${
              currentType === key ? 'lottery-type-selector__option--active' : ''
            } ${
              disabled ? 'lottery-type-selector__option--disabled' : ''
            }`}
            onClick={() => handleTypeChange(key)}
            disabled={disabled}
          >
            <div className="lottery-type-selector__option-name">
              {type.name}
            </div>
            <div className="lottery-type-selector__option-desc">
              {type.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LotteryTypeSelector;