import React from 'react';
import './ControlPanel.css';

/**
 * 控制面板组件 - 包含抽取按钮
 */
const ControlPanel = ({ 
  onPickNumbers, 
  isAnimating = false
}) => {
  return (
    <div className="control-panel">
      <button 
        className="control-panel__button control-panel__button--primary"
        onClick={onPickNumbers}
        disabled={isAnimating}
      >
        {isAnimating ? '抽取中...' : '开始抽取'}
      </button>
    </div>
  );
};

export default ControlPanel;