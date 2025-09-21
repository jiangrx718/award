import React from 'react';
import './NumberCountInput.css';

/**
 * 数量输入组件
 */
const NumberCountInput = ({ 
  value, 
  onChange, 
  lotteryConfig,
  disabled = false 
}) => {
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // 只允许输入数字
    if (inputValue === '' || /^\d+$/.test(inputValue)) {
      onChange(inputValue);
    }
  };

  const handleIncrement = () => {
    const currentValue = parseInt(value) || lotteryConfig.defaultCount;
    if (currentValue < lotteryConfig.maxCount) {
      onChange((currentValue + 1).toString());
    }
  };

  const handleDecrement = () => {
    const currentValue = parseInt(value) || lotteryConfig.defaultCount;
    if (currentValue > lotteryConfig.minCount) {
      onChange((currentValue - 1).toString());
    }
  };

  const displayValue = value || lotteryConfig.defaultCount;

  return (
    <div className="number-count-input">
      <label className="number-count-input__label">
        选择数量
      </label>
      
      <div className="number-count-input__container">
        <button 
          className="number-count-input__button number-count-input__button--decrement"
          onClick={handleDecrement}
          disabled={disabled || (parseInt(value) || lotteryConfig.defaultCount) <= lotteryConfig.minCount}
          type="button"
        >
          −
        </button>
        
        <input
          type="text"
          className="number-count-input__input"
          value={value}
          onChange={handleInputChange}
          placeholder={lotteryConfig.defaultCount.toString()}
          disabled={disabled}
          min={lotteryConfig.minCount}
          max={lotteryConfig.maxCount}
        />
        
        <button 
          className="number-count-input__button number-count-input__button--increment"
          onClick={handleIncrement}
          disabled={disabled || (parseInt(value) || lotteryConfig.defaultCount) >= lotteryConfig.maxCount}
          type="button"
        >
          +
        </button>
      </div>
      
      <div className="number-count-input__info">
        <span className="number-count-input__current">
          将生成 {displayValue} 个数字
        </span>
        <span className="number-count-input__range">
          (范围: {lotteryConfig.minCount}-{lotteryConfig.maxCount})
        </span>
      </div>
    </div>
  );
};

export default NumberCountInput;