import React from 'react';
import { policy } from '../../data/policy';
import SupportCard from './SupportCard';

const SupportCardContainer: React.FC = () => {
  const SupportCardData = policy;
  return (
    <div className="support__card-container">
      {SupportCardData.map(e => (
        <SupportCard 
          key={e.name}
          icon={e.icon}
          title={e.name}
          description={e.description}
        />
      ))}
    </div>
  )
}

export default SupportCardContainer
