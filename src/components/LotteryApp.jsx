import React from 'react';
import { useRandomNumberPicker } from '../hooks/useRandomNumberPicker';
import TwoZoneNumberGrid from './TwoZoneNumberGrid';
import ControlPanel from './ControlPanel';
import LotteryTypeSelector from './LotteryTypeSelector';
import TwoZoneCountInput from './TwoZoneCountInput';
import CustomRangeInput from './CustomRangeInput';
import './LotteryApp.css';

/**
 * 抽奖应用主组件
 */
const LotteryApp = () => {
  const {
    currentLotteryType,
    lotteryConfig,
    primaryCustomCount,
    secondaryCustomCount,
    primaryCustomRange,
    secondaryCustomRange,
    actualPrimaryCount,
    actualSecondaryCount,
    selectedNumbers,
    isPickingAnimation,
    pickNumbers,
    changeLotteryType,
    updatePrimaryCustomCount,
    updateSecondaryCustomCount,
    updatePrimaryCustomRange,
    updateSecondaryCustomRange
  } = useRandomNumberPicker();

  const handlePickNumbers = () => {
    pickNumbers();
  };

  const handleTypeChange = (typeId) => {
    changeLotteryType(typeId);
  };

  const handlePrimaryCountChange = (count) => {
    updatePrimaryCustomCount(count);
  };

  const handleSecondaryCountChange = (count) => {
    updateSecondaryCustomCount(count);
  };

  const handlePrimaryRangeChange = (range, numbers, isValid) => {
    updatePrimaryCustomRange(range, numbers, isValid);
  };

  const handleSecondaryRangeChange = (range, numbers, isValid) => {
    updateSecondaryCustomRange(range, numbers, isValid);
  };

  return (
    <div className="lottery-app">
      <header className="lottery-app__header">
        <h1 className="lottery-app__title">幸运数字抽取</h1>
        <p className="lottery-app__subtitle">选择你喜欢的抽奖类型和数量</p>
      </header>

      <main className="lottery-app__main">
        <LotteryTypeSelector
          currentType={currentLotteryType}
          onTypeChange={handleTypeChange}
          disabled={isPickingAnimation}
        />
        
        <TwoZoneCountInput
          primaryValue={primaryCustomCount}
          secondaryValue={secondaryCustomCount}
          onPrimaryChange={handlePrimaryCountChange}
          onSecondaryChange={handleSecondaryCountChange}
          lotteryConfig={lotteryConfig}
          disabled={isPickingAnimation}
        />
        
        <CustomRangeInput
          primaryCustomRange={primaryCustomRange}
          secondaryCustomRange={secondaryCustomRange}
          onPrimaryRangeChange={handlePrimaryRangeChange}
          onSecondaryRangeChange={handleSecondaryRangeChange}
          lotteryConfig={lotteryConfig}
          disabled={isPickingAnimation}
        />
        
        <TwoZoneNumberGrid 
          primaryNumbers={selectedNumbers.primary || []}
          secondaryNumbers={selectedNumbers.secondary || []}
          isAnimating={isPickingAnimation}
          lotteryConfig={lotteryConfig}
          actualPrimaryCount={actualPrimaryCount}
          actualSecondaryCount={actualSecondaryCount}
        />
        
        <ControlPanel
          onPickNumbers={handlePickNumbers}
          isAnimating={isPickingAnimation}
        />
      </main>

      <footer className="lottery-app__footer">
        <p>祝您好运！🍀</p>
      </footer>
    </div>
  );
};

export default LotteryApp;