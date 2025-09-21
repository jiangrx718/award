import { useState, useCallback } from 'react';
import { pickRandomNumbers, LOTTERY_TYPES, getNumberPoolByZone, validatePickCount } from '../utils/numberPicker';

/**
 * 用于管理随机数字选择的自定义Hook
 */
export const useRandomNumberPicker = (initialLotteryType = 'DOUBLE_COLOR_BALL') => {
  const [currentLotteryType, setCurrentLotteryType] = useState(initialLotteryType);
  const [primaryCustomCount, setPrimaryCustomCount] = useState(''); // 主区自定义数量
  const [secondaryCustomCount, setSecondaryCustomCount] = useState(''); // 副区自定义数量
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

    setIsPickingAnimation(true);
    
    // 添加一些动画延迟，让用户感受到随机选择的过程
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const primaryPool = getNumberPoolByZone(currentLotteryType, 'primary');
      const secondaryPool = getNumberPoolByZone(currentLotteryType, 'secondary');
      
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
  }, [currentLotteryType, getActualPrimaryCount, getActualSecondaryCount]);

  /**
   * 更改抽奖类型
   * @param {string} lotteryTypeId - 抽奖类型ID
   */
  const changeLotteryType = useCallback((lotteryTypeId) => {
    if (LOTTERY_TYPES[lotteryTypeId]) {
      setCurrentLotteryType(lotteryTypeId);
      setPrimaryCustomCount(''); // 重置主区自定义数量
      setSecondaryCustomCount(''); // 重置副区自定义数量
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

  return {
    currentLotteryType,
    lotteryConfig,
    primaryCustomCount,
    secondaryCustomCount,
    actualPrimaryCount: getActualPrimaryCount(),
    actualSecondaryCount: getActualSecondaryCount(),
    selectedNumbers,
    isPickingAnimation,
    pickNumbers,
    changeLotteryType,
    updatePrimaryCustomCount,
    updateSecondaryCustomCount
  };
};