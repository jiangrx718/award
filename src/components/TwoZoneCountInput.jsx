import React from 'react';
import './TwoZoneCountInput.css';

/**
 * 两区数量输入组件（双色球和大乐透）
 */
const TwoZoneCountInput = ({
  primaryValue,
  secondaryValue,
  onPrimaryChange,
  onSecondaryChange,
  lotteryConfig,
  disabled = false
}) => {
  const { primary, secondary } = lotteryConfig.zones;

  const handleInputChange = (value, onChange) => {
    // 只允许输入数字
    if (value === '' || /^\d+$/.test(value)) {
      onChange(value);
    }
  };

  const handleIncrement = (currentValue, defaultValue, maxValue, onChange) => {
    const value = parseInt(currentValue) || defaultValue;
    if (value < maxValue) {
      onChange((value + 1).toString());
    }
  };

  const handleDecrement = (currentValue, defaultValue, minValue, onChange) => {
    const value = parseInt(currentValue) || defaultValue;
    if (value > minValue) {
      onChange((value - 1).toString());
    }
  };

  const primaryDisplayValue = primaryValue || primary.defaultCount;
  const secondaryDisplayValue = secondaryValue || secondary.defaultCount;

  return (
    <div className="two-zone-count-input">
      <h3 className="two-zone-count-input__title">选择数量</h3>
      
      {/* 主区输入 */}
      <div className="two-zone-count-input__zone">
        <label className="two-zone-count-input__label">
          {primary.name}
        </label>
        
        <div className="two-zone-count-input__container">
          <button 
            className="two-zone-count-input__button two-zone-count-input__button--decrement"
            onClick={() => handleDecrement(primaryValue, primary.defaultCount, primary.minCount, onPrimaryChange)}
            disabled={disabled || (parseInt(primaryValue) || primary.defaultCount) <= primary.minCount}
            type="button"
          >
            −
          </button>
          
          <input
            type="text"
            className="two-zone-count-input__input"
            value={primaryValue}
            onChange={(e) => handleInputChange(e.target.value, onPrimaryChange)}
            placeholder={primary.defaultCount.toString()}
            disabled={disabled}
            min={primary.minCount}
            max={primary.maxCount}
          />
          
          <button 
            className="two-zone-count-input__button two-zone-count-input__button--increment"
            onClick={() => handleIncrement(primaryValue, primary.defaultCount, primary.maxCount, onPrimaryChange)}
            disabled={disabled || (parseInt(primaryValue) || primary.defaultCount) >= primary.maxCount}
            type="button"
          >
            +
          </button>
        </div>
        
        <div className="two-zone-count-input__info">
          <span className="two-zone-count-input__current">
            将生成 {primaryDisplayValue} 个{primary.name}
          </span>
          <span className="two-zone-count-input__range">
            (范围: {primary.minCount}-{primary.maxCount})
          </span>
        </div>
      </div>

      {/* 副区输入 */}
      <div className="two-zone-count-input__zone">
        <label className="two-zone-count-input__label">
          {secondary.name}
        </label>
        
        <div className="two-zone-count-input__container">
          <button 
            className="two-zone-count-input__button two-zone-count-input__button--decrement"
            onClick={() => handleDecrement(secondaryValue, secondary.defaultCount, secondary.minCount, onSecondaryChange)}
            disabled={disabled || (parseInt(secondaryValue) || secondary.defaultCount) <= secondary.minCount}
            type="button"
          >
            −
          </button>
          
          <input
            type="text"
            className="two-zone-count-input__input"
            value={secondaryValue}
            onChange={(e) => handleInputChange(e.target.value, onSecondaryChange)}
            placeholder={secondary.defaultCount.toString()}
            disabled={disabled}
            min={secondary.minCount}
            max={secondary.maxCount}
          />
          
          <button 
            className="two-zone-count-input__button two-zone-count-input__button--increment"
            onClick={() => handleIncrement(secondaryValue, secondary.defaultCount, secondary.maxCount, onSecondaryChange)}
            disabled={disabled || (parseInt(secondaryValue) || secondary.defaultCount) >= secondary.maxCount}
            type="button"
          >
            +
          </button>
        </div>
        
        <div className="two-zone-count-input__info">
          <span className="two-zone-count-input__current">
            将生成 {secondaryDisplayValue} 个{secondary.name}
          </span>
          <span className="two-zone-count-input__range">
            (范围: {secondary.minCount}-{secondary.maxCount})
          </span>
        </div>
      </div>
    </div>
  );
};

export default TwoZoneCountInput;