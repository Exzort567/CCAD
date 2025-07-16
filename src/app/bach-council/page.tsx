'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import DropdownSection from '@/components/DropdownSection';
import { useSectionAnimation } from '@/hooks/useSectionAnimation';
import FlippingBook from '@/components/FlippingBook';

interface CouncilMember {
  _id: string;
  name: string;
  position: string;
  category: string;
  committee?: string;
  order?: number;
}

export default function BachCouncilPage() {
  const [council, setCouncil] = useState<CouncilMember[]>([]);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchCouncil = async () => {
      const res = await fetch('/api/council');
      const data = await res.json();
      setCouncil(data);
    };
    fetchCouncil();
  }, []);

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  const objectives = [
    'The preservation and revitalization of the Boholano Cultural Heritage, raising Boholano/Filipino pride and self-identity',
    'The cultural empowerment of Boholano individuals, groups, communities, and institutions working for the highest standards of artistic expression, faithfully reflecting the Boholano people\'s values, ideas, struggles, and aspirations',
    'Sustainable community-based cultural productivity integrated into eco-tourism for the economic development of Bohol',
    'To promote the growth of the creation of new artistic works',
    'Cultural promotion and networking'
  ];

  const duties = [
    'To initiate the formulation and enactment of appropriate legislation for the preservation and protection of Boholano cultural heritage',
    'The cultural empowerment of Boholano individuals, groups, communities, and institutions working for the highest standards of artistic expression, faithfully reflecting the Boholano people\'s values, ideas, struggles, and aspirations',
    'To help revitalize Boholano cultural traditions',
    'To promote the growth of the creation of new artistic works',
    'To foster cultural empowerment of communities, groups, and institutions',
    'To foster awareness and appreciation of Boholano and Filipino Cultural Heritage'
  ];

  const sectionRef = useSectionAnimation();

  const renderMembersByCategory = (category: string) => {
    return council
      .filter(member => member.category === category)
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map(member => (
        <div key={member._id} className="text-center">
          <h4 className="font-bold text-xs sm:text-sm md:text-base text-gray-900 leading-tight">{member.name}</h4>
          <p className="text-xs sm:text-sm text-gray-700 mt-1">{member.position}</p>
        </div>
      ));
  };

  const renderExecutiveBoard = () => {
    const executiveBoard = council
        .filter(member => member.category === 'Executive Board')
        .sort((a, b) => (a.order || 0) - (b.order || 0));
    
    const topRow = executiveBoard.slice(0, 4);
    const bottomRow = executiveBoard.slice(4);

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4">
                {topRow.map(member => (
                    <div key={member._id} className="text-center p-2">
                        <h4 className="font-bold text-xs sm:text-sm text-gray-900 leading-tight">{member.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-700 mt-1">{member.position}</p>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-sm mx-auto">
                {bottomRow.map(member => (
                    <div key={member._id} className="text-center p-2">
                        <h4 className="font-bold text-xs sm:text-sm text-gray-900 leading-tight">{member.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-700 mt-1">{member.position}</p>
                    </div>
                ))}
            </div>
        </>
    );
  };

  const renderSectionHeads = () => {
    const sectionHeads = council.filter(m => m.category === 'Section Head');
    const committees = council.filter(m => m.category === 'Committee Heads & Members');

    return sectionHeads
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map(head => {
        const sectionName = head.position.match(/\(([^)]+)\)/)?.[1] || '';
        const committeeMembers = committees
            .filter(cm => cm.committee === sectionName)
            .sort((a, b) => (a.order || 0) - (b.order || 0));
        
        const isExpanded = expandedSections[sectionName] || false;

        return (
            <div key={head._id} className="flex flex-col items-center">
                <div className="bg-gray-100 border-2 border-gray-400 rounded-xl p-3 sm:p-4 text-center w-full">
                    <p className="text-xs sm:text-sm text-gray-700 mb-1">Section Head</p>
                    <h5 className="font-bold text-xs sm:text-sm text-gray-900">{head.name}</h5>
                    <p className="text-xs sm:text-sm text-gray-700">{head.position}</p>
                </div>

                <div className="w-0.5 h-4 bg-gray-800"></div>

                <div className="bg-gray-100 border-2 border-gray-400 rounded-xl w-full overflow-hidden transition-all duration-300 ease-in-out">
                    {/* Header with toggle button */}
                    <div 
                        className="p-3 sm:p-4 cursor-pointer hover:bg-gray-200 transition-colors duration-200 flex items-center justify-between"
                        onClick={() => toggleSection(sectionName)}
                    >
                        <p className="text-xs sm:text-sm font-bold text-gray-900">Committee Heads & Members:</p>
                        <div className={`transition-transform duration-300 ease-in-out ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
                            <svg 
                                width="16" 
                                height="16" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-gray-600"
                            >
                                <path 
                                    d="M7 10L12 15L17 10" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                    
                    {/* Collapsible content */}
                    <div 
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                            isExpanded 
                                ? 'max-h-96 opacity-100' 
                                : 'max-h-0 opacity-0'
                        }`}
                    >
                        <div className="px-3 sm:px-4 pb-3 sm:pb-4 space-y-2 text-xs sm:text-sm">
                            {committeeMembers.map((cm, index) => (
                                <div 
                                    key={cm._id}
                                    className={`transform transition-all duration-300 ease-in-out ${
                                        isExpanded 
                                            ? 'translate-y-0 opacity-100' 
                                            : 'translate-y-[-10px] opacity-0'
                                    }`}
                                    style={{ 
                                        transitionDelay: isExpanded ? `${index * 50}ms` : '0ms' 
                                    }}
                                >
                                    <h6 className="font-bold text-gray-900">{cm.name}</h6>
                                    <p className="text-gray-700">{cm.position}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    });
  };

  return (
    <div className="min-h-screen bg-white py-4 sm:py-6 md:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Artistic BACH Logo and Title */}
        <div className="mt-4 sm:mt-6 max-w-[200px] sm:max-w-[250px] md:max-w-xs mx-auto">
            <Image
              src="/images/bach.png"
              alt="BACH Logo"
              width={400}
              height={200}
              className="w-full h-auto"
            />
        </div>

        {/* Organizational Structure Title */}
        <div className="flex justify-center items-center my-4 sm:my-6 md:my-8">
          <Image
            src="/images/structure.png"
            alt="Structure logo"
            width={25}
            height={25}
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
          <h1 className="text-center text-sm sm:text-base md:text-xl font-semibold mx-2 sm:mx-4">ORGANIZATIONAL STRUCTURE</h1>
          <Image
            src="/images/structure.png"
            alt="Structure logo"
            width={25}
            height={25}
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
        </div>

        {/* Honorary Chairperson */}
        <div className="flex flex-col items-center">
          {renderMembersByCategory('Honorary Chairperson').map((member, index) => (
            <div key={index} className="bg-gray-100 border-2 border-gray-400 rounded-xl p-3 sm:p-4 w-full max-w-[280px] sm:max-w-xs">
                <div className="bg-white border-2 border-gray-500 rounded-lg p-2 sm:p-3 mb-1 text-center">
                    {member}
                </div>
            </div>
          ))}

          <div className="w-0.5 h-4 sm:h-6 bg-gray-800"></div>

          {/* Executive Board */}
          <div className="bg-gray-100 border-2 border-gray-400 rounded-xl p-3 sm:p-4 md:p-6 w-full max-w-3xl">
            <div className="mb-3 sm:mb-4 text-center">
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 font-inknut-antiqua">EXECUTIVE BOARD</h3>
            </div>
            {renderExecutiveBoard()}
          </div>
          
          <div className="w-0.5 h-4 sm:h-6 bg-gray-800"></div>

          {/* Horizontal line - responsive width */}
          <div className="h-0.5 w-[52.4%] sm:w-[75%] md:w-[63.6%] bg-gray-800"></div>

           <div className="relative w-full max-w-4xl">
              {/* Vertical lines - responsive spacing */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-0">
                <div className="flex justify-center"><div className="w-0.5 h-4 sm:h-6 bg-gray-800"></div></div>
                <div className="flex justify-center"><div className="w-0.5 h-4 sm:h-6 bg-gray-800"></div></div>
                <div className="hidden sm:flex justify-center"><div className="w-0.5 h-4 sm:h-6 bg-gray-800"></div></div>
                <div className="hidden sm:flex justify-center"><div className="w-0.5 h-4 sm:h-6 bg-gray-800"></div></div>
              </div>
              {/* Section heads - responsive grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {renderSectionHeads()}
              </div>
            </div>
        </div>

        {/* Spacer */}
        <div className="my-8 sm:my-10 md:my-12" />

        {/* Image and BACH Logo */}
        <div className="flex flex-col items-center justify-center text-center px-4">
         
        </div>
        
        {/* Spacer */}
        <div className="my-8 sm:my-10 md:my-12" />
        
        <section ref={sectionRef} className="flex justify-center bg-white py-8 sm:py-10 md:py-12 w-full animated-section slide-in-left">
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <div className="w-full flex flex-col lg:flex-row justify-center items-stretch gap-8 md:gap-10">
          
              {/* Objectives with Dropdown */}
              <div className="flex-1 flex flex-col items-center lg:items-start w-full max-w-md mx-auto lg:mx-0">
                <DropdownSection title="Objectives" items={objectives} />
              </div>

              {/* Duties and Functions with Dropdown */}
              <div className="flex-1 flex flex-col items-center lg:items-start w-full max-w-md mx-auto lg:mx-0">
                <DropdownSection title="Duties and Functions" items={duties} />
              </div>
            </div>
          </div>
        </section>

        <FlippingBook />

        {/* Spacer at the bottom of the page */}
        <div className="my-8 sm:my-10 md:my-12" />

      </div>
    </div>
  );
}