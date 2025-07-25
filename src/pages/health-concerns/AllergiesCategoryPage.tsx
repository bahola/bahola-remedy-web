
import React from 'react';
import { HealthConcernsCategoryView } from '@/components/health-concerns/HealthConcernsCategoryView';
import { HealthConcernsBreadcrumb } from '@/components/health-concerns/HealthConcernsBreadcrumb';
import { healthConcernsData } from '@/data/healthConcernsData';
import { SEO } from '@/components/SEO';

const AllergiesCategoryPage = () => {
  // Filter health concerns to only show allergy-related ones
  const allergysConcerns = healthConcernsData.filter(concern => 
    concern.category === 'Allergies'
  );

  const concernsByCategory = {
    'Allergies': allergysConcerns
  };

  return (
    <>
      <SEO
        title="Allergies - Natural Homeopathic Treatment"
        description="Discover natural homeopathic remedies for various types of allergies including seasonal allergies, food allergies, skin allergies and more."
      />
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <div className="container mx-auto px-4">
            <HealthConcernsBreadcrumb 
              categoryName="Allergies"
              categoryPath="/diseases-conditions/allergies"
            />
          </div>

          <HealthConcernsCategoryView
            concernsByCategory={concernsByCategory}
            viewMode="grid"
            categoryKey="Allergies"
            showAsHeroSection={true}
          />
        </main>
      </div>
    </>
  );
};

export default AllergiesCategoryPage;
