/**
 * 从给定的数字数组中随机选择指定数量的数字
 * @param {Array<number>} numbers - 数字数组
 * @param {number} count - 要选择的数字数量，默认为6
 * @returns {Array<number>} 随机选择的数字数组
 */
export const pickRandomNumbers = (numbers, count = 6) => {
  if (!Array.isArray(numbers)) {
    throw new Error('第一个参数必须是数组');
  }
  
  if (numbers.length < count) {
    throw new Error(`数组长度不足，至少需要 ${count} 个数字`);
  }

  // 创建数字数组的副本，避免修改原数组
  const numbersCopy = [...numbers];
  const result = [];

  // 使用 Fisher-Yates 洗牌算法的变种来随机选择
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * numbersCopy.length);
    result.push(numbersCopy.splice(randomIndex, 1)[0]);
  }

  return result.sort((a, b) => a - b); // 按升序排列结果
};

/**
 * 生成指定范围内的数字数组
 * @param {number} start - 起始数字
 * @param {number} end - 结束数字
 * @returns {Array<number>} 数字数组
 */
export const generateNumberRange = (start, end) => {
  if (start > end) {
    throw new Error('起始数字不能大于结束数字');
  }
  
  const numbers = [];
  for (let i = start; i <= end; i++) {
    numbers.push(i);
  }
  return numbers;
};

/**
 * 抽奖类型定义
 */
export const LOTTERY_TYPES = {
  DOUBLE_COLOR_BALL: {
    id: 'doubleColorBall',
    name: '双色球',
    zones: {
      primary: {
        name: '红球',
        range: { start: 1, end: 33 },
        defaultCount: 6,
        minCount: 6,
        maxCount: 10
      },
      secondary: {
        name: '蓝球',
        range: { start: 1, end: 16 },
        defaultCount: 1,
        minCount: 1,
        maxCount: 16
      }
    },
    description: '红球从1-33中选择，蓝球从1-16中选择'
  },
  SUPER_LOTTO: {
    id: 'superLotto',
    name: '大乐透',
    zones: {
      primary: {
        name: '前区',
        range: { start: 1, end: 35 },
        defaultCount: 5,
        minCount: 5,
        maxCount: 10
      },
      secondary: {
        name: '后区',
        range: { start: 1, end: 12 },
        defaultCount: 2,
        minCount: 2,
        maxCount: 12
      }
    },
    description: '前区从1-35中选择，后区从1-12中选择'
  }
};

/**
 * 验证抽取数量是否有效
 * @param {string} lotteryTypeId - 抽奖类型ID
 * @param {number} primaryCount - 主区数量
 * @param {number} secondaryCount - 副区数量
 * @returns {Object} 验证结果 { isValid: boolean, message: string }
 */
export const validatePickCount = (lotteryTypeId, primaryCount, secondaryCount) => {
  const lotteryType = LOTTERY_TYPES[lotteryTypeId];
  if (!lotteryType) {
    return { isValid: false, message: '无效的抽奖类型' };
  }

  const { primary, secondary } = lotteryType.zones;
  
  // 验证主区
  const primaryPoolSize = primary.range.end - primary.range.start + 1;
  if (primaryCount < primary.minCount) {
    return { isValid: false, message: `${primary.name}最少需要选择 ${primary.minCount} 个数字` };
  }
  if (primaryCount > primary.maxCount) {
    return { isValid: false, message: `${primary.name}最多只能选择 ${primary.maxCount} 个数字` };
  }
  if (primaryCount > primaryPoolSize) {
    return { 
      isValid: false, 
      message: `${primary.name}数字池只有 ${primaryPoolSize} 个数字，无法选择 ${primaryCount} 个` 
    };
  }
  
  // 验证副区
  const secondaryPoolSize = secondary.range.end - secondary.range.start + 1;
  if (secondaryCount < secondary.minCount) {
    return { isValid: false, message: `${secondary.name}最少需要选择 ${secondary.minCount} 个数字` };
  }
  if (secondaryCount > secondary.maxCount) {
    return { isValid: false, message: `${secondary.name}最多只能选择 ${secondary.maxCount} 个数字` };
  }
  if (secondaryCount > secondaryPoolSize) {
    return { 
      isValid: false, 
      message: `${secondary.name}数字池只有 ${secondaryPoolSize} 个数字，无法选择 ${secondaryCount} 个` 
    };
  }
  
  return { isValid: true, message: '' };
};

/**
 * 获取指定抽奖类型和区域的数字池
 * @param {string} lotteryTypeId - 抽奖类型ID
 * @param {string} zone - 区域 ('primary' | 'secondary')
 * @returns {Array<number>} 数字数组
 */
export const getNumberPoolByZone = (lotteryTypeId, zone) => {
  const lotteryType = LOTTERY_TYPES[lotteryTypeId] || LOTTERY_TYPES.DOUBLE_COLOR_BALL;
  const zoneConfig = lotteryType.zones[zone];
  return generateNumberRange(zoneConfig.range.start, zoneConfig.range.end);
};

/**
 * 默认数字池（1-50）
 */
export const DEFAULT_NUMBER_POOL = generateNumberRange(1, 50);