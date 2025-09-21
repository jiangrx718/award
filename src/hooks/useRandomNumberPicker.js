import { useState, useCallback } from 'react';
import { pickRandomNumbers, LOTTERY_TYPES, getNumberPoolByZone, validatePickCount, parseCustomRange } from '../utils/numberPicker';

/**
 * 用于管理随机数字选择的自定义Hook
 */
export const useRandomNumberPicker = (initialLotteryType = 'DOUBLE_COLOR_BALL') => {
  const [currentLotteryType, setCurrentLotteryType] = useState(initialLotteryType);
  const [primaryCustomCount, setPrimaryCustomCount] = useState(''); // 主区自定义数量
  const [secondaryCustomCount, setSecondaryCustomCount] = useState(''); // 副区自定义数量
  const [primaryCustomRange, setPrimaryCustomRange] = useState(''); // 主区自定义号码池
  const [secondaryCustomRange, setSecondaryCustomRange] = useState(''); // 副区自定义号码池
  const [primaryCustomNumbers, setPrimaryCustomNumbers] = useState([]); // 解析后的主区号码池
  const [secondaryCustomNumbers, setSecondaryCustomNumbers] = useState([]); // 解析后的副区号码池
  const [primaryRangeValid, setPrimaryRangeValid] = useState(true); // 主区号码池是否有效
  const [secondaryRangeValid, setSecondaryRangeValid] = useState(true); // 副区号码池是否有效
  const [selectedNumbers, setSelectedNumbers] = useState({ primary: [], secondary: [] });
  const [isPickingAnimation, setIsPickingAnimation] = useState(false);

  // 获取当前抽奖类型配置
  const lotteryConfig = LOTTERY_TYPES[currentLotteryType];
  
  // 获取实际使用的数量
  const getActualPrimaryCount = useCallback(() => {
    if (primaryCustomCount && !isNaN(primaryCustomCount) && primaryCustomCount.trim() !== '') {
      return parseInt(primaryCustomCount);
    }
    return lotteryConfig.zones.primary.defaultCount;
  }, [primaryCustomCount, lotteryConfig.zones.primary.defaultCount]);

  const getActualSecondaryCount = useCallback(() => {
    if (secondaryCustomCount && !isNaN(secondaryCustomCount) && secondaryCustomCount.trim() !== '') {
      return parseInt(secondaryCustomCount);
    }
    return lotteryConfig.zones.secondary.defaultCount;
  }, [secondaryCustomCount, lotteryConfig.zones.secondary.defaultCount]);

  /**
   * 随机选择数字
   */
  const pickNumbers = useCallback(async () => {
    const primaryCount = getActualPrimaryCount();
    const secondaryCount = getActualSecondaryCount();
    
    // 验证数量
    const validation = validatePickCount(currentLotteryType, primaryCount, secondaryCount);
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }

    // 验证自定义号码池
    if (primaryCustomRange && !primaryRangeValid) {
      alert('主区自定义号码池格式不正确，请检查输入');
      return;
    }
    if (secondaryCustomRange && !secondaryRangeValid) {
      alert('副区自定义号码池格式不正确，请检查输入');
      return;
    }

    setIsPickingAnimation(true);
    
    // 添加一些动画延迟，让用户感受到随机选择的过程
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // 获取号码池 - 优先使用自定义号码池
      let primaryPool, secondaryPool;
      
      if (primaryCustomNumbers.length > 0 && primaryRangeValid) {
        primaryPool = primaryCustomNumbers;
      } else {
        primaryPool = getNumberPoolByZone(currentLotteryType, 'primary');
      }
      
      if (secondaryCustomNumbers.length > 0 && secondaryRangeValid) {
        secondaryPool = secondaryCustomNumbers;
      } else {
        secondaryPool = getNumberPoolByZone(currentLotteryType, 'secondary');
      }
      
      // 验证号码池大小
      if (primaryPool.length < primaryCount) {
        alert(`主区号码池只有 ${primaryPool.length} 个数字，无法选择 ${primaryCount} 个`);
        return;
      }
      if (secondaryPool.length < secondaryCount) {
        alert(`副区号码池只有 ${secondaryPool.length} 个数字，无法选择 ${secondaryCount} 个`);
        return;
      }
      
      const primaryNumbers = pickRandomNumbers(primaryPool, primaryCount);
      const secondaryNumbers = pickRandomNumbers(secondaryPool, secondaryCount);
      
      setSelectedNumbers({
        primary: primaryNumbers,
        secondary: secondaryNumbers
      });
    } catch (error) {
      console.error('选择数字时出错:', error);
      alert('选择数字时出错，请重试');
    } finally {
      setIsPickingAnimation(false);
    }
  }, [currentLotteryType, getActualPrimaryCount, getActualSecondaryCount, 
      primaryCustomNumbers, secondaryCustomNumbers, primaryCustomRange, 
      secondaryCustomRange, primaryRangeValid, secondaryRangeValid]);

  /**
   * 更改抽奖类型
   * @param {string} lotteryTypeId - 抽奖类型ID
   */
  const changeLotteryType = useCallback((lotteryTypeId) => {
    if (LOTTERY_TYPES[lotteryTypeId]) {
      setCurrentLotteryType(lotteryTypeId);
      setPrimaryCustomCount(''); // 重置主区自定义数量
      setSecondaryCustomCount(''); // 重置副区自定义数量
      setPrimaryCustomRange(''); // 重置主区自定义号码池
      setSecondaryCustomRange(''); // 重置副区自定义号码池
      setPrimaryCustomNumbers([]); // 重置解析后的主区号码池
      setSecondaryCustomNumbers([]); // 重置解析后的副区号码池
      setPrimaryRangeValid(true); // 重置主区有效性
      setSecondaryRangeValid(true); // 重置副区有效性
      setSelectedNumbers({ primary: [], secondary: [] }); // 重置已选择的数字
    }
  }, []);

  /**
   * 更新主区自定义数量
   * @param {string} count - 数量字符串
   */
  const updatePrimaryCustomCount = useCallback((count) => {
    setPrimaryCustomCount(count);
    setSelectedNumbers({ primary: [], secondary: [] }); // 数量变化时重置选择
  }, []);

  /**
   * 更新副区自定义数量
   * @param {string} count - 数量字符串
   */
  const updateSecondaryCustomCount = useCallback((count) => {
    setSecondaryCustomCount(count);
    setSelectedNumbers({ primary: [], secondary: [] }); // 数量变化时重置选择
  }, []);

  /**
   * 更新主区自定义号码池
   * @param {string} range - 号码池字符串
   * @param {Array<number>} numbers - 解析后的数字数组
   * @param {boolean} isValid - 是否有效
   */
  const updatePrimaryCustomRange = useCallback((range, numbers, isValid) => {
    setPrimaryCustomRange(range);
    setPrimaryCustomNumbers(numbers);
    setPrimaryRangeValid(isValid);
    setSelectedNumbers({ primary: [], secondary: [] }); // 号码池变化时重置选择
  }, []);

  /**
   * 更新副区自定义号码池
   * @param {string} range - 号码池字符串
   * @param {Array<number>} numbers - 解析后的数字数组
   * @param {boolean} isValid - 是否有效
   */
  const updateSecondaryCustomRange = useCallback((range, numbers, isValid) => {
    setSecondaryCustomRange(range);
    setSecondaryCustomNumbers(numbers);
    setSecondaryRangeValid(isValid);
    setSelectedNumbers({ primary: [], secondary: [] }); // 号码池变化时重置选择
  }, []);

  return {
    currentLotteryType,
    lotteryConfig,
    primaryCustomCount,
    secondaryCustomCount,
    primaryCustomRange,
    secondaryCustomRange,
    actualPrimaryCount: getActualPrimaryCount(),
    actualSecondaryCount: getActualSecondaryCount(),
    selectedNumbers,
    isPickingAnimation,
    pickNumbers,
    changeLotteryType,
    updatePrimaryCustomCount,
    updateSecondaryCustomCount,
    updatePrimaryCustomRange,
    updateSecondaryCustomRange
  };
};