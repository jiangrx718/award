import React, { useState } from 'react';
import './CustomRangeInput.css';

/**
 * 自定义号码池输入组件
 */
const CustomRangeInput = ({
  primaryCustomRange,
  secondaryCustomRange,
  onPrimaryRangeChange,
  onSecondaryRangeChange,
  lotteryConfig,
  disabled = false
}) => {
  const [primaryError, setPrimaryError] = useState('');
  const [secondaryError, setSecondaryError] = useState('');

  const { primary, secondary } = lotteryConfig.zones;

  /**
   * 解析输入的数字字符串
   * @param {string} input - 输入字符串
   * @returns {Array<number>} 解析后的数字数组
   */
  const parseNumberInput = (input) => {
    if (!input || input.trim() === '') {
      return [];
    }
    
    const numbers = input
      .split(',')
      .map(str => str.trim())
      .filter(str => str !== '')
      .map(str => parseInt(str))
      .filter(num => !isNaN(num) && num > 0);
    
    // 去重并排序
    return [...new Set(numbers)].sort((a, b) => a - b);
  };

  /**
   * 验证输入的数字
   * @param {Array<number>} numbers - 数字数组
   * @param {Object} zoneConfig - 区域配置
   * @returns {string} 错误信息，空字符串表示无错误
   */
  const validateNumbers = (numbers, zoneConfig) => {
    if (numbers.length === 0) {
      return '';
    }

    if (numbers.length < zoneConfig.minCount) {
      return `至少需要 ${zoneConfig.minCount} 个数字`;
    }

    const minNumber = Math.min(...numbers);
    const maxNumber = Math.max(...numbers);

    if (minNumber < 1) {
      return '数字不能小于1';
    }

    if (maxNumber > 50) {
      return '数字不能大于50';
    }

    return '';
  };

  /**
   * 处理主区输入变化
   */
  const handlePrimaryInputChange = (value) => {
    const numbers = parseNumberInput(value);
    const error = validateNumbers(numbers, primary);
    
    setPrimaryError(error);
    onPrimaryRangeChange(value, numbers, error === '');
  };

  /**
   * 处理副区输入变化
   */
  const handleSecondaryInputChange = (value) => {
    const numbers = parseNumberInput(value);
    const error = validateNumbers(numbers, secondary);
    
    setSecondaryError(error);
    onSecondaryRangeChange(value, numbers, error === '');
  };

  const primaryNumbers = parseNumberInput(primaryCustomRange);
  const secondaryNumbers = parseNumberInput(secondaryCustomRange);

  return (
    <div className="custom-range-input">
      <h3 className="custom-range-input__title">自定义号码池</h3>
      <p className="custom-range-input__description">
        可以输入逗号分隔的数字来自定义号码池，如：1,2,3,4,5,6,7,8,10
      </p>
      
      {/* 主区自定义号码池 */}
      <div className="custom-range-input__zone">
        <label className="custom-range-input__label">
          {primary.name}号码池
        </label>
        
        <div className="custom-range-input__container">
          <input
            type="text"
            className={`custom-range-input__input ${primaryError ? 'custom-range-input__input--error' : ''}`}
            value={primaryCustomRange}
            onChange={(e) => handlePrimaryInputChange(e.target.value)}
            placeholder={`例如: 1,2,3,4,5,6,7,8,10 (默认范围: ${primary.range.start}-${primary.range.end})`}
            disabled={disabled}
          />
        </div>
        
        <div className="custom-range-input__info">
          {primaryCustomRange && primaryNumbers.length > 0 && !primaryError && (
            <span className="custom-range-input__current">
              当前池: [{primaryNumbers.join(', ')}] ({primaryNumbers.length}个数字)
            </span>
          )}
          {primaryError && (
            <span className="custom-range-input__error">
              {primaryError}
            </span>
          )}
          {!primaryCustomRange && (
            <span className="custom-range-input__default">
              未设置时使用默认范围: {primary.range.start}-{primary.range.end}
            </span>
          )}
        </div>
      </div>

      {/* 副区自定义号码池 */}
      <div className="custom-range-input__zone">
        <label className="custom-range-input__label">
          {secondary.name}号码池
        </label>
        
        <div className="custom-range-input__container">
          <input
            type="text"
            className={`custom-range-input__input ${secondaryError ? 'custom-range-input__input--error' : ''}`}
            value={secondaryCustomRange}
            onChange={(e) => handleSecondaryInputChange(e.target.value)}
            placeholder={`例如: 1,2,3,4,5,6 (默认范围: ${secondary.range.start}-${secondary.range.end})`}
            disabled={disabled}
          />
        </div>
        
        <div className="custom-range-input__info">
          {secondaryCustomRange && secondaryNumbers.length > 0 && !secondaryError && (
            <span className="custom-range-input__current">
              当前池: [{secondaryNumbers.join(', ')}] ({secondaryNumbers.length}个数字)
            </span>
          )}
          {secondaryError && (
            <span className="custom-range-input__error">
              {secondaryError}
            </span>
          )}
          {!secondaryCustomRange && (
            <span className="custom-range-input__default">
              未设置时使用默认范围: {secondary.range.start}-{secondary.range.end}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomRangeInput;