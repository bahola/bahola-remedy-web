
import React from 'react';
import { 
  Bug, Heart, Baby, Ear, Eye, Wheat, 
  BadgePlus, Flower, BugPlay, Dumbbell, 
  Brain, Apple, Pill, Stethoscope, Wind, 
  Banana, Smile, Droplets
} from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
}

// Utility function for concern icons
const getConcernIcon = (name: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    'Allergies': <Bug size={24} />,
    'Cancer': <Pill size={24} />,
    'Heart Health': <Heart size={24} />,
    'Child Care': <Baby size={24} />,
    'Ear Nose Throat': <Ear size={24} />,
    'Eye Care': <Eye size={24} />,
    'Gut Health': <Wheat size={24} />,
    'Womens Care': <BadgePlus size={24} />,
    'Hair Care': <Flower size={24} />,
    'Immune boosters': <BadgePlus size={24} />,
    'Infection': <BugPlay size={24} />,
    'Lifestyle': <BadgePlus size={24} />,
    'Muscle & Joint Care': <Dumbbell size={24} />,
    'Mental health': <Brain size={24} />,
    'Nutritive': <Apple size={24} />,
    'Pain Care': <Pill size={24} />,
    'Reproductive care': <BadgePlus size={24} />,
    'Respiratory Care': <Wind size={24} />,
    'Skin Care': <Banana size={24} />,
    'Tooth Care': <Smile size={24} />,
    'Urinary care': <Droplets size={24} />
  };
  
  return iconMap[name] || <Pill size={24} />;
};

// Shop by Concern Mega Menu
export const MegaMenuConcern: React.FC<MegaMenuProps> = ({ isOpen }) => {
  const concerns = [
    'Allergies', 'Cancer', 'Heart Health', 'Child Care', 
    'Ear Nose Throat', 'Eye Care', 'Gut Health', 'Womens Care',
    'Hair Care', 'Immune boosters', 'Infection', 'Lifestyle',
    'Muscle & Joint Care', 'Mental health', 'Nutritive', 'Pain Care',
    'Reproductive care', 'Respiratory Care', 'Skin Care', 'Tooth Care',
    'Urinary care'
  ];

  return (
    <div className={`mega-menu mega-menu-full ${isOpen ? 'mega-menu-open' : ''}`}>
      <div className="p-6 bg-gradient-to-br from-blue-50 to-white shadow-lg border-t-4 border-blue-500">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Shop by Health Concern</h2>
        <div className="grid grid-cols-3 gap-4 max-w-6xl">
          {concerns.map((concern) => (
            <a 
              key={concern} 
              href={`/concern/${concern.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex items-center p-3 hover:bg-blue-100 rounded-lg transition-colors duration-200 text-gray-700 hover:text-blue-600 min-w-0 bg-white/70 hover:bg-blue-100 shadow-sm"
            >
              <div className="mr-3 text-blue-500 flex-shrink-0">
                {getConcernIcon(concern)}
              </div>
              <span className="text-sm font-medium truncate">
                {concern}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MegaMenuConcern;
